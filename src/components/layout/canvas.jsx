import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import * as THREE from "three";
import { Environment, OrbitControls, Preload, Stage } from '@react-three/drei'
import {
  Box
} from '@chakra-ui/react'
import useStore from '@/helpers/store'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { EffectComposer, Bloom, Glitch, Noise, Render, Bokeh, UnrealBloom, DepthOfField, Vignette } from '@react-three/postprocessing';
// const { OctoEasterEggR3F } = dynamic(() => import('@/components/canvas/EasterEgg.r3f'), {
//   ssr: false,
// })
import {CanvasLoader} from '@/components/canvas/Loader'

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none'
    }

  }, [dom, control])


  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />
}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
  // const [effect, setEffect] = useState(false)

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const canvas = document.querySelector('canvas');
  //     dom.current.style['touch-action'] = 'none'
  //     canvas.addEventListener('onMouseDown', () => setEffect(true))
  //   }
  // }, [dom, effect])
  return (
    <Canvas
      mode='concurrent'
      shadow="true"
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '100%',
        maxHeight: '100vh',
        zIndex: 0,
      }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      {/* <LControl /> */}
      <Preload all />
      <Suspense fallback={<CanvasLoader />}>
        <Environment background files={'assets/environment/industrial_sunset_02_2k.hdr'} path='/' />
        {children}
        <Effect />
      </Suspense>
    </Canvas>
  )
}

export default LCanvas

const Effect = ({ on = false }) => {
  console.log(on);
  return (
    <EffectComposer>
          <Noise opacity={0.02} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Vignette eskil={false} offset={0.004} darkness={ 1.2} />
      {/* <Glitch /> */}
      </EffectComposer>

  )
}