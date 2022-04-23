import React, { useRef } from "react";
import {
  Box,
  Button,
  Link,
  Text,
  HStack,
  useBreakpointValue
} from "@chakra-ui/react";
import { useOnScreen } from "@/utils/hooks";


export const HomeSection = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'lg' })


  return (
    <Box
      as="section"
      id="home"
      alignContent="center"
      justifyContent="flex-start"
    >
      <Box
        ref={ref}
        position="relative"
        className="__content"
        maxW={{base: '100%', md: "3xl"}}
        opacity={onScreen ? 1 : 0}
        transform={`translate3d(${onScreen ? 0 : "-70px"}, 0, 0)`}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"

      >
        <Box
          d="inline-flex"
          flexFlow="column-reverse wrap"
          alignItems="flex-start"
          width="auto"
        >
          <Text
            as="h1"
            className="gradient-cone text"
            overflow="visible"
            sx={{
              position: "relative",
              mb: 0,
              strong: {
                d: "block",
                fontWeight: 700,
              },
              em: {
                fontStyle: "normal",
              },
            }}
          >
            Regenz🐙
          </Text>
          <span className="fest-dates">Earth Day 2022</span>
        </Box>
        <Box className="__content__body" maxW={{base: '66vw', lg: 'unset'}}>
          <Text as="p" fontWeight={300} mt={-4}>
            powered by{" "}
            <Text as="span" fontWeight={900} className="gradient text">
              MetaGame
            </Text>
          </Text>
          <Text as="p" fontSize="1.5vmax" mt={{base: 3, md: 6}} fontWeight={500}>
            Offset your carbon footprint, own art...all in one step.
          </Text>
          <Text as="p" fontSize={{base: '3vmin', lg: 'inherit' }} >
            Every NFT on Regenz{" "}
            <Text as="span" className="gradient text">
              offsets carbon
            </Text>{" "}
            &{" "}
            <Text as="span" className="gradient text">
              helps to fund restorative projects
            </Text>
            .
          </Text>
          <HStack mt={5}>
            <Link href="#marketplace"><Button colorScheme="green" size={buttonSize}>Browse NFTs</Button></Link>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};