import React, { useRef } from "react";
import {
  Container,
  Box,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";
import { useOnScreen } from "@/utils/hooks";


export const MissionSection = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);

  return (
    <Box as="section" id="mission">
      <Box
        ref={ref}
        className="__content"
        w={{ base: "100%" }}
        transform={`translate3d(${onScreen ? 0 : "70px"}, 0, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
      >

        <Box className="__content__body" d={{ base: 'unset', md: "flex" }} minW="100%" flexFlow={{ base: 'column wrap', md: "row nowrap" }} alignItems="flex-start" justifyContent="space-between">
          <Container
            maxW={{ base: '100%', md: "50%" }}

          >
            <Text as="h2">Mission</Text>
            <Text>
              Our mission is pretty simple yet highly complex,<br />with a dash of fun!
            </Text>
            <Box>
              <Text as="h3">
                Simple bits
              </Text>
              <Text>
                To help everyone reduce &amp; remove global carbon emissions &amp; support regenerative projects around the globe. 🌎
              </Text>

              <Text as="h3">
                Trickier bits
              </Text>
              <Text>Nicely packaging that ability into an artistic NFT, using innovative Web3 &amp; blockchain technologies. Digi-physical pairing of real world actions &amp; assets <br /> to new virtual realities.</Text>

              <Text as="h3">
                Dash of fun...
              </Text>
              <Text>Interacting with this NFT in the virtual MetaVerse. Wear it. Be it. Walk inside of it.</Text>
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
              <Text as="h2">Vision</Text>
              <Text>We see a future of interwoven inner &amp; outer worlds - vibrant and playful.</Text>
              <Text>Full of smiling faces, virtual and real, with a sense of adventure &amp; fun.</Text>
              <Text className="">Celebrating our collective accomplishments of consciously restoring our Planet.</Text>
              <Text>ReVesture aims to remind us all...</Text>
              <Text className="gradient text">Have fun, stay grounded.</Text>
              <Text>Explore new <span className="gradient text">VR worlds</span>, <span className="gradient text">dream beyond your dreams</span> ... but don&apos;t forget, we sort of over-did-it on the one we are all standing on.</Text>
            </Box>
          </Container>

        </Box>
      </Box>
    </Box>
  );
};