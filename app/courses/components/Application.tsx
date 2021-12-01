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

type ApplicationProps = {
  description: string
  availableSchedule: string
  applicant: {
    name: string
    profilePicture: string
  }
}

const Application = ({ description, availableSchedule, applicant }: ApplicationProps) => {
  return (
    <Box borderWidth='1px' width='100%' rounded={6}>
      <Flex direction='column' p={4}>
        <HStack spacing={4} alignItems='center' justifyContent='start' mb={4}>
          <Img
            src={applicant.profilePicture || '/images/profile.png'}
            alt='applicant'
            borderRadius='full'
            maxWidth='80px'
          ></Img>
          <Heading as='h5' size='md'>
            {applicant.name}
          </Heading>
        </HStack>
        <VStack spacing={2} alignItems='start' mb={4}>
          <Heading as='h6' size='md'>
            Interest manifestation and questions
          </Heading>
          <Divider />
          <Text fontWeight='bold'>{description}</Text>
        </VStack>
        <VStack spacing={2} alignItems='start' mb={6}>
          <Heading as='h6' size='md'>
            Availability
          </Heading>
          <Divider />
          <Text fontWeight='bold'>{availableSchedule}</Text>
        </VStack>
        <HStack justifyContent='center' mb={6}>
          <Button colorScheme='teal'>Accept</Button>
          <Button colorScheme='red'>Decline</Button>
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
