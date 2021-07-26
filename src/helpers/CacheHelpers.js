
import NodeCache from 'node-cache';


const myCache = new NodeCache({ stdTTL: 172800, checkperiod: 43200 });


/**
 * @description This class is the cache helpers
 */
class CacheHelper {
  /**
   * @description method that save to the cach
   * @param {Object} cacheName the cache key/name
   * @param {Object} data the data to be save
   * @param {Object} expirytime the expiry time
   * @returns {Object} boolean
   */
  static async saveToCache(cacheName, data, expirytime) {
    return myCache.set(cacheName, data, expirytime);
  }

  /**
   * @description method that get from cache
   * @param {Object} cacheName the cache/key name
   * @returns {Object} the array of object data gotten
   */
  static async getCache(cacheName) {
    try {
       return myCache.get(cacheName);;
    } catch (e) {
      return false;
    }
  }
}


export default CacheHelper;
