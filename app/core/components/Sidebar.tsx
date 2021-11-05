import { useMutation, Router, Routes } from 'blitz'
import logout from 'app/auth/mutations/logout'
import { FC } from 'react'

import { Flex, VStack, Image, Heading, Spacer } from '@chakra-ui/react'

const Sidebar: FC = () => {
  const [logoutMutation] = useMutation(logout)

  const items = {
    upper_items: [
      {
        image_src: '/images/sidebar/search.png',
        image_alt: 'scoututor',
        icon_text: 'Search'
      },
      {
        image_src: '/images/sidebar/messages.png',
        image_alt: 'chat',
        icon_text: 'Chat'
      },
      {
        image_src: '/images/sidebar/courses.png',
        image_alt: 'courses',
        icon_text: 'Courses'
      }
    ],
    lower_items: [
      {
        image_src: '/images/sidebar/profile.png',
        image_alt: 'profile',
        icon_text: 'Profile'
      },
      {
        image_src: '/images/sidebar/logout.png',
        image_alt: 'logout',
        icon_text: 'Log out'
      }
    ]
  }

  return (
    <Flex
      direction="column"
      w={{ base: '20%', sm: '10%', lg: '5%' }}
      h="100%"
      bg="gray.400"
      alignItems="space-between"
    >
      <VStack mt={10} mb={15}>
        <Image src="/images/sidebar/logo_no_text.png" alt="scoututor" maxWidth="75%" />
        {items.upper_items.map((item) => (
          <VStack key={item.icon_text} pt={5}>
            <Image src={item.image_src} alt={item.image_alt} maxWidth="50%" />
            <Heading size="xs">{item.icon_text}</Heading>
          </VStack>
        ))}
      </VStack>
      <Spacer />
      <VStack mb={10}>
        {items.lower_items.map((item) => (
          <VStack key={item.icon_text} pt={5}>
            <Image
              src={item.image_src}
              alt={item.image_alt}
              onClick={async () => {
                await logoutMutation()
                Router.push(Routes.Home())
              }}
            />
            <Heading size="xs">{item.icon_text}</Heading>
          </VStack>
        ))}
      </VStack>
    </Flex>
  )
}

export default Sidebar
