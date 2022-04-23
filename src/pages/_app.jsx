import "@/styles/App.css";
import React, { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import { HeadComponent } from "@/components/dom/HeadComponent";
import Dom from '@/components/layout/dom'
import partition from '@/helpers/partition'
import dynamic from 'next/dynamic'
import { settings } from '@/seo.config';
import SocialImg from "@/static/assets/img/social.png";

import {
  ChakraProvider, CSSReset, extendTheme,
  bgGradient,
  textGradient,
} from "@chakra-ui/react";
import { PPTheme } from '@/theme/theme';

const theme = extendTheme({
  ...PPTheme,
  styles: {
    global: {
      html: {
        bgGradient: `linear(0deg, ${PPTheme.colors.green[400]} -29.22%, ${PPTheme.colors.green[800]} 107.53%)`,
        scrollBehavior: "smooth",
      },
      body: {
        bgGradient: `linear(0deg, ${PPTheme.colors.green[400]} -29.22%, ${PPTheme.colors.green[800]} 107.53%)`,
        color: "white",
        fontFamily: '"Exo 2", sans-serif',
        fontSize: "16px",
        fontWeight: 400,
        p: 0,
        m: '0 auto',
        minH: "100vh",
        width: '100%',
        // overflowY: "auto",
        '.loading-canvas': {
          '.dom-loader': {
            opacity: 1,
            zIndex: 4000,
          }
        },
        '.dom-loader': {
          position: 'fixed',
          opacity: 0,
          top: 0,
          left: 0,
          zIndex: -200,
          transition: 'all 0.5s ease'
        }
      },
      // "body *": {
      //   outline: "1px solid red",
      // },
      // '#root': {
      //   width: '100%',
      // },
      a: {
        color: "green.500",
        textDecoration: "none",
        transition: "color 0.2s ease",
        _hover: {
          color: "green.600",
          textDecoration: "none",
        },
        "&.chakra-link": {
          color: "green.500",
          _hover: {
            color: "green.600",
            textDecoration: "none",
          },
        },
      },
      h1: {
        color: "green.100",
        fontSize: "4vw",
        lineHeight: '1.2',
        fontWeight: 900,
        "& span": {
          color: "green.100",
          fontSize: "4vmax",
          fontWeight: 700,
        },
        '& + .fest-dates': {
          fontWeight: 700,
          justifyContent: "right",
          opacity: 0.7,
          transform: {
            base: "translateY(5px)",
            lg: "translateY(9px)",
            "2xl": "translateY(15px)",
          },
        }
      },
      h2: {
        color: "green.500",
        fontSize: "3vw",
        fontWeight: '900',
        filter: "drop-shadow(0 0 1px rgba(0,0,0,0.6))",
        "& + p": {
          fontSize: { base: "2.8vmin", md: "1.3vmax" },
          lineHeight: { base: "1.2", md: "inherit" },
          mt: 0,
          mb: 1,
        },
      },
      h3: {
        fontSize: { base: "4vmin", md: "1.5vmax" },
        fontWeight: 700,
        mt: { base: 2, md: 5 },
        "& + p": {
          fontSize: { base: "2.8vmin", md: "1vmax" },
          lineHeight: { base: "1.2", md: "inherit" },
          fontWeight: 500,
          mt: 0,
          mb: 1,
        },
      },
      h4: {
        fontSize: "1vmax",
        fontWeight: 700,
      },
      p: {
        fontSize: { base: "2.6vmin", md: ".8vmax" },
        filter: "drop-shadow(0 0 1px rgba(0,0,0,0.6))",
      },
      nav: {
        a: {
          _hover: {
            bgGradient: `linear(-90deg, ${PPTheme.colors.green[400]} -29.22%, ${PPTheme.colors.green[800]} 107.53%)`,
            bgClip: "text",
          }

        },
      },
      section: {
        position: "relative",
        display: 'flex',
        alignItems: "center",
        h: '100vh',
        w: '100vw',
        m: 0,
        py: 0,
        px: { base: 4, lg: '10%' },
        zIndex: 2000,
      },
      ".__content__body": {
        "& > p:first-of-type": {
          fontSize: { base: "2.6vmin", md: "1vmax" },
          fontWeight: 500,
        },
        "&--no-firstof": {
          p: {
            fontSize: { base: "2.6vmin", md: "0.9vmax" },
            fontWeight: 500,
            "& + p": {
              fontWeight: 400,
            },
          },
        },
      },
      // Gradients
      ".gradient": {
        bgGradient: `linear(90deg, ${PPTheme.colors.green[600]} -29.22%, ${PPTheme.colors.green[700]} 107.53%)`,
        '&.text': {
          position: 'relative',
          display: "inline-block",
          bgClip: "text",
          textShadow: 'unset',
          zIndex: 20001,
          filter: "drop-shadow(0 0 1px rgba(0,0,0,0.6))",
        }
      },
      ".gradient2": {
        bgGradient:
        `linear(90.24deg, ${PPTheme.colors.green[500]} 0.3%, ${PPTheme.colors.green[600]} 55.76%, ${PPTheme.colors.yellow[900]} 106.78%)`,
        '&.text': {
          display: "inline-block",
          backgroundPosition: "center",
          backgroundSize: "100%",
          backgroundClip: "text",
          textShadow: 'unset',
          filter: "drop-shadow(0 0 1px rgba(0,0,0,0.8))",
        }
      },
      ".gradient-cone": {
        background:
        `conic-gradient(from 92.2deg at 60.45% 74.83%, ${PPTheme.colors.green[700]} 0deg, ${PPTheme.colors.green[400]} 88.12deg, ${PPTheme.colors.yellow[700]} 105deg, ${PPTheme.colors.yellow[400]} 165deg, ${PPTheme.colors.orange[700]} 251.25deg, ${PPTheme.colors.orange[400]} 286.87deg, ${PPTheme.colors.green[400]} 326.25deg, ${PPTheme.colors.green[700]} 360deg)`,
        '&.text': {
          display: "inline-block",
          backgroundPosition: "-254%",
          backgroundSize: "100%",
          backgroundClip: "text",
          transition: "background 0.3s ease",
          textShadow: 'unset',
          filter: "drop-shadow(0 0 1px rgba(0,0,0,0.6))",
        }
      },
      '.loading-bar': {
        bgGradient: `linear-gradient(90deg, ${PPTheme.colors.green[400]} -29.22%, ${PPTheme.colors.green[800]} 107.53%)`,
      },
      ".highlight": {},
      ".fest-dates": {
        d: "inline-flex",
        width: "100%",
        color: `${PPTheme.colors.blue[700]}`,
        fontSize: { base: "2.2vmin", md: "0.7vmax" },
        fontWeight: 500,
        justifyContent: "left",
        opacity: 0.8,
        pr: 0.5,
        transform: {
          base: "translateY(7px)",
          lg: "translateY(9px)",
          "2xl": "translateY(8px)",
        },
        zIndex: 2001,
      },
    },
  },
});

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

const Balance = ({ child }) => {
  const [r3f, dom] = partition(child, (c) => c.props.r3f === true)

  return (
    <>
      <Dom>{dom}</Dom>
      <LCanvas>{r3f}</LCanvas>
    </>
  )
}

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()
  const curURL = useRef(null);
  let host = curURL ?? curURL.current;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getHostname = () => {
        if (typeof window !== "undefined") {
          curURL.current = window.location.origin;
          // console.log(window.location);
          // return host;
          return null;
        }
      };
      getHostname();
    }
  }, [curURL]);


  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  const child = Component(pageProps).props.children

  return (
    <>
      <CSSReset />
      <ChakraProvider theme={theme}>
        <HeadComponent />
        <Balance child={child} />
      </ChakraProvider>
    </>
  )
}

export default App

