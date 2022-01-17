import {
  Routes,
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType
} from 'blitz'
import { Flex, Heading, Divider, VStack, Button } from '@chakra-ui/react'

import { PromiseReturnType } from 'next/dist/types/utils'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import CourseReview from 'app/courses/components/CourseReview'
import CourseDescription from 'app/courses/components/CourseDescription'
import CourseTeacher from 'app/courses/components/CourseTeacher'
import { StyledLink } from 'app/core/components/StyledLink'

import getCourse from 'app/courses/queries/getCourse'
import getAbility from 'app/guard/queries/getAbility'
import { paramToInt } from 'utils'

const CourseView: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  course,
  error,
  permissions
}) => {
  return course && permissions ? (
    <Flex direction='column' w='100%' h='100%' overflowY='scroll' overflowX='hidden' p={10}>
      <VStack spacing={2} pb={8} alignItems='start'>
        <Heading>{course.title}</Heading>
        <Divider />
      </VStack>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent='space-between'>
        <Flex
          direction='column'
          justifyContent='center'
          alignItems='center'
          maxWidth={{ base: '100%', lg: '25%' }}
        >
          <CourseTeacher {...course.author} />
          {permissions.canUpdateCourse && (
            <StyledLink pb={4} href={Routes.NewPost({ id: course.id })}>
              <Button colorScheme='teal'>Create post</Button>
            </StyledLink>
          )}
          <VStack maxH='40vh' overflowY='hidden'>
            {course.reviews.map((review) => (
              <CourseReview key={review.content} version='small' {...review} />
            ))}
          </VStack>
          <StyledLink pb={4} href={Routes.CourseReviews({ id: course.id })}>
            <Button colorScheme='teal' mt={4}>
              See all reviews in detail
            </Button>
          </StyledLink>

          {/* Can't enroll, is not owner => Enrolled */}
          {!permissions.canJoinCourse && !permissions.canUpdateCourse && (
            <VStack spacing={4} width='90%'>
              {/* <StyledLink href={Routes.CoursePosts({ id: course.id })}>
                <Button colorScheme='teal' width='80%'>
                  See all course posts
                </Button>
              </StyledLink> */}
              <Button colorScheme='teal' width='80%'>
                Comment on course
              </Button>
              <Button colorScheme='red' width='80%'>
                Cancel subscription
              </Button>
            </VStack>
          )}
        </Flex>
        <CourseDescription
          {...course}
          permissions={permissions}
          knowledgeAreas={course.knowledgeAreas.map((k) => k.name)}
        />
      </Flex>
    </Flex>
  ) : (
    <p>{JSON.stringify(error)}</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  course?: PromiseReturnType<typeof getCourse>
  permissions?: {
    canUpdateCourse: boolean
    canJoinCourse: boolean
  }
  error?: any
  redirect?: any
}> = async (context) => {
  try {
    const courseId = paramToInt(context?.params?.id)
    const course = await invokeWithMiddleware(getCourse, courseId, context)
    const [canUpdateCourse, canJoinCourse] = await invokeWithMiddleware(
      getAbility,
      [
        ['update', 'Course', { id: courseId }],
        ['join', 'Course', { id: courseId }]
      ],
      context
    )

    if (!course)
      return {
        redirect: {
          destination: Routes.CoursesView(),
          permanent: false
        }
      }
    else
      return {
        props: {
          course,
          permissions: {
            canUpdateCourse: canUpdateCourse.can,
            canJoinCourse: canJoinCourse.can
          }
        }
      }
  } catch (e) {
    console.log(e)
    return {
      props: { error: e }
    }
  }
}

CourseView.suppressFirstRenderFlicker = true
CourseView.getLayout = (page) => <LoggedInLayout title='Course'>{page}</LoggedInLayout>
export default CourseView
