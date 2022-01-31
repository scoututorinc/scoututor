import React, { useState } from 'react'
import {
  BlitzPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
  invokeWithMiddleware,
  PromiseReturnType,
  useQuery
} from 'blitz'
import LoggedInLayout from 'app/core/layouts/LoggedInLayout'
import { Flex, Heading, VStack, Divider, Container } from '@chakra-ui/react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import getCalendarEvents from 'app/calendar/queries/getCalendarEvents'
import AddFreeTimeBlockForm from 'app/calendar/components/AddFreeTimeBlockForm'
import getAvailableSessions from 'app/calendar/queries/getCurrentUserAvailableSessions'

interface Session {
  title: string
  startTime: string
  endTime: string
  daysOfWeek: (number | undefined)[]
  color: string
}

const Calendar: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  events,
  availableSessions,
  error
}) => {
  const [avSessionsUpdated, { refetch: refetchSessions }] = useQuery(getAvailableSessions, null, {
    suspense: false
  })

  console.log('avSessionsState', avSessionsUpdated)

  return events && availableSessions ? (
    <Flex direction='column' p={{ base: 6, md: 10 }} width='100%' maxH='100vh' overflowY={'auto'}>
      <AddFreeTimeBlockForm scheduledSessions={events} onSubmit={refetchSessions} />
      <VStack spacing={2} alignItems='start' mb={6}>
        <Heading fontSize='2xl'>Weekly Calendar</Heading>
        <Divider />
      </VStack>
      <Container minW='100%'>
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView='timeGridWeek'
          weekends={false}
          events={events.concat(avSessionsUpdated || availableSessions)}
        />
      </Container>
      {/* <Text>{JSON.stringify(events)}</Text>
      <Text>{JSON.stringify(availableSessions)}</Text> */}
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
