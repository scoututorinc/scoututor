import { useState } from 'react'
import { AuthenticationError, useMutation, useQuery, validateZodSchema } from 'blitz'
import {
  Flex,
  Box,
  HStack,
  VStack,
  Stack,
  Img,
  Heading,
  Icon,
  Text,
  Button,
  Grid,
  FormControl,
  FormLabel,
  Spacer
} from '@chakra-ui/react'
import { RiErrorWarningFill } from 'react-icons/ri'

import { Form as FinalForm } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { z } from 'zod'

import { PickerOverlay } from 'filestack-react'

import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { LabeledTextAreaField } from 'app/core/components/forms/LabeledTextAreaField'
import { SelectField } from 'app/core/components/forms/SelectField'
import {
  LabeledCheckboxArray,
  CheckboxArrayControl
} from 'app/core/components/forms/LabeledCheckboxArray'

import { CreateCourseInput } from 'app/courses/validations'
import getKnowledgeAreas from 'app/courses/queries/getKnowledgeAreas'

type CourseCreationFormProps = {
  submit: (input: z.infer<typeof CreateCourseInput>) => Promise<any>
  onSuccess?: (id: number) => void
  defaultValues?: z.infer<typeof CreateCourseInput>
  disciplines?: string[]
}

const KnowledgeAreasField = ({ discipline }: { discipline?: string }) => {
  const [knowledgeAreas] = useQuery(getKnowledgeAreas, discipline, {
    enabled: !!discipline,
    suspense: false
  })
  return (
    <LabeledCheckboxArray name='knowledgeAreas' label='Knowledge Areas' my={4}>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {knowledgeAreas?.map((k) => (
          <CheckboxArrayControl
            name='knowledgeAreas'
            key={discipline + k.name}
            label={k.name}
            value={k.name}
          />
        ))}
      </Grid>
    </LabeledCheckboxArray>
  )
}

export const CourseCreationForm = ({
  defaultValues,
  disciplines,
  submit,
  onSuccess
}: CourseCreationFormProps) => {
  const [values, setValues] = useState(defaultValues)

  const [previewImage, setPreviewImage] = useState(
    values?.previewImage || '/images/sidebar/courses.png'
  )
  const [isUploading, setIsUploading] = useState(false)

  return (
    <Box borderWidth='2px' borderColor='teal.400' rounded={6} w={{ base: '90%', lg: '70%' }}>
      <Flex alignItems='center' justifyContent='center' direction='column' w='100%'>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={6}
          p={10}
          justifyContent='center'
          alignItems='center'
        >
          <Img src='/images/add_course.png' maxWidth='100px'></Img>
          <Heading>{defaultValues ? 'Update Course' : 'Create course'}</Heading>
        </Stack>
        <FinalForm
          validate={validateZodSchema(CreateCourseInput)}
          initialValues={values}
          onSubmit={async (values) => {
            try {
              console.log(values)
              console.log('Tried to create course')
              setValues(values)
              const course = await submit({ ...values, previewImage: previewImage })
              onSuccess?.(course.id)
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: 'Sorry, those credentials are invalid' }
              } else {
                return {
                  [FORM_ERROR]:
                    'Sorry, we had an unexpected error. Please try again. - ' + error.toString()
                }
              }
            }
          }}
          debug={(e) => console.log(e.validating, JSON.stringify(e.errors))}
          render={({ form, handleSubmit, submitting, submitError, values }) => (
            <Box as='form' p={4} onSubmit={handleSubmit}>
              <VStack spacing={6} p={4} mb={2}>
                <LabeledTextField
                  label='Course title'
                  name='title'
                  placeholder='Give your course a title'
                />
                <FormControl>
                  <FormLabel fontWeight='bold'>Profile Picture</FormLabel>
                  <HStack>
                    <Img src={previewImage} width='50px' height='50px' objectFit={'cover'} />
                    <Spacer />
                    <Button onClick={() => setIsUploading(true)}>Upload</Button>
                  </HStack>
                  {isUploading && (
                    <PickerOverlay
                      apikey='AzwEASTdfQ5OYbBHxlAxrz'
                      onSuccess={(res) => {
                        setIsUploading(false)
                        setPreviewImage(res.filesUploaded[0].url)
                      }}
                      onUploadDone={(res) => res}
                      pickerOptions={{ accept: 'image/*', imageDim: [300, 300] }}
                    />
                  )}
                </FormControl>

                <LabeledTextAreaField
                  label='Detailed description'
                  placeholder='Tell your students about your course'
                  name='description'
                />
                <LabeledTextField
                  type='number'
                  label='Hourly rate'
                  name='hourlyRate'
                  placeholder='Enter the hourly price your students must endure'
                />
                <LabeledCheckboxArray name='methods' label='Method' my={4}>
                  <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                    <CheckboxArrayControl name='methods' label='Online' value='ONLINE' />
                    <CheckboxArrayControl name='methods' label='Presential' value='PRESENTIAL' />
                  </Grid>
                </LabeledCheckboxArray>
                <LabeledCheckboxArray name='knowledgeLevels' label='Knowledge Level' my={4}>
                  <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='Beginner'
                      value='BEGINNER'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='Intermediate'
                      value='INTERMEDIATE'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='Advanced'
                      value='ADVANCED'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='First cycle'
                      value='FIRSTCYCLE'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='Second cycle'
                      value='SECONDCYCLE'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='Thrid Cycle'
                      value='THIRDCYCLE'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='Secondary'
                      value='SECONDARY'
                    />
                    <CheckboxArrayControl
                      name='knowledgeLevels'
                      label='Bachelor'
                      value='BACHELOR'
                    />
                    <CheckboxArrayControl name='knowledgeLevels' label='Master' value='MASTER' />
                  </Grid>
                </LabeledCheckboxArray>
                <HStack spacing={4} mb={2}>
                  <Icon w={8} h={8} as={RiErrorWarningFill}></Icon>
                  <Text fontSize='md'>
                    {"If you don't find the subject you're looking for, please suggest it"}
                  </Text>
                </HStack>
                {disciplines ? (
                  <SelectField
                    name='discipline'
                    label='Discipline'
                    placeholder='Select one'
                    onChange={(e: any) => {
                      form.change('knowledgeAreas', [])
                    }}
                  >
                    {disciplines.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </SelectField>
                ) : (
                  <SelectField
                    name='discipline'
                    label='Discipline'
                    disabled
                    placeholder={defaultValues?.discipline}
                  />
                )}
                {values.discipline && <KnowledgeAreasField discipline={values.discipline} />}
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  justifyContent='center'
                  alignItems='center'
                  spacing={2}
                  w='100%'
                >
                  <Button variant='outline' w='50%'>
                    Cancel
                  </Button>
                  <Button type='submit' disabled={submitting} colorScheme='teal' w='50%'>
                    {defaultValues ? 'Update Course' : 'Create course'}
                  </Button>
                </Stack>
              </VStack>

              {submitError && (
                <div role='alert' style={{ color: 'red' }}>
                  {submitError}
                </div>
              )}
              {/* {JSON.stringify({
                discipline: values.discipline,
                k: values.knowledgeAreas
              })} */}
            </Box>
          )}
        />
      </Flex>
    </Box>
  )
}
