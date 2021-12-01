import { Flex, VStack, HStack, Heading, Divider, Icon, Text, Button } from '@chakra-ui/react'
import { FaCheck, FaEuroSign } from 'react-icons/fa'
import { Link as BlitzLink, Routes } from 'blitz'
import { StyledLink } from 'app/core/components/StyledLink'

type CourseDescriptionProps = {
  id: number
  description: string
  hourlyRate: number
  knowledgeAreas: string[]
}

const CourseDescription = ({
  id,
  description,
  hourlyRate,
  knowledgeAreas
}: CourseDescriptionProps) => {
  const hourly_rate = 15.0
  const is_teacher = true

  return (
    <Flex direction='column' width={{ md: '75%' }}>
      <VStack alignItems='start' pb={5}>
        <Heading size='lg'>Knowledge the tutor can provide</Heading>
        <Divider />
      </VStack>
      <VStack spacing={8} alignItems='start' pb={10}>
        {knowledgeAreas.map((item) => (
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
        {description}
      </Text>
      <VStack alignItems='start' pb={5}>
        <Heading size='lg'>Hourly price</Heading>
        <Divider />
      </VStack>
      <HStack spacing={8} pb={12}>
        <Icon as={FaEuroSign}></Icon>
        <Heading fontSize='2xl'>{hourlyRate}</Heading>
      </HStack>
      {!is_teacher && (
        <Button colorScheme='teal' maxWidth={{ base: '90%', md: '30%', lg: '20%' }}>
          Apply for a vacancy
        </Button>
      )}
      {is_teacher && (
        <HStack spacing={4}>
          <StyledLink href={Routes.Applications({ id: id })}>
            <Button colorScheme='teal'>Manage Applications</Button>
          </StyledLink>
          <StyledLink href={Routes.EditCourse({ id: id })}>
            <Button colorScheme='teal'>Edit Information</Button>
          </StyledLink>
        </HStack>
      )}
    </Flex>
  )
}

export default CourseDescription
