import React, { useState, useRef } from 'react'
import { useMutation, validateZodSchema } from 'blitz'
import { Box, Button, Container, Divider, Heading, HStack, Input, VStack } from '@chakra-ui/react'
import { Form } from 'app/core/components/forms/Form'
import { SelectField } from 'app/core/components/forms/SelectField'
import { TimeBlock } from 'app/calendar/validations'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import createAvailableTimeBlock from 'app/calendar/mutations/createAvailableTimeBlock'
import { WeekDay } from '@prisma/client'
import { SimpleAlertDialog } from 'app/core/components/SimpleAlertDialog'

const AddFreeTimeBlockForm = (props) => {
  const [createAvailableTimeBlockMutation] = useMutation(createAvailableTimeBlock)
  const [dialogActive, setDialogActive] = useState({ state: false, text: '' })
  const cancelRef = useRef(null)

  const int_to_weekday_correspondence = {
    0: 'MONDAY',
    1: 'TUESDAY',
    2: 'WEDNESDAY',
    3: 'THURSDAY',
    4: 'FRIDAY'
  }

  const overlappingTimeBlocks = (block_1, block_2) => {
    let b1 =
      parseInt(block_1.startTime.split(':').at(0)) * 60 +
      parseInt(block_1.startTime.split(':').at(1))
    let u1 =
      parseInt(block_1.endTime.split(':').at(0)) * 60 + parseInt(block_1.endTime.split(':').at(1))
    let b2 =
      parseInt(block_2.startTime.split(':').at(0)) * 60 +
      parseInt(block_2.startTime.split(':').at(1))
    let u2 =
      parseInt(block_2.endTime.split(':').at(0)) * 60 + parseInt(block_2.endTime.split(':').at(1))

    if (b1 <= u2 && u1 && b2) return true
    return false
  }

  const testTimeBlockForOverlappingEvents = (timeBlock, events) => {
    let r = false
    events.forEach((event) => {
      let event_days = event.daysOfWeek.map((day) => int_to_weekday_correspondence[day])
      if (overlappingTimeBlocks(timeBlock, event) && event_days.includes(timeBlock.day)) {
        r = true
      }
    })
    return r
  }

  const validateTimeBlockInput = (timeBlock) => {
    if (timeBlock.startTime > timeBlock.endTime) {
      return {
        validity: false,
        text: 'The starting time of block is after the ending time. That is not allowed, please correct the selected values'
      }
    }
    if (testTimeBlockForOverlappingEvents(timeBlock, props.scheduleSessions)) {
      return {
        validaty: false,
        text: 'The time block you chose colides with a already scheduled session. Please choose another time block.'
      }
    }
    return {
      validity: true,
      text: ''
    }
  }

  return (
    <div>
      <VStack spacing={2} alignItems='start' mb={6}>
        <Heading fontSize='2xl'>Add a free time block</Heading>
        <Divider />
        <Box w='100%'>
          <Form
            schema={TimeBlock}
            initialValues={{ day: 'MONDAY', startTime: '', endTime: '' }}
            onSubmit={async (values) => {
              try {
                let validation = validateTimeBlockInput(values)
                if (!validation.validity) {
                  setDialogActive({ state: true, text: validation.text })
                  values.startTime = ''
                  values.endTime = ''
                } else {
                  await createAvailableTimeBlockMutation(values)
                  location.reload()
                }
              } catch (e: any) {
                console.log(e)
              }
            }}
          >
            <HStack w='100%' spacing={6} justifyContent='space-between' alignItems='end'>
              <VStack w='100%' spacing={2}>
                <Container w='100%'>
                  <SelectField name='day' label='Day' placeholder='Select ...'>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((e) => {
                      return (
                        <option key={e} value={e.toUpperCase() as WeekDay}>
                          {e}
                        </option>
                      )
                    })}
                  </SelectField>
                </Container>
              </VStack>
              <VStack w='100%' spacing={2}>
                <LabeledTextField type='time' label='Starting time' name='startTime' />
              </VStack>
              <VStack w='100%' spacing={2}>
                <LabeledTextField type='time' label='Ending time' name='endTime' />
              </VStack>
              <Button type='submit' w='60%' colorScheme='teal'>
                Add free time block
              </Button>
            </HStack>
            <SimpleAlertDialog
              header='Invalid form values'
              body={dialogActive.text}
              isOpen={dialogActive.state}
              leastDestructiveRef={cancelRef}
              onClose={() => setDialogActive({ state: false, text: '' })}
            >
              <Button colorScheme='red' onClick={() => setDialogActive({ state: false, text: '' })}>
                Close
              </Button>
            </SimpleAlertDialog>
          </Form>
        </Box>
      </VStack>
    </div>
  )
}

export default AddFreeTimeBlockForm
