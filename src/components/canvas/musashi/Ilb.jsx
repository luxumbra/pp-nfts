import React, { useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import useStore from '@/helpers/store'

export default function ILBVox(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const material = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/musashi/ilb.glb");
  const { route, isExternal} = props
  const clock = new THREE.Clock();
  let previousTime = 0;

    const handleClick = (url, isExternal) => {
    if (isExternal) {
      if (typeof window !== 'undefined') {
        window.open(url, '_blank')
      }
      return
    }
    () => router.push(url)
  }

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

  })

  if (group.current) {
    if (hovered) {
      gsap.to(group.current.position, {
        x: 2,
        y: -2.5,
        z: 0
      })
    } else {
      gsap.to(group.current.position, {
        x: 2,
        y: -2.5,
        z: -1
      })
    }
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ILB.geometry}
        material={materials["palette.002"]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={[0.5,0.5,0.5]}
        onClick={(e) => handleClick(route, isExternal)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      />

      <pointLight
        intensity={0.6}
        distance={3}
        decay={2}
        color={'0xffffff'}
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/assets/models/musashi/ilb.glb");