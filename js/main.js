//---Project Vera Ver-0.0.0 November 4, 2019
//---The Classes---
class Game{
	constructor(){
		this.battleResults={
			skill:null,
			damage:null,
			playerTurn:true
		},
		this.enemyList=[],
		this.turnOrder=[],
		this.gameOn=true,
		this.battleOn=true,
		this.validChoice=true
	}

	helpPage(){
		let help=document.createElement('div')
		console.log('Help Screen')
	}

	turnCheck(player,enemy){
		if (player.stats.dexterity<enemy.stats.dexterity){
			console.log('enemy goes first')
		}
		else console.log('player goes first')
	}

	createPlayer(){
		let player =new Character()
		player.isPlayer()
		return player
	}

	createEnemies(who, num){
		if (who=='boss'){
			let enemy=new Character()
			enemy.isMinotaur()
			this.enemyList.push(enemy)
		}
		if(who=='minion'){
			for (let i=0;i<num;i++){
				let enemy=new Character()
				enemy.isMinion()
				this.enemyList.push(enemy)
			}
		}
	}
	updateHealth(){

	}
	checkAlive(who){
		if (who.stats.health>0){
			return true
		}
		else return false
	}
	endBattle(who){
		alert(`${who.name} dead!`)
		this.battleOn=false
	}
}
class Character{
	constructor(){
	this.usedSkill=null
	}
	showHealth(){
		let healthBar=document.createElement('progress')
		healthBar.classList.add('health',this.name)
		healthBar.setAttribute('value',this.stats.health)
		healthBar.setAttribute('max',this.stats.maxHP)
		let outerGrid=document.querySelector('.outerGrid')
		outerGrid.appendChild(healthBar)
	}
	isPlayer(){
		this.name='Viran',
		this.hero=true,
		this.guard=false,
		this.stats={
			maxHP:100,
			health:100, 
			strength:10,
			magic:10,
			dexterity:10,
		},
		this.equipment={
			weapon:{
				name:"Iron Sword",
				minDmg:5,
				maxDmg:10
			},
			items:{
				hPot:{
					name:"Health Potion",
					heal:30,
					amount:3
				}
			}
		},
		this.skills={
			guard:{
				name:"Guard",
				type:"guard"
			},
			hPot:{
				name:"Health Potion",
				type:"heal"
			},
			skill1:{
				name:"Slash",
				type:"physical",
				multi:1
			},
			skill2:{
				name:"Fireball",
				type:"magic",
				multi:1.5,
				cooldown:0,
				maxCooldown:3
			}
		},
		this.sprites={
			idle:null,
			running:null,
			weaponAtk:null,
			magicAtk:null,
			hurt:null,
			dead:null
		}
	}
	isMinotaur(){
		this.name='Minotaur',
		this.hero=false,
		this.usedSkill=null,
		this.stats={
			maxHP:150,
			health:150,
			strength:12,
			dexterity:9
		},
		this.equipment={
			weapon:{
				name:"Iron Axe",
				minDmg:5,
				maxDmg:10
			}
		},
		this.skills={
			ready:false,
			cooldown:3,
			maxCooldown:3,
			skill1:{
				name:"Bash",
				type:"physical",
				multi:1,
			},
			skill2:{
				name:"Crush",
				type:"physical",
				multi:2,
			}
		}
		this.sprites={
			idle:null,
			running:null,
			weaponAtk:null,
			magicAtk:null,
			hurt:null,
			dead:null
		}		
	}	

	isMinion(){
		this.name='Minion'
	}

	dealDamage(skill){
		let damage=0;
		if (skill.type=='physical'){
			damage=(randomNum(this.equipment.weapon.minDmg,this.equipment.weapon.maxDmg)+this.stats.strength)*skill.multi
			this.skills.skill2.cooldown--
		}
		else if (skill.type=='magic'){
			damage=(randomNum(this.stats.magic,this.stats.magic/2)+this.stats.magic)*skill.multi
			skill.cooldown=skill.maxCooldown
		}
		else if (skill.type=="guard"){
			this.guard=true
			this.skills.skill2.cooldown--
		}
		else if (skill.type=="heal"){
			this.stats.health=this.stats.health+this.equipment.items.hPot.heal
			this.equipment.items.hPot.amount--
			this.skills.skill2.cooldown--
		}
		return damage
	}

	takeDamage(damage){
		let newHealth=this.stats.health-damage
		this.stats.health=newHealth
	}

	hitDodge(){
		let result =randomNum(this.stats.dexterity,this.stats.dexterity/2)
		return result

	}		
}
//---The Buttons---
	//---Skill 1 button---
let skill1=()=>{
	if (game.battleOn){
		player.usedSkill=player.skills.skill1
		turnResult(player,enemy,hitResult(player,enemy))
        textUI.updateUI(textUI.right)
		if (game.checkAlive(enemy)){
			setTimeout(()=>{enemyTurn(enemy,player)},2.5*1000)
		}
		else game.endBattle(enemy)	
	}
}	

let skill2=()=>{
	if(game.battleOn){
		player.usedSkill=player.skills.skill2
		console.log(player.usedSkill.cooldown)
		if (player.usedSkill.cooldown<=0){
			turnResult(player,enemy,hitResult(player,enemy))
      		textUI.updateUI(textUI.right)
			if (game.checkAlive(enemy)){
				setTimeout(()=>{enemyTurn(enemy,player)},2.5*1000)
			}
			else game.endBattle(enemy)	
		}
		else{
			game.battleResults.skill="On cooldown "+player.usedSkill.cooldown+" turns left"
			game.battleResults.damage=""
			textUI.updateUI(textUI.left)
		}
	}
}

let setGuard=()=>{
	if (game.battleOn){
		player.usedSkill=player.skills.guard
		turnResult(player,enemy,true)
		game.battleResults.skill="Guard"
		game.battleResults.damage=""
		textUI.updateUI(textUI.left)
		if (game.checkAlive(enemy)){
			setTimeout(()=>{enemyTurn(enemy,player)},2.5*1000)
		}
		else game.endBattle(enemy)	
	}
}	

let drinkHPot=()=>{
	if (game.battleOn){
		player.usedSkill=player.skills.hPot
		if (player.equipment.items.hPot.amount>0){
			turnResult(player,enemy,true)
			game.battleResults.skill=player.usedSkill.name
			game.battleResults.damage="+"+player.equipment.items.hPot.heal
			textUI.updateUI(textUI.left)
       		updateHPot()
			if (game.checkAlive(enemy)){
				setTimeout(()=>{enemyTurn(enemy,player)},2.5*1000)
			}
			else game.endBattle(enemy)
		}
		else{
			game.battleResults.skill="Out of health potions!"
			game.battleResults.damage=""
			textUI.updateUI(textUI.left)

		}
	}		
}	
//---The Functions---

let randomNum=function(mina, maxa){
	let min = Math.ceil(mina);
  	let max = Math.floor(maxa)+1;
  	let result =(Math.floor(Math.random() * (max - min)) + min)
  	return result
}

let hitResult=function(attacker,defender){
	let hitResult = attacker.hitDodge() > defender.hitDodge()
	if (hitResult){
		return true
	}
	else{
		return false	
	} 
}
let turnResult= function(attacker,defender,hitResult){
	game.battleResults.skill=attacker.usedSkill.name
	if (hitResult){
		let damage=attacker.dealDamage(attacker.usedSkill,defender)
		if(defender.guard==true){
			damage/=2
			defender.guard=false
		}		
		defender.takeDamage(damage,defender)
		game.battleResults.damage=damage
	}
	else{
		game.battleResults.damage='Miss'
	}
	console.log("player "+player.stats.health)	
	console.log("enemy "+enemy.stats.health)
}

let enemyTurn=function(attacker,defender){
	if (attacker.skills.cooldown>1){
		attacker.usedSkill=attacker.skills.skill1
		turnResult(attacker,defender,hitResult(attacker,defender))
		attacker.skills.cooldown--
		// leftDamageUI()
		textUI.updateUI(textUI.left)
		if (!game.checkAlive(player)){
			game.endBattle(player)
		}

	}
	else if (attacker.skills.ready){
		attacker.usedSkill=attacker.skills.skill2
		turnResult(attacker,defender,true)
		attacker.skills.ready=false
		attacker.skills.cooldown=attacker.skills.maxCooldown
		textUI.updateUI(textUI.left)
		// leftDamageUI()
		if (!game.checkAlive(player)){
			game.endBattle(player)
		}
	}
	else{
		attacker.skills.ready=true
		game.battleResults.skill="The "+attacker.name+ " is rearing up for a big hit!"
		game.battleResults.damage=""
		textUI.updateUI(textUI.right)
		// rightDamageUI()
		if (!game.checkAlive(player)){
			game.endBattle(player)
		}
	}
}
//---The Setup---
let game=new Game()
let player=new Character()
player.isPlayer()
game.createEnemies('boss',1)
let enemy=game.enemyList[0]
enemy.showHealth()
let help=document.querySelector('.help')
help.addEventListener('click',game.helpPage)
