import React, { useRef, useEffect } from 'react';

interface ParticleCanvasProps {
  triggerExplosion: boolean;
}

const hexToRgb = (hex: string): string => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    return `${r}, ${g}, ${b}`;
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;

  constructor(color: string, canvasWidth: number, canvasHeight: number) {
    this.color = color;
    this.maxLife = Math.random() * 200 + 150;
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.life = 0;
    this.reset(false, canvasWidth, canvasHeight);
  }

  reset(isExplosion: boolean, canvasWidth: number, canvasHeight: number) {
    if (isExplosion) {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        this.life = Math.random() * 80 + 50;
        this.size = Math.random() * 3 + 1.5;
    } else {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.life = this.maxLife;
    }
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.speedX *= 0.99; // friction
    this.speedY *= 0.99;
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;

    if (this.life <= 0) {
        this.reset(false, canvasWidth, canvasHeight);
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    const opacity = Math.max(0, this.life / this.maxLife);
    context.fillStyle = `rgba(${hexToRgb(this.color)}, ${opacity})`;
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ triggerExplosion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  // FIX: `useRef<number>()` requires an initial value. Use `useRef<number | undefined>()` for a ref that can be undefined.
  const animationFrameIdRef = useRef<number | undefined>();

  useEffect(() => {
    if (triggerExplosion) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const explosionCount = 70;
      for (let i = 0; i < particlesRef.current.length; i++) {
        if (i < explosionCount) {
          particlesRef.current[i].reset(true, canvas.width, canvas.height);
        }
      }
    }
  }, [triggerExplosion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = [];
      const colors = ['#f9a8d4', '#f472b6', '#ec4899', '#ffffff'];
      const particleCount = 150;
      for (let i = 0; i < particleCount; i++) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          particlesRef.current.push(new Particle(color, canvas.width, canvas.height));
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

export default ParticleCanvas;