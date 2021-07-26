import morgan from "morgan";
import { PAGINATION_INFO } from "utils/Constants";
import Logger from 'utils/Logger';

const {DEFAULT_LIMIT, DEFAULT_PAGE}  = PAGINATION_INFO

/**
 * @description implements the general helper
 */
class GeneralHelper {

  /**
   * @description create the morgan logger instance
   * @returns moragn instance
   */
  static httpLogger() {
    return morgan(
      ':user-agent :remote-addr :method :url :status :response-time ms - :res[content-length] :referrer',
      { stream: Logger.stream },
    );
  }
  /**
* @param {object} query
* @returns {object} - method that help handle pagination limit and offset
*/
  static paginationHelper(query) {
    const pageNumber = Number(query.pageNumber) || DEFAULT_PAGE;
    const pageLimit = Number(query.pageLimit) || DEFAULT_LIMIT;
    const offset = pageLimit * (pageNumber - 1);
    return { pageLimit, offset, pageNumber };
  }
  /**
* @param {object} query
* @returns {object} - method that help handle pagination limit and offset
*/
  static getpaginatedData(arrayData, query) {
    const { offset, pageNumber, pageLimit } = GeneralHelper.paginationHelper(query);
    return {
      clinics: arrayData.slice(offset, pageNumber * pageLimit),
      meta: {
        pageLimit,
        pageNumber,
        totalData: arrayData.length
      }
    }
  }
}


export default GeneralHelper;