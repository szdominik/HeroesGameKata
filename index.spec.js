'use strict';

var request = require('supertest');
var app = require('./index');

describe('Heroes of Might and Magic WebServer', function() {
	var checkHeroes = function(expectedHeroes, done) {
		request(app)
			.get('/heroes')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, {
				heroes: expectedHeroes
			}, done);
	};

	var postHero = function(hero, cb) {
		request(app)
			.post('/heroes')
			.send(hero)
			.set('Accept', 'application/json')
			.end(cb);
	};

	describe('GET /heroes', function() {
		it('should return an empty array if there is no hero', function(done) {
			checkHeroes([], done);
		});
	});
	
	describe('POST /heroes', function() {
		var aragorn = { type: 'warrior', hp: 20, weapon: 'sword' }
		var aragornWithId = { id: 1, type: 'warrior', hp: 20, weapon: 'sword' }
		var gandalf = { type: 'priest', hp: 30, weapon: 'wand' }
		var gandalfWithId = { id: 2, type: 'priest', hp: 30, weapon: 'wand' }
		
		beforeEach(function(done) {
			request(app).delete('/heroes').end(done);
		});
		
		it('should accept a new hero save request', function(done) {
			request(app)
				.post('/heroes')
				.send(aragorn)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(201, { id: 1 }, done);
		});
		
		it('should save the hero', function(done) {
			postHero(aragorn, function() {
				checkHeroes([aragornWithId], done);
			});
		});
		
		it('should save more than one hero with incrementally growing ids', function(done) {
			postHero(aragorn, function() {
				postHero(gandalf, function() {
					checkHeroes([aragornWithId, gandalfWithId], done);
				});
			});
		});
	});
	
	describe('DELETE /heroes', function() {
		it('should delete all of the heroes saved before', function() {
			postHero({ type: 'warrior', hp: 20, weapon: 'sword' }, function() {
				request(app)
					.delete('/heroes')
					.expect(200, [], done);
			});
		});
	});
	
	describe('GET /battle', function() {
		var gandalf = { type: 'priest', hp: 5}
		var balrog = { type: 'warrior', hp: 10}
	
		beforeEach(function(done) {
			request(app).delete('/heroes').end(done);
		});
	
		it('should accept the query string only with valid ids', function(done) {
			request(app)
				.get('/battle?hero1=1&hero2=2')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(404, { error: 1 }, done);
		});
		
		it('should play a battle between two heroes', function(done) {
			postHero(gandalf, function() {
				postHero(balrog, function() {
					request(app)
						.get('/battle?hero1=1&hero2=2')
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200, { winner_id: 1 }, done);
				});
			});
		});
	});
	
});
