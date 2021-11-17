import { BlitzPage, useSession } from 'blitz'
import {
  Flex,
  Box,
  Heading,
  Divider,
  VStack,
  HStack,
  Img,
  Icon,
  Text,
  Button
} from '@chakra-ui/react'
import { FaLinkedin, FaMedal, FaCheck, FaEuroSign } from 'react-icons/fa'
import { MdLocationPin } from 'react-icons/md'
import { BsCheckCircleFill } from 'react-icons/bs'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'

const CourseView: BlitzPage = () => {
  return (
    <Flex direction='column' w='100%' h='100%' p={10}>
      <VStack spacing={2} pb={8} alignItems='start'>
        <Heading>Graphical Design by Bring Your Own Laptop</Heading>
        <Divider />
      </VStack>
      <Flex direction='row' justifyContent='space-between'>
        <Flex
          direction='column'
          justifyContent='center'
          alignItems='center'
          maxWidth={{ base: '100%', md: '25%' }}
        >
          <Img
            src='/images/knowledge.png'
            alt='bring_your_own_laptop'
            borderRadius='full'
            maxWidth='150px'
            pb={5}
          />

          <VStack spacing={4} alignItems='start' pb={5}>
            <HStack spacing={4}>
              <Icon as={FaLinkedin}></Icon>
              <Heading as='h6' size='xs'>
                @angusyoung
              </Heading>
            </HStack>
            <HStack spacing={4}>
              <Icon as={FaMedal}></Icon>
              <Heading as='h6' size='xs'>
                4.7/5 user rating (1021 reviews)
              </Heading>
            </HStack>
            <HStack spacing={4}>
              <Icon as={MdLocationPin}></Icon>
              <Heading as='h6' size='xs'>
                São Vítor, Braga
              </Heading>
            </HStack>
          </VStack>
          <Box borderWidth='1px' borderRadius='md' p={4} width='80%' mb={4}>
            <Flex direction='row' justifyContent='space-between' pb={1}>
              <Heading as='h6' size='xs'>
                José Ramos
              </Heading>
              <Icon as={BsCheckCircleFill} color='teal.400'></Icon>
            </Flex>
            <Divider />
            <Text fontWeight='bold' pt={2}>
              I was tutored by Bring Your Own Laptop and absolutely loved the experience. The level
              of support provided is absolutely incredible. I can absolutely guarantee you: no doubt
              of yours will go by unattended.
            </Text>
          </Box>
          <Box borderWidth='1px' borderRadius='md' p={4} width='80%' mb={4}>
            <Flex direction='row' justifyContent='space-between' pb={1}>
              <Heading as='h6' size='xs'>
                Gabriela Ramos
              </Heading>
              <Icon as={BsCheckCircleFill} color='teal.400'></Icon>
            </Flex>
            <Divider />
            <Text fontWeight='bold' pt={2}>
              I utilized this service for about 2 months. I can assure you that I wouldn`t have
              learned as much as I did, hadn`t I been helped by Bring Your Own Laptop. The way he
              makes complex concepts simpler is simply remarkable.
            </Text>
          </Box>
        </Flex>
        <Flex direction='column' width={{ md: '75%' }}>
          <VStack alignItems='start' pb={5}>
            <Heading size='lg'>Knowledge the tutor can provide</Heading>
            <Divider />
          </VStack>
          <VStack spacing={8} alignItems='start' pb={10}>
            <HStack spacing={6}>
              <Icon as={FaCheck}></Icon>
              <Heading size='md'>Adobe Photoshop CS6</Heading>
            </HStack>
            <HStack spacing={6}>
              <Icon as={FaCheck}></Icon>
              <Heading size='md'>Adobe Illustrator CS6</Heading>
            </HStack>
            <HStack spacing={6}>
              <Icon as={FaCheck}></Icon>
              <Heading size='md'>Adobe InDesign CS6</Heading>
            </HStack>
          </VStack>
          <VStack alignItems='start' pb={5}>
            <Heading size='lg'>Detailed description</Heading>
            <Divider />
          </VStack>
          <Text fontSize='xl'>
            I can provide you with support the most diverse tasks of graphical design. I have
            several years of experience and have worked with several companies over the years.
          </Text>
          <Text fontSize='xl' pb={10}>
            I can teach you the basics of each of the listed softwares in order for you to get a
            working understanding of each one of them. Once you`ve mastered the basics, if you so
            wish we may progress to more advanced tasks and you into a graphical design master.
          </Text>
          <VStack alignItems='start' pb={5}>
            <Heading size='lg'>Hourly price</Heading>
            <Divider />
          </VStack>
          <HStack spacing={8} pb={12}>
            <Icon as={FaEuroSign}></Icon>
            <Heading fontSize='2xl'>15,00</Heading>
          </HStack>
          <Button colorScheme='teal' maxWidth={{ base: '90%', md: '15%' }}>
            Apply for a vacancy
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

CourseView.suppressFirstRenderFlicker = true
CourseView.getLayout = (page) => <LoggedInLayout title='Course'>{page}</LoggedInLayout>
export default CourseView
