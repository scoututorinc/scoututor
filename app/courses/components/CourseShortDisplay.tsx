import { Link as BlitzLink, Routes } from 'blitz'
import { Box, Stack, HStack, Heading, Text, Icon, Img, Button } from '@chakra-ui/react'
import { SiGoogleclassroom } from 'react-icons/si'
import { StyledLink } from 'app/core/components/StyledLink'

type CourseShortDisplayProps = {
  id: number
  title: string
  description: string
  authorId: number
  author: {
    name: string
    profilePicture: string | null
  }
  previewImage: string
  methods: string[]
}

const CourseShortDisplay = ({
  id,
  title,
  description,
  author,
  previewImage,
  methods
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
        <HStack spacing={4}>
          <Icon as={SiGoogleclassroom} />
          <Text fontSize='sm'>{methods}</Text>
        </HStack>
        <Text size='sm'>
          {description.length > 200 ? description.substring(0, 200) + '...' : description}
        </Text>
        <Img src={previewImage} alt='course_preview' rounded={6}></Img>
        <HStack spacing={4}>
          <Img
            src={author.profilePicture || '/images/profile.png'}
            maxWidth='50px'
            borderRadius='full'
          />
          <Heading fontSize='sm'>Tutored by {author.name}</Heading>
        </HStack>
        <StyledLink as={BlitzLink} href={Routes.CourseView({ id: id })}>
          <Button colorScheme='teal'>See in detail</Button>
        </StyledLink>
      </Stack>
    </Box>
  )
}

export default CourseShortDisplay
