let init = true;
let effect;
export function BlobMovement(ctx, blobObj) {
  if (init) {
    effect = new MetaBlobEffect(blobObj);
    effect.init(25);
    init = false;
  }

  effect.update();
  effect.draw(ctx);
}


class MetaBlobEffect {
  constructor(blobObj) {
    const {width, height, maxColor, minColor, rad, speedXMult, speedX} = blobObj
    this.width = width;
    this.height = height;
    this.maxColor= maxColor;
    this.minColor = minColor;
    this.rad = rad;
    this.speedXMult = speedXMult;
    this.speedX = speedX;
    this.metaballsArray = [];
  }
  init(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
      this.metaballsArray.push(new Blob(this));
    }
  }
  update(blobObj) {
    this.metaballsArray.forEach((metaball) => metaball.update());
  }
  draw(ctx, blobObj) {
    this.metaballsArray.forEach((metaball) => metaball.draw(ctx));
  }
}




class Blob {
  constructor(effect) {
    this.effect = effect;
    this.x = this.effect.width * (Math.random() * (0.9 - 0.1) - 0.1);
    this.y = this.effect.height * (Math.random() * (0.9 - 0.1) - 0.1);
    this.rad = Math.random() * this.effect.rad + 20;
    this.speedX = Math.random() - 0.5 ;
    this.speedY = Math.random() - 0.5* .75  ;
    this.angle = 0;
    this.va = Math.random() * 0.1 - 0.05;
    this.range = Math.random() * 20;
    this.color = Math.round(Math.random() * (this.effect.maxColor - this.effect.minColor) - this.effect.minColor);
  }

  update() {
    
      if (this.x < this.rad || this.x > this.effect.width - this.rad)
        this.speedX *= -1;
      if (this.y < this.rad || this.y > this.effect.height - this.rad)
        this.speedY *= -1;
      this.x += this.speedX;
      this.y += this.speedY;
    

    
  }
  draw(ctx) {
    
      ctx.beginPath();
      ctx.fillStyle = `hsl(${this.color}, 100%, 60%, 1)`;

      ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);

      ctx.fill();
  }
}

