import { drawMap } from "./renderer.js";
import world from "../data/world.geo.json" assert { type: "json" };

const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.onresize = resize;

const nations = {
  Italia: { color:"#2ecc71" },
  Francia:{ color:"#3498db" },
  Germania:{ color:"#f1c40f" }
};

function loop(){
  drawMap(ctx, world, nations);
  requestAnimationFrame(loop);
}

loop();
