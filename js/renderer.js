import { camera } from "./camera.js";

export function drawMap(ctx, geo, nations){
  ctx.setTransform(camera.zoom,0,0,camera.zoom,ctx.canvas.width/2,ctx.canvas.height/2);
  ctx.clearRect(-5000,-5000,10000,10000);

  geo.features.forEach(f=>{
    const owner = f.properties.owner;
    ctx.fillStyle = nations[owner]?.color || "#444";
    ctx.beginPath();
    f.geometry.coordinates[0].forEach(([x,y],i)=>{
      i ? ctx.lineTo(x*10,-y*10) : ctx.moveTo(x*10,-y*10);
    });
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle="#000";
    ctx.stroke();
  });
}
