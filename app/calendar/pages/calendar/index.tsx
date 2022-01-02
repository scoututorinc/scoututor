import React, { CSSProperties } from 'react'
import {
  BlitzPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
  invokeWithMiddleware,
  PromiseReturnType
} from 'blitz'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import {
  Flex,
  Heading,
  VStack,
  HStack,
  Divider,
  Container,
  Text,
  Button,
  Box,
  Input
} from '@chakra-ui/react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import getCalendarEvents from 'app/calendar/queries/getCalendarEvents'
import AddFreeTimeBlockForm from 'app/calendar/components/AddFreeTimeBlockForm'
import getAvailableSessions from 'app/calendar/queries/getAvailableSessions'

const Calendar: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  events,
  availableSessions,
  error
}) => {
  return events && availableSessions ? (
    <Flex direction='column' p={{ base: 6, md: 10 }} width='100%' maxH='100vh'>
      <AddFreeTimeBlockForm />
      <VStack spacing={2} alignItems='start' mb={6}>
        <Heading fontSize='2xl'>Weekly Calendar</Heading>
        <Divider />
      </VStack>
      <Container minW='100%' maxH='100%' overflowY='scroll'>
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView='timeGridWeek'
          weekends={false}
          events={events}
        />
      </Container>
    </Flex>
  ) : (
    <p>{JSON.stringify(error)}</p>
  )
}

export const getServerSideProps: GetServerSideProps<{
  events?: PromiseReturnType<typeof getCalendarEvents>
  availableSessions?: PromiseReturnType<typeof getAvailableSessions>
  error?: any
}> = async (context) => {
  try {
    const events = await invokeWithMiddleware(getCalendarEvents, null, context)
    const availableSessions = await invokeWithMiddleware(getAvailableSessions, null, context)
    return {
      props: { events, availableSessions }
    }
  } catch (e) {
    return {
      props: { error: e }
    }
  }
}

Calendar.suppressFirstRenderFlicker = true
Calendar.getLayout = (page) => <LoggedInLayout title='Calendar'>{page}</LoggedInLayout>

export default Calendar
