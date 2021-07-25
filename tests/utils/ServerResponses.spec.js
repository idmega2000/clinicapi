import { expect } from 'chai';
import {  STATUS_CODES } from 'utils/Constants';
import ServerResponses from 'utils/ServerResponses';
import sinon, { stub, spy } from 'sinon';

describe('Server response Utils function', () => {
  afterEach(() => sinon.restore());
  it('it should return success for success ok method', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.successOk(res, 'hello', {}, 200, 'success');
    expect(res.status.called).to.be.true;
    expect(status.calledWith(200)).to.be.true;
  });

  it('it should return success for success ok method', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.badRequest(res, 'hello', null, 400);
    expect(res.status.called).to.be.true;
    expect(status.calledWith(400)).to.be.true;
  });

  it('it should return failed for bad request method', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.badRequest(res, 'hello', {}, STATUS_CODES.BAD_REQUEST, 'error');
    expect(res.status.called).to.be.true;
    expect(status.calledWith(400)).to.be.true;
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

  it('it should error if route or data is not found', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.notFound(res, 'hello', {}, 404, 'error');
    expect(res.status.called).to.be.true;
    expect(status.calledWith(404)).to.be.true;
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