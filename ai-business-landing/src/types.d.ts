declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

interface Window {
  requestAnimationFrame: (callback: FrameRequestCallback) => number
  cancelAnimationFrame: (handle: number) => void
}

interface BaseProps {
  className?: string
  children?: React.ReactNode
}

interface ThreeElements extends JSX.IntrinsicElements {
  mesh: any
  points: any
  bufferGeometry: any
  pointsMaterial: any
}

declare module '@react-three/fiber' {
  export interface ThreeElements {
    points: any
    bufferGeometry: any
    pointsMaterial: any
  }

  export interface BufferAttributeProps {
    attach: string
    array: Float32Array
    count: number
    itemSize: number
    usage?: number
  }

  export interface PointsMaterialProps {
    size?: number
    vertexColors?: boolean
    transparent?: boolean
    opacity?: number
    sizeAttenuation?: boolean
    depthWrite?: boolean
  }

  export interface MeshStandardMaterialProps {
    color?: number | string
    wireframe?: boolean
    emissive?: number | string
    emissiveIntensity?: number
    roughness?: number
    metalness?: number
  }

  export interface CanvasProps {
    camera?: any
    dpr?: number[]
    gl?: {
      antialias?: boolean
      [key: string]: any
    }
    children?: React.ReactNode
    style?: React.CSSProperties
    className?: string
  }

  export const Canvas: React.FC<CanvasProps>
}

declare module 'framer-motion' {
  export interface AnimationProps {
    initial?: any
    animate?: any
    exit?: any
    transition?: any
    variants?: any
    custom?: any
    style?: any
    className?: string
    children?: React.ReactNode
    whileHover?: any
    whileTap?: any
  }

  export const motion: {
    [K in keyof JSX.IntrinsicElements]: (props: JSX.IntrinsicElements[K] & AnimationProps) => JSX.Element
  }
  
  export const AnimatePresence: React.FC<{
    initial?: boolean
    custom?: any
    children?: React.ReactNode
    onExitComplete?: () => void
  }>

  export function useInView(ref: React.RefObject<Element>, options?: any): boolean
  export function useScroll(options?: any): { scrollYProgress: any }
}

declare module '@react-three/drei' {
  export const OrbitControls: React.FC<{
    enableZoom?: boolean
    autoRotate?: boolean
    autoRotateSpeed?: number
  }>
  export const Sphere: React.FC<{
    args?: [number, number, number]
    children?: React.ReactNode
  }>
}

declare module 'three' {
  export const StaticDrawUsage: number
  export class Object3D {}
  export class Vector3 {}
  export class Quaternion {}
  export class Euler {}
  export class Matrix4 {}
  export class BufferGeometry {}
  export class Float32BufferAttribute {}
  export class Points {}
  export class PointsMaterial {}
  export class Color {}
  export class Scene {}
  export class PerspectiveCamera {}
  export class WebGLRenderer {}
  export class AmbientLight {}
  export class DirectionalLight {}
  export class Clock {}
  export const MathUtils: {
    lerp: (x: number, y: number, t: number) => number
    degToRad: (degrees: number) => number
    radToDeg: (radians: number) => number
  }
} 