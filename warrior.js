'use strict';

function Warrior(hp) {
	this.initHP(hp);
	this.type = 'warrior';
}

Warrior.prototype.getID = function() {
	return this.id;
}

Warrior.prototype.setID = function(id) {
	this.id = id;
}

Warrior.prototype.getHP = function () {
	return this.hp;
}

Warrior.prototype.setHP = function (hp) {
	this.hp = hp;
}

Warrior.prototype.getType = function() {
	return this.type;
}

Warrior.prototype.initHP = function(hp) {
	if(hp != undefined)
	{
		if (hp > 30)
			this.setHP(30);
		else
			this.setHP(hp);
	}
	else
		this.setHP(0);
		
	this.originalHP = this.getHP();
}

Warrior.prototype.attack = function(enemy) {
	enemy.setHP(enemy.getHP() - this.getHerosDamage(enemy.weapon));
}

Warrior.prototype.addWeapon = function(weapon) {
	this.weapon = weapon;
}

Warrior.prototype.getHerosDamage = function(enemyWeapon) {
	var weaponDamage = 1;
	if(this.weapon != undefined)
		weaponDamage = this.weapon.damage;
	
	var defense = 0;
	if(enemyWeapon != undefined)
		defense = enemyWeapon.defense;
		
	var damage = weaponDamage - defense
	return (damage > 0) ? damage : 0;
}

module.exports = Warrior;