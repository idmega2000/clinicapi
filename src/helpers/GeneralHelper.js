import morgan from "morgan";
import Logger from 'utils/Logger';

/**
 * @description implements the general helper
 */
class GeneralHelper {

    /**
     * @description create the morgan logger instance
     * @returns moragn instance
     */
    static httpLogger() { return morgan(
        ':user-agent :remote-addr :method :url :status :response-time ms - :res[content-length] :referrer',
        { stream: Logger.stream },
      );
    }
}


export default GeneralHelper;