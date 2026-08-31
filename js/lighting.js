// 暗幕専用Canvasでライトを切り抜き、マップ本体は透明化しない。
AILab.Lighting={
  layer:null,
  ensureLayer(width,height){
    if(!this.layer)this.layer=document.createElement("canvas");
    if(this.layer.width!==width||this.layer.height!==height){
      this.layer.width=width;
      this.layer.height=height;
    }
    return this.layer;
  },
  draw(ctx,canvas,p,c,power,boss){
    const scale=devicePixelRatio||1;
    const width=canvas.width/scale;
    const height=canvas.height/scale;
    const layer=this.ensureLayer(Math.ceil(width),Math.ceil(height));
    const light=layer.getContext("2d");
    const x=p.x-c.x;
    const y=p.y-c.y;

    light.clearRect(0,0,layer.width,layer.height);
    light.globalCompositeOperation="source-over";
    light.fillStyle=power?"rgba(0,5,12,.35)":"rgba(0,3,8,.68)";
    light.fillRect(0,0,layer.width,layer.height);
    light.globalCompositeOperation="destination-out";

    // ライト消灯時も足元は完全な暗闇にしない。
    const ambientRadius=p.flashlight&&p.battery>0?190:115;
    const ambient=light.createRadialGradient(x,y,24,x,y,ambientRadius);
    ambient.addColorStop(0,"rgba(0,0,0,1)");
    ambient.addColorStop(.55,"rgba(0,0,0,.72)");
    ambient.addColorStop(1,"rgba(0,0,0,0)");
    light.fillStyle=ambient;
    light.beginPath();
    light.arc(x,y,ambientRadius,0,Math.PI*2);
    light.fill();

    if(p.flashlight&&p.battery>0){
      const range=460;
      const cone=light.createRadialGradient(x,y,45,x,y,range);
      cone.addColorStop(0,"rgba(0,0,0,.95)");
      cone.addColorStop(.65,"rgba(0,0,0,.78)");
      cone.addColorStop(1,"rgba(0,0,0,0)");
      light.fillStyle=cone;
      light.beginPath();
      light.moveTo(x,y);
      light.arc(x,y,range,p.angle-.38,p.angle+.38);
      light.closePath();
      light.fill();
    }

    light.globalCompositeOperation="source-over";
    ctx.drawImage(layer,0,0,width,height);
    if(!power&&!boss&&Math.random()<.008){
      ctx.fillStyle="rgba(220,249,255,.025)";
      ctx.fillRect(0,0,width,height);
    }
  }
};
