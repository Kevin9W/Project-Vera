//---The Setup---
let canvas = document.querySelector('.canvas');
let context = canvas.getContext('2d');
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})(); 
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
let textUI={
    right:{
        side:'right',
        x:1000,
        y:200
    },
    left:{
        side:'left',
        x:200,
        y:200
    },
    updateUI:function(side){
        context.font = '16pt Cinzel, serif';
        context.textAlign=side.side
        context.fillStyle = '#deb821';
        let text=game.battleResults.skill+" "+game.battleResults.damage
        context.fillText(text, side.x, side.y);
        setTimeout(()=>{
            if (side.side=="right"){
                context.clearRect(side.x-(12*text.length),side.y-19,(12*text.length),22);
            }
            else{
                context.clearRect(side.x,side.y-19,(13*text.length),22);
            }
        },2*1000)
    } 
}
//---Skill 1---
let skill1Button=new Button(515,550,100,50,5)
skill1Button.makeButton()
context.font = '16pt Cinzel, serif';
context.fillStyle = '#000000';
context.fillText('Slash', 535, 581);
//---Skill 2---
let skill2Button=new Button(665,550,100,50,5)
skill2Button.makeButton()
context.font = '16pt Cinzel, serif';
context.fillStyle = '#000000';
context.fillText('Fireball', 670, 581);
//---Skill 2---
let guardButton=new Button(590,605,100,50,5)
guardButton.makeButton()
context.font = '16pt Cinzel, serif';
context.fillStyle = '#000000';
context.fillText('Guard', 602, 636);
//---Skill 2---
let hPotButton=new Button(590,660,100,50,5)
hPotButton.makeButton()
context.font = '16pt Cinzel, serif';
context.fillStyle = '#000000';
context.fillText('Health', 600, 682);
context.fillText('Potion', 600, 702);
let hPotAmount=new Button(690,685,25,25,12)
hPotAmount.makeButton()
updateHPot=()=>{
    context.clearRect(690,685,25,25);
    let hPotAmount=new Button(690,685,25,25,12)
    hPotAmount.makeButton()
    context.font = '16pt Crimson Text, serif';
    context.fillStyle = '#000000';
    context.fillText(player.equipment.items.hPot.amount, 698, 704);

}
updateHPot()

//---The Functions---
let getMousePos=function(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}


let isInside=function(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.w && pos.y < rect.y+rect.h && pos.y > rect.y
}
let noClick=()=>{
    canvas.removeEventListener('click', clickHere);
    setTimeout(()=>{
        clickReady()
    },4*1000)
}
let clickHere=function(evt){
        let mousePos = getMousePos(canvas, evt);
        if (isInside(mousePos,skill1Button)) {
            skill1()
        }
        else if(isInside(mousePos,skill2Button)){
            skill2()
        }
        else if(isInside(mousePos,guardButton)){
            setGuard()
        }   
        else if(isInside(mousePos,hPotButton)){
            drinkHPot();
        }
        noClick()
}
let clickReady=function(){
    canvas.addEventListener('click', clickHere);
}

clickReady()




