
import GeneralHelper from 'helpers/GeneralHelper';
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
    const searchLength = SearchHelper.searchLength(vetClinic.length, dentalClinic.length);

    // use the tranditional for loop which is faster
    // the method adopted is such that 
    // one can act on both data with just looping one of the array
    for (let i = 0; i < searchLength; i++) {
      // call the method to validate dental
      const vetData = SearchHelper.addClinicToList(vetClinic[i], stateData, query, CLINIC_TYPES.Vet);
      const dantalData = SearchHelper.addClinicToList(dentalClinic[i], stateData, query, CLINIC_TYPES.Dental);
      if(vetData){
        responseArray.push(vetData);
      }
      if(dantalData){
        responseArray.push(dantalData);
      }
    }
    return GeneralHelper.getpaginatedData(responseArray, query);
  }

}
export default ClinicService;
