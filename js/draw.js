function drawWorld(){
ctx.clearRect(0,0,canvas.width,canvas.height);

WORLD.forEach(n=>{
ctx.fillStyle = n.ownerColor || "#444";
ctx.strokeStyle="#000";
ctx.lineWidth=2;

ctx.beginPath();
n.poly.forEach(([lon,lat],i)=>{
const [x,y]=project(lon,lat);
i?ctx.lineTo(x,y):ctx.moveTo(x,y);
});
ctx.closePath();
ctx.fill();
ctx.stroke();

// capitale
drawCity(n.capital,true);

// città
n.cities.forEach(c=>drawCity(c,false));
});
}

function drawCity(city,isCapital){
const [x,y]=project(city.lon,city.lat);
ctx.fillStyle = isCapital ? "#ff4444" : "#ffffff";
ctx.beginPath();
ctx.arc(x,y,isCapital?6:4,0,Math.PI*2);
ctx.fill();
}

function pointInPoly(px,py,poly){
let inside=false;
for(let i=0,j=poly.length-1;i<poly.length;j=i++){
const [xi,yi]=project(...poly[i]);
const [xj,yj]=project(...poly[j]);
const hit=((yi>py)!=(yj>py)) &&
(px<(xj-xi)*(py-yi)/(yj-yi)+xi);
if(hit) inside=!inside;
}
return inside;
}
