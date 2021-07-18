import { useEffect, useState } from 'react'
import { onAuthStateChange } from 'firebase/client'
import { useRouter } from 'next/router'

export const USER_STATE = {
  NOT_LOOGED: null,
  NOT_KNOW: undefined,
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATE.NOT_KNOW)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChange(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATE.NOT_LOOGED && router.push('/')
  }, [user])

  return user
}
