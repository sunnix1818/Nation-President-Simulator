const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");

function resize(){
canvas.width = innerWidth;
canvas.height = innerHeight;
}
resize();
onresize = resize;

function project(lon,lat){
return [
canvas.width/2 + lon*8,
canvas.height/2 - lat*8
];
}
