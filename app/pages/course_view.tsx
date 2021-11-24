import { BlitzPage, useSession } from 'blitz'
import {
  Flex,
  Box,
  Heading,
  Divider,
  VStack,
  HStack,
  Img,
  Icon,
  Text,
  Button
} from '@chakra-ui/react'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import CourseReview from 'app/core/components/CourseReview'
import CourseDescription from 'app/core/components/CourseDescription'
import CourseTeacher from 'app/core/components/CourseTeacher'

const CourseView: BlitzPage = () => {
  const is_enrolled = false
  const is_teacher = false

  return (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <VStack spacing={2} pb={8} alignItems='start'>
        <Heading>Graphical Design by Bring Your Own Laptop</Heading>
        <Divider />
      </VStack>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        <Flex
          direction='column'
          justifyContent='center'
          alignItems='center'
          maxWidth={{ base: '100%', md: '25%' }}
        >
          <CourseTeacher />
          <CourseReview />
          <CourseReview />
          {is_enrolled && (
            <VStack spacing={4} width='90%'>
              <Button colorScheme='teal' width='80%'>
                Comment on course
              </Button>
              <Button colorScheme='red' width='80%'>
                Cancel subscription
              </Button>
            </VStack>
          )}
        </Flex>
        <CourseDescription />
      </Flex>
    </Flex>
  )
}

CourseView.suppressFirstRenderFlicker = true
CourseView.getLayout = (page) => <LoggedInLayout title='Course'>{page}</LoggedInLayout>
export default CourseView
