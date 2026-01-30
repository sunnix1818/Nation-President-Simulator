let camX=0, camY=0, zoom=1;

function project(lon,lat){
return [
canvas.width/2 + (lon*8+camX)*zoom,
canvas.height/2 - (lat*8-camY)*zoom
];
}

let dragging=false, px,py;

canvas.onmousedown=e=>{
dragging=true; px=e.clientX; py=e.clientY;
};

onmouseup=()=>dragging=false;

onmousemove=e=>{
if(!dragging) return;
camX += (e.clientX-px)/zoom;
camY += (e.clientY-py)/zoom;
px=e.clientX; py=e.clientY;
drawWorld();
drawArmies();
};

canvas.onwheel=e=>{
zoom *= e.deltaY>0 ? 0.9 : 1.1;
drawWorld();
drawArmies();
};
