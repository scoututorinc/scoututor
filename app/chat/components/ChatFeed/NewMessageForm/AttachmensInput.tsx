import React, { ReactNode, useState, useRef } from 'react'

import { AttachmentIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormLabel,
  InputGroup,
  Button,
  Icon,
  FormErrorMessage,
  IconButton
} from '@chakra-ui/react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'

type FileUploadProps = {
  register: UseFormRegisterReturn
  accept?: string
  multiple?: boolean
  children?: ReactNode
}

const FileUpload = (props) => {
  const { register, accept, multiple, children } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register as { ref: (instance: HTMLInputElement | null) => void }
  const [attachments, setAttachments] = useState([])

  const handleClick = () => inputRef.current?.click()

  const onSelect = (event) => {
    const files = Array.from(event.target.files)
    props.onSelectFiles && props.onSelectFiles(files)
  }

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e)
          inputRef.current = e
        }}
        onChange={(event) => onSelect(event)}
      />
      <>{children}</>
    </InputGroup>
  )
}

type FormValues = {
  file_: FileList
}

const AttachmentsInput = (props) => {
  const [state, setState] = useState({
    hovered: false
  })

  function onSelect(event) {
    const files = Array.from(event.target.files)
    props.onSelectFiles && props.onSelectFiles(files)
  }

  // -------

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()
  const onSubmit = handleSubmit((data) => console.log(register))

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return 'Files is required'
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024)
      const MAX_FILE_SIZE = 10
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 10mb'
      }
    }
    return true
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.file_} isRequired>
          <FileUpload
            accept={'image/*'}
            multiple
            register={register('file_', { validate: validateFiles })}
            onSelectFiles={(attachments) => props.onSelectFiles && props.onSelectFiles(attachments)}
          >
            <IconButton
              variant='outline'
              borderColor='teal.400'
              borderWidth={2}
              aria-label='Upload files'
              colorScheme='teal'
              icon={<AttachmentIcon />}
            />
          </FileUpload>

          <FormErrorMessage>{errors.file_ && errors?.file_.message}</FormErrorMessage>
        </FormControl>
      </form>
    </>
  )
}

export default AttachmentsInput
