import { Suspense, useEffect, useCallback, useRef, createRef, useState } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import useStore from '@/helpers/store'

import { EffectComposer, Bloom, Glitch, Noise, Render, Bokeh, UnrealBloom, DepthOfField, Vignette } from '@react-three/postprocessing';



const VideoScreen2 = (props) => {
  const router = useStore((s) => s.router)
  const group = createRef(null);
  const videoRef = useRef(null);
  const { route, animate, url } = props
  const [video] = useState(() => {
    if (typeof window !== 'undefined') {
      const video = document.createElement('video')
      video.src = url
      video.loop = true
      video.muted = true
      video.play()
      return video
    } else {
      return null
    }
  })

    const [effect, setEffect] = useState(false)

  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) =>
  //   mesh.current
  //     ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.001)
  //     : null
  // )

  const handleClick = useCallback(() => {
    setEffect(!effect)
  }, [setEffect, effect])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const canvas = document.querySelector('canvas')
      if (canvas) {
        console.log(canvas);
        canvas.addEventListener('onMouseDown', () => handleClick())
      }
    }

  }, [handleClick]);
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <mesh
        ref={mesh}
        // onClick={() => router.push(route)}
        scale={[1, 1, 1]}
      >
        <planeBufferGeometry args={[4, 4, 1, 1]} />
        <meshStandardMaterial emissive={"white"} color={"black"} side={THREE.DoubleSide}>
          <videoTexture attach="texture" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      <Effect on={effect} />
      </mesh>
    </>
  )
}
export default VideoScreen

const Effect = ({on = false}) => {
  return (
      <EffectComposer>
          <Vignette eskil={false} offset={0.004} darkness={on ? 1.1 : 1.2} />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.05} />
          {/* <Glitch factor={0} /> */}
      </EffectComposer>

  )
}