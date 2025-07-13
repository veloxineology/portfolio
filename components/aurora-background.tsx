"use client";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import "@/app/aurora.css";

const VERT = `#version 300 es\nin vec2 position;\nvoid main() {\n  gl_Position = vec4(position, 0.0, 1.0);\n}\n`;

const FRAG = `#version 300 es\nprecision highp float;\n\nuniform float uTime;\nuniform float uAmplitude;\nuniform vec3 uColorStops[3];\nuniform vec2 uResolution;\nuniform float uBlend;\n\nout vec4 fragColor;\n\nvec3 permute(vec3 x) {\n  return mod(((x * 34.0) + 1.0) * x, 289.0);\n}\n\nfloat snoise(vec2 v){\n  const vec4 C = vec4(\n      0.211324865405187, 0.366025403784439,\n      -0.577350269189626, 0.024390243902439\n  );\n  vec2 i  = floor(v + dot(v, C.yy));\n  vec2 x0 = v - i + dot(i, C.xx);\n  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n  i = mod(i, 289.0);\n\n  vec3 p = permute(\n      permute(i.y + vec3(0.0, i1.y, 1.0))\n    + i.x + vec3(0.0, i1.x, 1.0)\n  );\n\n  vec3 m = max(\n      0.5 - vec3(\n          dot(x0, x0),\n          dot(x12.xy, x12.xy),\n          dot(x12.zw, x12.zw)\n      ), \n      0.0\n  );\n  m = m * m;\n  m = m * m;\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\n\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\nstruct ColorStop {\n  vec3 color;\n  float position;\n};\n\n#define COLOR_RAMP(colors, factor, finalColor) {              \\n  int index = 0;                                            \\n  for (int i = 0; i < 2; i++) {                               \\n     ColorStop currentColor = colors[i];                    \\n     bool isInBetween = currentColor.position <= factor;    \\n     index = int(mix(float(index), float(i), float(isInBetween))); \\n  }                                                         \\n  ColorStop currentColor = colors[index];                   \\n  ColorStop nextColor = colors[index + 1];                  \\n  float range = nextColor.position - currentColor.position; \\n  float lerpFactor = (factor - currentColor.position) / range; \\n  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\n}\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / uResolution;\n  \n  ColorStop colors[3];\n  colors[0] = ColorStop(uColorStops[0], 0.0);\n  colors[1] = ColorStop(uColorStops[1], 0.5);\n  colors[2] = ColorStop(uColorStops[2], 1.0);\n  \n  vec3 rampColor;\n  COLOR_RAMP(colors, uv.x, rampColor);\n  \n  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;\n  height = exp(height);\n  height = (uv.y * 2.0 - height + 0.2);\n  float intensity = 0.6 * height;\n  \n  float midPoint = 0.20;\n  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);\n  \n  vec3 auroraColor = intensity * rampColor;\n  \n  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);\n}\n`;

export default function AuroraBackground(props: any) {
  const {
    colorStops = ["#5227FF", "#7cff67", "#5227FF"],
    amplitude = 1.0,
    blend = 0.5
  } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    let program: any;

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener("resize", resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = colorStops.map((hex: string) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = (t: number) => {
      animateId = requestAnimationFrame(update);
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;
      program.uniforms.uTime.value = time * speed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
      const stops = propsRef.current.colorStops ?? colorStops;
      program.uniforms.uColorStops.value = stops.map((hex: string) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude]);

  return <div ref={ctnDom} className="aurora-container" />;
} 