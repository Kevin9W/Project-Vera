//---The Setup---
let canvas = document.querySelector('.canvas');
let context = canvas.getContext('2d');
class Button{
    constructor(x,y,w,h,r){
        this.x=x,
        this.y=y,
        this.w=w,
        this.h=h,
        this.r=r
    }
    makeButton() {
        if (this.w < 2 * this.r) this.r = this.w / 2;
        if (this.h < 2 * this.r) this.r = this.h / 2;
        context.beginPath();
        context.moveTo(this.x+this.r, this.y);
        context.arcTo(this.x+this.w, this.y,   this.x+this.w, this.y+this.h, this.r);
        context.arcTo(this.x+this.w, this.y+this.h, this.x,   this.y+this.h, this.r);
        context.arcTo(this.x,   this.y+this.h, this.x,   this.y,   this.r);
        context.arcTo(this.x,   this.y,   this.x+this.w, this.y,   this.r);
        context.fillStyle = '#FFFFFF'; 
        context.fillStyle = 'rgba(225,225,225,0.5)';
        context.fill(); 
        context.lineWidth = 2;
        context.strokeStyle = '#000000'; 
        context.stroke();
        context.fillStyle = '#000000';
        context.closePath();
    }
}
//---Skill 1---
let skill1Button=new Button(515,550,100,50,5)
skill1Button.makeButton()
context.font = '16pt Cinzel';
context.fillStyle = '#000000';
context.fillText('Slash', 535, 581);
//---Skill 2---
let skill2Button=new Button(665,550,100,50,5)
skill2Button.makeButton()
context.font = '16pt Cinzel';
context.fillStyle = '#000000';
context.fillText('Fireball', 670, 581);
//---Skill 2---
let guardButton=new Button(590,605,100,50,5)
guardButton.makeButton()
context.font = '16pt Cinzel';
context.fillStyle = '#000000';
context.fillText('Guard', 602, 636);
//---Skill 2---
let hPotButton=new Button(590,660,100,50,5)
hPotButton.makeButton()
context.font = '16pt Cinzel';
context.fillStyle = '#000000';
context.fillText('Health', 600, 682);
context.fillText('Potion', 600, 702);
let hPotAmount=new Button(690,685,25,25,12)
hPotAmount.makeButton()
updateHPot=()=>{
    context.clearRect(690,685,25,25);
    let hPotAmount=new Button(690,685,25,25,12)
    hPotAmount.makeButton()
    context.font = '16pt Cinzel';
    context.fillStyle = '#000000';
    context.fillText(player.equipment.items.hPot.amount, 698, 704);
}
updateHPot()





















//---Skill 1---
// let skill1Button = {
//     x:515,
//     y:550,
//     width:100,
//     height:50
// };
// context.beginPath();
// context.rect(515, 550, 100, 50); 
// context.fillStyle = '#FFFFFF'; 
// context.fillStyle = 'rgba(225,225,225,0.5)';
// context.fill(); 
// context.lineWidth = 2;
// context.strokeStyle = '#000000'; 
// context.stroke();
// context.font = '16pt Cinzel';
// context.fillStyle = '#000000';
// context.fillText('Slash', 535, 581);
// context.closePath();
// //---Skill 2---
// let skill2Button = {
//     x:665,
//     y:550,
//     width:100,
//     height:50
// };
// context.beginPath();
// context.rect(665, 550, 100, 50); 
// context.fillStyle = '#FFFFFF'; 
// context.fillStyle = 'rgba(225,225,225,0.5)';
// context.fill(); 
// context.lineWidth = 2;
// context.strokeStyle = '#000000'; 
// context.stroke();
// context.font = '16pt Cinzel';
// context.fillStyle = '#000000';
// context.fillText('Fireball', 670, 581);
// context.closePath();
// //---Guard Skill---
// let guardButton = {
//     x:590,
//     y:605,
//     width:100,
//     height:50
// };
// context.beginPath();
// context.rect(590, 605, 100, 50); 
// context.fillStyle = '#FFFFFF'; 
// context.fillStyle = 'rgba(225,225,225,0.5)';
// context.fill(); 
// context.lineWidth = 2;
// context.strokeStyle = '#000000'; 
// context.stroke();
// context.font = '16pt Cinzel';
// context.fillStyle = '#000000';
// context.fillText('Guard', 602, 636);
// context.closePath();
//---Health Potion---
// let hPotButton = {
//     x:665,
//     y:550,
//     width:100,
//     height:50
// };
// context.beginPath();
// context.rect(665, 550, 100, 50); 
// context.fillStyle = '#FFFFFF'; 
// context.fillStyle = 'rgba(225,225,225,0.5)';
// context.fill(); 
// context.lineWidth = 2;
// context.strokeStyle = '#000000'; 
// context.stroke();
// context.font = '16pt Cinzel';
// context.fillStyle = '#000000';
// context.fillText('Fireball', 670, 581);
// context.closePath();
//---The Functions---
function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.w && pos.y < rect.y+rect.h && pos.y > rect.y
}
canvas.addEventListener('click', function(evt) {
    let mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos,skill1Button)) {
        console.log("Slash!");
    }
    else if(isInside(mousePos,skill2Button)){
        console.log("Fireball!");
    }
    else if(isInside(mousePos,guardButton)){
        console.log("Guard!");
    }   
    else if(isInside(mousePos,hPotButton)){
        console.log("Health Pot!");
        player.equipment.items.hPot.amount--
        updateHPot()
    }      
}, false);






