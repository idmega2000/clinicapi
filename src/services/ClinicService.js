
import SearchHelper from 'helpers/SearchHelper';
import ClinicValidator from 'helpers/validations/ClinicValidator';
import APIException from 'utils/APIException';
import { CLINIC_TYPES } from 'utils/Constants';


/**
* @description class will implement functionalities for ClinicService
*
* @class ClinicService
*/
class ClinicService {
  /**
   * @description search clinic
   * @param {object} query - The request query
   * @returns {object} - clinic array object
   */
  static async searchedClinic(query) {
    let { state } = query;
    const validateQuery = ClinicValidator.validateClinicData(query).error;

    // validate the imput
    if (validateQuery) {
      throw new APIException(validateQuery.details[0].message);
    }

    // by getting this state key value pair info, 
    // there would not be any need to loop  multiple times 
    // for state
    const stateData = SearchHelper.getStateList();

    // method that calls the api endpoint in parallel(simultanously);
    const { vetClinic, dentalClinic } = await SearchHelper.clinicAPIData();

    const responseArray = [];
    const searchLength = vetClinic.length > dentalClinic.length 
    ? vetClinic.length : dentalClinic.length;

    // use the tranditional for loop which is faster
    // the method adopted is such that 
    // one can act on both data with just looping one of the array
    for (let i = 0; i < searchLength; i++) {
      //call method to validate clinic
      if (vetClinic[i]) {
        const searializeVet = SearchHelper.serialiseClinicData(vetClinic[i], 
          CLINIC_TYPES.Vet, stateData)
        if (ClinicService.search(query, searializeVet)) {
          responseArray.push(searializeVet);
        }
      }

      // call the method to validate dental
      if (dentalClinic[i]) {
        const searializedDental = SearchHelper
        .serialiseClinicData(dentalClinic[i], CLINIC_TYPES.Dental, stateData);
        if (ClinicService.search(query, searializedDental)) {
          responseArray.push(searializedDental);
        }
      }
    }

    return responseArray;
  }
  /**
   * @description add nee charge back
   * @param {object} query - The request query
   * @param {object} clinic - The clinics to search
   * @returns {object} - object representing response message
   */
  static search(query, clinic) {
    const { name, state, availableFrom, availableTo } = query;
    return (
      clinic && SearchHelper.searchName(name, clinic.name)
      && SearchHelper.searchState(state, clinic.stateName, clinic.stateCode) &&
      SearchHelper.searchTime(availableFrom, availableTo, clinic.availability));
  }
}
export default ClinicService;
