import { useEffect, useState, useRef } from 'react'
import {
  Text,
  IconButton,
  Box,
  Button,
UnorderedList,
ListItem,
OrderedList,
} from '@chakra-ui/react'
import { useOnScreen } from "@/utils/hooks";
import { CloseIcon } from '@chakra-ui/icons'

export const TermDefinition = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const btnRef = useRef(null);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen) {
      // setIsOpen(true);
      console.log("onScreen");
    }
    if (ref.current && btnRef.current) {
      console.log(ref.current, btnRef.current);
      if (isOpen) {
        console.log("isOpen");
        ref.current.style.transform = `translate3d(0, -125px, 0)`;
      } else {
        ref.current.style.transform = "translate3d(100%, -125px, 0)";
      }
    }
  }, [onScreen, isOpen]);

  return (
    <>
      <Button ref={btnRef} position="fixed" className="gradient-cone text" colorScheme="ghost" bottom={20} right={0} onClick={() => setIsOpen(!isOpen)} zIndex={10}>Wots ReVesture mean ser?!</Button>
        <Box
          ref={ref}
          position="fixed"
          bottom={0}
          right={0}
          maxW="lg"
      className="definition"
      textAlign="left"
      mt={0}
      p={8}
      sx={{
        bg: "greenGlassAlpha",
        backdropFilter: "blur(7px)",
        borderRadius: "25px 0 0 10px",
        boxShadow: "0 0 30px #00000070",
        transform: "translate3d(100%, -100px, 0)",
        transition: "transform 0.3s 0.2s ease-in-out, opacity 0.3s 0.3s ease-in",
      }}>
      <Text mb={0} fontWeight={700}>Ves·ture  (vĕs&#8242;chər)</Text>

      <UnorderedList spacing={0} listStyleType="none" px={0} mx={0} fontSize={{ base: '1.5vmin', '2xl': '0.8vmax' }}
        sx={{
          '& ul': {
            listStyleType: 'none',
            ml: 0,
          },
          '& > li, & > li ol li': {
            fontSize: { base: '1.2vmin', '2xl': '0.8vmax' },
            // my: 0,
          },
          '& > li ol': {
            ml: 8,
          },
          'p': {
            mb: 1
          }
        }}
      >
        <ListItem>
          <Text>n.</Text>
          <OrderedList spacing={0} >
            <ListItem>
              <Text mb={0} fontStyle="italic">archaic</Text>

              <UnorderedList>
                <ListItem>
                  a garment or something that seems like a garment
                </ListItem>
                <ListItem>
                  a vesture of cloud
                </ListItem>
              </UnorderedList>
            </ListItem>
            {/* <ListItem>DigiPhysical Clothing; apparel that exists in the digital (And sometimes IRL) realm that also is verifiable proof of contributions toward positive climate change.</ListItem>
                    <ListItem>Something that covers or cloaks: <Text as="span" sx={{ fontStyle: 'italic' }}>Hey, look at that sick Metaverse avatar with verifiable proofs of carbon offsetting!   .</Text>.</ListItem> */}
            <ListItem>
              <Text mb={0} fontStyle="italic">law</Text>
              <UnorderedList>
                <ListItem>
                  everything except trees that grows on the land
                </ListItem>
                <ListItem>
                  a product of the land, such as grass, wheat, etc
                </ListItem>
              </UnorderedList>
            </ListItem>
          </OrderedList>
        </ListItem>
        <ListItem>
          <Text>tr.v. <Text as="span" sx={{ fontWeight: 700 }}>re·ves·tured, re·ves·turing, re·ves·tures</Text></Text>
          <OrderedList spacing={2}>
            <ListItem>To cover or cloak with vesture; to make a positive impact on the climate by purchasing art, offsetting carbon AND supporting regenerative projects around the globe. </ListItem>
          </OrderedList>
        </ListItem>
      </UnorderedList>
    </Box>
    </>

  )
};