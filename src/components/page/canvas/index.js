import { useEffect, useRef } from "react";
import * as S from "./styles";

export default function Canvas() {
  const cvs = useRef();
  let canvas;
  let ctx;

  class Player {
    constructor(x, y, radius, color, canvas, ctx) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.canvas = canvas;
      this.ctx = ctx;
    }

    draw() {
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  }

  class Projectile {
    constructor(x, y, radius, color, vellocity, canvas, ctx) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.vellocity = vellocity;
      this.canvas = canvas;
      this.ctx = ctx;
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }

    update() {
      this.x = this.x + this.vellocity.x;
      this.y = this.y + this.vellocity.y;
    }
  }

  function animate() {
    window.requestAnimationFrame(animate);
    console.log("go");
  }

  document.addEventListener("click", (event) => {
    console.log(event);
    const projectile = new Projectile(
      canvas.width / 2,
      canvas.height / 2,
      5,
      "red",
      {
        x: 1,
        y: 1,
      },
      canvas,
      ctx
    );
    projectile.draw();
    projectile.update();
  });

  animate();

  useEffect(() => {
    canvas = cvs.current;
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 3;

    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const player = new Player(x, y, 40, "blue", canvas, ctx);
    player.draw();

    // ctx.beginPath();
    // ctx.moveTo(0, canvas.height / 2);
    // ctx.lineTo(canvas.width, canvas.height / 2);
    // ctx.stroke();
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);
  return (
    <S.Main>
      <canvas
        ref={cvs}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </S.Main>
  );
}
