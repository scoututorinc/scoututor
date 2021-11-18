import { FC } from 'react'
import { Box, Flex, Heading, Divider, Icon, Text } from '@chakra-ui/react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { Course } from 'db'

interface CourseReviewProps {
  author: string
  review: string
  stars: number
}

const CourseReview: FC = (props) => {
  return (
    <Box borderWidth='1px' borderRadius='md' p={4} width={{ base: '100%', md: '80%' }} mb={6}>
      <Flex direction='row' justifyContent='space-between' pb={1}>
        <Heading as='h6' size='xs'>
          {(props as CourseReviewProps).author}
        </Heading>
        <Icon as={BsCheckCircleFill} color='teal.400'></Icon>
      </Flex>
      <Divider />
      <Text fontWeight='bold' pt={2}>
        {(props as CourseReviewProps).review}
      </Text>
    </Box>
  )
}

export default CourseReview
