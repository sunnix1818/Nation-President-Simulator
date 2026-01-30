let playerNation = "Italia";

WORLD.forEach(n=>{
n.owner = n.name;
n.ownerColor = n.color;
});

function getNationByOwner(name){
return WORLD.filter(n=>n.owner===name);
}

function canAttack(target){
const owned = getNationByOwner(playerNation);
return owned.some(o=>o.neighbors.includes(target.name));
}

canvas.onclick = e=>{
const x=e.offsetX, y=e.offsetY;

WORLD.forEach(n=>{
if(pointInPoly(x,y,n.poly)){

// già tua
if(n.owner===playerNation) return;

// controllo confine
if(!canAttack(n)){
alert("Non confinante!");
return;
}

// conquista capitale?
const [cx,cy]=project(n.capital.lon,n.capital.lat);
if(Math.hypot(x-cx,y-cy)<10){
annexNation(n);
}else{
n.owner = playerNation;
n.ownerColor = "#2ecc71";
}

updateUI();
}
});

drawWorld();
};

function annexNation(n){
WORLD.forEach(t=>{
if(t.name===n.name){
t.owner = playerNation;
t.ownerColor = "#2ecc71";
}
});
}

function updateUI(){
document.getElementById("nation").textContent = playerNation;
document.getElementById("count").textContent =
getNationByOwner(playerNation).length;
}

drawWorld();
updateUI();
