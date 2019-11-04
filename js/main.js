//---Project Vera Ver-0.0.0 November 4, 2019
//---The Classes---
class Game{
	constructor(){
		this.damage=0
		this.turnPause=false
	}
	helpPage(){
		let help=document.createElement('div')
		console.log('Help Screen')
	}
	turnOrder(player,enemy){
		if (player.agility<enemy.agility){
			console.log('enemy goes first')
		}
		else console.log('player goes first')
	}
	takeDamage(who){
		let newHealth=who.health-this.damage
		who.health=newHealth
		this.damage=0
		console.log(who.health)
		}
}
class Player{
	constructor(){
		this.name='Viran',
		this.health=100, 
		this.strength=10,
		this.intelligence=10,
		this.agility=10,
		this.hPot=5
		this.skill1={
			name:"Slash",
			multi:1,
		},
		this.skill2={
			name:"Fireball",
			multi:1.5
		}
	}
	dealDamage(type){
		if (type=='weapon'){
			return Math.ceil(((Math.random()*Math.floor(10))+(this.strength))*this.skill1.multi)
		}
		else if (type=='magic'){
			return Math.ceil(((Math.random()*Math.floor(10))+(this.intelligence))*this.skill2.multi)

		}
	}	
	useSkill1(def){
		if (hitOrMiss(this.agility,def.agility)){
			console.log(this.skill1.name + "!")
			game.damage=this.dealDamage('weapon')
		}
		else{
			console.log('Miss!')
		}
	}
	useSkill2(def){
		if (hitOrMiss(this.agility,def.agility)){
			console.log(this.skill2.name + "!")
			game.damage=this.dealDamage('magic')
		}
		else{
			console.log('Miss!')
		}
	}
	guard(){
		console.log('Guard')
	}
	usePot(){
		console.log('Use pot')
	}
}
class Enemy{
	constructor(name){
		this.name=name,
		this.health=200,
		this.strength=12,
		this.agility=6
	}
	dealDamage(type){
		if (type=='weapon'){
			return Math.ceil(((Math.random()*Math.floor(10))+(this.strength))*this.skill1.multi)
		}
		else if (type=='magic'){
			return Math.ceil(((Math.random()*Math.floor(10))+(this.intelligence))*this.skill2.multi)

		}
	}		
}
//---The Functions---

let hitOrMiss=function(atk,def){
	//Attacker's acc
	let atkRand=Math.ceil((Math.random()*Math.floor(10)));
	atkAcc=atkRand+(atk/2)
	//Defender' dodge
	let defRand=Math.ceil((Math.random()*Math.floor(10)));
	defDodge=defRand+(def/2)
	if (atkAcc>defDodge){
		return true
	}
	else{
		return false
	}
}

let attackPopup=function(skill){
	let newP=document.createElement('p')
	let container=document.querySelector('.innerGrid')
	newP.innerText=skill.name+"!"
	newP.classList="popup"
	newP.style['grid-area']='5/5/5/5'
	newP.style['text-align']='center'
	container.appendChild(newP)
	container=document.querySelector('.innerGrid')
}

//---The Setup---
let player= new Player()
let enemy=new Enemy('Minotaur')
let game=new Game()
let help=document.querySelector('.help')
help.addEventListener('click',game.helpPage)
let pSkill1=document.querySelector('.pSkill1')
pSkill1.addEventListener('click',function(){
	if (!game.turnPause){
		player.useSkill1(enemy)
		game.takeDamage(enemy)
		game.turnPause=true
		setTimeout(()=>{game.turnPause=false},1*1000)
	}
})
let pSkill2=document.querySelector('.pSkill2')
pSkill2.addEventListener('click',function(){
	player.useSkill2(enemy)
	game.takeDamage(enemy)
})






















