import React, { useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import useStore from '@/helpers/store'

export default function Toucan(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const material = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/b0gie/refi.glb");
  const { route, isExternal } = props
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
        x: 0,
        y: 0,
        z: 1
      })
    } else {
      gsap.to(group.current.position, {
        x: 0,
        y: 0,
        z: 0
      })
    }
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve007.geometry}
        material={materials["refi txt"]}
        position={[-0.1, -0.03, 0.12]}
        scale={6.38}
        onClick={(e) => handleClick(route, isExternal)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus.geometry}
        material={materials.refi}
        scale={0.64}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/b0gie/refi.glb");