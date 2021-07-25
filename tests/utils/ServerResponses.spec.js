import { expect } from 'chai';
import { PARTIAL_SUCCESS, RESPONSE_CODE } from 'utils/Constants';
import ServerResponses from 'utils/ServerResponses';
import sinon, { stub, spy } from 'sinon';

describe('Server response Helper function', () => {
  afterEach(() => sinon.restore());
  it('it should return success for success ok method', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.successOk(res, 'hello', {});
    expect(res.status.called).to.be.true;
    expect(status.calledWith(200)).to.be.true;
  });
  it('it should return success for success ok method', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.badRequest(res, 'hello', null, '66', 404);
    expect(res.status.called).to.be.true;
    expect(status.calledWith(404)).to.be.true;
  });
  it('it should return failed for bad request method', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.badRequest(res, 'hello', {});
    expect(res.status.called).to.be.true;
    expect(status.calledWith(400)).to.be.true;
  });
  it('it should return failed for full bad request for transaction', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.fullFailure(res, 'hello', {});
    expect(res.status.called).to.be.true;
    expect(status.calledWith(400)).to.be.true;
  });
  it('it should return partial success if some failed', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.partialBadRequest(res, 'hello', {}, RESPONSE_CODE.PARTIAL, 200, PARTIAL_SUCCESS, false);
    expect(res.status.called).to.be.true;
    expect(status.calledWith(200)).to.be.true;
  });
  it('it should fail when route is not found', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.notFound(res, 'hello');
    expect(res.status.called).to.be.true;
    expect(status.calledWith(404)).to.be.true;
  });
  it('it should return partial success if some failed', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.partialBadRequest(res, 'hello');
    expect(res.status.called).to.be.true;
    expect(status.calledWith(200)).to.be.true;
  });
  it('it should error if route or data is not found', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.notFound(res, 'hello', {}, RESPONSE_CODE.NOT_FOUND, 404, 'error', false);
    expect(res.status.called).to.be.true;
    expect(status.calledWith(404)).to.be.true;
  });
  it('it should return success for unathorized method', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.unAuthorized(res, 'hello', {});
    expect(res.status.called).to.be.true;
    expect(status.calledWith(401)).to.be.true;
  });
  it('it should return success for server errors metthod', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.serverError(res);
    expect(res.status.called).to.be.true;
    expect(status.calledWith(500)).to.be.true;
  });
  it('it should return the right status for log data', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.logData(res);
  });
});