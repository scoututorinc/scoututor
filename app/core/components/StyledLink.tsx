import { Link as BlitzLink } from 'blitz'
import { Link as ChakraLink } from '@chakra-ui/react'
import { ComponentPropsWithoutRef } from 'react'

interface StyledLinkProps extends ComponentPropsWithoutRef<typeof ChakraLink> {}

export const StyledLink = ({ href, children, ...props }: StyledLinkProps) => {
  return (
    <BlitzLink href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </BlitzLink>
  )
}
