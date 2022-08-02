import { Center, Heading, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { ButtonLink } from '../..';

interface Props {
  buttonText: string;
  buttonWidth: string;
  ctaText: string;
  link: string;
}

export const CallToAction: FC<Props> = ({ buttonText, buttonWidth, ctaText, link }) => {
  return (
    <Stack
      borderRadius='10px'
      bgGradient='linear(to-br, brand.ready.bgGradient.start 10%, brand.ready.bgGradient.end 100%)'
      h='150px'
      w='100%'
      justifyContent='center'
    >
      <Stack mb={2}>
        <Heading
          as='h4'
          color='brand.ready.text'
          fontSize='h4'
          fontWeight={700}
          lineHeight='22px'
          textAlign='center'
        >
          {ctaText}
        </Heading>
      </Stack>

      <Center>
        <ButtonLink label={buttonText} link={link} width={buttonWidth} />
      </Center>
    </Stack>
  );
};
