import ClinicController from 'controllers/ClinicController';
import { Router } from 'express';


const clinicRouter = Router();

/**
   * @description route that searches for clinics
   * @returns {object} - return information of the clinic searched for
   */
 clinicRouter.get('/clinic', ClinicController.getSearchedClinic);


export default clinicRouter;
