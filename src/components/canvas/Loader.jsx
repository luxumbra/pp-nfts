import React, { useEffect, useRef } from "react";
import { Html, useProgress } from "@react-three/drei";
import {
  Box,
  Text,
  bgGradient,
} from "@chakra-ui/react";
import gsap from "gsap";
import useStore from '@/helpers/store'

export const CanvasLoader = () => {
  const { dom } = useStore();
  const group = useRef(null);
  const loadingBar = useRef(null);
  const { active, progress, errors, item, loaded, total } = useProgress();
  let ratioLoaded = loaded / total

  useEffect(() => {
    if (ratioLoaded < 1) {
      console.log(ratioLoaded);
      if (loadingBar.current) {
        console.log(loadingBar.current);
        // loadingBar.current.style.transform = `scaleX(${ratioLoaded})`

      }
    } else {
      // loadingBar.current.style.transform = ''
    }

  }, [ratioLoaded]);

  return (
    <Html center bgGradient="linear(0deg, green.800 0%, green.300 40%)" >
      <Box width="100vw" height="100vh" d="flex" flexFlow="column wrap" alignItems="center" justifyContent="center" opacity={ratioLoaded < 1 ? 0.7 : 0} color="green.200" sx={{
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'
      }}>
        <Box d="flex" flexFlow="column wrap" w="100%" textAlign="center">
          <Text fontSize="5vw" className="gradient text" mb={0}>
            {progress.toFixed()}% loaded
          </Text>
          <Box ref={loadingBar} className="loading-bar" mb={2} height="3px" maxH="3px" width="100%" sx={{
          opacity: ratioLoaded < 1 ? 0.7 : 0,
          transform: ratioLoaded < 1 ? `scaleX(${ratioLoaded})` : 0,
          transformOrigin: ratioLoaded < 1 ? 'top left' : 'top right',
          transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'
        }} />
          <Text fontSize="0.5vw" mt={2}>{item} / {total}</Text>
        </Box>

      </Box>
    </Html>
  );
};