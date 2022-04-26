import React, { useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import useStore from '@/helpers/store'

export default function Giveth(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const material = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/b0gie/giveth.glb");
  const { route } = props
  const clock = new THREE.Clock();
  let previousTime = 0;


  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        material={materials["SVGMat.001"]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={[16, 16, 16]}
        onClick={() => router.push(route)}
        // onPointerOver={(e) => setHover(true)}
        // onPointerOut={(e) => setHover(false)}
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

useGLTF.preload("/assets/models/b0gie/giveth.glb");