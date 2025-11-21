'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// Custom shader material with dither effect
interface DitherMaterialProps {
  time: number
  resolution: THREE.Vector2
}

const DitherMaterial = ({ time, resolution }: DitherMaterialProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.15 },
      uFrequency: { value: 1.5 },
      uColor1: { value: new THREE.Color('#0f172a') }, // Deep blue
      uColor2: { value: new THREE.Color('#1e40af') }, // Blue
      uColor3: { value: new THREE.Color('#06b6d4') }, // Cyan
      uDitherScale: { value: 8.0 },
      uDitherIntensity: { value: 0.35 },
      uResolution: { value: resolution },
    }),
    [resolution]
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      side={THREE.DoubleSide}
    />
  )
}

// Main 3D Mesh with dither shader
const DitherSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()
  const resolution = useMemo(() => new THREE.Vector2(size.width, size.height), [size.width, size.height])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 32]} />
        <DitherMaterial time={0} resolution={resolution} />
      </mesh>
    </Float>
  )
}

// Orbiting smaller spheres
const OrbitingSpheres = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  const spheres = useMemo(() => {
    const arr = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 3.5
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const color = new THREE.Color().setHSL(i / 8, 0.7, 0.5)
      arr.push({ position: [x, 0, z] as [number, number, number], color, index: i })
    }
    return arr
  }, [])

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, i) => (
        <mesh key={i} position={sphere.position}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={sphere.color}
            emissive={sphere.color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Particle field
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    const colors = new Float32Array(2000 * 3)
    const color = new THREE.Color()

    for (let i = 0; i < 2000; i++) {
      const i3 = i * 3
      // Distribute particles in a sphere
      const radius = 5 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      color.setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.5)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Torus ring
const TorusRing = () => {
  const torusRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.4
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh ref={torusRef} scale={1.2}>
      <torusGeometry args={[2, 0.05, 16, 100]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.4}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  )
}

// Main scene component
export default function DitherScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#3b82f6" />

      {/* 3D Elements */}
      <DitherSphere />
      <OrbitingSpheres />
      <ParticleField />
      <TorusRing />
    </>
  )
}

// Shader code
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vDisplacement;

uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  float noise1 = snoise(position.xy * uFrequency + uTime * 0.2);
  float noise2 = snoise(position.yz * uFrequency * 2.0 - uTime * 0.15);
  float noise3 = snoise(position.zx * uFrequency * 0.5 + uTime * 0.1);

  float displacement = (noise1 + noise2 * 0.5 + noise3 * 0.25) * uAmplitude;
  vDisplacement = displacement;

  vec3 newPosition = position + normal * displacement;
  vPosition = newPosition;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vDisplacement;

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uDitherScale;
uniform float uDitherIntensity;
uniform vec2 uResolution;

const mat4 bayerMatrix = mat4(
  0.0, 32.0, 8.0, 40.0,
  48.0, 16.0, 56.0, 24.0,
  12.0, 44.0, 4.0, 36.0,
  60.0, 28.0, 52.0, 20.0
);

float getBayer(vec2 pos) {
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  return bayerMatrix[x][y] / 64.0;
}

float dither(vec2 pos, float brightness) {
  float bayerValue = getBayer(pos * uDitherScale);
  return step(bayerValue, brightness) * uDitherIntensity + brightness * (1.0 - uDitherIntensity);
}

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(0.0, dot(viewDirection, vNormal)), 3.0);

  float noise1 = snoise(vPosition * 2.0 + uTime * 0.1);
  float noise2 = snoise(vPosition * 4.0 - uTime * 0.15);
  float noise3 = snoise(vPosition * 8.0 + uTime * 0.05);

  float combinedNoise = (noise1 + noise2 * 0.5 + noise3 * 0.25) / 1.75;
  float gradient = (vUv.y + vDisplacement * 0.5 + 1.0) * 0.5;

  vec3 color = mix(uColor1, uColor2, gradient + combinedNoise * 0.3);
  color = mix(color, uColor3, fresnel * 0.7);

  float energy = smoothstep(0.3, 0.7, noise1) * smoothstep(0.2, 0.6, noise2);
  color += vec3(0.1, 0.3, 0.5) * energy;

  float brightness = (color.r + color.g + color.b) / 3.0;
  float dithered = dither(gl_FragCoord.xy, brightness);
  color = mix(color, color * dithered, uDitherIntensity);

  float rim = 1.0 - max(0.0, dot(viewDirection, vNormal));
  color += vec3(0.2, 0.4, 0.6) * pow(rim, 4.0) * 0.5;

  color = pow(color, vec3(0.4545));
  gl_FragColor = vec4(color, 1.0);
}
`
