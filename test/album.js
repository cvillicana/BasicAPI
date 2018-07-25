//During the test the env variable is set to test
process.env.NODE_ENV = 'dev';

let mongoose = require("mongoose");
let Album = require('../models/artist');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Albums', () => {
	beforeEach((done) => {
		Album.remove({}, (err) => {
		   done();
		});
	});

  describe('/GET albums', () => {
	  it('it should GET all the albums', (done) => {
			chai.request(server)
		    .get('/v1/albums')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });

	describe('/POST artist', () => {
	  it('it should not POST an artist without artist name', (done) => {
	  	let artist = {
	  		images:[{url: 'https://i.ytimg.com/vi/_FrOQC-zEog/hqdefault.jpg'}],
        genres:['rock']
	  	}
			chai.request(server)
		    .post('/v1/artists')
		    .send(artist)
		    .end((err, res) => {
			  	res.should.have.status(400);
			  	res.body.should.have.property('error');
		      done();
		    });
	  });
	  it('it should POST an artist ', (done) => {
	  	let artist = {
        name: "Pink Floyd",
        identifier: "pinkfloyd",
        images:[{url: 'https://i.ytimg.com/vi/_FrOQC-zEog/hqdefault.jpg'}],
        genres:['rock']
	  	}
			chai.request(server)
		    .post('/v1/artists')
		    .send(artist)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Artist successfully added!');
			  	res.body.artist.should.have.property('name');
			  	res.body.artist.should.have.property('images');
			  	res.body.artist.should.have.property('genres');
		      done();
		    });
	  });
  });

});
