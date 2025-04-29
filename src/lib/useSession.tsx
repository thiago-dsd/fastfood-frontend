import useStore from '@/store/userStore'
import { useEffect } from 'react'
import { apiGetAuthUser } from './api-requests'

export default function useSession() {
  const store = useStore()

  async function fetchUser() {
    try {
      const user = await apiGetAuthUser()
      store.setAuthUser(user)
    } catch (error: any) {
      store.reset()
    }
  }

  useEffect(() => {
    if (!store.authUser) {
      fetchUser()
    }
  }, [])

  return store.authUser
}
