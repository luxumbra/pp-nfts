import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Link,
  UnorderedList,
  ListItem,
  OrderedList,
  Text,
  Button,
} from "@chakra-ui/react";
import { useOnScreen } from "@/utils/hooks";


export const AboutSection = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);

  return (
    <Box as="section" id="about">
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
            <Text as="h2">About ReVesture</Text>
            <Text>The MetaVerse is constantly expanding.  More and more Worlds are populated every day.  And in these worlds, we all want to strut our virtual stuff...</Text>
            <Box>
              <Text as="h3">
                EcoSwag
              </Text>
              <Text>
                What if you could have pixelated EcoSwag?  And what if this pixelated EcoSwag included a token verifying your carbon offset on-chain?</Text>
              <Text>And what if it also included royalty and revenue splits to your favorite regenerative project on our favorite crypto donation platform?<br />
                Yea, I’d put those kicks on with pride.  I&apos;d wear my sunglasses inside at night even.
              </Text>
              <Text>
                In the quickly changing real world, businesses and individuals alike are increasingly choosing accountability for their carbon footprint.</Text>
              <Text>ReVesture can help anyone do that with a little fun attached.</Text>

              <Text as="h3">
                Verifiable proofs via NFTs
              </Text>
              <Text>
                Offering you some flare to participate in a growing number of virtual worlds.</Text>
              <Text>If you&apos;re going to offset carbon for yourself, your business, or just to save the world...
                or if you’d like to help fund regenerative projects around the globe...why not have that come with an avatar or wearable for your avatar, usable in an eco friendly environment with every bell and whistle you can imagine and create?  <span className="gradient text">Have fun, stay grounded</span>. </Text>
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
                bg: "greenGlassAlpha",
                backdropFilter: "blur(7px)",
                borderRadius: "5px 30px 10px 0",
                boxShadow: "0 0 30px #00000070",
              }}
            >
              <Text as="h2" color="blue.100">
                Tech TL;DR
              </Text>
              <Text fontSize="inherit">
                ReVesture uses smart-contracts via artistic NFTs (non-fungible tokens) containing NCTs (Nature Carbon Tonne).
              </Text>
              <Text>NCTs are ERC-20 tokens on the Polygon blockchain backed 1:1 with a nature-based carbon token held in the Nature Carbon Pool of the <Link href="https://toucan.earth/" isExternal>Toucan Protocol</Link>.  They are redeemable for TCO2 tokens, which can be retired on-chain.</Text>
              <Text>For further information on NCT, please visit this <Link href="https://blog.toucan.earth/announcing-nct-nature-carbon-tonne/" isExternal>blog post from Toucan</Link>.</Text>
              <Text>Polygon is a blockchain dedicated to becoming carbon negative in 2022. Read all about it in their <Link href="https://polygon.technology/sustainability" isExternal>Green Manifesto</Link>.</Text>

              <Text>Wearable NFT contracts on ReVesture also allow you, upon minting, to choose from a curated list of <Link href="https://giveth.io/projects" isExternal>regenerative projects</Link> aiming to restore the Global social &amp; environmental ecosystem. <br />
              Donate % of revenue earned on first sales and/or royalties earned from secondary sales to the cause of your choosing.</Text>

              <Text className="coming-soon">Coming soon, every NFT holder will receive an additional <Link href="https://docs.openzeppelin.com/contracts/3.x/erc1155" isExternal>ERC-1152</Link> that evolves over-time based on the amount of your NCTs collected within all your ReVesture NFTs.</Text>
            </Box>

          </Container>
        </Box>
      </Box>

    </Box>
  );
};

