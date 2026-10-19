import React, { useEffect, useRef, useState } from 'react';

interface WebGPURendererProps {
  theme: 'emerald' | 'cyan';
}

export const WebGPURenderer: React.FC<WebGPURendererProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [engine, setEngine] = useState<'WebGPU' | 'WebGL2' | 'Canvas2D'>('WebGPU');
  const [fps, setFps] = useState<number>(60);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    let isCancelled = false;
    let frameCount = 0;
    let fpsTimer = performance.now();

    const themeColorMode = theme === 'emerald' ? 0.0 : 1.0;

    // --- WebGPU Implementation ---
    const initWebGPU = async () => {
      if (!navigator.gpu) {
        throw new Error('WebGPU not supported on this browser');
      }

      const adapter = await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance',
      });
      if (!adapter) throw new Error('No appropriate GPUAdapter found.');

      const device = await adapter.requestDevice();
      if (isCancelled) return;

      const context = canvas.getContext('webgpu') as GPUCanvasContext | null;
      if (!context) throw new Error('WebGPU context creation failed');

      const format = navigator.gpu.getPreferredCanvasFormat();
      context.configure({
        device,
        format,
        alphaMode: 'premultiplied',
      });

      // WGSL Shader: Cybernetic Neural Lattice & Quantum Particle Grid
      const wgslShader = `
        struct Uniforms {
          time: f32,
          mouseX: f32,
          mouseY: f32,
          themeMode: f32,
          resolutionX: f32,
          resolutionY: f32,
        };

        @group(0) @binding(0) var<uniform> u: Uniforms;

        struct VertexOutput {
          @builtin(position) position: vec4f,
          @location(0) uv: vec2f,
        };

        @vertex
        fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
          var pos = array<vec2f, 6>(
            vec2f(-1.0, -1.0),
            vec2f( 1.0, -1.0),
            vec2f(-1.0,  1.0),
            vec2f(-1.0,  1.0),
            vec2f( 1.0, -1.0),
            vec2f( 1.0,  1.0)
          );
          var out: VertexOutput;
          out.position = vec4f(pos[vertexIndex], 0.0, 1.0);
          out.uv = pos[vertexIndex] * 0.5 + 0.5;
          return out;
        }

        @fragment
        fn fs_main(in: VertexOutput) -> @location(0) vec4f {
          let aspect = u.resolutionX / u.resolutionY;
          var uv = in.uv;
          uv.x = uv.x * aspect;

          var m = vec2f(u.mouseX * aspect, u.mouseY);
          let distToMouse = length(uv - m);

          // Grid coordinates
          let scale = 24.0;
          let gridUv = fract(uv * scale);
          let gridDist = length(gridUv - 0.5);

          // Animated wave interference
          let wave1 = sin(uv.x * 3.0 + u.time * 0.8) * cos(uv.y * 3.0 + u.time * 0.6);
          let wave2 = sin(length(uv - vec2f(aspect * 0.5, 0.5)) * 6.0 - u.time * 1.2);
          let field = (wave1 + wave2) * 0.5;

          // Dot pattern
          let dotRadius = 0.08 + 0.06 * field + 0.12 * smoothstep(0.4, 0.0, distToMouse);
          let dots = smoothstep(dotRadius, dotRadius - 0.03, gridDist);

          // Digital lattice lines
          let lineX = smoothstep(0.02, 0.0, abs(gridUv.x - 0.5));
          let lineY = smoothstep(0.02, 0.0, abs(gridUv.y - 0.5));
          let lines = (lineX + lineY) * 0.07;

          // Scanline flicker
          let scanline = sin(in.uv.y * u.resolutionY * 0.75 + u.time * 4.0) * 0.03;

          // Theme Color selection: Emerald (#00FF88) vs Cyan (#00F0FF)
          var primaryColor = vec3f(0.0, 1.0, 0.53); // Emerald
          var secondaryColor = vec3f(0.0, 0.5, 0.3);
          if (u.themeMode > 0.5) {
            primaryColor = vec3f(0.0, 0.94, 1.0); // Cyan
            secondaryColor = vec3f(0.0, 0.35, 0.8);
          }

          // Composite intensity
          let mouseGlow = smoothstep(0.5, 0.0, distToMouse) * 0.35;
          let intensity = dots * (0.35 + 0.4 * field) + lines + mouseGlow + scanline;

          // Dark OLED background vignette
          let centerDist = length(in.uv - vec2f(0.5, 0.5));
          let vignette = smoothstep(0.9, 0.3, centerDist);

          let finalColor = mix(secondaryColor * 0.2, primaryColor, intensity) * intensity * vignette;

          return vec4f(finalColor, 0.85 * intensity * vignette);
        }
      `;

      const shaderModule = device.createShaderModule({ code: wgslShader });

      const uniformBufferSize = 6 * 4; // 6 floats
      const bufferUsage = (typeof GPUBufferUsage !== 'undefined')
        ? GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        : 0x0040 | 0x0008;

      const uniformBuffer = device.createBuffer({
        size: uniformBufferSize,
        usage: bufferUsage,
      });

      const shaderStages = (typeof GPUShaderStage !== 'undefined')
        ? GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT
        : 0x1 | 0x2;

      const bindGroupLayout = device.createBindGroupLayout({
        entries: [
          {
            binding: 0,
            visibility: shaderStages,
            buffer: { type: 'uniform' },
          },
        ],
      });
      const bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
      });

      const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      });

      const pipeline = device.createRenderPipeline({
        layout: pipelineLayout,
        vertex: {
          module: shaderModule,
          entryPoint: 'vs_main',
        },
        fragment: {
          module: shaderModule,
          entryPoint: 'fs_main',
          targets: [
            {
              format,
              blend: {
                color: {
                  srcFactor: 'src-alpha',
                  dstFactor: 'one',
                  operation: 'add',
                },
                alpha: {
                  srcFactor: 'one',
                  dstFactor: 'one-minus-src-alpha',
                  operation: 'add',
                },
              },
            },
          ],
        },
        primitive: { topology: 'triangle-list' },
      });

      setEngine('WebGPU');

      const render = (timeMs: number) => {
        if (isCancelled) return;

        // Mouse smooth interpolation
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

        const timeSec = timeMs * 0.001;
        const uniformData = new Float32Array([
          timeSec,
          mouseRef.current.x,
          mouseRef.current.y,
          themeColorMode,
          canvas.width,
          canvas.height,
        ]);
        device.queue.writeBuffer(uniformBuffer, 0, uniformData);

        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();
        const renderPass = commandEncoder.beginRenderPass({
          colorAttachments: [
            {
              view: textureView,
              clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },
              loadOp: 'clear',
              storeOp: 'store',
            },
          ],
        });

        renderPass.setPipeline(pipeline);
        renderPass.setBindGroup(0, bindGroup);
        renderPass.draw(6);
        renderPass.end();

        device.queue.submit([commandEncoder.finish()]);

        // FPS counter
        frameCount++;
        if (timeMs - fpsTimer >= 1000) {
          setFps(Math.round((frameCount * 1000) / (timeMs - fpsTimer)));
          frameCount = 0;
          fpsTimer = timeMs;
        }

        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);
    };

    // --- WebGL2 Fallback Implementation ---
    const initWebGL2 = () => {
      const gl = canvas.getContext('webgl2', { alpha: true, antialias: false });
      if (!gl) {
        initCanvas2D();
        return;
      }

      setEngine('WebGL2');

      const vsSource = `#version 300 es
        in vec2 a_pos;
        out vec2 v_uv;
        void main() {
          v_uv = a_pos * 0.5 + 0.5;
          gl_Position = vec4(a_pos, 0.0, 1.0);
        }
      `;

      const fsSource = `#version 300 es
        precision highp float;
        in vec2 v_uv;
        out vec4 fragColor;
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform float u_theme;
        uniform vec2 u_res;

        void main() {
          float aspect = u_res.x / u_res.y;
          vec2 uv = v_uv;
          uv.x *= aspect;

          vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);
          float distToMouse = length(uv - m);

          float scale = 24.0;
          vec2 gridUv = fract(uv * scale);
          float gridDist = length(gridUv - 0.5);

          float wave1 = sin(uv.x * 3.0 + u_time * 0.8) * cos(uv.y * 3.0 + u_time * 0.6);
          float wave2 = sin(length(uv - vec2(aspect * 0.5, 0.5)) * 6.0 - u_time * 1.2);
          float field = (wave1 + wave2) * 0.5;

          float dotRadius = 0.08 + 0.06 * field + 0.12 * smoothstep(0.4, 0.0, distToMouse);
          float dots = smoothstep(dotRadius, dotRadius - 0.03, gridDist);

          float lineX = smoothstep(0.02, 0.0, abs(gridUv.x - 0.5));
          float lineY = smoothstep(0.02, 0.0, abs(gridUv.y - 0.5));
          float lines = (lineX + lineY) * 0.07;

          vec3 primaryColor = u_theme > 0.5 ? vec3(0.0, 0.94, 1.0) : vec3(0.0, 1.0, 0.53);
          vec3 secondaryColor = u_theme > 0.5 ? vec3(0.0, 0.35, 0.8) : vec3(0.0, 0.5, 0.3);

          float mouseGlow = smoothstep(0.5, 0.0, distToMouse) * 0.35;
          float intensity = dots * (0.35 + 0.4 * field) + lines + mouseGlow;

          float centerDist = length(v_uv - 0.5);
          float vignette = smoothstep(0.9, 0.3, centerDist);

          vec3 col = mix(secondaryColor * 0.2, primaryColor, intensity) * intensity * vignette;
          fragColor = vec4(col, intensity * vignette * 0.85);
        }
      `;

      const createShader = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };

      const program = gl.createProgram()!;
      gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
      gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
      gl.linkProgram(program);
      gl.useProgram(program);

      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const aPos = gl.getAttribLocation(program, 'a_pos');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(program, 'u_time');
      const uMouse = gl.getUniformLocation(program, 'u_mouse');
      const uTheme = gl.getUniformLocation(program, 'u_theme');
      const uRes = gl.getUniformLocation(program, 'u_res');

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      const render = (timeMs: number) => {
        if (isCancelled) return;
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(uTime, timeMs * 0.001);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(uTheme, themeColorMode);
        gl.uniform2f(uRes, canvas.width, canvas.height);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        frameCount++;
        if (timeMs - fpsTimer >= 1000) {
          setFps(Math.round((frameCount * 1000) / (timeMs - fpsTimer)));
          frameCount = 0;
          fpsTimer = timeMs;
        }

        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);
    };

    // --- 2D Canvas Safe Fallback ---
    const initCanvas2D = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      setEngine('Canvas2D');

      const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = [];
      for (let i = 0; i < 70; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 2 + 1,
        });
      }

      const render = (timeMs: number) => {
        if (isCancelled) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const col = theme === 'emerald' ? '#00FF88' : '#00F0FF';

        ctx.fillStyle = col;
        ctx.strokeStyle = col;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.globalAlpha = 0.4;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const d = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (d < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.globalAlpha = (1 - d / 100) * 0.15;
              ctx.stroke();
            }
          }
        }

        frameCount++;
        if (timeMs - fpsTimer >= 1000) {
          setFps(Math.round((frameCount * 1000) / (timeMs - fpsTimer)));
          frameCount = 0;
          fpsTimer = timeMs;
        }

        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);
    };

    // Resize handler
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Try WebGPU first, then WebGL2, then 2D
    initWebGPU().catch(() => {
      initWebGL2();
    });

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-60"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* HUD Telemetry Badge */}
      <div className="fixed bottom-4 right-4 z-20 hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-neutral-800/80 text-[10px] font-mono text-neutral-500 select-none">
        <span className={`w-1.5 h-1.5 rounded-full ${theme === 'emerald' ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
        <span className="text-neutral-400">{engine}</span>
        <span>&bull;</span>
        <span>{fps} FPS</span>
      </div>
    </>
  );
};
