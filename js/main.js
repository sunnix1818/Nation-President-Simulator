import { drawMap } from "./renderer.js";
import { setPlayerData, updateUI } from "./ui.js";

const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const nations = await fetch("data/nations.json").then(r=>r.json());
const geo = await fetch("data/world.geo.json").then(r=>r.json());

const player = "Italy";
setPlayerData(nations);

geo.features.forEach(f=>{
  f.properties.owner = f.properties.ADMIN;
});

function loop(){
  drawMap(ctx, geo, nations);
  updateUI(player);
  requestAnimationFrame(loop);
}
loop();
