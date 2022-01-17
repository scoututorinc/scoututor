import React, { useState, useRef } from 'react'
import { useMutation } from 'blitz'
import {
  Flex,
  Box,
  HStack,
  VStack,
  Img,
  Heading,
  Divider,
  Text,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  ListItem,
  UnorderedList
} from '@chakra-ui/react'
import { AiFillMessage } from 'react-icons/ai'
import acceptApplication from 'app/courses/mutations/acceptApplication'
import declineApplication from 'app/courses/mutations/declineApplication'
import { ApplicationMessages } from 'app/courses/components/ApplicationMessages'
import { dateToHourMinString } from 'utils'
import cancelApplication from '../mutations/cancelApplication'
import { SimpleAlertDialog } from 'app/core/components/SimpleAlertDialog'

type MessageProps = {
  content: string
  author: {
    name: string
    profilePicture: string | null
  }
}

type ApplicationProps = {
  isAuthor: boolean
  id: number
  description: string
  availableSessions: { id: number; day: string; startTime: Date; endTime: Date; userId: number }[]
  applicant: {
    name: string
    profilePicture: string | null
  }
  applicantId: number
  courseId: number
  messages: MessageProps[]
  onConclude?: () => void
}

const ApplicationActions = ({
  isAuthor,
  applicationId,
  applicantId,
  courseId,
  onConclude,
  setDialogState
}) => {
  const [cancelApplicationMutation] = useMutation(cancelApplication)
  const [acceptApplicationMutation] = useMutation(acceptApplication)
  const [declineApplicationMutation] = useMutation(declineApplication)

  return isAuthor ? (
    <HStack justifyContent='center' mb={6}>
      <Button
        colorScheme='red'
        onClick={() =>
          setDialogState({
            open: true,
            text: 'Are you sure you want to cancel the application?',
            action: async () => {
              await cancelApplicationMutation(applicationId)
              onConclude?.()
            }
          })
        }
      >
        Cancel
      </Button>
    </HStack>
  ) : (
    <HStack justifyContent='center' mb={6}>
      <Button
        colorScheme='teal'
        onClick={() =>
          setDialogState({
            open: true,
            text: 'Are you sure you want to accept the application?',
            action: async () => {
              await acceptApplicationMutation({
                applicationId,
                applicantId,
                courseId
              })
              onConclude?.()
            }
          })
        }
      >
        Accept
      </Button>
      <Button
        colorScheme='red'
        onClick={() =>
          setDialogState({
            open: true,
            text: 'Are you sure you want to reject the application?',
            action: async () => {
              await declineApplicationMutation(applicationId)
              onConclude?.()
            }
          })
        }
      >
        Decline
      </Button>
    </HStack>
  )
}

const Application = ({
  isAuthor,
  id,
  description,
  availableSessions,
  applicant,
  applicantId,
  courseId,
  messages: propsMessages,
  onConclude
}: ApplicationProps) => {
  const [dialogState, setDialogState] = useState<{
    open: boolean
    text: string
    action: (() => void) | null
  }>({ open: false, text: '', action: null })
  const cancelRef = useRef(null)

  const [messages, setMessages] = useState(propsMessages)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <VStack w='100%' spacing={4} mb={4}>
      <Box borderWidth='1px' width='100%' rounded={6}>
        <Flex direction='column' p={4}>
          <HStack spacing={4} alignItems='center' justifyContent='start' mb={4}>
            <Img
              src={applicant.profilePicture || '/images/profile.png'}
              alt='applicant'
              borderRadius='full'
              maxWidth='80px'
            />
            <Heading as='h5' size='md'>
              {applicant.name}
            </Heading>
          </HStack>
          <VStack spacing={2} alignItems='start' mb={4}>
            <Heading as='h6' size='md'>
              Interest manifestation and questions
            </Heading>
            <Divider />
            <Text fontWeight='bold'>{description}</Text>
          </VStack>
          <VStack spacing={2} alignItems='start' mb={6}>
            <Heading as='h6' size='md'>
              Availability
            </Heading>
            <Divider />
            <UnorderedList>
              {availableSessions?.map((s) => (
                <ListItem key={s.id}>
                  {`${s.day} ${dateToHourMinString(s.startTime)}-${dateToHourMinString(s.endTime)}`}
                </ListItem>
              ))}
            </UnorderedList>
          </VStack>
          <ApplicationActions
            isAuthor={isAuthor}
            applicationId={id}
            applicantId={applicantId}
            courseId={courseId}
            setDialogState={setDialogState}
            onConclude={onConclude}
          />
          <HStack justifyContent='center' mb={2}>
            <Button
              leftIcon={<Icon as={AiFillMessage} />}
              variang='ghost'
              onClick={() => setIsOpen(true)}
            >
              Follow up
            </Button>
          </HStack>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} scrollBehavior='inside' size='xl'>
        <ModalOverlay />
        <ModalContent maxW='80%' maxH='80%'>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody maxH='100%' display='flex'>
            <Flex direction='row' w='100%'>
              <Flex direction='column' mb={4} w='70%'>
                <HStack spacing={4} alignItems='center' justifyContent='start' mb={4}>
                  <Img
                    src={applicant.profilePicture || '/images/profile.png'}
                    alt='applicant'
                    borderRadius='full'
                    maxWidth='80px'
                  />
                  <Heading as='h5' size='md'>
                    {applicant.name}
                  </Heading>
                </HStack>
                <VStack spacing={2} alignItems='start' mb={4}>
                  <Heading as='h6' size='md'>
                    Interest manifestation and questions
                  </Heading>
                  <Divider />
                  <Text fontWeight='bold'>{description}</Text>
                </VStack>
                <VStack spacing={2} alignItems='start' mb={6}>
                  <Heading as='h6' size='md'>
                    Availability
                  </Heading>
                  <Divider />
                  <UnorderedList>
                    {availableSessions?.map((s) => (
                      <ListItem key={s.id}>
                        {`${s.day} ${dateToHourMinString(s.startTime)}-${dateToHourMinString(
                          s.endTime
                        )}`}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </VStack>
                <ApplicationActions
                  isAuthor={isAuthor}
                  applicationId={id}
                  applicantId={applicantId}
                  courseId={courseId}
                  setDialogState={setDialogState}
                  onConclude={onConclude}
                />
              </Flex>
              <Divider orientation='vertical' mx={4} />
              <ApplicationMessages
                applicationId={id}
                messages={messages}
                updateMessages={(newMessages) => setMessages(newMessages)}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SimpleAlertDialog
        header='Application Update'
        body={dialogState.text}
        isOpen={dialogState.open}
        leastDestructiveRef={cancelRef}
        onClose={() => setDialogState({ open: false, text: '', action: null })}
      >
        <Button
          colorScheme='teal'
          onClick={() => {
            dialogState.action?.()
            setDialogState({ open: false, text: '', action: null })
          }}
        >
          Confirm
        </Button>
        <Button
          colorScheme='red'
          ref={cancelRef}
          onClick={() => setDialogState({ open: false, text: '', action: null })}
        >
          Close
        </Button>
      </SimpleAlertDialog>
    </VStack>
  )
}

export default Application
