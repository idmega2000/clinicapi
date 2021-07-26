import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import url from 'server';

chai.use(chaiHttp);

describe('API endpoint to search for clinic', () => {
	describe('Search for clinics', () => {
		beforeEach(async () => {
		});
		afterEach(() => sinon.restore());
		it('it should return a failed record if name of two character is passed',
			() => chai.request(url)
				.get('/api/v1/clinic?name=me')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('name length must be at lease 3 characters long');
				}));
		it('it should return a failed record if stat of one character is passed',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&stat=f')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('State length must be at least two character length');
				}));
		it('it should return a failed record if invalid availableFrom',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&availableFrom=uijk')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('Clinic fetched successfull');
				}));
		it('it should return a failed record if invalid availableTo',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&availableFrom=uijk')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('time should be entered in forman hh:mm');
				}));
		it('it should return a failed record if availble from is less than availableTo',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&availableFrom=18:00&availableTo=12:00')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('availableTrom must be earlier than availableTo');
				}));
		it('it should return a failed if availablefrom is passed without availableTo',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&availableFrom=18:00')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('value contains available from without its required paired availableTo');
				}));
		it('it should return a failed if availableTo is passed without availableFrom',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&availableTo=12:00')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('value contains availableTo without its required paired availableFrom');
				}));
		it('it should return a failed if invalid state name is passed',
			() => chai.request(url)
				.get('/api/v1/clinic?state=sjhkdsjn')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('Clinic not found');
				}));
		it('it should return a failed if name is not found',
			() => chai.request(url)
				.get('/api/v1/clinic?name=sjhkdsjn')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('Clinic not found');
				}));

		it('it should return a success record if valid name is passed to search',
			() => chai.request(url)
				.get('/api/v1/clinic?name=Good Health Home')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('Clinic fetched successfull');
					expect(res.body.data.length).to.equal(1);
				}));
		it('it should return a success record if part of a name is used to search',
			() => chai.request(url)
				.get('/api/v1/clinic?name=cl')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('Clinic fetched successfull');
					expect(res.body.data.length).to.greaterThan(0);
				}));
		it('it should return a success record if valid state name is used to search',
			() => chai.request(url)
				.get('/api/v1/clinic?state=Florida')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('Clinic fetched successfull');
					expect(res.body.data.length).to.greaterThan(0);
				}));
		it('it should return a success record if valid state code is used to search',
			() => chai.request(url)
				.get('/api/v1/clinic?state=Fl')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('Clinic fetched successfull');
					expect(res.body.data.length).to.greaterThan(0);
				}));
	});
});