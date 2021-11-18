import { FC } from 'react'
import { Flex, VStack, HStack, Heading, Divider, Icon, Text, Button } from '@chakra-ui/react'
import { FaCheck, FaEuroSign } from 'react-icons/fa'

const CourseDescription: FC = () => {
  const knowledge_areas = ['Adobe Photoshop CS6', 'Adobe Illustrator CS6', 'Adobe InDesign CS6']
  const detailed_description =
    'I can provide you with support the most diverse tasks of graphical design. ' +
    'I have several years of experience and have worked with several companies' +
    'over the years.I can teach you the basics of each of the listed softwares in' +
    "order for you to get a working understanding of each one of them. Once you've " +
    'mastered the basics, if you so wish we may progress to more advanced tasks and ' +
    'you into a graphical design master.'
  const hourly_rate = 15.0
  const is_teacher = true
  return (
    <Flex direction='column' width={{ md: '75%' }}>
      <VStack alignItems='start' pb={5}>
        <Heading size='lg'>Knowledge the tutor can provide</Heading>
        <Divider />
      </VStack>
      <VStack spacing={8} alignItems='start' pb={10}>
        {knowledge_areas.map((item) => (
          <HStack key={item} spacing={6}>
            <Icon as={FaCheck}></Icon>
            <Heading size='md'>{item}</Heading>
          </HStack>
        ))}
      </VStack>
      <VStack alignItems='start' pb={5}>
        <Heading size='lg'>Detailed description</Heading>
        <Divider />
      </VStack>
      <Text fontSize='xl' pb={10}>
        {detailed_description}
      </Text>
      <VStack alignItems='start' pb={5}>
        <Heading size='lg'>Hourly price</Heading>
        <Divider />
      </VStack>
      <HStack spacing={8} pb={12}>
        <Icon as={FaEuroSign}></Icon>
        <Heading fontSize='2xl'>{hourly_rate}</Heading>
      </HStack>
      {!is_teacher && (
        <Button colorScheme='teal' maxWidth={{ base: '90%', md: '30%', lg: '20%' }}>
          Apply for a vacancy
        </Button>
      )}
      {is_teacher && (
        <HStack spacing={4}>
          <Button colorScheme='teal'>Manage Applications</Button>
          <Button colorScheme='teal'>Edit information</Button>
        </HStack>
      )}
    </Flex>
  )
}

export default CourseDescription
