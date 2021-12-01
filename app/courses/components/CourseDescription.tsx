import React, { FC } from 'react'
import {
  Flex,
  VStack,
  HStack,
  Heading,
  Divider,
  Icon,
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { FaCheck, FaEuroSign } from 'react-icons/fa'
import { Routes, useMutation, useRouter } from 'blitz'
import deleteCourse from '../mutations/deleteCourse'
import cancelMemberships from '../mutations/cancelMemberships'
import { StyledLink } from 'app/core/components/StyledLink'

type CourseDescriptionProps = {
  id: number
  description: string
  hourlyRate: number
}

const CourseDescription = ({ id, description, hourlyRate }: CourseDescriptionProps) => {
  const knowledge_areas = ['Adobe Photoshop CS6', 'Adobe Illustrator CS6', 'Adobe InDesign CS6']
  const hourly_rate = 15.0
  const is_teacher = true
  const router = useRouter()
  const [deleteCourseMutation] = useMutation(deleteCourse)
  const [cancelMembershipsMutation] = useMutation(cancelMemberships)
  const [isOpenDC, setIsOpenDC] = React.useState(false)
  const onCloseDC = () => setIsOpenDC(false)
  const [isOpenCM, setIsOpenCM] = React.useState(false)
  const onCloseCM = () => setIsOpenCM(false)
  const cancelRef = React.useRef(null)
  return (
    <Flex direction='column' width={{ md: '75%' }}>
      <VStack alignItems='start' pb={5}>
        <Heading size='lg'>Knowledge the tutor can provide</Heading>
        <Divider />
      </VStack>
      <VStack spacing={8} alignItems='start' pb={10}>
        {knowledge_areas.map((item) => (
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
          <Button colorScheme='teal'>Edit information</Button>
          <Button
            type='submit'
            colorScheme='red'
            onClick={() => {
              setIsOpenCM(true)
            }}
          >
            Cancel Memberships
          </Button>
          <AlertDialog isOpen={isOpenCM} leastDestructiveRef={cancelRef} onClose={onCloseCM}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Cancel Memberships
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You cannot undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onCloseCM}>
                    Back
                  </Button>
                  <Button
                    colorScheme='red'
                    onClick={async () => {
                      await cancelMembershipsMutation(id)
                      onCloseCM()
                    }}
                  >
                    Cancel Memberships
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          <Button
            type='submit'
            colorScheme='red'
            onClick={() => {
              setIsOpenDC(true)
            }}
          >
            Delete Course
          </Button>
          <AlertDialog isOpen={isOpenDC} leastDestructiveRef={cancelRef} onClose={onCloseDC}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Delete Course
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You cannot undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onCloseDC}>
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
                        onCloseDC()
                      }
                    }}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </HStack>
      )}
    </Flex>
  )
}

export default CourseDescription
