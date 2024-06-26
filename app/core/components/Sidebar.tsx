import { Routes, useMutation, useRouter } from 'blitz'
import logout from 'app/auth/mutations/logout'
import { FC } from 'react'

import { Flex, VStack, Img, Heading, Spacer, Link } from '@chakra-ui/react'

import { StyledLink } from 'app/core/components/StyledLink'

const Sidebar: FC = () => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  const items = {
    upper_items: [
      {
        href: Routes.MainFeed().pathname,
        image_src: '/images/sidebar/my_feed.png',
        image_alt: 'main feed',
        icon_text: 'Feed'
      },
      {
        href: Routes.Chat().pathname,
        image_src: '/images/sidebar/messages.png',
        image_alt: 'chat',
        icon_text: 'Chat'
      },
      {
        href: Routes.CoursesView().pathname,
        image_src: '/images/sidebar/courses.png',
        image_alt: 'courses',
        icon_text: 'Courses'
      }
    ],
    calendar: {
      href: Routes.Calendar().pathname,
      image_src: '/images/sidebar/calendar.png',
      image_alt: 'calendar',
      icon_text: 'Calendar'
    },
    notifications: {
      href: Routes.Notifications().pathname,
      image_src: '/images/sidebar/notifications.png',
      image_alt: 'notifications',
      icon_text: 'Alerts'
    },
    profile: {
      href: Routes.Activity().pathname,
      image_src: '/images/sidebar/profile.png',
      image_alt: 'profile',
      icon_text: 'Profile'
    },
    logout: {
      image_src: '/images/sidebar/logout.png',
      image_alt: 'logout',
      icon_text: 'Log out'
    }
  }

  return (
    <Flex
      direction='column'
      w={{ base: '20%', sm: '10%', lg: '5%' }}
      h='100%'
      bg='gray.400'
      alignItems='space-between'
    >
      <VStack mt={10} mb={15}>
        <Img src='/images/sidebar/logo_no_text.png' alt='scoututor' maxWidth='75%' />
        {items.upper_items.map((item) => (
          <VStack key={item.icon_text} pt={5}>
            <StyledLink href={item.href} display='flex' flexDirection='column' alignItems='center'>
              <Img src={item.image_src} alt={item.image_alt} maxWidth='50%' />
              <Heading size='xs'>{item.icon_text}</Heading>
            </StyledLink>
          </VStack>
        ))}
      </VStack>
      <Spacer />
      <VStack mb={10}>
        <VStack pt={5}>
          <StyledLink
            href={items.notifications.href}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Img
              src={items.notifications.image_src}
              alt={items.notifications.image_alt}
              maxWidth='50%'
            />
            <Heading size='xs'>{items.notifications.icon_text}</Heading>
          </StyledLink>
        </VStack>
        <VStack pt={5}>
          <StyledLink
            href={items.calendar.href}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Img src={items.calendar.image_src} alt={items.calendar.image_alt} maxWidth='50%' />
            <Heading size='xs'>{items.calendar.icon_text}</Heading>
          </StyledLink>
        </VStack>

        <VStack pt={5}>
          <StyledLink
            href={items.profile.href}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Img src={items.profile.image_src} alt={items.profile.image_alt} maxWidth='50%' />
            <Heading size='xs'>{items.profile.icon_text}</Heading>
          </StyledLink>
        </VStack>
        <VStack pt={5}>
          <Link display='flex' flexDirection='column' alignItems='center'>
            <Img
              src={items.logout.image_src}
              alt={items.logout.image_alt}
              maxWidth='50%'
              onClick={async () => {
                await router.push(Routes.Home())
                await logoutMutation()
              }}
            />
            <Heading size='xs'>{items.logout.icon_text}</Heading>
          </Link>
        </VStack>
      </VStack>
    </Flex>
  )
}

export default Sidebar
