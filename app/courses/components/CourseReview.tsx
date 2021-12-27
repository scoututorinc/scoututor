import { Box, Flex, Heading, Divider, Icon, Text, HStack, Img, Spacer } from '@chakra-ui/react'
import { useQuery } from 'blitz'
import { BsCheckCircleFill } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import getReviewAuthor from 'app/courses/queries/getReviewAuthor'

type CourseReviewProps = {
  authorId: number
  content: string
  rating: number
  version: 'small' | 'large'
}

const CourseReview = (props: CourseReviewProps) => {
  const [author, status] = useQuery(getReviewAuthor, props.authorId, { suspense: false })
  return status.isError == false && author ? (
    <Box
      borderWidth='1px'
      borderRadius='md'
      p={4}
      width={props.version == 'small' ? { base: '100%', md: '80%' } : '100%'}
      mb={6}
    >
      <Flex direction='row' justifyContent='space-between' pb={1}>
        {props.version == 'small' ? (
          <Heading as='h6' size='xs'>
            {author.name}
          </Heading>
        ) : (
          <HStack spacing={4}>
            <Img
              src={author.profilePicture || '/images/profile.png'}
              alt='profile_pic'
              maxW='50px'
              borderRadius='full'
            />
            <Heading as='h6' size='xs'>
              {author.name}
            </Heading>
            <HStack spacing={1}>
              <Icon as={MdLocationPin} />
              <Heading as='h6' size='xs'>
                {author.municipality
                  ? author.district + ', ' + author.municipality
                  : author.district}
              </Heading>
            </HStack>
            <HStack spacing={0}>
              {Array(props.rating)
                .fill(<Icon as={AiFillStar} />)
                .map((element) => element)}
              {Array(5 - props.rating)
                .fill(<Icon as={AiOutlineStar} />)
                .map((element) => element)}
            </HStack>
          </HStack>
        )}
        <Icon as={BsCheckCircleFill} color='teal.400'></Icon>
      </Flex>
      <Divider />
      <Text fontWeight='bold' pt={2}>
        {props.content}
      </Text>
    </Box>
  ) : (
    <p>Error</p>
  )
}

export default CourseReview
