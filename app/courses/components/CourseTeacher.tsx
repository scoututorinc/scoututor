import { FC } from 'react'
import { Flex, VStack, HStack, Img, Heading, Icon } from '@chakra-ui/react'
import { FaLinkedin, FaMedal } from 'react-icons/fa'
import { MdLocationPin } from 'react-icons/md'

const CourseTeacher: FC = () => {
  const teacher_image = '/images/knowledge.png'
  const rating = 4.7
  const reviews = 1021
  const location = 'São Vítor, Braga'

  return (
    <Flex direction='column' alignItems='center'>
      <Img src={teacher_image} alt='teacher_picture' borderRadius='full' maxWidth='150px' pb={5} />
      <VStack spacing={4} alignItems='start' pb={5}>
        <HStack spacing={4}>
          <Icon as={FaLinkedin}></Icon>
          <Heading as='h6' size='xs'>
            @angusyoung
          </Heading>
        </HStack>
        <HStack spacing={4}>
          <Icon as={FaMedal}></Icon>
          <Heading as='h6' size='xs'>
            {rating}/5 user rating ({reviews} reviews)
          </Heading>
        </HStack>
        <HStack spacing={4}>
          <Icon as={MdLocationPin}></Icon>
          <Heading as='h6' size='xs'>
            {location}
          </Heading>
        </HStack>
      </VStack>
    </Flex>
  )
}

export default CourseTeacher
