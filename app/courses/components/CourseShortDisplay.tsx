import { Link as BlitzLink, Routes } from 'blitz'
import { Box, Stack, HStack, Heading, Text, Icon, Img, Button, VStack } from '@chakra-ui/react'
import { SiGoogleclassroom } from 'react-icons/si'
import { GrMapLocation } from 'react-icons/gr'
import { FaUniversity } from 'react-icons/fa'
import { StyledLink } from 'app/core/components/StyledLink'

type CourseShortDisplayProps = {
  id: number
  title: string
  description: string
  authorId: number
  author: {
    name: string
    district: string | null
    municipality: string | null
    profilePicture: string | null
  }
  previewImage: string
  methods: string[]
  discipline: { name: string }
}

const CourseShortDisplay = ({
  id,
  title,
  description,
  author,
  previewImage,
  methods,
  discipline
}: CourseShortDisplayProps) => {
  return (
    <Box rounded={6} borderWidth='2px' alignItems='center' justifyContent='center' p={2}>
      <Stack
        direction='column'
        spacing={4}
        justifyContent='center'
        alignItems='center'
        m={{ base: 2, lg: 4 }}
      >
        <Heading fontSize='lg'>{title}</Heading>
        <VStack mt={4} align={'center'}>
          <HStack width={'100%'}>
            <Icon as={FaUniversity} />
            <Text fontSize='sm'>{discipline.name}</Text>
            <Icon as={GrMapLocation} />
            <Text fontSize='sm'>{`${author.district} - ${author.municipality}`}</Text>
          </HStack>

          <HStack>
            <Icon as={SiGoogleclassroom} />
            <Text fontSize='sm'>{methods.join(' ')}</Text>
          </HStack>
        </VStack>
        <Text size='sm'>
          {description.length > 200 ? description.substring(0, 200) + '...' : description}
        </Text>
        <Img src={previewImage} alt='course_preview' height='300px' objectFit='cover' rounded={6} />
        <HStack spacing={4}>
          <Img
            src={author.profilePicture || '/images/profile.png'}
            maxWidth='50px'
            borderRadius='full'
          />
          <Heading fontSize='sm'>Tutored by {author.name}</Heading>
        </HStack>
        <StyledLink href={Routes.CourseView({ id: id })}>
          <Button colorScheme='teal'>See in detail</Button>
        </StyledLink>
      </Stack>
    </Box>
  )
}

export default CourseShortDisplay
