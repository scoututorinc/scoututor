import React, { useState } from 'react'
import {
  useMutation,
  Routes,
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  InferGetServerSidePropsType
} from 'blitz'
import {
  Flex,
  Heading,
  Divider,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Img,
  HStack
} from '@chakra-ui/react'
import { Form } from 'app/core/components/forms/Form'
import { PromiseReturnType } from 'next/dist/types/utils'

import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import CourseReview from 'app/courses/components/CourseReview'
import CourseDescription from 'app/courses/components/CourseDescription'
import CourseTeacher from 'app/courses/components/CourseTeacher'
import { StyledLink } from 'app/core/components/StyledLink'

import getCourse from 'app/courses/queries/getCourse'
import getAbility from 'app/guard/queries/getAbility'
import createCourseReview from 'app/courses/mutations/createCourseReview'
import { CreateCourseReview } from 'app/courses/validations'
import { paramToInt } from 'utils'
import { LabeledTextAreaField } from 'app/core/components/forms/LabeledTextAreaField'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'

const CourseView: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  course,
  error,
  permissions
}) => {
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false)
  const onCloseCommentModal = () => setCommentModalIsOpen(false)

  const [submittedReviewModal, setSubmittedReviewModal] = useState({ status: false, text: 0 })
  const onCloseSubmittedReviewModal = () => setSubmittedReviewModal({ status: false, text: 0 })

  const resultModalText = [
    '✅ Your review was sucessfully submitted',
    '❌ Something went wrong while submitting your review'
  ]

  const [createCourseReviewMutation] = useMutation(createCourseReview)

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
              <CourseReview
                key={review.content}
                version='small'
                authorId={review.authorId}
                content={review.content}
                rating={review.rating}
              />
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
              <Button colorScheme='teal' width='80%' onClick={() => setCommentModalIsOpen(true)}>
                Comment on course
              </Button>
              <Modal isOpen={commentModalIsOpen} onClose={onCloseCommentModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>
                    <HStack w='100%' justifyContent='center'>
                      <Img src='/images/commentary.png' maxW='100px' />
                      <Heading as='h3' size='md'>
                        Comment on the course tutor
                      </Heading>
                    </HStack>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Form
                      schema={CreateCourseReview}
                      initialValues={{ classification: 1, comment: '', courseId: course.id }}
                      onSubmit={async (values) => {
                        try {
                          await createCourseReviewMutation(values)
                          setCommentModalIsOpen(false)
                          setSubmittedReviewModal({ status: true, text: 0 })
                        } catch (e) {
                          console.log(e)
                          setSubmittedReviewModal({ status: true, text: 1 })
                        }
                      }}
                    >
                      <VStack spacing={2}>
                        <LabeledTextField type='number' label='Rating' name='classification' />
                        <LabeledTextAreaField label='Comment' name='comment' mb={2} />

                        <Button colorScheme='teal' type='submit'>
                          Submit
                        </Button>
                      </VStack>
                    </Form>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Button colorScheme='red' width='80%'>
                Cancel subscription
              </Button>
              <Modal isOpen={submittedReviewModal.status} onClose={onCloseSubmittedReviewModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalBody>
                    <Heading size='md'>{resultModalText[submittedReviewModal.text]}</Heading>
                  </ModalBody>
                  <ModalCloseButton />
                </ModalContent>
              </Modal>
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
