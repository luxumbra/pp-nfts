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
              <SimpleGrid columns={3} spacing={8}
                sx={{
                  'p + a': {
                    bg: 'green.700',
                    borderRadius: 'md',
                    color: 'white',
                    p: 1,
                  }
                }}
              >
                <Box className="lego">
                  <Text as="h4">Polygon  Blockchain</Text>
                  <Text>We chose Polygon, not only for the performance &amp; low cost of transactions but largely for their commitment to <Link href="https://polygon.technology/sustainability" isExternal>going carbon-negative in 2022</Link> - Supercharging our platform. </Text>
                  <Link href="https://polygon.technology/" isExternal><ExternalLinkIcon />Polygon</Link>
                </Box>
                <Box className="lego">
                  <Text as="h4">Third Web</Text>
                  <Text>Third Web was an obvious choice for our Web3 connectivity. We are using their SDK &amp; Smart Contracts for our Marketplace &amp; for our governance &amp; utility tokens.</Text>
                  <Link href="https://thirdweb.io/" isExternal><ExternalLinkIcon />Third Web</Link>
                </Box>
                <Box className="lego">
                  <Text as="h4">Toucan Protocol</Text>
                  <Text>Toucan&apos;s infrastructure brings programmable carbon to Web3, unlocking its potential for a regenerative economy. We see Toucan as an ideal lego for what we are building.</Text>
                  <Link href="https://toucan.earth/" isExternal><ExternalLinkIcon />Toucan Protocol</Link>
                </Box>
                <Box className="lego">
                  <Text as="h4">Giveth.io</Text>
                  <Text>We love Giveth &amp; what they stand for, so working on ways to integrate with them is very important to us.</Text>
                  <Link href="https://giveth.io/" isExternal><ExternalLinkIcon />Giveth</Link>
                </Box>
                <Box className="lego">
                  <Text as="h4">Neos VR</Text>
                  <Text>MetaGamers love NEOS &amp; some of us have been building virtual worlds since <span className="gradient metagame text">waaay</span> before &apos;<Text as="span" color="#0564DB">Meta</Text>&apos; became a buzz word.</Text>
                  <Link href="https://neos.com/" isExternal><ExternalLinkIcon />NEOS</Link>
                </Box>
                <Box className="lego">
                  <Text as="h4">Cryptovoxels</Text>
                  <Text>We 💓 voxels. Our team has been building things in CV since the start.</Text>
                  <Link href="https://www.cryptovoxels.com/play?coords=SW@385E,108S" isExternal><ExternalLinkIcon />Cryptovoxels</Link>
                </Box>
                <Box className="lego">
                  <Text as="h4">MetaGame</Text>
                  <Text>The best community &amp; project - the ReVesture team all met in MetaGame &amp; are members of the Regen Guild in MetaGame.</Text>
                  <Link href="https://giveth.io/project/metagame-0" isExternal><ExternalLinkIcon />MetaGame Giveth</Link>
                </Box>
                <Box className="lego">
                  <Text as="h4">Moloch Cloudship</Text>
                  <Text>A DAO, a virtual world, virtual offices, co-working spaces &amp; insane amounts of fun.</Text>
                  <Link href="https://giveth.io/donate/Moloch-Cloudship-0" isExternal><ExternalLinkIcon />Cloudship Giveth</Link>
                </Box>
                <Box className="lego">
                  <Text as="h4">ReFiDAO 🌱</Text>
                  <Text>We&apos;ve loved being part of the Planet Positive NFT hackathon &amp; I know we&apos;ll be grateful to you guys for a long time to come. Thank you. 🙏</Text>
                  <Link href="https://refidao.com/" isExternal><ExternalLinkIcon />RefiDAO</Link>
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
              }}
            >
              <Text as="h2" color="blue.300">
                In the future
              </Text>
              <SimpleGrid columns={2} spacing={4}>
                <Box className="lego">
                  <Text as="h4">Gnosis (Formerly xDai)</Text>
                  <Text>We&apos;re big fans of the Gnosis ecosystem &amp; see a bridge in the future with cross-chain functionality for ReVesture.</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">Cosmos</Text>
                  <Text>We&apos;re new to Cosmos but continue hearing great things, so expect cross-chain support with these guys soon<span role="img" aria-label="Soon, we promise">™️</span> (See <Link href="#roadmap">Roadmap</Link>).</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">MetaFactory</Text>
                  <Text>MF have been at the fore of the digi-physical game for a relative age. One could say that they&apos;re the OGs of the space. Watch this space for IRL wearables to go with your Metaverse EcoSwag.</Text>
                </Box>
              </SimpleGrid>
            </Box>
            <Box
              maxW={{ base: '100%', md: 'xl' }}
              h="100%"
              p={{ base: 0 }}
              py={{ base: 8, md: 8 }}
              textAlign="left"
              className=""
            >
              <Text as="h3" color="blue.300">
                Toolbox 🛠️
              </Text>
              <SimpleGrid columns={3} spacing={4}>
                <Box className="lego">
                  <Text as="h4">Blender</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">MagicaVoxel</Text>
                </Box>
                <Box className="lego">
                  <Text as="h4">Goxel</Text>
                </Box>
              </SimpleGrid>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};