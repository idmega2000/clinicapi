
import ClinicService from 'services/ClinicService';
import { RESPONSE_MESSAGE } from 'utils/Constants';
import ServerResponses from 'utils/ServerResponses';


/**
* @description class will implement functionalities for ClinicController
*
* @class ClinicController
*/
class ClinicController {
  /**
   * @description get the searched clinics data
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response data
   */
  static async getSearchedClinic(req, res, next) {
    try {
      const { query } = req;
      const data = await ClinicService
        .searchedClinic(query);

      if(data.length === 0){
          return ServerResponses.badRequest(res, 
            RESPONSE_MESSAGE.CLINIC_NOT_FOUND,);
      }
      return ServerResponses.successOk(res, 
        RESPONSE_MESSAGE.CLINIC_FETCHED, data);
    } catch (error) {
      return next(error);
    }
  }
}

export default ClinicController;
