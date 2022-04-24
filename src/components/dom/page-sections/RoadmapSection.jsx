
import React, { useRef, useState } from "react";

import {
  Badge,
  Box,
  Button,
  Flex,
  Stack,
  Container,
  SimpleGrid,
  StackDivider,
  Text,
  useBreakpointValue,
  Icon,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import {
  AirtableSpeakerInstance,
  AirtableContributorInstance,
  AirtablePerformerInstance,
  AirtableSponsorInstance,
  AirtableFairInstance,
} from "../integrations/AirtableInstance";
import { useOnScreen } from "@/utils/hooks";
import { BoxedNextImage } from "@/components/dom/BoxedNextImage";

import SpeakerIcon from "@/static/assets/img/icons/forum.svg"
import ContributorIcon from "@/static/assets/img/icons/players.svg"
import PerformerIcon from "@/static/assets/img/icons/xpearned.svg"
import SponsorIcon from "@/static/assets/img/icons/patrons.svg"
import FairIcon from "@/static/assets/img/icons/welcometometagame.svg"
import { BsFillPinMapFill } from 'react-icons/bs';
import { GiPineTree, GiPollenDust, GiFallingLeaf } from 'react-icons/gi';


export const RoadmapSection = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);

  return (
    <Box as="section" id="roadmap" position="relative">
      <Box
        ref={ref}
        className="__content"
        width="100%"
        transform={`translate3d(${onScreen ? 0 : "-70px"}, 0, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
        willChange={true}
      >
        <Box className="__content__body" d={{ base: 'unset', md: "flex" }} w="100%" flexFlow={{ base: 'column wrap', md: "row nowrap" }} alignItems="center" justifyContent="space-between">
          <Container
            maxW={{ base: '100%', md: "2xl" }}
          >
            <Text
              as="h2"
            >
              Roadmap
            </Text>
            {/* <span className="fest-dates">9 - 23rd JUNE</span> */}
          </Container>
          <Container maxW={{ base: '100%', md: "4xl" }} h="100%" p={0} mt={{ base: 5, md: 0 }}>
            <Box
              maxW={{ base: '100%', md: "100%" }}
              h="100%"
              border="2px solid"
              borderColor="green.500"
              borderWidth="0 0 0 5px"
              p={{ base: 8, md: 4 }}
              sx={{
                bg: "rgba(38,52,20,0.3)",
                backdropFilter: "blur(7px)",
                borderRadius: "5px 30px 10px 5px",
                boxShadow: "0 0 30px #00000070",
              }}
            >
              <Stack spacing={{ base: 2, md: 0 }} ml={-4} >
                <Box d="inline-flex" alignItems="center" ml={4}>
                  <Icon as={GiPollenDust} w={"30px"} h={"30px"} color="green.200" />
                  <Text as="h3" mt={1} color="green.300" >
                    <span>Phases of ReVesture</span>

                  </Text>
                  <Icon as={GiPineTree} w={"30px"} h={"30px"} color="green.500" />

                </Box>
                <Stack spacing={0} >
                  {timeline && timeline.map((item, index) => (
                    <Feature key={index} phase={item} />
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Container>

        </Box>
      </Box>
    </Box>
  );
};

export const Feature = (props) => {
  const responsiveSize = useBreakpointValue({ base: 'xs', md: 'sm' })
  const { quarter, title, description, status } = props.phase


  return (
    <Box
      d="flex"
      flexDirection={responsiveSize === 'xs' ? 'column' : 'row'}
      alignItems="flex-start"
      px={0}
      py={5}
      borderRadius=" 0 10px 10px 0"
      borderLeft="0px solid"
      borderColor={status === 1 ? 'green.500' : 'blue.500'}
    >
      <Box flex="0 0 25%" >
        <Badge colorScheme={status ? "green" : "ghost"} ml={3} variant="solid">{quarter}</Badge>
        <Text fontWeight={500} fontSize={{ base: '4vmin', md: '1.2vmax' }} flex={1}
          pl={3}
          sx={{
            borderBottom: '2px solid',
            borderColor: status === 1 ? 'green.400' : 'transparent',
            filter: status === 1 ? 'drop-shadow(0px 0px 1px rgba(0,0,0,0.6))' : 'drop-shadow(0px 0px 10px transparent)',
          }}
        >
          {title}
        </Text>
        {status === 1 && <Text ml={3} color="green.700" textShadow="none" filter="none">In progress</Text>}
      </Box>
      <Box p={3} border="1px solid" borderColor={status ? 'green.400' : 'transparent'} borderRadius="md" className={status === 1 ? "gradient" : "transparent"} boxShadow={status === 1 ? "0 0 3px rgba(0,0,0,0.6)" : 'unset'}>
        <UnorderedList d="flex"
          flexFlow="row wrap"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          {description && description.map((item, index) => (
            <ListItem key={index} w="48%" my={0}>
              <Text as="span" >{item}</Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  );
};

/**
 * timeline
 *
 * Statuses:
 * 0 - not started
 * 1 - in progress
 * 2 - completed
 */
export const timeline = [
  {
    quarter: "Q2 2022",
    title: "Phase One",
    description: [
      "Build the website and NFT marketplace.",
      "Launch first NFTs & matching Wearables",
      "Integrate with Toucan NCTs",
      "Wearables useable in Cryptovoxels & NeosVR",
      "Inspire new Artists",
      "Promote Carbon Negative Minting",
      "Win the Planet NFT Hackathon",
      "Find more Partners & Legos",
      "NFT Auction & Wearable Raffle Giveaway at MetaFest2"
    ],
    status: 1,
  },
  {
    quarter: "Q3 2022",
    title: "Phase Two",
    description: [
      "Create in-world virtual Wearable Marketplace",
      "Expand Cross-Chain (Ethereum, Gnosis, Cosmos)",
      "Encourage and Build Bridges between Chains",
      "Giveth Integration",
    ],
    status: 0,
  },
  {
    quarter: "Q4 2022",
    title: "Phase Three",
    description: [
      "Offer multi-chain options directly on DAO platforms such as DAOhaus",
      "For organizations to offset their carbon footprint while receiving branded wearable NFTs for their members",
      "Create erc-1152 NFTs that evolve over time corresponding to your total NCTs"
    ],
    status: 0,
  },
  {
    quarter: "Q1 2023",
    title: "Phase Four",
    description: [
      "Offer Workshops in VR spaces for wearable design",
      "Sponsor Tech And Web3 Youth Education Events",
    ],
    status: 0,
  },
];