import React, { useRef, useState } from "react";
import { Container, Box, Button, Link, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import ChatInstance from "@/components/dom/integrations/ChatInstance";
import { useOnScreen } from "@/utils/hooks";

export const ArtistsSection = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const [open, setOpen] = useState(false);

  const toggleChat = () => {
    setOpen(!open);
    if (typeof window !== "undefined") {
      const body = document.querySelector("body");
      body.classList.toggle("chat-open");
    }
  };

  return (
    <Box
      as="section"
      id="artists"
      justifyContent={{ base: "flex-end", lg: "inherit" }}
    >
      <Box
        ref={ref}
        className="__content"
        transform={`translate3d(${onScreen ? 0 : "-70px"}, 0, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
      >
        <Box className="__content__body" d={{ base: 'unset', md: "flex" }} minW="100%" flexFlow={{ base: 'column wrap', md: "row nowrap" }} alignItems="flex-start" justifyContent="space-between">
          <Container
            maxW={{ base: '100%', md: "50%" }}

          >
            <Text as="h2">For Artists</Text>
            <Text>
              Are you a 3D modeling wizard?  A voxel renaissance sculptor?  A pixel throwing punk?
            </Text>
            <Box>
              <Text as="h3">
                Calling all artists!
              </Text>
              <Text>Do you create avatars and wearables for virtual spaces? Maybe build skyscrapers on parcels in various MetaVerses? Well, that&apos;s pretty cool. Seriously!</Text>
              <Text>And now, you can mint those MetaVerse NFTs with attached on-chain carbon offset tokens, while supporting regenerative projects for the better of the Earth. Well, that&apos;s pretty frikin cool also.</Text>


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
                borderLeft: "2px solid green.400"
              }}
            >
              <Text as="h2">The Process</Text>
              <Text>We&apos;re still building but will be updating these sort of things as we implement them.</Text>
            </Box>
          </Container>

        </Box>
      </Box>
    </Box>
  );
};





