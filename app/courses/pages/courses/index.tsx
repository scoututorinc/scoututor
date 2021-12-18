import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType,
  Routes
} from 'blitz'
import { Heading, Flex, Grid, Button, Box, HStack, Input, Divider, Spacer, VStack } from '@chakra-ui/react'

import { PromiseReturnType } from 'next/dist/types/utils'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import getCourses from 'app/courses/queries/getCourses'
import CourseShortDisplay from 'app/courses/components/CourseShortDisplay'

import { StyledLink } from 'app/core/components/StyledLink'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'

const CoursesView: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  courses,
  error
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  return courses ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        <VStack spacing={2}>
          <Heading>Courses</Heading>
          <Divider />
        </VStack>
        <Spacer />
        <HStack width={{ base: '100%', md: '30%' }} spacing={4}>
          <Input focusBorderColor='teal.400' type='text' placeholder='What are you looking for?' onChange={
            (e)=>{setSearchTerm(e.target.value.length >= 3 ? e.target.value.toLowerCase() : "")}
          }/>
          <Button colorScheme='teal'>
            <SearchIcon color='gray.700' />
          </Button>
        </HStack>
      </Flex>
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

        {courses.filter((c) => searchTerm === "" || c.title.toLowerCase().includes(searchTerm) || c.author.location.toLowerCase().includes(searchTerm))
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
  courses?: PromiseReturnType<typeof getCourses>
  error?: any
}> = async (context) => {
  try {
    const courses = await invokeWithMiddleware(getCourses, null, context)
    return {
      props: { courses }
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
