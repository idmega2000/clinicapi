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
  it('should return a true when data gotten successfully from cache',
    async () => {
      await CacheHelper.saveToCache(SAVE_TO, SAMPLE_DATA, 100000);
      const cache = await CacheHelper.findFromCache(NOT_EXIST, 'a');
      expect(cache).to.be.false;
    });
  it('should return the data that was searched',
    async () => {
      await CacheHelper.saveToCache(SAVE_TO, SAMPLE_DATA, 100000);
      const cache = await CacheHelper.findFromCache(SAVE_TO, 'a');
      expect(cache).to.be.equal(SAMPLE_DATA.a);
    });
  it('should return false if the data is not found',
    async () => {
      await CacheHelper.saveToCache(SAVE_TO, SAMPLE_DATA, 100000);
      const cache = await CacheHelper.findFromCache(SAVE_TO, 'b');
      expect(cache).to.be.equal(false);
    });
  it('should return false when error is thrown', async () => {
    sinon.stub(CacheHelper, 'getCache').throws();
    const cache = await CacheHelper.findFromCache(SAVE_TO);
    expect(cache).to.be.false;
  });
});