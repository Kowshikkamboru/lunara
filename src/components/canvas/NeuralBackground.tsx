import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: Node[];
}

interface Signal {
  from: Node;
  to: Node;
  progress: number;
  speed: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setupCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvas();

    const resize = () => {
      setupCanvas();
    };
    window.addEventListener('resize', resize, { passive: true });

    // Optimize node count based on screen size
    const isMobile = width < 768;
    const nodeCount = isMobile 
      ? Math.min(Math.floor((width * height) / 25000), 45)
      : Math.min(Math.floor((width * height) / 16000), 90);

    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.5 + 0.5,
      connections: [],
    }));

    let signals: Signal[] = [];

    const draw = () => {
      // Pause drawing if tab is not visible
      if (document.hidden) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Reset connections
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].connections = [];
      }

      // Update & draw synapses
      const maxDist = isMobile ? 110 : 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            nodes[i].connections.push(nodes[j]);
            nodes[j].connections.push(nodes[i]);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = (1 - dist / maxDist) * 0.14;
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Random action potential
            if (Math.random() < 0.0008 && signals.length < 15) {
              signals.push({
                from: nodes[i],
                to: nodes[j],
                progress: 0,
                speed: 0.012 + Math.random() * 0.02,
              });
            }
          }
        }
      }

      // Update & draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off bounds
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167, 139, 250, 0.45)';
        ctx.fill();
      }

      // Update & draw action potentials
      signals = signals.filter(s => {
        s.progress += s.speed;
        if (s.progress >= 1) return false;

        const x = s.from.x + (s.to.x - s.from.x) * s.progress;
        const y = s.from.y + (s.to.y - s.from.y) * s.progress;

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.95)';
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  );
}
