import React, { useRef } from "react";
import {
  Box,
  Button,
  Link,
  Text,
  HStack,
  useBreakpointValue,
  Icon,
  OrderedList,
  UnorderedList,
  ListItem
} from "@chakra-ui/react";
import { useOnScreen } from "@/utils/hooks";
import {FaGlobeEurope, FaGlobeAmericas, FaGlobeAsia, FaGlobeAfrica} from 'react-icons/fa'

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
            ReVesture<span role="img" aria-label="Tree mascot" className="gradient text noshadow">🌳</span>
          </Text>
          <span className="fest-dates">Earth Day 2022 {' '} <Icon as={FaGlobeAmericas} w={5} h={5} /> </span>
        </Box>
        <Box className="__content__body" maxW={{base: '66vw', lg: 'unset'}}>
          <Text as="p" fontWeight={300} mt={-4}>
            powered by{" "}
            <Text as="span"  fontWeight={900} className="gradient text">Regen Guild</Text>
          </Text>
          <Text as="p" fontSize="1.5vmax" mt={{base: 3, md: 0}} fontWeight={500} lineHeight={1.2}>
            Clothe your jester avatar, offer a loving irl gesture, all in one <span className="gradient text"> carbon negative</span> transaction.
          </Text>
          <Text as="p" fontSize={{base: '3vmin', lg: 'inherit' }} >
            <span className="gradient text">Every NFT</span> on ReVesture <span className="gradient text">offsets carbon</span> &amp; helps to fund <span className="gradient text">regenerative projects</span>.
          </Text>
          <HStack mt={5}>
            <Link href="#marketplace"><Button colorScheme="green" bgGradient="linear(-90deg, green.500 -29.22%, green.900 107.53%)" size={buttonSize}>Browse NFTs</Button></Link>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
