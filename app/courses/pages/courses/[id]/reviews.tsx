import { BlitzPage, Routes, useParam, useQuery, useRouter } from 'blitz'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  VStack,
  Heading,
  Divider
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import getCourse from 'app/courses/queries/getCourse'
import CourseReview from 'app/courses/components/CourseReview'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { StyledLink } from 'app/core/components/StyledLink'

const CourseReviews: BlitzPage = () => {
  const router = useRouter()
  const courseId = useParam('id', 'number')
  const [course, status] = useQuery(getCourse, courseId, {
    suspense: false
  })

  return status.isError == false && course ? (
    <Flex
      direction='column'
      w='100%'
      h='100%'
      overflowY='scroll'
      overflowX='hidden'
      p={{ base: 4, lg: 10 }}
    >
      <Breadcrumb spacing={4} pb={8} separator={<ChevronRightIcon />}>
        <BreadcrumbItem>
          <StyledLink href={Routes.CourseView({ id: course.id.toString() })}>
            {course.title} by {course.author.name}
          </StyledLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href=''>Reviews</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing={2} alignItems='start' mb={6}>
        <Heading>Reviews</Heading>
        <Divider />
      </VStack>
      <Flex w='100%' direction='column' justifyContent='center'>
        {course.reviews.map((review) => (
          <CourseReview key={review.content} version='large' {...review} />
        ))}
      </Flex>
    </Flex>
  ) : (
    <p>Error</p>
  )
}

CourseReviews.suppressFirstRenderFlicker = true
CourseReviews.getLayout = (page) => <LoggedInLayout title='Course Reviews'>{page}</LoggedInLayout>

export default CourseReviews
