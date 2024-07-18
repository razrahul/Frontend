import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
import { px } from 'framer-motion';
const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading paddingInline={60} children="E-Learning Dashboard" color={'white'} />
          <Heading
            paddingInline={60}
            fontFamily={'body'}
            size="sm"
            children="© raz rahul, 2024 E-Learning Dashboard, All Rights Reserved."
            color={'yellow.400'}
          />
        </VStack>

        <HStack
          spacing={['2', '10']}
          justifyContent="center"
          color={'white'}
          fontSize="50"
        >
          <a href="https://youtube.com" target={'blank'}>
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://instagram.com/_raz_rahul" target={'blank'}>
            <TiSocialInstagramCircular />
          </a>
          <a href="https://github.com/razrahul" target={'blank'}>
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;


//https://youtube.com/6packprogrammer
