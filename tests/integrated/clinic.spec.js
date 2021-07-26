import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import url from 'server';
import FetchHelper from 'helpers/FetchHelper';
import VetClinic from '../mock/clinic';
import DentalClinic from '../mock/dental';

chai.use(chaiHttp);

describe('API endpoint to search for clinic', () => {
	describe('Search for clinics', () => {

		beforeEach(async () => {
			// mock the method that makes the call to fetche the
			// clinic data from the clinic api
			sinon.stub(FetchHelper, 'get')
				.onFirstCall().returns(VetClinic)
				.onSecondCall().returns(DentalClinic);
		});
		// restore mock 
		afterEach(() => sinon.restore());
		it('it should return a failed record if name of two character is passed',
			() => chai.request(url)
				.get('/api/v1/clinic?name=me')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('name length must be at least 3 characters long');
				}));
		it('it should return a failed record if stat of one character is passed',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&state=f')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('state length must be at least 2 characters long');
				}));
		it('it should return a failed record if invalid availableFrom',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&availableFrom=uijk')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('time should be entered in format hh:mm');
				}));
		it('it should return a failed record if invalid availableTo',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&availableFrom=uijk')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('time should be entered in format hh:mm');
				}));
		it('it should return a failed record if availble from is less than availableTo',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&availableFrom=18:00&availableTo=12:00')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('availableFrom must be earlier than availableTo');
				}));
		it('it should return a failed if availablefrom is passed without availableTo',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&availableFrom=18:00')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('value contains [availableFrom] without its required peers [availableTo]');
				}));
		it('it should return a failed if availableTo is passed without availableFrom',
			() => chai.request(url)
				.get('/api/v1/clinic?name=menta&availableTo=12:00')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('value contains [availableTo] without its required peers [availableFrom]');
				}));
		it('it should return a failed if invalid state name is passed',
			() => chai.request(url)
				.get('/api/v1/clinic?state=sjhkdsjn')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('clinic not found');
				}));


		it('it should return a failed if name is not found',
			() => chai.request(url)
				.get('/api/v1/clinic?name=sjhkdsjn')
				.then((res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('clinic not found');
				}));

		it('it should return a success record if one if one of the external endpoint call fails',
			() => {

				// return error for one of the endpoint
				sinon.restore();
				sinon.stub(FetchHelper, 'get')
					.onFirstCall().throws()
					.onSecondCall().returns(DentalClinic);
				chai.request(url)
					.get('/api/v1/clinic?state=Fl')
					.then((res) => {
						expect(res).to.have.status(200);
						expect(res.body).to.be.an('Object');
						expect(res.body.responseMessage).to.equal('clinic fetched successfull');
						expect(res.body.data.length).to.greaterThan(0);
					})
			});
		it('it should return a success record if valid name is passed to search',
			() => chai.request(url)
				.get('/api/v1/clinic?name=Good Health Home')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('clinic fetched successfull');
					expect(res.body.data.clinics.length).to.greaterThan(0);
				}));
		it('it should return a success record if part of a name is used to search',
			() => chai.request(url)
				.get('/api/v1/clinic?name=cli')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('clinic fetched successfull');
					expect(res.body.data.clinics.length).to.greaterThan(0);
				}));
		it('it should return a success record if valid state name is used to search',
			() => chai.request(url)
				.get('/api/v1/clinic?state=Florida')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('clinic fetched successfull');
					expect(res.body.data.clinics.length).to.greaterThan(0);
				}));
		it('it should return a success record if valid state code is used to search',
			() => chai.request(url)
				.get('/api/v1/clinic?state=Fl')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('clinic fetched successfull');
					expect(res.body.data.clinics.length).to.greaterThan(0);
				}));
		it('it should return a success record if record has all search fields',
			() => chai.request(url)
				.get('/api/v1/clinic?name=Clinic&state=Florida&availableFrom=12:00&availableTo=15:00')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('clinic fetched successfull');
					expect(res.body.data.clinics.length).to.greaterThan(0);
				}));
		it('it should return a success for record with pagination data',
			() => chai.request(url)
				.get('/api/v1/clinic?name=Clinic&state=Florida&pageNumber=1&pageLimit=10')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('clinic fetched successfull');
					expect(res.body.data.clinics.length).to.greaterThan(0);
					expect(res.body.metal.pageNumber.length).to.equal(1);
				}));
	});
});