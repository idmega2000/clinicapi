
import Joi from 'joi';
import { RESPONSE_MESSAGE } from 'utils/Constants';

/**
 * @description validation class for clinic
 */
class ClinicValidator {
  /**
   * @description - a validator method for validating clinic query data
   * @param {*} query request query object
   * @returns {object} - validates the query data for clinic search
   */
  static validateClinicData(query) {
    const { availableFrom } = query;
    const timeRegex = (/^([0-9]{2})\:([0-9]{2})$/);
    const schema = Joi.object().keys({
      name: Joi.string().min(3).max(200),
      state: Joi.string().min(2).max(60),
      availableFrom: Joi.string().regex(timeRegex)
        .messages({
          'string.empty': `${RESPONSE_MESSAGE.TIME_FORMAT}`,
          'string.pattern.base': `${RESPONSE_MESSAGE.TIME_FORMAT}`,
        }),
      availableTo: Joi.string().regex(timeRegex)
        .custom((value, helper) => {
          if (value < availableFrom) {
            return helper.message(RESPONSE_MESSAGE.TIME_EARLIER);
          } else {
            return true;
          }
        })
        .messages({
          'string.empty': `${RESPONSE_MESSAGE.TIME_FORMAT}`,
          'string.pattern.base': `${RESPONSE_MESSAGE.TIME_FORMAT}`,
        }),

      pageLimit: Joi.number().integer().not(0),
      pageNumber: Joi.number().integer().not(0),
    }).or('name', 'state', 'availableFrom', 'availableTo')
      .and('availableTo', 'availableFrom');

    const options = {
      errors: { wrap: { label: '' } }
    };

    return schema.validate(query, options);
  }
}

export default ClinicValidator;
