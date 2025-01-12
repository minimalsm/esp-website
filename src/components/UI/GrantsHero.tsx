import { Box, Center, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import { PageSubheading } from '../UI';

import { PageText } from './text';

interface Props {
  colorBrandConstant: string;
  desktopImage: {
    alt: string;
    src: StaticImageData;
  }
  mobileImage: {
    alt: string;
    src: StaticImageData;
  }
  title: string;
}

export const GrantsHero: FC<Props> = ({
  colorBrandConstant,
  desktopImage,
  mobileImage,
  title,
  children
}) => {
  return (
    <Stack mb={{ base: -2, md: -60, xl: -72 }}>
      <Center h={{ md: '445px' }} alignItems={{ md: 'center' }}>
        <Stack
          px={{ base: 10, md: 9 }}
          py={{ base: 3, md: 12 }}
          mb={{ base: 7, md: 0 }}
          bg={{ md: `brand.${colorBrandConstant}.titleWhiteBox` }}
          maxW={{ md: '702px' }}
          zIndex={1}
        >
          <PageSubheading
            as='h1'
            fontSize={{ base: 'homepage', md: 'h1' }}
            fontWeight={100}
            lineHeight={{ base: '36px', md: '48px' }}
            textAlign='center'
            mb={3}
          >
            {title}
          </PageSubheading>

          <PageText textAlign='center'>{children}</PageText>
        </Stack>
      </Center>

      <Box>
        <Box display={{ base: 'block', md: 'none' }}>
          <Image
            src={mobileImage.src}
            alt={mobileImage.alt}
            layout='responsive'
            objectFit='cover'
            width={450}
            height={276}
            placeholder='blur'
          />
        </Box>

        <Box display={{ base: 'none', md: 'block' }}>
          <Box>
            <Image
              src={desktopImage.src}
              alt={desktopImage.alt}
              layout='fill'
              objectFit='cover'
              placeholder='blur'
            />
          </Box>

          <Box
            mt={{ lg: 40 }}
            h={52}
            bgGradient={`linear(to-b, brand.${colorBrandConstant}.bgGradient.start 0%, brand.${colorBrandConstant}.bgGradient.end 100%)`}
          />
        </Box>
      </Box>
    </Stack>
  );
};