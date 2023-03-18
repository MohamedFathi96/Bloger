import React, { useEffect } from "react";

const MouseCanvas = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    console.log("test");

    const particles = [];
    let hue = 0;

    const mouse = {
      x: undefined,
      y: undefined,
    };

    class Particle {
      constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.size = this.getRndInteger(5, 15);
      }
      getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0) this.size -= 0.2;
      }
      draw() {
        ctx.fillStyle = `hsl(${hue},50%,50%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    window.addEventListener("resize", (even) => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    });

    canvas.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
      // if (particles.length > 800) particles.splice(0);
      for (let index = 0; index < 3; index++) {
        particles.push(new Particle());
      }
    });

    canvas.addEventListener("click", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
      for (let index = 0; index < 30; index++) {
        particles.push(new Particle());
      }
    });

    function moveParticles() {
      for (let index = 0; index < particles.length; index++) {
        particles[index].update();
        particles[index].draw();
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[index].x - particles[j].x;
          const dy = particles[index].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[index].x, particles[index].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // ctx.stroke();
          }
        }
        if (particles[index].size < 0.2) {
          particles.splice(index, 1);
          index--;
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.fillStyle = "rgba(0,0,0,0.06)";
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      moveParticles();
      hue = hue === 360 ? 0 : hue + 7;
      window.requestAnimationFrame(animate);
    }

    animate();
  }, []);
  return <canvas id="canvas1"></canvas>;
};

export default MouseCanvas;
