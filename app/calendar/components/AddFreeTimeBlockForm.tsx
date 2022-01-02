import { useMutation } from 'blitz'
import { Box, Button, Container, Divider, Heading, HStack, Input, VStack } from '@chakra-ui/react'
import { Form } from 'app/core/components/forms/Form'
import { SelectField } from 'app/core/components/forms/SelectField'
import { TimeBlock } from 'app/calendar/validations'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import createAvailableTimeBlock from 'app/calendar/mutations/createAvailableTimeBlock'

const AddFreeTimeBlockForm = () => {
  const [createAvailableTimeBlockMutation] = useMutation(createAvailableTimeBlock)
  return (
    <VStack spacing={2} alignItems='start' mb={6}>
      <Heading fontSize='2xl'>Add a free time block</Heading>
      <Divider />
      <Box w='100%'>
        <Form
          schema={TimeBlock}
          initialValues={{ day: '', startTime: null, endTime: null }}
          onSubmit={async (values) => {
            try {
              await createAvailableTimeBlockMutation(values)
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
                      <option key={e} value={e}>
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
        </Form>
      </Box>
    </VStack>
  )
}

export default AddFreeTimeBlockForm
