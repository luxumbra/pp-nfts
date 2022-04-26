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
        geometry={nodes.Curve007.geometry}
        material={materials["refi txt"]}
        position={[-0.1, -0.03, 0.12]}
        scale={6.38}
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