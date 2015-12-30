'use strict';

var expect = require('chai').expect;

var Warrior = require('./warrior');
var Priest = require('./priest');
var Battle = require('./battle');

var Sword = require('./sword');
var Dagger = require('./dagger');
var Wand = require('./wand');

describe('Heroes of Might and Magic Backend', function() {
	describe('Basic functions', function() {
		it('should create a new hero', function() {
			var hero = new Warrior();
			expect(hero.getHP()).to.eql(0);
		});
		
		it('should create a new hero with the given hp', function() {
			var hero = new Warrior(20);
			expect(hero.getHP()).to.eql(20);
		});
		
		it('should create a new hero with 30 hp at most', function() {
			var hero = new Warrior(50);
			expect(hero.getHP()).to.eql(30);
		});
		
		it('should start a hero\'s attack to an another one who loose one hp', function() {
			var aragorn = new Warrior(10);
			var sauron = new Warrior(30);
			aragorn.attack(sauron);
			expect(aragorn.getHP()).to.eql(10);
			expect(sauron.getHP()).to.eql(29);
		});
		
		it('should start a battle between two heroes', function() {
			var aragorn = new Warrior(5);
			var nazgul = new Warrior(5);
			
			var battle = new Battle(aragorn, nazgul);
			
			expect(battle.getWinner()).to.eql(aragorn);
			expect(nazgul.getHP()).to.eql(0);
			expect(aragorn.getHP()).to.eql(1);
		});

		it('should give a weapon to the heroes to fight with it', function() {
			var aragorn = new Warrior(10);
			aragorn.addWeapon(new Sword());
			var orc = new Warrior(8);
			aragorn.attack(orc);
			
			expect(orc.getHP()).to.eql(1);
		});
		
		it('should give a weapon to the heroes to defend', function() {
			var aragorn = new Warrior(20);
			aragorn.addWeapon(new Sword());
			var sauron = new Warrior(30);
			sauron.addWeapon(new Wand());
			aragorn.attack(sauron);
			
			expect(sauron.getHP()).to.eql(24);
		});
		
		it('should create a priest who heals himself before an attack', function() {
			var gandalf = new Priest(5);
			var balrog = new Warrior(10);
			var battle = new Battle(gandalf, balrog);
			
			expect(battle.getWinner()).to.eql(gandalf);
			expect(balrog.getHP()).to.eql(0);
			expect(gandalf.getHP()).to.eql(5);
		});
	});
});