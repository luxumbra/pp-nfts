import React, { useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import useStore from '@/helpers/store'

export default function LegoBlock(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes } = useGLTF("/assets/models/legoBrick.glb");
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
      <group
        position={[0, 0.54, 0]}
        onClick={(e) => handleClick(route, isExternal)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          scale={[1, 0.58, 2.26]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000.geometry}
          material={nodes.Cylinder000.material}
          position={[0.5, 0.49, 1.8]}
          scale={0.38}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003.geometry}
          material={nodes.Cylinder003.material}
          position={[0.5, 0.49, 0.6]}
          scale={0.38}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder006.geometry}
          material={nodes.Cylinder006.material}
          position={[-0.5, 0.49, -0.6]}
          scale={0.38}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder007.geometry}
          material={nodes.Cylinder007.material}
          position={[-0.5, 0.49, -1.8]}
          scale={0.38}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002.geometry}
          material={nodes.Cylinder002.material}
          position={[0.5, 0.49, -0.6]}
          scale={0.38}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={nodes.Cylinder001.material}
          position={[0.5, 0.49, -1.8]}
          scale={0.38}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005.geometry}
          material={nodes.Cylinder005.material}
          position={[-0.5, 0.49, 1.8]}
          scale={0.38}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004.geometry}
          material={nodes.Cylinder004.material}
          position={[-0.5, 0.49, 0.6]}
          scale={0.38}
        />
      </group>

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

useGLTF.preload("/assets/models/legoBrick.glb");