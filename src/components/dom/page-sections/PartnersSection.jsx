import React, { useRef, useState } from "react";
import {
  Container,
  Box,
  Button,
  Link,
  Text,
  UnorderedList,
  ListItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  CryptovoxelsHQInstance,
  CryptovoxelsJobFairInstance,
} from "@/components/dom/integrations/CryptovoxelsInstance";
import { useOnScreen } from "@/utils/hooks";
import useStore from '@/helpers/store'


export const PartnersSection = () => {
  const router = useStore((s) => s.router);
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const [openHQ, setOpenHQ] = useState(false);
  const [openFair, setOpenFair] = useState(false);

  return (
    <Box
      as="section"
      id="legos"
      justifyContent={{ base: 'flex-end', lg: 'inherit' }}
    >
      <Box
        ref={ref}
        className="__content"
        w={{ base: '100%' }}
        transform={`translate3d(${onScreen ? 0 : "-70px"}, 0, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
      >
        <Box className="__content__body" d={{ base: 'unset', md: "flex" }} flexFlow={{ base: 'column wrap', md: "row nowrap" }} alignItems="flex-start" justifyContent="space-between">
          <Container
            maxW={{ base: '100%', md: "50%" }}
          >
            <Text as="h2">The Legos</Text>
            <Text>ReVesture sees all the worlds pulling together as One.  All the blocks stacking to a brighter future. </Text>
            <Box mt={5}>
              <SimpleGrid columns={3} spacing={8}>
                <Box className="lego">
                  <Text as="h4">Polygon  Blockchain</Text>
                  <Text>We chose Polygon for their committment to <Link href="https://polygon.technology/sustainability" isExternal>going carbon-negative in 2022</Link>.</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">Third Web</Text>
                  <Text>Third Web was an obvious choice for our Web3 connectivity. We are using their SDK and Smart Contracts.</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">Toucan Protocol</Text>
                  <Text>Toucan’s infrastructure brings programmable carbon to Web3, unlocking its potential for a regenerative economy.</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">Giveth.io</Text>
                  <Text>We love Giveth and what they stand for, so working on ways to integrate with them is a no-brainer.</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">Neos VR</Text>
                  <Text>MetaGamers love NEOS and some of us have been building virtual worlds since waaay before &apos;Meta&apos; became a buzz word.</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">Cryptovoxels</Text>
                  <Text>We love our voxels.</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">MetaGame</Text>
                  <Text>The ReVesture team all met in MetaGame and are members of the Regen Guild.</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">Moloch Cloudship</Text>
                  <Text>A DAO, a virtual world, virtual offices, co-working spaces and insane amounts of fun.</Text>
                </Box>
              </SimpleGrid>
            </Box>
          </Container>
          <Container maxW={{ base: '100%', md: "50%" }} h="100%" p={0} mt={{ base: 5, md: 0 }} align="right">
            <Box
              maxW={{ base: '100%', md: 'xl' }}
              h="100%"
              p={{ base: 8, md: 8 }}
              textAlign="left"
              className=""
              sx={{
                bg: "rgba(38,52,20,0.3)",
                backdropFilter: "blur(7px)",
                borderRadius: "5px 30px 10px 0",
                boxShadow: "0 0 30px #00000070",
                borderLeft: "2px solid green.400"
              }}
            >
              <Text as="h2" color="blue.300">
                In the future
              </Text>
              <SimpleGrid columns={2} spacing={4}>
                <Box className="lego">
                  <Text as="h4">Gnosis (Formerly xDai)</Text>
                  <Text>We&apos;re big fans of the Gnosis ecosystem and see a bridge in the future and cross-chain functionality for ReVesture</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">Cosmos</Text>
                  <Text>We&apos;re new to Cosmos but continue hearing great things, so expect cross-chain support with these guys soon<span role="img" aria-label="Soon, we promise">™️</span> (See <Link href="#roadmap">Roadmap</Link>).</Text>
                </Box>
              </SimpleGrid>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};