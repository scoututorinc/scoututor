import { useQuery } from 'blitz'
import getUser from 'app/users/queries/getUser'

export const useUser = (userId: number) => {
  const [user] = useQuery(getUser, userId, { suspense: false })
  return user
}
