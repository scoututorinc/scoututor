import React, { useState, useRef } from 'react'
import { Flex, VStack, HStack, Heading, Divider, Icon, Text, Button, Grid } from '@chakra-ui/react'
import { FaCheck, FaEuroSign } from 'react-icons/fa'
import { Routes, useMutation, useRouter } from 'blitz'
import deleteCourse from 'app/courses/mutations/deleteCourse'
import cancelMemberships from 'app/courses/mutations/cancelMemberships'
import { StyledLink } from 'app/core/components/StyledLink'
import { SimpleAlertDialog } from 'app/core/components/SimpleAlertDialog'

type CourseDescriptionProps = {
  id: number
  description: string
  hourlyRate: number
  knowledgeAreas: string[]
  permissions: {
    canUpdateCourse: boolean
    canJoinCourse: boolean
  }
}

const CourseDescription = ({
  id,
  description,
  knowledgeAreas,
  hourlyRate,
  permissions
}: CourseDescriptionProps) => {
  const router = useRouter()

  const [deleteCourseMutation] = useMutation(deleteCourse)
  const [cancelMembershipsMutation] = useMutation(cancelMemberships)

  const [isOpenDeleteCourse, setIsOpenDeleteCourse] = useState(false)
  const [isOpenCancelMemberships, setIsOpenCancelMemberships] = useState(false)
  const onCloseDeleteCourse = () => setIsOpenDeleteCourse(false)
  const onCloseCancelMemberships = () => setIsOpenCancelMemberships(false)
  const cancelRef = useRef(null)

  return (
    <Flex direction='column' width={{ md: '75%' }}>
      <VStack alignItems='start' pb={5}>
        <Heading size='lg'>Knowledge the tutor can provide</Heading>
        <Divider />
      </VStack>
      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(5, 1fr)'
        }}
        gap={6}
        pb={10}
      >
        {knowledgeAreas.map((item) => (
          <HStack key={item} spacing={6}>
            <Icon as={FaCheck} />
            <Heading size='md'>{item}</Heading>
          </HStack>
        ))}
      </Grid>
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
        <Icon as={FaEuroSign} />
        <Heading fontSize='2xl'>{hourlyRate}</Heading>
      </HStack>
      {permissions.canJoinCourse && (
        <StyledLink href={Routes.CourseApplication({ id })}>
          <Button colorScheme='teal' maxWidth={{ base: '90%', md: '30%', lg: '20%' }}>
            Apply for a vacancy
          </Button>
        </StyledLink>
      )}
      {permissions.canUpdateCourse && (
        <HStack spacing={4}>
          <StyledLink href={Routes.Applications({ id })}>
            <Button colorScheme='teal'>Manage Applications</Button>
          </StyledLink>

          <StyledLink href={Routes.EditCourse({ id })}>
            <Button colorScheme='teal'>Edit information</Button>
          </StyledLink>
          <Button
            type='submit'
            colorScheme='red'
            onClick={() => {
              setIsOpenCancelMemberships(true)
            }}
          >
            Cancel Memberships
          </Button>

          <SimpleAlertDialog
            header='Cancel Memberships'
            body='Are you sure? You cannot undo this action afterwards.'
            isOpen={isOpenCancelMemberships}
            leastDestructiveRef={cancelRef}
            onClose={onCloseCancelMemberships}
          >
            <Button ref={cancelRef} onClick={onCloseCancelMemberships}>
              Back
            </Button>
            <Button
              colorScheme='red'
              onClick={async () => {
                await cancelMembershipsMutation(id)
                onCloseCancelMemberships()
              }}
            >
              Cancel Memberships
            </Button>
          </SimpleAlertDialog>

          <Button
            type='submit'
            colorScheme='red'
            onClick={() => {
              setIsOpenDeleteCourse(true)
            }}
          >
            Delete Course
          </Button>

          <SimpleAlertDialog
            header='Delete Course'
            body='Are you sure? You cannot undo this action afterwards.'
            isOpen={isOpenDeleteCourse}
            leastDestructiveRef={cancelRef}
            onClose={onCloseDeleteCourse}
          >
            <Button ref={cancelRef} onClick={onCloseDeleteCourse}>
              Cancel
            </Button>
            <Button
              colorScheme='red'
              onClick={async () => {
                try {
                  await deleteCourseMutation(id)
                  await router.push(Routes.CoursesView())
                } catch (error: any) {
                  alert(
                    'This course has active memberships and could not be deleted. If you wish to delete this course, make sure to cancel all memberships beforehand'
                  )
                  onCloseDeleteCourse()
                }
              }}
            >
              Delete
            </Button>
          </SimpleAlertDialog>
        </HStack>
      )}
    </Flex>
  )
}

export default CourseDescription
