//Global code

var canvas = document.getElementById("my-canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c = canvas.getContext("2d");
var lightAudio =document.getElementById("light-rain");
var heavyAudio =document.getElementById("heavy-rain");
var mediumAudio =document.getElementById("medium-rain");


function randIntInRange(x,y){
        return x+(Math.random()*(y-x));
}
function distance(x1,x2,y1,y2){
    return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}
var check=0;
var backgroundGradient=c.createLinearGradient(0,0,0,canvas.height);
backgroundGradient.addColorStop(0,"#3c5369");
backgroundGradient.addColorStop(1,"#697a8c");
var g=1;
var minidrops=[];
var raindrops=[];
var mouse ={
    x:canvas.width/2,y:0
}
var ff=0;
var fy=10;
var percentOfScreeny=0;
var fx=0;
var percentOfScreenx=50;
lightAudio.loop=true;
heavyAudio.loop=true;
mediumAudio.loop=true;

window.addEventListener("mousemove",function(event){
mouse.x=event.x;
mouse.y=event.y;
if(check==0){
if(event.y>0&&event.y<(canvas.height-70)*(1/3)){
lightAudio.play();
heavyAudio.pause();
mediumAudio.pause();
}
else if(mouse.y>=(canvas.height-70)*(1/3)&&mouse.y<(canvas.height-70)*(2/3)){
lightAudio.pause();
heavyAudio.pause();
mediumAudio.play();
}
else{
    lightAudio.pause();
    heavyAudio.play();
    mediumAudio.pause();
}

}
});
window.addEventListener("click",()=>{
    check=0;
    if(mouse.y>=0&&mouse.y<(canvas.height-70)*(1/3)){
    lightAudio.play();
    }
    else if(mouse.y>=(canvas.height-70)*(1/3)&&mouse.y<(canvas.height-70)*(2/3)){
mediumAudio.play();
    }
    else{
        heavyAudio.play();
    }
    
});

window.addEventListener("dblclick",function(){
    check=1;
    lightAudio.pause();
    heavyAudio.pause();
    mediumAudio.pause();
})
//End of Global Code
//Code For Ball

function Ball(x,y,dx,dy){
    this.dx=dx;
    this.x=x;
    this.y=y;
    this.dy=dy;
    this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,40,0,Math.PI*2);
        c.fillStyle="black"
        c.strokeStyle="black";
        c.stroke();
        c.fill();
        
    }
    this.update=()=>{
        this.draw();
        if((this.x+this.dx>canvas.width-40)||this.x+this.dx<40){
            this.dx=-this.dx*0.3;
        }
        
        if(this.y+this.dy+g>canvas.height-110){
            this.dy=-this.dy*0.3
        }
        else{
            this.dy+=g;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        
    }
}
var key;
var dxx=0;
var dyy=0;
window.addEventListener("keydown",function(event){
    
    key =event.key;

 if(key=="ArrowRight"||key=="d"){
    //  if(dxx<=5){
    //  dxx+=1;
    //  }
    // }
    dxx=5;
 }
      if(key=="ArrowLeft"||key=="a"){
    //  if(dxx>=-5){
    //  dxx-=1;
    //  }
    dxx=-5;
    }
    if(key=="ArrowUp"||key=="w"){
        dyy=-20;
        ball.dy=dyy;
    }

     
 
});
window.addEventListener("keyup",function(event){
console.log(event.key);
if(event.key=="ArrowRight"||event.key=="ArrowLeft"||key=="a"||key=="d"){
    // if(dxx>0){
    //     dxx-=1;
    // }
    dxx=0;
}
})

var ball =new Ball(canvas.width/2,canvas.height-110,0,0);
window.addEventListener("resize",function(){
    canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
ball.x=canvas.width/2;
ball.y=canvas.height-110

});
//End of code for ball


//Code for minidrops
function MiniDrops(x,y,dx,dy){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.ttl=80;
    this.opacity=1;
    this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y-0.5,0.5,0,Math.PI*2);
        c.fillStyle=`rgba(255,255,255,${this.opacity})`;
        c.strokeStyle=`rgba(255,255,255,${this.opacity})`;
        c.stroke();
        c.fill();
        c.closePath();
    }
    this.update=function(){
        this.draw();
        this.x+=this.dx;
        this.y+=this.dy;
        if(this.y+this.dy+g>canvas.height-70){
            this.dy=-this.dy*0.9;
        }
        else{
            this.dy+=g;
        }
    }
}

//Code for individual raindrop
function RainDrop(x,y,l,dx,dy){
this.x =x;
this.y=y;
this.l=l;
this.dx=dx;
this.dy=dy;
this.opacity=(this.dy/80)+0.5;
this.dis=distance(this.x,ball.x,this.y,ball.y);
this.angle=Math.atan(this.dy/this.dx);
this.draw=function(){
    c.beginPath();
    c.moveTo(this.x,this.y);
    c.lineTo(this.x+(this.l*Math.cos(this.angle)),this.y+(this.l*Math.sin(this.angle)));
    c.strokeStyle=`rgba(255,255,255,${this.opacity})`;
    c.stroke();
    c.closePath();
}
this.update=function(){
    this.draw();
    this.x+=this.dx;
    this.y+=this.dy;
    if(this.y+this.dy>canvas.height-70){
        for(var i=0;i<1;i++){
            var xx=this.x;
            var yy=canvas.height-70;
            var dxx=(Math.random()-0.5)*2;
            var dyy=-((Math.random()*3)+5);
            var drop=new MiniDrops(xx,yy,dxx,dyy);
            minidrops.push(drop);
        }
    }
    this.dis=distance(this.x,ball.x,this.y,ball.y);
    if(this.dis<40){
         for(var i=0;i<1;i++){
            var xx=this.x;
            var yy=this.y;
            var dxx=(Math.random()-0.5)*2;
            var dyy=-((Math.random()*3)+5);
            var drop=new MiniDrops(xx,yy,dxx,dyy);
            minidrops.push(drop);
        }
    }
}
}

//End of code for individual raindrop

//Creating raindrops

function init(n){
    
     for(var i =0;i<n;i++){
          var x=randIntInRange(-500,(canvas.width+300));
          var y=(Math.random()-1)*canvas.height;
           var dx=fx;
           var dy=Math.random()*fy+fy;
        
          var l=Math.random()*10+20;
          var rainDrop=new RainDrop(x,y,l,dx,dy);
          raindrops.push(rainDrop);
    }
    
}

//End of creating raindrops

//Animate function
var count=0;
var factor=5;
 function animate(){
    
     requestAnimationFrame(animate)
     c.fillStyle=backgroundGradient;
     c.fillRect(0,0,canvas.width,canvas.height);
     c.fillStyle="#3c5369";
     c.fillRect(0,canvas.height-70,canvas.width,70);
     if(count==0||count%factor==0){
     percentOfScreeny=(mouse.y/canvas.height)*100;
          percentOfScreenx=(mouse.x/canvas.width)*100;

      fy=(percentOfScreeny/100+1)*10;
      fx=((percentOfScreenx-50)/100)*8;
      init(Math.floor(Math.random()*50)+25);
      if(mouse.y>=0&&mouse.y<(canvas.height-70)*(1/3)){
          ff=15;
      }
      else if(mouse.y>=(canvas.height-70)/3&&mouse.y<(canvas.height-70)*(2/3)){
          ff=10;
      }
      else{
          ff=5;
      }
    factor=Math.floor(Math.random()*ff+ff);
    }
   for(var i=0;i<raindrops.length;i++){
       if((raindrops[i].y+raindrops[i].dy-5>canvas.height-70)||raindrops[i].dis<40){
           raindrops.splice(i,1);
           i=i-1;
       }
       else{
           raindrops[i].update();
       }
   }
   for(var i=0;i<minidrops.length;i++){
     if(minidrops[i].ttl>=0){
         minidrops[i].update();
         minidrops[i].ttl-=1;
         minidrops[i].opacity-=0.02;
 }
 else{
     minidrops.splice(i,1);
     i-=1;
 }
   }
count+=1;


ball.dx=dxx;

ball.update();

 }
 animate();
//End of code