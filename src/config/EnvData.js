import dotenv from 'dotenv';

dotenv.config();
/**
 * @description hold all env variable and allow default set
 */
const EnvData = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5001,
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
  CLINIC_VET_API: process.env.CLINIC_VET_API,
  CLINIC_DENTAL_API: process.env.CLINIC_DENTAL_API,
};


export default EnvData;
