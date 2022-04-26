import React, { useRef } from "react";
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  Stack,
  ButtonGroup,
  IconButton
} from "@chakra-ui/react";
import { useOnScreen } from "@/utils/hooks";
import { BoxedNextImage } from "@/components/dom/BoxedNextImage";
import { TermDefinition } from '@/components/dom/TermDefinition';
import { GiFruitTree, GiPineTree, GiWillowTree } from 'react-icons/gi';
import { CgTree, CgTrees } from 'react-icons/cg';
import { BsDiscord, BsGithub, BsTwitter } from 'react-icons/bs';
import { FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa'
import OctopusImg from "@/static/assets/img/octopus.png";
// import MetaGameLogo from '../static/assets/img/logo.png'

export function SiteFooter() {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);

  return (
    <Box
      ref={ref}
      as="footer"
      bg="transparent"
      position="absolute"
      bottom={0}
      left={0}
      px={4}
      w="100vw"
      h={{ base: 'auto' }}
      // transform={{md: `translate3d(0, ${onScreen ? 0 : "70px"}, 0)`}}
      opacity={onScreen ? 1 : 0}
      transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.3s ease-in"
      zIndex={2010}
      sx={{
        a: {
          color: "white",
        },
      }}
    >
      <Stack spacing={{ base: '4', md: '5' }} zIndex={5}>
        <Stack justify="space-between" direction="row" align="center">
          <Flex alignItems={"center"}>
            <Link href="/#home" flex={{ base: 1 }} fontWeight={900} fontSize={{ base: '1vw' }}>
              <span className="gradient-cone text">ReVesture</span>
            </Link>
          </Flex>

          <ButtonGroup variant="ghost" >
            <IconButton
              as="a"
              href="#"
              color="green.400"
              aria-label="Github"
              colorScheme="ghost"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton as="a" href="#" aria-label="Discord" colorScheme="ghost" icon={<FaDiscord fontSize="1.25rem" />} />
            <IconButton
              as="a"
              href="#"
              aria-label="Twitter"
              colorScheme="ghost"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>

      </Stack>
      <Text className="gradient2 text" mx="auto" ><span className="gradient2 text"><span role="img" aria-label="Tree mascot">🌳</span> &copy; {new Date().getFullYear()} RegenGuildDAO <span role="img" aria-label="Tree mascot">🌳</span></span></Text>
      <Box className="trees" position="absolute" bottom={0} left={0} w="100%" textAlign="center" zIndex={1}>
        <Icon
          as={GiPineTree}
          color="green.800"
          boxSize={{ base: '90px', md: "150px" }}
          position="absolute"
          bottom={0}
          left={{ base: "calc(50% - 45px)", md: "calc(50% - 75px)" }}
          zIndex={1}
        />
        <Icon
          as={GiPineTree}
          color="green.600"
          boxSize={{ base: '90px', md: "115px" }}
          position="absolute"
          bottom={0}
          left={{ base: "calc(50% - 45px)", md: "calc(48% - 57px)" }}
          zIndex={2}
        />
        <Icon
          as={GiPineTree}
          color="green.400"
          boxSize={{ base: '90px', md: "75px" }}
          position="absolute"
          bottom={0}
          left={{ base: "calc(50% - 45px)", md: "calc(48% - 75px)" }}
          zIndex={3}
        />


        <Icon
          as={GiPineTree}
          color="green.600"
          boxSize={{ base: '90px', md: "115px" }}
          position="absolute"
          bottom={0}
          left={{ base: "calc(50% - 45px)", md: "calc(51% - 57px)" }}
          zIndex={2}
        />
        <Icon
          as={GiPineTree}
          color="green.400"
          boxSize={{ base: '90px', md: "75px" }}
          position="absolute"
          bottom={0}
          left={{ base: "calc(50% - 45px)", md: "calc(55% - 75px)" }}
          zIndex={3}
        />
      </Box>
      <Box position="absolute" bottom={0} left={0} w="100vw" textAlign="right" px={{ base: 3, md: 6 }} zIndex={5}>
        <Text className="gradient2 text" mx="auto" p={0} ><Link href="https://revesture.earth" className="gradient2 text" isExternal>revesture.earth</Link> <span role="img" aria-label="Tree mascot">🌳</span></Text>
      </Box>
      <TermDefinition />
    </Box>
  );
}

export const MenuIcon2SVG = ({ toggle }) => (
  <Box>
    <Box
      as="svg"
      w={{ base: "2.25rem", xl: "2.5rem", "4xl": "2.9rem" }}
      position="absolute"
      ml={0.5}
      mt={0.5}
      left={0}
      bottom={0}
      top={0}
      transition="transform 0.5s ease"
      transform={toggle ? "rotate(-90deg)" : "rotate(0)"}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 48 48"
    >
      <path
        d="M46.8937 23.64C46.8937 36.4827 36.4827 46.8937 23.64 46.8937C10.7973 46.8937 0.386262 36.4827 0.386262 23.64C0.386262 10.7973 10.7973 0.386262 23.64 0.386262C36.4827 0.386262 46.8937 10.7973 46.8937 23.64Z"
        stroke="white"
        strokeOpacity={0.9}
        strokeWidth={1}
      />
      <path
        d="M32.6262 20.7609L13.8833 20.7612"
        className="top-line"
        stroke="white"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={
          toggle
            ? "M32.6258 27.5447L13.8835 27.5447"
            : "M26.7258 27.5447L13.8835 27.5447"
        }
        className="bottom-line"
        stroke="white"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  </Box>
);
