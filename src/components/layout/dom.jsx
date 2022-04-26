import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import {
  Box,
  bgGradient
} from "@chakra-ui/react";
import {SiteHeader} from "@/components/dom/Header";
import { SiteFooter } from "@/components/dom/Footer";
import { useFrame } from '@react-three/fiber'

import { TermDefinition } from '@/components/dom/TermDefinition';
// import { AlphaNotice } from '@/components/dom/AlphaNotice';
// import { EasterEgg } from '@/components/dom/EasterEgg';

const Dom = ({ children }) => {
  const ref = useRef(null)


  useEffect(() => {
    useStore.setState({ dom: ref })

  }, [])


  return (
    <Box
      ref={ref}
      // className="scrollable"
      sx={{
        scrollSnapType: { base: "unset", md: "unset" },
        d: 'block',
        position: "relative",
        width: '100%',
        height: 'auto',
        overflowX: "hidden",
        zIndex: 2,
        m: 0,
        p: 0,
        section: {
          scrollSnapAlign: { base: "start" },
          scrollSnapStop: { base: "smooth" },
        },
      }}
    >
      <SiteHeader />
      {children}
      <SiteFooter />

      {/* <AlphaNotice /> */}
      {/* <EasterEgg /> */}
    </Box>
  )
}

export default Dom


