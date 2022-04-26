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
  const { nodes, materials } = useGLTF("/assets/models/b0gie/toucan.glb");
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
            <group scale={20} rotation={[Math.PI * 0.5, 0, 0]} >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve003_1.geometry}
          material={materials["SVGMat.004"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve003_2.geometry}
          material={materials["SVGMat.006"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve003_3.geometry}
          material={materials["SVGMat.007"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve003_4.geometry}
          material={materials["SVGMat.008"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/b0gie/toucan.glb");