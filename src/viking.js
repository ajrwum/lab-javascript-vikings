// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }

  attack() {
    return this.strength;
  }

  receiveDamage(damage) {
    this.health -= damage;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
  }

  receiveDamage(damage) {
    this.health -= damage;
    if (this.health > 0)
      return `${this.name} has received ${damage} points of damage`;
    else return `${this.name} has died in act of combat`;
  }

  battleCry() {
    return 'Odin Owns You All!';
  }
}

// Saxon
class Saxon extends Soldier {
  receiveDamage(damage) {
    this.health -= damage;
    if (this.health > 0)
      return `A Saxon has received ${damage} points of damage`;
    else return `A Saxon has died in combat`;
  }
}

// War
class War {
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = [];
  }

  addViking(viking) {
    this.vikingArmy.push(viking);
  }

  addSaxon(saxon) {
    this.saxonArmy.push(saxon);
  }

  vikingAttack() {
    // choosing random viking within its army
    const randomVikingIdx = Math.floor(Math.random() * this.vikingArmy.length);
    const viking = this.vikingArmy[randomVikingIdx];
    // choosing random saxon within its army
    const randomSaxonIdx = Math.floor(Math.random() * this.saxonArmy.length);
    const saxon = this.saxonArmy[randomSaxonIdx];
    // calling receiveDamage method on this random saxon from damage = vikingStrength
    const attackResult = saxon.receiveDamage(viking.strength);
    // if dead after attack, removing soldier from its army
    if (this.saxonArmy[randomSaxonIdx].health <= 0)
      this.saxonArmy.splice(randomSaxonIdx, 1);
    // returning the result from receiveDamage
    return attackResult;
    // return this.runAttack(viking, saxon);
  }

  saxonAttack() {
    // choosing random saxon and viking within their respective army
    const randomSaxonIdx = Math.floor(Math.random() * this.saxonArmy.length);
    const saxon = this.saxonArmy[randomSaxonIdx];
    const randomVikingIdx = Math.floor(Math.random() * this.vikingArmy.length);
    const viking = this.vikingArmy[randomVikingIdx];
    // calling receiveDamage method on this random viking from damage = saxonStrength
    const attackResult = viking.receiveDamage(saxon.strength);
    // if dead after attack, removing soldier from its army
    if (this.vikingArmy[randomVikingIdx].health <= 0) this.vikingArmy.splice(randomVikingIdx, 1);
    // returning the result from receiveDamage
    return attackResult;
    // return this.runAttack(saxon, viking);
  }

  showStatus() {
    // testing saxonArmy size
    if (this.saxonArmy.length === 0)
      return `Vikings have won the war of the century!`;
    // testing vinkingArmy size
    if (this.vikingArmy.length === 0)
      return `Saxons have fought for their lives and survived another day...`;
    // testing if neither saxonArmy nor vikingArmy is empty
    if (this.saxonArmy.length >= 1 && this.vikingArmy.length >= 1)
      return `Vikings and Saxons are still in the thick of battle.`;
  }

  isViking(soldier) {
    console.log(`isViking - soldier`, soldier);
    if (typeof soldier.hasOwnProperty('battleCry')) return true;
    else return false;
  }

  isVikingDead(indexInArmy) {
    console.log(`isVikingDead - indexInArmy`, indexInArmy);
    if (this.isVikingArmyAllDead()) return true;
    return this.vikingArmy[indexInArmy].health <= 0;
  }
  
  isVikingArmyAllDead() {
    if (this.vikingArmy && this.vikingArmy.length === 0) return true;
    else return false;
  }
  
  isSaxonDead(indexInArmy) {
    console.log(`isSaxonDead - indexInArmy`, indexInArmy);
    if (this.isSaxonArmyAllDead()) return true;
    return this.saxonArmy[indexInArmy].health <= 0;
  }

  isSaxonArmyAllDead() {
    if (this.saxonArmy && this.saxonArmy.length === 0) return true;
    else return false;
  }

  removeViking(indexInArmy) {
    this.vikingArmy.splice(indexInArmy, 1);
  }

  removeSaxon(indexInArmy) {
    this.saxonArmy.splice(indexInArmy, 1);
  }

  runAttack(aggressor, defender) {
    // initializing result
    let attackResult = '';
    console.log(`aggressor`, aggressor);
    console.log(`defender`, defender);
    // - calling receiveDamage method on the defender from damage = aggressor strength
    attackResult = defender.receiveDamage(aggressor.attack());
    // - testing the battleCry method to define the type of soldier
    if (typeof defender.hasOwnProperty('battleCry')) {
      // console.log('attack on VIKING');
      const defenderIndex = this.vikingArmy.indexOf(defender);
      // - if dead after attack, removing soldier from its army
      if (this.isVikingDead(defenderIndex)) this.removeViking(defenderIndex);
    } else {
      // console.log('attack on SAXON');
      //find the index of defender
      const defenderIndex = this.vikingArmy.indexOf(defender);
      // - if dead after attack, removing soldier from its army
      if (this.isSaxonDead(defenderIndex)) this.removeSaxon(defenderIndex);
    }
    // returning the result from receiveDamage
    console.log(this.showStatus());
    return attackResult;
  }
}


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}
