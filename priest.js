'use strict'

var Warrior = require('./warrior')
	, inherits = require('util').inherits
	;

function Priest(hp) {
	Warrior.call(this);
	this.initHP(hp);
	this.type = 'priest';
}

inherits(Priest, Warrior);

Priest.prototype.attack = function(enemy) {
	this.heal();
	enemy.setHP(enemy.getHP() - this.getHerosDamage(enemy.weapon));
}

Priest.prototype.heal = function() {
	var hp = this.getHP();
	if(hp < this.originalHP)
		this.setHP(hp + 1);
}

module.exports = Priest;