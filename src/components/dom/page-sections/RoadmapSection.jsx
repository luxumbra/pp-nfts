
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
            maxW={{ base: '100%', md: 'md', '2xl': "2xl" }}
          >
            <Text
              as="h2"
            >
              Roadmap
            </Text>
            {/* <span className="fest-dates">9 - 23rd JUNE</span> */}
            <Box
              maxW={{ base: '100%', md: "100%" }}
              border="2px solid"
              borderColor="green.500"
              borderWidth="0 0 0 5px"
              p={{ base: 8, md: 8 }}
              sx={{
                bg: "blueGlassAlpha",
                backdropFilter: "blur(7px)",
                borderRadius: "5px 30px 10px 5px",
                boxShadow: "0 0 30px #00000070",
              }}
            >
              <Stack spacing={{ base: 2, md: 0 }} align="center" py={8}>
                <Box d="inline-flex" alignItems="center" mb={5}>
                  <Icon as={GiPollenDust} w={"30px"} h={"30px"} color="green.500" />
                  <Text as="h3" mt={1} color="green.600" >
                    <span>Phases of ReVesture</span>

                  </Text>
                  <Icon as={GiPineTree} w={"30px"} h={"30px"} color="green.700" />
                </Box>
                <SimpleGrid position="relative" className="timeline-grid" spacing={19} columns={timeline.length} w="auto" >
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
    if (node.current && nodeInfo.current && item.current) {
      console.log(nodeInfo);
      console.log("isOpen");
      gsap.to(nodeInfo.current, {
        duration: 0.3,
        delay: 0.1,
        ease: "elastic.inOut(1, 0.3)",
        x: nodeInfo.current.offsetRight,
        y: item.current.parentElement.offsetTop,
        scale: 1,
        opacity: 1,
        zIndex: 1,
        width: item.current.parentElement.offsetWidth,
      })

    }

  }
  const handleClose = () => {
    if (node.current && nodeInfo.current && item.current) {

      console.log(nodeInfo);
      console.log('itemc', nodeInfo.current.offsetLeft);
      gsap.to(nodeInfo.current, {
        duration: 0.3,
        delay: 0.1,
        ease: "elastic.inOut(1, 0.3)",
        x: item.current.parentElement.offsetLeft,
        y: item.current.parentElement.offsetTop,
        scale: 0,
        opacity: 0,
        width: item.current.parentElement.offsetWidth,
        zIndex: -1,
      })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentBox = document.querySelector(nodeInfo.current.id);
      console.log(currentBox);
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
        nodeInfo.current.width = item.current.parentElement.offsetWidth;
      });
      window.addEventListener('mousemove', handleMouseMove);
      if (open) {
        handleOpen();
      } else {
        console.log('dom', dom);
        handleClose();
      }
    }
  }, [handleMouseMove, open, dom, status]);


  return (
    <Box ref={item}>
      <VStack spacing={5}>
        <Button ref={node} id={`button-${id}`} colorScheme="ghost" w="100%" h="100%" onMouseOver={() => (setOpen(true))} onMouseLeave={() => setOpen(false)} >
          <Icon aria-label={`Open ${title}`} as={GiPineTree} w={75} h={75} color={status === 1 ? 'green.600' : 'blue.500'} p={0} /></Button>
        <Text color={status === 1 ? 'green.600' : 'blue.500'} width="100%" textAlign="center">{title}</Text>

      </VStack>

      <Box
        ref={nodeInfo}
        position="absolute"
        id={`item-${id}`}
        d="flex"
        minW={`${item.current && item.current.parentElement.innerWidth}px`}
        maxH={`${item.current && item.current.parentElement.innerHeight * 0.5}px`}
        flexDirection={responsiveSize === 'xs' ? 'column' : 'column'}
        alignItems="flex-start"
        px={0}
        pb={5}
        borderRadius=" 0 10px 10px 0"
        border="0px solid"
        opacity={status === 1 ? 1 : 0}
        borderColor={status === 1 ? 'green.600' : 'blue.500'}
        transformOrigin="bottom left"
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
        sx={{
          bg: status === 1 ? "greenGlassAlpha" : "blueGlassAlpha",
          backdropFilter: "blur(7px)",
          borderRadius: "5px 30px 10px 5px",
          boxShadow: "0 0 30px #00000070",
        }}
      >
        <Box>
          <Badge colorScheme={status ? "green" : "ghost"} ml={3} variant="solid">{quarter}</Badge>
          <Text fontWeight={500} fontSize={{ base: '4vmin', md: '0.8vmax' }} flex={1}
            pl={3}
            sx={{
              borderBottom: '2px solid',
              borderColor: status === 1 ? 'green.600' : 'transparent',
              filter: status === 1 ? 'drop-shadow(0px 0px 1px rgba(0,0,0,0.6))' : 'drop-shadow(0px 0px 10px transparent)',
            }}
          >
            {title}
          </Text>
          {status === 1 && <Text ml={3} color="green.200" textShadow="none" filter="none">In progress</Text>}
        </Box>
        <Box p={3} border="1px solid" borderColor={status ? 'green.600' : 'transparent'} borderRadius="md" className={status === 1 ? "gradient" : "transparent"} boxShadow={status === 1 ? "0 0 3px rgba(0,0,0,0.6)" : 'unset'}>
          <UnorderedList d="flex"
            flexFlow="row wrap"
            alignItems="flex-start"
            justifyContent="space-between"
            listStyleType="none"
          >
            {description && description.map((item, index) => (
              <ListItem key={index} d="inline-flex" alignItems="flex-start" w="48%" my={0}>
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
