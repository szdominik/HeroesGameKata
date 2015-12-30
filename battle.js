'use strict';

function Battle(fstHero, sndHero) {
	while(this.winner == undefined)
	{
		this.battleRound(fstHero, sndHero)
		if(! this.isDead(sndHero))
			this.battleRound(sndHero, fstHero)
	}
}

Battle.prototype.battleRound = function (attacker, defender) {
	attacker.attack(defender);
	if(this.isDead(defender))
		this.setWinner(attacker);
}

Battle.prototype.isDead = function(hero) {
	return hero.getHP() <= 0
}

Battle.prototype.getWinner = function () {
	return this.winner;
}

Battle.prototype.setWinner = function(hero) {
	this.winner = hero;
}

module.exports = Battle;
