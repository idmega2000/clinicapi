import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import url from 'server';

chai.use(chaiHttp);

describe('API endpoint for the home endpoints', () => {
	describe('Search for unsettled transactions', () => {

		it('it should return a failed record if unknown route is passed',
			() => chai.request(url)
				.get('/api/v1/abc')
				.type('json')
				.then((res) => {
					expect(res).to.have.status(404);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('Route does not exist');
				}));
		it('it should return a failed record if invalid json object is passed',
			() => chai.request(url)
				.get('/api/v1')
				.send('{"invalid"}')
				.type('json')
				.then((res) => {
					console.log(res.body);
					expect(res).to.have.status(400);
					expect(res.body).to.be.an('Object');
					expect(res.body.responseMessage).to.equal('Invalid JSON');
				}));

		it('it should return success when user access home',
        () => chai.request(url)
            .get('/')
            .type('json')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('Object');
                expect(res.body.responseMessage).to.equal('Welcome to Clinic API');
            }));

		it('it should return success when user access api v1 home',
        () => chai.request(url)
            .get('/api/v1')
            .type('json')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('Object');
                expect(res.body.responseMessage).to.equal('Welcome to Clinic API version 1');
            }));
	});
});