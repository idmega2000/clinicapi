
import fetch from 'node-fetch';
import CacheHelper from './CacheHelpers';

/**
 * @description helper for api calls
 */
class FetchHelper{
    /**
     * 
     * @param {*} url - the url to fetch request from
     * @param {*} headers - the header information
     * @returns - returns the request infomation
     */
     static async get (url, headers = {}){
        const getData = await fetch(url, {
            method: 'get',
            headers,
          });
          return getData.json();
    }
}

export default FetchHelper;