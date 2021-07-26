import EnvData from 'config/EnvData';
import States from 'models/states';
import CacheHelper from './CacheHelpers';
import FetchHelper from './FetchHelper';


/**
* @description class will implement functionalities for Search
*
* @class SearchHelper
*/
class SearchHelper {

  /**
   * @description check if state is present
   * @param {string} state - The state that was inputed
   * @param {string} clinicState - The state in the clinic data
   * @returns {boolean} - boolean representing state present
   */
  static searchState(state, clinicStateName, clinicStateCode) {
    return !state || state.toUpperCase() === clinicStateCode
      || state.toLowerCase() === clinicStateName.toLowerCase();
  }

  /**
   * @description check if name is present
   * @param {string} name - The name passed by the user
   * @param {string} clinicName - The clinic name in the clinic data
   * @returns {boolean} - boolean representing state present
   */
  static searchName(name, clinicName) {
    return !name || clinicName.toLowerCase().includes(name.toLowerCase());
  }
  /**
   * @description check availability
   * @param {string} availableFrom - The request body
   * @param {string} availableTo - The request body
   * @param {string} availableTo - The id of the processor
   * @returns {boolean} - object representing availability
   */
  static searchTime(availableFrom, availableTo, availability) {
    return !availableFrom || (availableFrom >= availability.from
      && availableTo <= availability.to);
  }


  /**
   * @description check availability
   * @param {object} clinic - The clinic
   * @param {string} clinicType - The request body
   * @returns {object} - objec of the clinic
   */
  static serialiseClinicData(clinic, clinicType, stateData) {
    return {
      name: clinic.name || clinic.clinicName,
      stateName: clinic.stateName || stateData.stateNames[clinic.stateCode],
      stateCode: clinic.stateCode || stateData.stateCodes[clinic.stateName.toLowerCase()],
      availability: clinic.availability || clinic.opening,
      clinicType
    }
  }

  /**
 * @description call api to get the clinic data
 * @returns {object} - return object of clinic data
 */
  static async clinicAPIData() {
    const clinicData = await CacheHelper.getCache('clinic');
    let responseData = {};
    // check the cache
    if (clinicData) {
      responseData = {
        vetClinic: clinicData[0].value,
        dentalClinic: clinicData[1].value
      };
    } else {
      // call the two api parrallel(simultanously)
      const response = await Promise.allSettled([
        FetchHelper.get(EnvData.CLINIC_VET_API),
        FetchHelper.get(EnvData.CLINIC_DENTAL_API)
      ])
      
      SearchHelper.saveClinicToCache(response);
      // if any of the endpoint fail return empty array
      responseData = {
        vetClinic: response[0].value || [],
        dentalClinic: response[1].value || []
      };
    }

    return responseData;
  }


  /**
 * @description set the statecode andd state name in key value pair
 * @returns {object} - objec of the state code and state name
 */
  static getStateList() {
    let stateCodes = {}
    let stateNames = {}

    States.map((state) => {
      stateCodes[state.name.toLowerCase()] = state.code;
      stateNames[state.code] = state.name;
    })
    return { stateCodes, stateNames };
  }

  /**
 * @description get the array with the highest length
 * @returns {Number} - the number of the highes data
 */
  static searchLength(dentalLength, vetLength) {
    return vetLength > dentalLength
      ? vetLength : dentalLength
  }

  /**
* @description add nee charge back
* @param {object} query - The request query
* @param {object} clinic - The clinics to search
* @returns {boolean} -true or false
*/
  static search(query, clinic) {
    const { name, state, availableFrom, availableTo } = query;
    return (
      clinic && SearchHelper.searchName(name, clinic.name)
      && SearchHelper.searchState(state, clinic.stateName, clinic.stateCode) &&
      SearchHelper.searchTime(availableFrom, availableTo, clinic.availability));
  }

  /**
 * @description check if clinic can be added to list
 * @param {object} clinc - The clinic
 * @param {object} stateData - all state data
 * @param {object} query - the query information
 * @param {object} clinicType - the type of clinic
 * @returns {object} - object representing response message
 */
  static addClinicToList(clinc, stateData, query, clinicType) {
    //call method to validate clinic
    if (clinc) {
      const searializeData = SearchHelper.serialiseClinicData(clinc,
        clinicType, stateData)
      if (!SearchHelper.search(query, searializeData)) {
        return false;
      }
      return searializeData;
    }
  }
  /**
 * @description save the clinic api response to cache
 * @param {object} response - The response from the api call
 * @returns {void} - void
 */
  static saveClinicToCache(response) {

    //call method to validate clinic
    if (response[0].status === 'fulfilled' 
      && response[1].status === 'fulfilled') {
      //save data and cache data for 2 hours
      CacheHelper.saveToCache('clinic', response, 7200);
    }
  }
}
export default SearchHelper;
