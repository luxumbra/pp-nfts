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
import url from '@/static/assets/video/household_burnnft.clip.mp4'
import url2 from '@/static/assets/video/household_nft.clip.mp4'
import { lerp } from "three/src/math/MathUtils";

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
  const octoEasterEgg = useRef(null);
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

  /**
   * Animate
   */
  const clock = new THREE.Clock();
  let previousTime = 0;
  /**
         * Cursor / Mouse
         */
  // const cursor = useMemo({
  //   x: 0,
  //   y: 0
  // }, []);


  useEffect(() => {
    console.log('DOM in state:', dom.current);
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

        const newSection = Math.round(scrollY.current / sizes.current.height);
        if (newSection !== currentSection) {
          currentSection = newSection;
          console.log('Current section:', currentSection);
          if (vid1.current) {
            switch (currentSection) {
              case 0:
                gsap.to(vid1.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: -8,
                  y: 0,
                  z: 0,
                });
                break;

              case 1:
                gsap.from(vid1.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: -8,
                  y: 0,
                  z: 0
                });
                gsap.to(vid1.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: 1.5,
                  y: 0,
                  z: 0
                });
                gsap.to(vid1.current.rotation, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  y: -Math.PI * 0.1,
                });
                break;

              default :
                gsap.to(vid1.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: -8,
                  y: 0,
                  z: 0,
                });
                break;
            }
          }
          if (vid2.current) {
            switch (currentSection) {
              case 0:
                gsap.to(vid2.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: -8,
                  y: 0,
                  z: 6,
                });
                break;

              case 1:
                gsap.to(vid2.current.position, {
                  duration: 0.5,
                  ease: "power2.inOut",
                  x: 3,
                  y: 0,
                  z: 3,
                });
                break;
              case 2:
                gsap.to(vid2.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: 0,
                  y: 0,
                  z: -2,
                });
                gsap.to(vid1.current.rotation, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  y: -Math.PI * 0.1,
                });
                break;
              default :
                gsap.to(vid2.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: 0,
                  y: 0,
                  z: 2,
                });
                break;
            }
          }
          // if (cameraGroup.current) {
          //   switch (currentSection) {
          //     case 0:
          //       gsap.to(cameraGroup.current.rotation, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         x: 0,
          //         y: 0,
          //         z: 0,
          //       });
          //       gsap.to(cameraGroup.current.position, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         z: 0,
          //       });
          //       break;

          //     // Schedule
          //     case 1:
          //       gsap.to(cameraGroup.current.rotation, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         x: 0,
          //         y: 0,
          //         z: 0,
          //       });
          //       gsap.to(cameraGroup.current.position, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         z: 0,
          //       });
          //       break;

          //     // Workshops
          //     case 2:
          //       gsap.to(cameraGroup.current.rotation, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         x: 0,
          //         y: 0,
          //         z: 0,
          //       });
          //       gsap.to(cameraGroup.current.position, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         z: 0,
          //       });
          //       break;

          //     // Speakers
          //     case 3:
          //       gsap.to(cameraGroup.current.rotation, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         x: 0,
          //         y: 0,
          //         z: 0,
          //       });
          //       gsap.to(cameraGroup.current.position, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         z: 0,
          //       });
          //       break;

          //     // Metaverse
          //     case 4:
          //       gsap.to(cameraGroup.current.rotation, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         x: 0,
          //         y: 0,
          //         z: 0,
          //       });
          //       gsap.to(cameraGroup.current.position, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         z: 0,
          //       });
          //       break;

          //     // Chat
          //     case 5:
          //       gsap.to(cameraGroup.current.rotation, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         x: 0,
          //         y: 0,
          //         z: 0,
          //       });
          //       gsap.to(cameraGroup.current.position, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         z: 0,
          //       });
          //       break;

          //     // Chat
          //     case 6:
          //       gsap.to(cameraGroup.current.rotation, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         x: 0,
          //         y: 0,
          //         z: 0,
          //       });
          //       gsap.to(cameraGroup.current.position, {
          //         duration: 1.5,
          //         ease: "power2.inOut",
          //         z: 0,
          //       });
          //       break;
          //   }

          // }
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
        // mouse.position.x = event.clientX / sizes.current.width
        // mouse.position.y = event.clientY / sizes.current.height
        // console.log('mouse pos', mouse);
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



    // rimLight.current.position.y = (-scrollY.current / sizes.current.height) * objectsDistance;

    if (nomad.current) {
      nomad.current.position.y = -1.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.05;

      // group.current.rotation.y = elapsedTime * 0.03;
      nomad.current.rotation.z = -0.05 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
    }

    if (jetsetter.current) {
      jetsetter.current.position.y = -1 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.05;

      // group.current.rotation.y = elapsedTime * 0.03;
      jetsetter.current.rotation.z = -0.05 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
    }


  });

  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera ref={camera} makeDefault aspect={sizes.width / sizes.height} position={[0, 0, 6]} rotateX={0} rotateY={0} far={1000} filmGauge={53} />
        {/* <Stats /> */}
      </group>

      <Suspense fallback={<CanvasLoader />}>

        <fog attach="fog" args={["#88B748", 1, 15]} />
        <R3FSceneSection name="SectionOne" count={0}>

          <BabyEarthVox animate={true} position={[3, 2, -3]} />

        </R3FSceneSection>

        <R3FSceneSection name="SectionTwo" count={1}>
          <group ref={vid1} position={[2, 0, 0]}>
            <VideoScreen url={url} position={[-8, 0, 0]} />
            </group>
        </R3FSceneSection>

        <R3FSceneSection name="SectionThree" count={2}>
          <group ref={vid2} position={[0, 0, 0]}>
            <VideoScreen2 url={url2} position={[0,0,0]} />
            </group>
        </R3FSceneSection>

        <R3FSceneSection name="SectionFour" count={3}>

        </R3FSceneSection>

        <R3FSceneSection name="SectionFive" count={4}>
          <group ref={nomad} receiveShadow>
            <NomadVox route='/cv' position={[1.75, 0.5, 0.3]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
          </group>
        </R3FSceneSection>

        <R3FSceneSection name="SectionSix" count={5}>
          <BabyEarthVox position={[-1.5, -.8, -2]} animate={true} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
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
