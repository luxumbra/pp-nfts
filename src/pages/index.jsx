import React, { createRef, Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree, extend } from '@react-three/fiber'
import { Environment, PerspectiveCamera, Stats, useProgress } from '@react-three/drei'
import gsap from "gsap";
import dynamic from 'next/dynamic'
import useStore from '@/helpers/store'


import {
  HomeSection,
  AboutSection,
  MarketSection,
  ArtistsSection,
  PartnersSection,
  MissionSection,
  RoadmapSection,
} from "@/components/dom/page-sections";

import {
  galaxy1Params,
  galaxy2Params,
  galaxy3Params,
  galaxy4Params,
  galaxy5Params,
} from '@/components/canvas/galaxies';
import { CanvasLoader } from "@/components/canvas/Loader";

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const NomadVox = dynamic(() => import('@/components/canvas/Nomad'), {
  ssr: false,
})
const IndustrialVox = dynamic(() => import('@/components/canvas/Industrial'), {
  ssr: false,
})
const JetsetterVox = dynamic(() => import('@/components/canvas/Jetsetter'), {
  ssr: false,
})
const BabyEarthVox = dynamic(() => import('@/components/canvas/BabyEarth'), {
  ssr: false,
})
const VideoScreen = dynamic(() => import('@/components/canvas/VideoScreen'), {
  ssr: false,
})
const VideoScreen2 = dynamic(() => import('@/components/canvas/VideoScreen2'), {
  ssr: false,
})
const OctoEasterEgg = dynamic(() => import('@/components/canvas/EasterEgg'), {
  ssr: false,
})
const Galaxy = dynamic(() => import('@/components/canvas/Galaxy'), {
  ssr: false,
})

// Musashi
const Robe = dynamic(() => import('@/components/canvas/musashi/Robe'), {
  ssr: false,
})
const Robe2 = dynamic(() => import('@/components/canvas/musashi/Robe2'), {
  ssr: false,
})
const ILB = dynamic(() => import('@/components/canvas/musashi/Ilb'), {
  ssr: false,
})
const MolochPet1 = dynamic(() => import('@/components/canvas/musashi/MolochPet1'), {
  ssr: false,
})

// b0gie
const Giveth = dynamic(() => import('@/components/canvas/b0gie/Giveth'), {
  ssr: false,
})
const Toucan = dynamic(() => import('@/components/canvas/b0gie/Toucan'), {
  ssr: false,
})
const Refi = dynamic(() => import('@/components/canvas/b0gie/Refi'), {
  ssr: false,
})
const ThirdWeb = dynamic(() => import('@/components/canvas/b0gie/ThirdWeb'), {
  ssr: false,
})
const Polygon = dynamic(() => import('@/components/canvas/b0gie/Polygon'), {
  ssr: false,
})

const LegoBlock = dynamic(() => import('@/components/canvas/b0gie/LegoBlock'), {
  ssr: false,
})

import url from '@/static/assets/video/household_burnnft.clip.mp4'
import url2 from '@/static/assets/video/household_nft.clip.mp4'
import { lerp } from "three/src/math/MathUtils";
import { EasterEgg } from "@/components/dom/EasterEgg";

// dom components goes here
const DOM = () => {
  return (
    <>
      <HomeSection />
      <MarketSection />
      <AboutSection />
      <MissionSection />
      <PartnersSection />
      <ArtistsSection />
      <RoadmapSection />
    </>
  )
}

export const objectsDistance = 4;

export const R3FSceneSection = ({ name, count, children, ...props }) => {
  const group = useRef(null);
  // const { layers } = props;
  // useLayoutEffect(() => {
  //   group.current.layers.enable(layers);
  // }, [layers])
  // if (group.current) {
  //   console.log('section grp cur: ', group.current);
  // }
  return (
    <group ref={group} name={name} position={[0, -objectsDistance * count, 0]} {...props}>{children}</group>
  )
}

// canvas components goes here
const R3F = () => {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const dof = useRef(null);
  const { dom } = useStore();
  const nomad = useRef(null);
  const jetsetter = useRef(null);
  const industrial = useRef(null);
  const octoEasterEgg = useRef(null);
  const giveth = useRef(null);
  const toucan = useRef(null);
  const refi = useRef(null);
  const thirdweb = useRef(null);
  const polygon = useRef(null);
  const lego = useRef(null);
  const camera = useRef();
  const cameraGroup = useRef();
  const scrollY = useRef(0)
  const vid1 = useRef(null);
  const vid2 = useRef(null);
  const sizes = useRef({ width: 0, height: 0 })
  const cursor = useRef({ x: 0, y: 0 })
  const mousePos = useRef(new THREE.Vector2())
  const rayMousePos = useRef(new THREE.Vector2())
  const mouse = new THREE.Vector2();
  const rayMouse = new THREE.Vector2();

  const molochPet1 = useRef(null);
  const ilbRef = useRef(null);

  /**
   * Animate
   */
  const clock = new THREE.Clock();
  let previousTime = 0;
  /**
         * Cursor / Mouse
         */



  useEffect(() => {
    if (typeof window !== "undefined") {
      sizes.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      // Scroll
      scrollY.current = window.scrollY;
      let currentSection = 0;
      window.addEventListener("resize", () => {
        // Update sizes
        sizes.current.width = window.innerWidth;
        sizes.current.height = window.innerHeight;
      });


      window.addEventListener("scroll", () => {
        scrollY.current = window.scrollY;

        // console.log(scrollY);
        if (lego.current) {
          lego.current.rotation.x = scrollY.current * 0.0004;
          lego.current.rotation.y = scrollY.current * 0.0008;
          lego.current.rotation.z = scrollY.current * 0.0003;
          lego.current.position.y = -scrollY.current * 0.0007;
        }
        const newSection = Math.round(scrollY.current / sizes.current.height);
        if (newSection !== currentSection) {
          currentSection = newSection;
          console.log('Current section:', currentSection);
        }
      });

      // Mouse move
      window.addEventListener("mousemove", (event) => {
        cursor.current.x = (event.clientX / sizes.current.width) - 0.3;
        cursor.current.y = -(event.clientY / sizes.current.height) - 0.3;
        // console.log('curCursor', cursor.current);

        mousePos.current.x = (event.clientX / sizes.current.width) * 2 - 1;
        mousePos.current.y = -(event.clientY / sizes.current.height) * 2 - 1;
        // console.log('mousePos', mousePos.current);
        rayMousePos.current.x = event.clientX / sizes.current.width;
        rayMousePos.current.y = event.clientY / sizes.current.height;

        if (cameraGroup.current) {
          cameraGroup.current.rotation.x = (event.clientY / sizes.current.height) * 0.05;
          cameraGroup.current.rotation.y = -(event.clientX / sizes.current.width) * 0.5;

        }

      });
    }
  }, [dom])

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    const parallaxX = cursor.current.x * 0.5;
    const parallaxY = cursor.current.y * 0.5;


    camera.current.position.y = (-scrollY.current / sizes.current.height) * objectsDistance;
    cameraGroup.current.position.x +=
      (parallaxX - cameraGroup.current.position.x) * 5 * deltaTime;
    cameraGroup.current.position.y +=
      (parallaxY - cameraGroup.current.position.y) * 5 * deltaTime;


    if (nomad.current) {
      nomad.current.position.y = -1.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.05;

      // group.current.rotation.y = elapsedTime * 0.03;
      nomad.current.rotation.z = -0.05 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
    }
    if (industrial.current) {
      industrial.current.position.y = -1.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.05;

      // group.current.rotation.y = elapsedTime * 0.03;
      industrial.current.rotation.z = -0.05 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
    }
    if (jetsetter.current) {
      jetsetter.current.position.y = Math.cos(elapsedTime * 0.1) * Math.PI * 0.05;

      // group.current.rotation.y = elapsedTime * 0.03;
      jetsetter.current.rotation.z = -0.05 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
    }
    if (molochPet1.current) {
      molochPet1.current.position.x = -1 + Math.sin(elapsedTime * 0.6) * Math.PI * 0.03;
      molochPet1.current.position.y = 1 + Math.cos(elapsedTime * 0.07) * Math.PI * 0.5;
      // group.current.position.z = -0.25 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.3;

      molochPet1.current.rotation.z = -0.05 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
      // molochPet1.current.rotation.y = elapsedTime * 0.03;
    }

    if (ilbRef.current) {
      ilbRef.current.position.x = 1 + Math.sin(elapsedTime * 0.8) * Math.PI * 0.03;
      ilbRef.current.position.y = 1 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.3;
      // group.current.position.z = -0.25 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.3;

      // ilbRef.current.rotation.z = -0.5 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
      ilbRef.current.rotation.y = -elapsedTime * 0.006;
    }

    if (octoEasterEgg.current) {
      octoEasterEgg.current.position.x = -1 + Math.sin(elapsedTime * 0.9) * Math.PI * 0.05;
      octoEasterEgg.current.position.y = -.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.5;
      octoEasterEgg.current.rotation.z = -elapsedTime * 0.06;
    }

    if (giveth.current) {
      giveth.current.position.x = - Math.sin(elapsedTime * 0.45) * Math.PI * 0.06;
      giveth.current.position.y = + Math.cos(elapsedTime * 0.09) * Math.PI * 0.52;
    }

    if (toucan.current) {
      toucan.current.position.x = -2 + Math.sin(elapsedTime * 0.6) * Math.PI * 0.06;
      toucan.current.position.y = + Math.cos(elapsedTime * 0.11) * Math.PI * 0.5;
      // toucan.current.rotation.z = -elapsedTime * 0.03;
    }

    if (thirdweb.current) {
      thirdweb.current.position.x = 3 + Math.sin(elapsedTime * 0.6) * Math.PI * 0.03;
      thirdweb.current.position.y = -2 + Math.cos(elapsedTime * 0.11) * Math.PI * 0.4;
      // toucan.current.rotation.z = -elapsedTime * 0.03;
    }

    if (refi.current) {
      refi.current.position.x = -3 + Math.sin(elapsedTime * 0.6) * Math.PI * 0.03;
      refi.current.position.y = 1 + Math.cos(elapsedTime * 0.11) * Math.PI * 0.4;
      // toucan.current.rotation.z = -elapsedTime * 0.03;
    }

    if (polygon.current) {
      polygon.current.position.x = -2 + Math.sin(elapsedTime * 0.6) * Math.PI * 0.03;
      polygon.current.position.y = - 2 + Math.cos(elapsedTime * 0.11) * Math.PI * 0.4;
      polygon.current.rotation.z = -elapsedTime * 0.1;
    }

    if (lego.current) {
      lego.current.position.x = 1 + Math.sin(elapsedTime * 0.6) * Math.PI * 0.03;
      lego.current.position.y = 0.5 + Math.cos(elapsedTime * 0.11) * Math.PI * 0.4;
    }
  });

  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera ref={camera} makeDefault aspect={sizes.width / sizes.height} position={[0, 0, 6]} rotateX={0} rotateY={0} far={1000} filmGauge={53} />
        {/* <Stats /> */}
      </group>

      <Suspense fallback={<CanvasLoader />}>

        <fog attach="fog" args={["#88B748", 1, 30]} />
        <R3FSceneSection name="SectionOne" count={0}>

          <BabyEarthVox animate={true} position={[3, 2, -3]} />

        </R3FSceneSection>

        <R3FSceneSection name="SectionTwo" count={1}>
          <group ref={molochPet1}>
            <MolochPet1 route="https://discord.gg/Fp6HNX7w9s" isExternal position={[-3, -4.5, -3]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
          </group>
          <group ref={ilbRef}>
            <ILB route="https://www.hiphopheads.io/" isExternal position={[2, -2.5, -1]} rotation={[0, 0, 0]} />
          </group>
        </R3FSceneSection>

        <R3FSceneSection name="SectionThree" count={2}>
          <group ref={vid2} position={[0, 0, 0]}>
            <VideoScreen2 url={url2} position={[0, 0, 0]} />
          </group>

        </R3FSceneSection>

        <R3FSceneSection name="SectionFour" count={3}>
          <group ref={industrial} receiveShadow>
            <IndustrialVox position={[1.75, 0.5, 0.3]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
          </group>

        </R3FSceneSection>

        <R3FSceneSection name="SectionFive" count={4}>
          <group ref={giveth} position={[0, 0, 0]}>
            <Giveth route="https://giveth.io/giveconomy" isExternal />
          </group>
          <group ref={toucan} position={[-3, 0, -3]}>
            <Toucan route="https://gitcoin.co/grants/3059/toucan-protocol-carbon-as-a-money-lego" isExternal />
          </group>
          <group ref={refi} position={[-2, 1, 1]} rotation={[Math.PI * 0.5, 0, 0]}>
            <Refi route="https://gitcoin.co/grants/4024/refi-dao-season-one" isExternal />
          </group>
          <group ref={thirdweb} position={[3, -1, -1]} rotation={[0, 0, 0]}>
            <ThirdWeb route="https://portal.thirdweb.com/guides/marketplace" isExternal />
          </group>
          <group ref={polygon} position={[-2, -2, -2]} rotation={[0, 0, 0]}>
            <Polygon route="https://blog.polygon.technology/polygon-is-going-carbon-negative-in-2022-with-a-20-million-pledge/" isExternal />
          </group>
          <group ref={lego} position={[-2, 4, -8]} rotation={[0, 0, 0]}>
            <LegoBlock route="https://www.bricklink.com/r3/studio/download.page#xlink" isExternal />
          </group>
          <group ref={octoEasterEgg} position={[1, -2, -1]} rotation={[0, 0, 0]}>
            <OctoEasterEgg route="https://metagame.wtf" isExternal />
          </group>
        </R3FSceneSection>

        <R3FSceneSection name="SectionSix" count={5}>
          <BabyEarthVox position={[-1.5, -2.5, -2]} animate={true} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />

        </R3FSceneSection>

        <R3FSceneSection name="SectionSeven" count={6}>
          <group ref={jetsetter}>
            <JetsetterVox animate={true} position={[-2, -1.8, 0]} rotation={[-Math.PI / .1, Math.PI / 6.5, 0]}
            />
          </group>
        </R3FSceneSection>
      </Suspense>
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
