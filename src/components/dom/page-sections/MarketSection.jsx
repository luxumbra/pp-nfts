import React, { useRef, useState, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useDisabledMobileNotify, useOnScreen } from '@/utils/hooks'

import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
  useMarketplace,
  useNFTCollection,
  useSDK,
} from '@thirdweb-dev/react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'

function Feature({ name, description, image, price, onBuy }) {
  // const property = {
  //   imageUrl: 'https://bit.ly/2Z4KKcF',
  //   imageAlt: 'Rear view of modern home with pool',
  //   beds: 3,
  //   baths: 2,
  //   title: 'Modern home in city center in the heart of historic Los Angeles',
  //   formattedPrice: '$1,900.00',
  //   reviewCount: 34,
  //   rating: 4,
  // }

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={image} alt={name} />

      <Box p='6'>
        {/* <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box> */}

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
        >
          {name}
        </Box>

        <Box w='full'>
          {price}
          {/* <Box as='span' color='gray.600' fontSize='sm'>
            / wk
          </Box> */}

          <Button  onClick={onBuy}>
            {' '}
            Buy
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export const MarketSection = () => {
  const ref = useRef(null)
  const onScreen = useOnScreen(ref)
  const [openCal, setOpenCal] = useState(false)
  const disabledMobNotify = useDisabledMobileNotify()

  const [listings, setListings] = useState([])

  async function connect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])
    const sdk = new ThirdwebSDK(provider)
    const marketplace = sdk.getMarketplace(
      '0x4F0763A70D44558BBb0E8eB060199e5ec439cc15'
    )

    return { provider, sdk, marketplace }
  }

  useEffect(() => {
    const getMarketplace = async () => {
      if (typeof window !== 'undefined') {

        const { provider, marketplace } = await connect()
        if (marketplace) {
          console.log('mkt', marketplace);
          const _listings = await marketplace.getActiveListings()
          setListings(_listings)
        }

      }
    }
    getMarketplace();
  }, [])

  const buyNFT = async (nft) => {
    // const { provider, marketplace } = await connect()
    // await marketplace.buyoutListing(nft.assetContractAddress, 1)
  }

  const onMint = async () => {
    const { provider, sdk } = await connect()
    const signer = provider.getSigner()
    const address = await signer.getAddress()

    try {
      const contract = sdk.getNFTCollection(
        '0xf4a65949CBaE3502F87AdB5e39A8911674476a5C'
      )
      console.log(address, contract)

      const toAddress = '0x1FBd655ef5bC58821F92f6828fD580113CFe7dCE'

      const metadata = {
        name: 'Cool NFT',
        description: 'This is a cool NFT',
        // image: fs.readFileSync('path/to/image.png'), // This can be an image url or file
      }

      const tx = await contract.mintTo(toAddress, metadata)
      const receipt = tx.receipt // the transaction receipt
      const tokenId = tx.id // the id of the NFT minted
      const nft = await tx.data() // (optional) fetch details of minted NFT

      console.log(receipt, tokenId, nft)
    } catch (error) {
      console.log('ERR', error)
    }
  }

  return (
    <Box
      as='section'
      id='marketplace'
      flexFlow='row nowrap'
      justifyContent='space-between'
      alignItems='center'
    >
      {openCal && (
        <Button
          position='absolute'
          bottom={20}
          right={6}
          colorScheme='green'
          bg='green.700'
          boxShadow='0 0 10px rgba(0, 0, 0, 0.6)'
          size='sm'
          transition='all 0.3s 0.8s ease'
          onClick={() => setOpenCal(!openCal)}
          zIndex={2002}
        >
          Close Calendar
        </Button>
      )}

      <Box
        ref={ref}
        className='__content'
        w={{ base: 'full' }}
        transform={`translate3d(${onScreen ? 0 : '-70px'}, 0, 0)`}
        opacity={onScreen ? 1 : 0}
        transition='transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in'
      >
        <Box
          position='relative'
          d='inline-flex'
          flexFlow='row wrap'
          alignItems='flex-start'
          justifyContent='space-between'
          w={{ base: 'full', xl: '2xl' }}
        >
          <Text as='h2' d='inline-block'>
            Marketplace
          </Text>
          <Text
            flex='1 0 100%'
            width='100%'
            alignSelf='flex-end'
            justifySelf='flex-start'
            fontWeight={500}
          >
            <span className='gradient text'>Carbon negative</span> NFTs
            supporting{' '}
            <span className='gradient text'>regenerative projects</span>.
          </Text>
        </Box>

        <Box className='__content__body'>
          {/* <iframe
    src="https://gateway.ipfscdn.io/ipfs/Qmbmie8xBZs3YFmqSHwX9d36dUt1x8KoNH8KNTRzRYFcgb/marketplace.html?contract=0x4F0763A70D44558BBb0E8eB060199e5ec439cc15&amp;chainId=137&amp;listingId=0"
    width="600px"
    height="600px"
    style={{maxWidth: "100%"}}
    frameBorder="0"
  ></iframe> */}
        </Box>
        <Flex mt={100} p='xl'>
          {listings &&
            listings?.map((listing, index) => (
              <Box width={1 / 3} key={index}>
                <Feature
                  {...listing.asset}
                  price={`${listing.buyoutCurrencyValuePerToken.displayValue} ${listing.buyoutCurrencyValuePerToken.name}`}
                  onBuy={buyNFT}
                />
              </Box>
            ))}
        </Flex>

        <Button onClick={onMint}>Mint</Button>
      </Box>
    </Box>
  )
}

export const WeekTabs = ({ blocks }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const week1 = blocks.filter((block) => block.week === 1)
  const week2 = blocks.filter((block) => block.week === 2)
  return (
    <Tabs
      mt={0}
      maxW={{ base: 'full', lg: 'full' }}
      height='-webkit-fit-content'
      defaultIndex={0}
      variant='unstyled'
      isFitted
      onChange={(index) => setTabIndex(index)}
    >
      <TabList
        fontSize={{ base: '2.6vmin', lg: '2vmax' }}
        w='50%'
        flex='0 0 50%'
        justifyContent='flex-start'
        justifyItems='center'
        borderBottom='none'
      >
        <Box p={5} pl={0}>
          <Tab
            borderBottom={
              tabIndex === 0 ? '4px solid green.400' : '2px solid transparent'
            }
          >
            <Text as='h3' className='gradient2 text' my={0}>
              Week One
            </Text>
          </Tab>
        </Box>
        <Box p={5} pl={0}>
          <Tab
            borderBottom={
              tabIndex === 1 ? '4px solid green.400' : '2px solid transparent'
            }
          >
            <Text as='h3' className='gradient2 text' my={0}>
              Week Two
            </Text>
          </Tab>
        </Box>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Box
            d='flex'
            alignContent='flex-start'
            justifyContent='space-between'
            flexFlow='row wrap'
            w='100%'
            opacity={tabIndex === 0 ? 1 : 0}
            transform={tabIndex === 0 ? 'translateX(0)' : 'translateX(-200px)'}
            transition='transform 0.3s 1s ease-in-out,  opacity 0.3s 1.1s ease-in-out'
          >
            {week1 && week1.map((day, i) => <DayBlock key={i} day={day} />)}
          </Box>
        </TabPanel>
        <TabPanel>
          <Box
            d='flex'
            alignContent='flex-start'
            justifyContent='space-between'
            flexFlow='row wrap'
            w='100%'
            opacity={tabIndex === 1 ? 1 : 0}
            transform={tabIndex === 1 ? 'translateX(0)' : 'translateX(-200px)'}
            transition='transform 0.3s 1s ease-in-out,  opacity 0.3s 1.1s ease-in-out'
          >
            {week2 && week2.map((day, i) => <DayBlock key={i} day={day} />)}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export const DayBlock = ({ day }) => {
  const { dates, title, strapline, description, extra } = day
  return (
    <Box
      className='time-block'
      sx={{
        flex: {
          base: '0 0 49%',
          xl: '0 0 32%',
        },
        W: { base: '49%', xl: '32%' },
      }}
    >
      <Box d='inline-block'>
        <Text as='span' className='fest-dates'>
          <span>{dates}</span>
        </Text>
        <Text as='h4' className='gradient2 text' my={0}>
          <span>{title}</span>
        </Text>
      </Box>
      <Text fontSize={{ base: '2.6vmin', md: '1vmax' }} fontWeight={500} mb={1}>
        {strapline}
      </Text>
      <Text>{description}</Text>
      {!extra && <Text>{extra}</Text>}
    </Box>
  )
}

const timeBlocks = [
  {
    week: 1,
    dates: 'Thursday June 9th',
    title: 'Opening Ceremonies!',
    strapline:
      'Get ready for a jam-packed 2 weeks! 55+ plus speakers, panels, workshops, and more...',
    description:
      'Welcome to MetaFest2!  Let’s break the ice with some social games and fun.  Time to start the festivities.  Game-on!',
    extra: `If you missed out last year, I can feel your <span className="gradient text">FOMO</span> from here!!`,
  },
  {
    week: 1,
    dates: 'Friday-Saturday June 10th-11th',
    title: 'Tooling Days',
    strapline: 'How do you stay organized and productive?',
    description:
      'Two days of an open toolbox. Learn useful Web3, DAO, organizational dApps often from the creators.',
    extra: `If you missed out last year, I can feel your <span className="gradient text">FOMO</span> from here!!`,
  },
  {
    week: 1,
    dates: 'Sunday-Monday June 12th-13th',
    title: 'Metaverse Days',
    strapline: 'Whoa, the MetaVerse, what’s that?',
    description:
      'There’s a lot happening in the MetaVerse.  MetaGamers have a presence in Neos, Cryptovoxels, Atlantis World, Decentraland, Aavegotchi Gotchiverse, and more.  Come join us and see what we’ve been building!  Learn some new skills to start playing in your MetaVerse of choice.  It may be a new trend word, but we’ve been digging in for more than a year. :)',
    extra: `If you missed out last year, I can feel your <span className="gradient text">FOMO</span> from here!!`,
  },
  {
    week: 2,
    dates: 'Tuesday-Friday June 14th-17th',
    title: 'MetaAlliance and ReVesture Days',
    strapline: 'Speakers! Panels! Workshops!',
    description:
      'Learn about the guilds and embassies in our greater ecosystem!  MetaAlliance is a partnership of DAOs and projects, together building the new Web3 future.  ReVesture Days will cover new ReVestureerative projects, ReFi, and more.  We will take a look into what on-the-ground expansion of Web3 looks like.',
    extra: `If you missed out last year, I can feel your <span className="gradient text">FOMO</span> from here!!`,
  },
  {
    week: 2,
    dates: 'Saturday June 18th',
    title: 'Tooling Follow-up Presentations',
    strapline: 'Well I got this shiny new toolbox, now what?',
    description:
      'Need some extra pointers on how to swing that hammer or run that decentralized workflow space?  Get the gritty details on how to use your growing toolbox.',
    extra: `If you missed out last year, I can feel your <span className="gradient text">FOMO</span> from here!!`,
  },
  {
    week: 2,
    dates: 'Sunday June 19th',
    title: 'Sunday Funday: Live Concerts & Entertainment',
    strapline: 'All work and no play, makes Nova swim in circles.',
    description:
      'Sunday Funday is our weekend day of play and entertainment. Join us for live events in MetaVerse worlds, games, possible Poaps, and more!',
    extra: `If you missed out last year, I can feel your <span className="gradient text">FOMO</span> from here!!`,
  },
  {
    week: 2,
    dates: 'Monday June 20th',
    title: 'DeFi Day',
    strapline:
      'We know, we could do a whole Fest on just DeFi.  But look at how much we’ve stacked in one day!',
    description:
      'All things Decentralized Finance.  Are you a full-on deGen?  Just dabbling?  Learn tips and tricks straight from the creators of DeFi platforms.',
    extra: `If you missed out last year, I can feel your <span className="gradient text">FOMO</span> from here!!`,
  },
  {
    week: 2,
    dates: 'Tuesday-Wednesday June 21st-22nd',
    title: 'Job Fair and Meta-Days',
    strapline: 'So, how do I start working in a DAO?',
    description:
      'Join us for the DAO JobFair!  Meet other DAOs that are part of our MetaAlliance and more!  Learn how to get started now.  Add your unique contributions and join the new web3 workforce.  Welcome.',
    extra: `If you missed out last year, I can feel your <span className="gradient text">FOMO</span> from here!!`,
  },
  {
    week: 2,
    dates: 'Thursday June 23rd',
    title: 'Closing Ceremonies and Awards',
    strapline: 'Well that was fun!  Can we stay here forever??',
    description:
      'Whoa, so much was covered.  How do we wrap this up?  Awards!  You get an Oprah NFT, you get a Octo, you get the point.  If you came for the POAP, don’t miss this day.',
    extra: `If you missed out last year, I can feel your <span className="gradient text">FOMO</span> from here!!`,
  },
]
