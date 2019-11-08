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
let textUI={
    right:{
        side:'right',
        x:1090,
        y:100
    },
    left:{
        side:'left',
        x:200,
        y:100
    },
    center:{
        side:'center',
        x:640,
        y:400
    },
    updateUI:function(side){
        context.font = '16pt Cinzel, serif';
        context.textAlign=side.side
        context.fillStyle = '#deb821';
        let text=game.battleResults.skill+" "+game.battleResults.damage
        context.fillText(text, side.x, side.y);
        setTimeout(()=>{
            if (side.side=="right"){
                context.clearRect(side.x-(12*text.length),side.y-19,(13*text.length),22);
            }
            else if (side.side=="left"){
                context.clearRect(side.x,side.y-19,(13*text.length),22);
            }
        },2*1000)
    } 
}

//---Sprite Animations---
let heroImage= new Image();
heroImage.src="css/assets/myIdle.png"
let enemyImage= new Image();
enemyImage.src="css/assets/undead_attack.png"
let heroSprite=sprite({
    context:context,
    width:600,
    height:600,
    image:heroImage
});
let enemySprite=sprite({
    context:context,
    width:600,
    height:600,
    image:enemyImage
});
function sprite (options) {         
    let that = {};          
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    frameIndex=0
    tickCount=0
    ticksPerFrame=options.ticksPerFrame||0;
    that.render = function (type) {
        if (type=='hero'){
            that.context.drawImage(
                that.image,
                0,
                0,
                that.width,
                that.height,
                0,
                50,
                that.width,
                that.height);
        }
        else{
            that.context.drawImage(
                that.image,
                0,
                0,
                that.width,
                that.height,
                680,
                225,
                that.width,
                that.height);
        }
    }
    return that;

}
window.onload=function(){
    heroSprite.render('hero');
    enemySprite.render('enemy');
}
//---Skill 1---
let skill1Button=new Button(434,660,100,50,5)
skill1Button.makeButton()
context.font = '16pt Cinzel, serif';
context.fillStyle = '#000000';
context.fillText('Slash', 453, 691);
//---Skill 2---
let skill2Button=new Button(538,660,100,50,5)
skill2Button.makeButton()
context.font = '16pt Cinzel, serif';
context.fillStyle = '#000000';
context.fillText('Fireball', 541, 691);
//---Skill 2---
let guardButton=new Button(642,660,100,50,5)
guardButton.makeButton()
context.font = '16pt Cinzel, serif';
context.fillStyle = '#000000';
context.fillText('Guard', 655, 691);
//---Skill 2---
let hPotButton=new Button(746,660,100,50,5)
hPotButton.makeButton()
context.font = '16pt Cinzel, serif';
context.fillStyle = '#000000';
context.fillText('Health', 756, 682);
context.fillText('Potion', 756, 702);
let hPotAmount=new Button(846,685,25,25,12)
hPotAmount.makeButton()
updateHPot=()=>{
    context.clearRect(846,685,25,25);
    let hPotAmount=new Button(846,685,25,25,12)
    hPotAmount.makeButton()
    context.font = '16pt Crimson Text, serif';
    context.fillStyle = '#000000';
    context.fillText(player.equipment.items.hPot.amount, 854, 704);

}
updateHPot()
//---Rounds---
let rounds=new Button(620,50,40, 40,20)
rounds.makeButton()
updateRounds=()=>{
    context.clearRect(620,50,40,40);
    let hPotAmount=new Button(620,50,40,40,20)
    hPotAmount.makeButton()
    context.font = '18pt Crimson Text, serif';
    context.textAlign='center'
    context.fillStyle = '#000000';
    context.fillText(game.rounds, 640, 77);
}
updateRounds()
context.font = '16pt Cinzel, serif';
context.fillStyle = '#000000';
context.fillText('Round', 640, 40);
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
    if (game.warning){
        setTimeout(()=>{
            clickReady()
        },2*1000)
        game.warning=false
    }
    else{
        setTimeout(()=>{
            clickReady()
        },4*1000)
    }
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




