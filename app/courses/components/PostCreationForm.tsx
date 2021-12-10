import React, { useState, useRef } from 'react'
import { useMutation, useParam, Routes } from 'blitz'
import { Box, Flex, Stack, Img, Heading, VStack, Button } from '@chakra-ui/react'
import { CoursePost } from 'app/courses/validations'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { LabeledTextAreaField } from 'app/core/components/forms/LabeledTextAreaField'
import CreatePost from 'app/courses/mutations/createPost'
import { SimpleAlertDialog } from 'app/core/components/SimpleAlertDialog'
import { StyledLink } from 'app/core/components/StyledLink'
import { Form } from 'app/core/components/forms/Form'

export const PostCreationForm = () => {
  const [isResultAlertOpen, setIsResultAltertOpen] = useState(false)
  const onCloseResultAlert = () => setIsResultAltertOpen(false)
  const [createPostMutation] = useMutation(CreatePost)
  const cancelRef = useRef(null)
  const courseId: number | undefined = useParam('id', 'number')

  const [values, setValues] = useState({
    title: '',
    description: '',
    files: [],
    courseId: courseId
  })

  return (
    <Box borderWidth='2px' borderColor='teal.400' rounded={6} w={{ base: '90%', lg: '60%' }}>
      <Flex alignItems='center' justifyContent='center' direction='column' w='100%'>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={6}
          p={10}
          justifyContent='center'
          alignItems='center'
        >
          <Img src='/images/new_post.png' maxWidth='100px'></Img>
          <Heading>Create post</Heading>
        </Stack>
        <Box w={{ base: '90%', lg: '70%' }}>
          <Form
            schema={CoursePost}
            initialValues={values}
            onSubmit={async (values) => {
              await createPostMutation(values)
              setIsResultAltertOpen(true)
            }}
          >
            <VStack spacing={6} p={4} w='100%'>
              <LabeledTextField
                label='Title'
                name='title'
                placeholder='Give a title to your post'
              />
              <LabeledTextAreaField
                label='Description'
                name='description'
                placeholder='Give a description to your post'
              />
              <LabeledTextField disabled='true' label='Files' name='files' placeholder='Files' />
              <Button type='submit' colorScheme='teal'>
                Create post
              </Button>
            </VStack>
          </Form>
        </Box>
        <SimpleAlertDialog
          header='Create post'
          body='Your post was created successfuly'
          leastDestructiveRef={cancelRef}
          isOpen={isResultAlertOpen}
          onClose={onCloseResultAlert}
        >
          <StyledLink href={courseId ? Routes.CourseView({ id: courseId }) : Routes.CoursesView()}>
            <Button
              colorScheme='teal'
              onClick={() => {
                setIsResultAltertOpen(false)
              }}
            >
              OK
            </Button>
          </StyledLink>
        </SimpleAlertDialog>
      </Flex>
    </Box>
  )
}
