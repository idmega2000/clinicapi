import { expect } from 'chai';
import CacheHelper from 'helpers/CacheHelpers';
import sinon from 'sinon';


describe('Encryption helpers', () => {
  const SAMPLE_DATA = {
    a: 'hello'
  };
  const SAVE_TO = 'sample';
  const NOT_EXIST = 'notexist';

  afterEach(() => sinon.restore());
  it('should return a true when data successfully saved in cache',
    async () => {
      const dataSaved = await CacheHelper.saveToCache(SAVE_TO, SAMPLE_DATA, 100000);
      expect(dataSaved).to.be.true;
    });
  it('should return a true when data gotten successfully from cache',
    async () => {
      await CacheHelper.saveToCache(SAVE_TO, SAMPLE_DATA, 100000);
      const cache = await CacheHelper.getCache(SAVE_TO);
      expect(cache.a).to.be.equal(SAMPLE_DATA.a);
    });
  it('should return a false when data is not in the cache',
    async () => {
      await CacheHelper.saveToCache(SAVE_TO, SAMPLE_DATA, 100000);
      const cache = await CacheHelper.getCache(NOT_EXIST);
      expect(cache).to.not.be.true;
    });
});