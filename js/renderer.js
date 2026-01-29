import { camera } from "./camera.js";

export function drawMap(ctx, geo, nations){
  ctx.setTransform(
    camera.zoom,
    0,
    0,
    camera.zoom,
    ctx.canvas.width / 2 + camera.x,
    ctx.canvas.height / 2 + camera.y
  );

  ctx.clearRect(-10000,-10000,20000,20000);

  geo.features.forEach(f=>{
    const owner = f.properties.name;
    ctx.fillStyle = nations[owner]?.color || "#555";
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1;

    ctx.beginPath();
    f.geometry.coordinates[0].forEach(([lon,lat],i)=>{
      const x = lon * 8;
      const y = -lat * 8;
      i ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });
}
