let playerNation="Italia";
let armies=[];
let stats=JSON.parse(JSON.stringify(NATION_STATS));

WORLD.forEach(n=>{
n.owner=n.name;
n.ownerColor=n.color;
});

function log(msg){
const d=document.getElementById("log");
d.innerHTML = msg+"<br>"+d.innerHTML;
}

function getOwned(name){
return WORLD.filter(n=>n.owner===name);
}

function canAttack(fromOwner,target){
return getOwned(fromOwner)
.some(t=>t.neighbors.includes(target.name));
}

canvas.onclick=e=>{
const x=e.offsetX,y=e.offsetY;

WORLD.forEach(n=>{
if(!pointInPoly(x,y,n.poly)) return;
if(n.owner===playerNation) return;
if(!canAttack(playerNation,n)){
log("❌ Non confinante");
return;
}

launchArmy(playerNation,n.name);
});
};

function launchArmy(from,targetName){
if(stats[from].army<10){
log("❌ Esercito insufficiente");
return;
}

stats[from].army -= 10;

const fromPoly=getOwned(from)[0].poly[0];
const to=WORLD.find(n=>n.name===targetName).capital;

armies.push({
x:fromPoly[0],
y:fromPoly[1],
tx:to.lon,
ty:to.lat,
owner:from,
target:targetName,
progress:0
});

log("⚔️ Attacco verso "+targetName);
}

function updateArmies(){
armies=armies.filter(a=>{
a.progress+=0.02;
if(a.progress>=1){
resolveBattle(a);
return false;
}
a.x += (a.tx-a.x)*0.05;
a.y += (a.ty-a.y)*0.05;
return true;
});
}

function resolveBattle(a){
const t=WORLD.find(n=>n.name===a.target);
const atk=stats[a.owner].army;
const def=stats[t.owner].army;

if(atk > def*0.6){
annexNation(t,a.owner);
log("🏴 "+a.owner+" conquista "+t.name);
}else{
log("🛡 Difesa riuscita "+t.name);
}
}

function annexNation(n,newOwner){
WORLD.forEach(t=>{
if(t.name===n.name){
t.owner=newOwner;
t.ownerColor="#2ecc71";
}
});
}

function aiTurn(){
WORLD.forEach(n=>{
if(n.owner===playerNation) return;
if(Math.random()<0.3){
const targets=n.neighbors
.map(x=>WORLD.find(w=>w.name===x))
.filter(t=>t.owner!==n.owner);
if(targets.length){
launchArmy(n.owner,targets[0].name);
}
}
});
}

function nextTurn(){
Object.keys(stats).forEach(k=>{
stats[k].gdp *= 1.01;
stats[k].army += 2;
});
aiTurn();
updateUI();
}

function updateUI(){
document.getElementById("nation").textContent=playerNation;
document.getElementById("count").textContent=getOwned(playerNation).length;
document.getElementById("gdp").textContent=Math.floor(stats[playerNation].gdp);
document.getElementById("army").textContent=Math.floor(stats[playerNation].army);
}

function saveGame(){
localStorage.setItem("save",JSON.stringify({WORLD,stats}));
log("💾 Salvato");
}

function loadGame(){
const s=JSON.parse(localStorage.getItem("save"));
Object.assign(WORLD,s.WORLD);
stats=s.stats;
log("📂 Caricato");
drawWorld();
}

function drawArmies(){
armies.forEach(a=>{
const [x,y]=project(a.x,a.y);
ctx.fillStyle="#ff0";
ctx.beginPath();
ctx.arc(x,y,5,0,Math.PI*2);
ctx.fill();
});
}

function loop(){
updateArmies();
drawWorld();
drawArmies();
requestAnimationFrame(loop);
}

updateUI();
drawWorld();
loop();
