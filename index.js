'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var Warrior = require('./warrior');
var Priest = require('./priest');
var Battle = require('./battle');

var Sword = require('./sword');
var Dagger = require('./dagger');
var Wand = require('./wand');

var heroes = [];

function saveHero(hero) {
	var newHero;
	if(hero.type == 'warrior')
		newHero = new Warrior(hero.hp);
	else
		newHero = new Priest(hero.hp);
	if(hero.weapon != undefined)
	{
		switch(hero.weapon) {
			case 'sword': newHero.addWeapon(new Sword()); break;
			case 'dagger': newHero.addWeapon(new Dagger()); break;
			case 'wand': newHero.addWeapon(new Wand()); break;
		}
	}
	newHero.setID(heroes.length + 1);
	
	heroes.push(newHero);
	return newHero.getID();
}

function jsonifyHeroes() {
	var jsonifiedHeroes = [];
	for(var i = 0; i < heroes.length; ++i)
	{
		var hero = {};
		hero.id = heroes[i].getID();
		hero.type = heroes[i].getType();
		hero.hp = heroes[i].getHP();
		if(heroes[i].weapon != undefined)
		{
			hero.weapon = heroes[i].weapon.name;
		}
		jsonifiedHeroes.push(hero);
	}
	return jsonifiedHeroes;
}

function checkId(heroId) {
	if(heroId != undefined)
		for(var i = 0; i < heroes.length; ++i)
			if(heroes[i].getID() == heroId)
				return true;
	return false;
}

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.status(200).send('The Heroes Might and Magic is ready to use!');
});

app.get('/heroes', function(req, res) {
	var heroesForResponse = jsonifyHeroes();
	res.status(200).send({ heroes: heroesForResponse });
});

app.post('/heroes', function(req, res) {
	res.status(201).send({ id: saveHero(req.body) });
});

app.delete('/heroes', function(req, res) {
	heroes = [];
	res.status(201).send({heroes: heroes});
});

app.get('/battle', function(req, res) {
	var hero1ID = req.query.hero1;
	var hero2ID = req.query.hero2;
	if(checkId(hero1ID) && hero1ID != hero2ID)
	{
		if(checkId(hero2ID))
		{
			var hero1, hero2;
			for(var i = 0; i < heroes.length; ++i)
			{
				if(heroes[i].getID() == hero1ID)
					hero1 = heroes[i];
				else if(heroes[i].getID() == hero2ID)
					hero2 = heroes[i];
			}
			var battle = new Battle(hero1, hero2);
			res.status(200).send({ winner_id: battle.getWinner().getID() });
		}
		else
			res.status(404).send({ error: hero2ID });
	}
	else
		res.status(404).send({ error: hero1ID });
});

app.listen(process.env.PORT || 3000, function () {
	console.log('Heroes of Might and Magic game is listening on port', this.address().port);
});

module.exports = app;