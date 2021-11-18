import { FC } from 'react'
import {
  Flex,
  Box,
  HStack,
  VStack,
  Img,
  Heading,
  Divider,
  Text,
  Button,
  Icon
} from '@chakra-ui/react'
import { AiFillMessage } from 'react-icons/ai'

const Application: FC = () => {
  return (
    <Box borderWidth='1px' width='100%' rounded={6}>
      <Flex direction='column' p={4}>
        <HStack spacing={4} alignItems='center' justifyContent='start' mb={4}>
          <Img
            src='/images/knowledge.png'
            alt='applicant'
            borderRadius='full'
            maxWidth='80px'
          ></Img>
          <Heading as='h5' size='md'>
            Segun Adebayo
          </Heading>
        </HStack>
        <VStack spacing={2} alignItems='start' mb={4}>
          <Heading as='h6' size='md'>
            Interest manifestation and questions
          </Heading>
          <Divider />
          <Text fontWeight='bold'>
            Hey there! I`ve wanted to learn the principles of graphical design. I`m currently a web
            design, which means that I have a very close relationship with UI and UX designers.
            Sometimes when we`re discussing design ideas for some projects I feel like I could use a
            more formal and systematic knowledge of the area in order to provide more meaningful and
            useful opinion. Furthermore, I`d like to contribute to the design process since I feel
            some interesting raw ideas. I just wonder if by any chance we can work with the
            following tools: Adobe Illustrator CS6, Adobe Photoshop CS6 and Figma.
          </Text>
        </VStack>
        <VStack spacing={2} alignItems='start' mb={6}>
          <Heading as='h6' size='md'>
            Availability
          </Heading>
          <Divider />
          <Text fontWeight='bold'>
            <p>Tuesday: 11:00am - 12:00pm</p>
            <p>Wednesday: 3:00pm - 6:00pm</p>
            <p>Friday: 5:00pm - 6:00pm</p>
          </Text>
        </VStack>
        <HStack justifyContent='center' mb={6}>
          <Button colorScheme='red'>Decline</Button>
          <Button colorScheme='teal'>Accept</Button>
        </HStack>
        <HStack justifyContent='center' mb={2}>
          <Icon as={AiFillMessage}></Icon>
          <Heading as='h6' size='sm'>
            Follow up
          </Heading>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Application
