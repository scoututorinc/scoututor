import {
  Flex,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { ComponentPropsWithoutRef } from 'react'

interface StyledLinkProps extends ComponentPropsWithoutRef<typeof AlertDialog> {
  header: string
  body: string
}

export const SimpleAlertDialog = ({
  isOpen,
  leastDestructiveRef,
  onClose,
  header,
  body,
  children,
  ...props
}: StyledLinkProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
      {...props}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Flex justifyContent='center' width='100%'>
              <HStack spacing={6}>{children}</HStack>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
