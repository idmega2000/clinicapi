import EnvData from 'config/EnvData';
import States from 'models/states';
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
      || state.toLowerCase() === clinicStateName.toLowerCase() ;
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
   * @description get the state sent in by the user
   * @param {string} inputedState - The state sent by the user
   * @returns {object} - objec of the state
   */
  static getState(inputedState) {
    const lowerCaseInput = inputedState.toLowerCase()
    return States.find(state => (state.name.toLowerCase() === lowerCaseInput
      || state.code.toLowerCase() === lowerCaseInput));
  }

    /**
   * @description call api to get the clinic data
   * @returns {object} - return object of clinic data
   */
  static async clinicAPIData() {
    // call the two api parrallel(simultanously)
    const response = await Promise.allSettled([
      FetchHelper.get(EnvData.CLINIC_VET_API),
      FetchHelper.get(EnvData.CLINIC_DENTAL_API)
    ])

    return {
      vetClinic: response[0].value || [],
      dentalClinic: response[1].value || []
    };

  }


    /**
   * @description set the statecode andd state name in key value pair
   * @returns {object} - objec of the state code and state name
   */
     static getStateList() {
       let stateCodes = {}
       let stateNames = {}

      States.map((state) => {
        stateCodes[state.name.toLowerCase()]= state.code;
        stateNames[state.code]= state.name;
      })
      return { stateCodes, stateNames};
    }
}
export default SearchHelper;
