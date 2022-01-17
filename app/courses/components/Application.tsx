import React, { useState } from 'react'
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
}

const Application = ({
  isAuthor,
  id,
  description,
  availableSessions,
  applicant,
  applicantId,
  courseId,
  messages: propsMessages
}: ApplicationProps) => {
  const [acceptApplicationMutation] = useMutation(acceptApplication)
  const [declineApplicationMutation] = useMutation(declineApplication)

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
          {!isAuthor && (
            <HStack justifyContent='center' mb={6}>
              <Button
                colorScheme='teal'
                onClick={async () => {
                  await acceptApplicationMutation({
                    applicationId: id,
                    applicantId: applicantId,
                    courseId: courseId
                  })
                }}
              >
                Accept
              </Button>
              <Button colorScheme='red' onClick={async () => await declineApplicationMutation(id)}>
                Decline
              </Button>
            </HStack>
          )}
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
          <ModalHeader></ModalHeader>
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
                {!isAuthor && (
                  <HStack justifyContent='center' mb={6}>
                    <Button
                      colorScheme='teal'
                      onClick={async () => {
                        await acceptApplicationMutation({
                          applicationId: id,
                          applicantId: applicantId,
                          courseId: courseId
                        })
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      colorScheme='red'
                      onClick={async () => await declineApplicationMutation(id)}
                    >
                      Decline
                    </Button>
                  </HStack>
                )}
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
    </VStack>
  )
}

export default Application
