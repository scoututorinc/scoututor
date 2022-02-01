import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType,
  Routes
} from 'blitz'

import {
  Heading,
  Flex,
  Grid,
  Button,
  Box,
  Divider,
  HStack,
  VStack,
  Spacer,
  Input
} from '@chakra-ui/react'

import { PromiseReturnType } from 'next/dist/types/utils'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getJoinableCourses from 'app/courses/queries/getJoinableCourses'
import CourseShortDisplay from 'app/courses/components/CourseShortDisplay'

import { StyledLink } from 'app/core/components/StyledLink'

import getUserCourseSuggestions from 'app/users/queries/getUserCourseSuggestions'
import { useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'

const CoursesView: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  courses,
  coursesSuggested,
  error
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  return courses ? (
    <Flex direction='column' w='100%' h='100%' overflowY='auto' overflowX='hidden' p={10}>
      <Heading size='lg' w={'100%'} textAlign={'start'} ps={4}>
        Suggested Courses
      </Heading>
      <Divider my={4} />
      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)'
        }}
        gap={4}
      >
        {coursesSuggested?.map((c) => (
          <CourseShortDisplay key={c.id} {...c} />
        ))}
      </Grid>

      <Flex direction={{ base: 'column', md: 'row' }} w={'100%'} mt={4}>
        <Heading ps={4}>Courses</Heading>
        <Spacer></Spacer>
        <HStack width={{ base: '100%', md: 'auto' }} spacing={4} pe={4}>
          <Input
            focusBorderColor='teal.400'
            type='text'
            placeholder='What are you looking for?'
            onChange={(e) => {
              setSearchTerm(e.target.value.length >= 3 ? e.target.value.toLowerCase() : '')
              console.log(courses.map((c) => c.discipline.name))
            }}
          />
          <Button colorScheme='teal'>
            <SearchIcon color='gray.700' />
          </Button>
        </HStack>
      </Flex>
      <Divider my={4} />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)'
        }}
        gap={4}
      >
        <Box display='grid' placeItems='center' rounded={6} borderWidth='2px'>
          <StyledLink href={Routes.CreateCourse()}>
            <Button marginX='auto' marginY='auto' display='block' colorScheme='teal'>
              New
            </Button>
          </StyledLink>
        </Box>
        {courses
          .filter(
            (c) =>
              searchTerm === '' ||
              c.title.toLowerCase().includes(searchTerm) ||
              c.discipline.name.toLowerCase().includes(searchTerm) ||
              c.discipline.knowledgeAreas.some((ka) =>
                ka.name.toLowerCase().includes(searchTerm)
              ) ||
              c.author.district.toLowerCase().includes(searchTerm) ||
              c.author.municipality?.toLowerCase().includes(searchTerm)
          )
          .map((c) => (
            <CourseShortDisplay key={c.id} {...c} />
          ))}
      </Grid>
    </Flex>
  ) : (
    <p>{JSON.stringify(error)}</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  courses?: PromiseReturnType<typeof getJoinableCourses>
  coursesSuggested?: PromiseReturnType<typeof getUserCourseSuggestions>
  error?: any
}> = async (context) => {
  try {
    const courses = await invokeWithMiddleware(getJoinableCourses, null, context)
    const coursesSuggested = await invokeWithMiddleware(getUserCourseSuggestions, null, context)
    return {
      props: { courses, coursesSuggested }
    }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

CoursesView.suppressFirstRenderFlicker = true
CoursesView.getLayout = (page) => <LoggedInLayout title='Courses'>{page}</LoggedInLayout>
export default CoursesView
