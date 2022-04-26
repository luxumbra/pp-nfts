
import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Badge,
  Box,
  Button,
  Flex,
  Stack,
  Container,
  SimpleGrid,
  StackDivider,
  IconButton,
  Text,
  useBreakpointValue,
  Icon,
  UnorderedList,
  ListItem,
  useDisclosure,
  VStack,
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
import useStore from '@/helpers/store'
import SpeakerIcon from "@/static/assets/img/icons/forum.svg"
import ContributorIcon from "@/static/assets/img/icons/players.svg"
import PerformerIcon from "@/static/assets/img/icons/xpearned.svg"
import SponsorIcon from "@/static/assets/img/icons/patrons.svg"
import FairIcon from "@/static/assets/img/icons/welcometometagame.svg"
import { BsFillPinMapFill } from 'react-icons/bs';
import { WiHorizonAlt, WiHot, WiHorizon } from 'react-icons/wi';
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
        <Box className="__content__body" d={{ base: 'unset', md: "flex" }} flexFlow={{ base: 'column nowrap', '2xl': "row nowrap" }} alignItems={{ base: "flex-start", '2xl': 'center' }} justifyContent="space-between">
          <Container
            justifyContent="left"
            maxW={{ base: '100%', md: 'md', '2xl': "50%" }}
          >
            <Text
              as="h2"
            >
              Roadmap
            </Text>
          </Container>
          <Container
            alignContent="flex-start"
            justifyContent="right"
            maxW={{ base: '100%', md: 'md', '2xl': "50%" }}
            height="100%"
          >
            <Box
              className="roadmap"
              position="relative"
              maxW={{ base: '100%', md: "100%" }}
              border="2px solid"
              borderColor="green.500"
              borderWidth="0 0 0 5px"
              p={{ base: 8, md: 8 }}
              sx={{
                bg: "greenGlassAlpha",
                backdropFilter: "blur(7px)",
                borderRadius: "5px 30px 10px 5px",
                boxShadow: "0 0 30px #00000070",
              }}
            >
              <Stack spacing={{ base: 2, md: 0 }} align="center" py={8}>
                <Box d="inline-flex" alignItems="center" mb={5}>
                  <Icon as={GiPollenDust} w={"30px"} h={"30px"} color="green.500" />
                  <Text as="h3" mt={1} className="gradient2 text noshadow" >
                    <span>Phases of ReVesture</span>
                  </Text>
                  <Icon as={GiPineTree} w={"30px"} h={"30px"} color="blue.500" />
                </Box>
                <SimpleGrid  className="timeline-grid" spacing={19} columns={timeline.length} w="auto" >
                  {timeline && timeline.map((item, index) => (
                    <Feature key={index} phase={item} id={index} />
                  ))}
                </SimpleGrid>
              </Stack>
            </Box>
          </Container>

        </Box>
      </Box>
    </Box>
  );
};

export const Feature = (props) => {
  const [open, setOpen] = useState(false);
  const node = useRef(null);
  const nodeInfo = useRef(null);
  const item = useRef(null);
  const onScreen = useOnScreen(node);
  const responsiveSize = useBreakpointValue({ base: 'xs', md: 'sm' })
  const { quarter, title, description, status } = props.phase
  const { id } = props
  const cursor = useRef({ x: 0, y: 0 })
  const sizes = useRef({ width: 0, height: 0 })
  // const parentWidth = useRef(0)
  const dom = useStore((state) => state.dom);
  // console.log(dom);
  const handleMouseMove = useCallback((e) => {
    if (cursor.current && nodeInfo.current) {
      let offset = cursor.current;
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
      // console.log(cursor.current);

    }
  }, [])

  const handleOpen = () => {
    if (typeof window !== 'undefined') {
      const rmContainer = document.querySelector('.roadmap');
      console.log('rm', rmContainer);
      if (node.current && nodeInfo.current && item.current, rmContainer) {
        gsap.to(nodeInfo.current, {
          duration: 0.3,
          delay: 0,
          ease: "elastic.inOut(1, 0.3)",
          x: -  rmContainer.offsetLeft,
          y: - rmContainer.offsetTop,
          scale: 1,
          opacity: 1,
          zIndex: 2000,
          width: rmContainer.offsetWidth,
        })

      }
    }
  }

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      const rmContainer = document.querySelector('.roadmap');
      if (node.current && nodeInfo.current && item.current) {
        gsap.to(nodeInfo.current, {
          duration: 0.3,
          delay: 0,
          ease: "elastic.inOut(1, 0.3)",
          x: - rmContainer.offsetLeft,
          y: rmContainer.offsetTop,
          scale: 0,
          opacity: 0,
          width: rmContainer.offsetWidth,
          zIndex: -1,
        })
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rmContainer = document.querySelector('.roadmap');
      console.log(rmContainer);
      sizes.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      // Scroll
      // scrollY.current = window.scrollY;
      // let currentSection = 0;
      window.addEventListener("resize", () => {
        // Update sizes
        sizes.current.width = window.innerWidth;
        sizes.current.height = window.innerHeight;
        if (nodeInfo.current) {
          nodeInfo.current.style.width = rmContainer.offsetWidth;
          nodeInfo.current.style.height = rmContainer.innerHeight;
        }

      });
      window.addEventListener('mousemove', handleMouseMove);
      if (open) {
        // handleOpen();
        handleOpen();
      } else {
        handleClose();
        // handleClose();
        nodeInfo.current.style.height = rmContainer.innerHeight;
      }
    }
  }, [handleMouseMove, open, dom, status]);


  return (
    <Box ref={item}>
      <VStack spacing={5}>
        <Button ref={node} id={`button-${id}`} colorScheme="ghost" w="100%" h="100%" onMouseOver={() => (setOpen(true))} onMouseLeave={() => setOpen(false)} >
          <Icon aria-label={`Open ${title}`} as={GiPineTree} w={75} h={75} color={status === 1 ? 'green.600' : 'blue.500'} p={0}
            sx={{
              transition: 'color 0.3s 0.1s ease',
              '&:hover': {
              color: status === 1 ? 'green.300' : 'blue.300'
            }
          }}
          />

        </Button>
        <Text color={status === 1 ? 'green.600' : 'blue.500'} width="100%" textAlign="center" fontSize={{base: '1.5vmin', md: '1vw'}} fontWeight={700}>{title}</Text>

      </VStack>

      <Box
        ref={nodeInfo}
        position="absolute"
        top={0}
        left={0}
        id={`item-${id}`}
        d="flex"
        minW={`${item.current && item.current.parentElement.innerWidth}px`}
        minH="100%"
        flexDirection={responsiveSize === 'xs' ? 'column' : 'row'}
        alignItems="flex-start"
        px={5}
        pb={5}
        borderRadius=" 0 10px 10px 0"
        border="0px solid"
        opacity={status === 1 ? 1 : 0}
        borderColor={status === 1 ? 'green.600' : 'blue.500'}
        transformOrigin="center"
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
        className={status === 1 ? "gradient" : "gradient-blue"}
        sx={{
          backdropFilter: "blur(7px)",
          borderRadius: "5px 30px 10px 5px",
          boxShadow: "0 0 30px #00000070",
        }}
      >
        <Box w="25%" py={5}>
          <Badge colorScheme={status === 1 ? "green" : "ghost"} bg={status === 1 ? "green.700" : "blue.700"} variant="solid"
          >{quarter}</Badge>
          <Text fontWeight={700} fontSize={{ base: '4vmin', md: '0.8vmax' }} flex={1}
            sx={{
              borderBottom: '2px solid',
              borderColor: status === 1 ? 'green.600' : 'transparent',
              filter: status === 1 ? 'drop-shadow(0px 0px 1px rgba(0,0,0,0.6))' : 'drop-shadow(0px 0px 10px transparent)',
            }}
          >
            {title}
          </Text>
          {status === 1 && <Text color="green.800" textShadow="none" filter="none">In progress</Text>}
        </Box>
        <Box p={5} w="75%">
          <UnorderedList d="flex"
            flexFlow="row wrap"
            alignItems="flex-start"
            justifyContent="space-between"
            listStyleType="none"
            ml={0}
          >
            {description && description.map((item, index) => (
              <ListItem key={index} d="inline-flex" alignItems="flex-start" w="48%" my={0} fontSize={{base: ''}}>
                <Icon as={status === 1 ? WiHorizonAlt : WiHorizon} w={8} h={8} color="green.200" mr={3} />
                <Text as="span" >{item}</Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
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
  {
    quarter: "Q2 2023",
    title: "Phase Five",
    description: [
      "Integrate with in-game wearable purchases",
      "Collaborate on DigiPhysical NFTs with MetaFactory",
    ],
    status: 0,
  },
];
