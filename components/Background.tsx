import { Stack } from '@chakra-ui/react';
import { useImage } from '@@/hook/useImage';
import { PropsWithChildren } from 'react';

export default function Background(props: PropsWithChildren<unknown>) {
  const [image] = useImage();
  return (
    <Stack
      position={['fixed', 'relative']}
      h="100vh"
      w="full"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize={'cover'}
      style={{
        backgroundImage: `url(${image.path})`,
      }}
      backgroundColor="gray.800"
      spacing={4}
      fontSize="xl"
      {...props}
    />
  );
}
