import { useEffect } from 'react'
import io from 'socket.io-client'

import { useAuth } from '@/contexts/auth-context'
import { env } from '@/env'

import { EventTicket } from '../types/event-ticket'

const socket = io(env.NEXT_PUBLIC_SOCKET_IO_URL, {
  forceNew: true,
  reconnectionAttempts: 3,
  timeout: 2000,
  withCredentials: true,
})

export function EventCheckoutView() {
  const { user } = useAuth()

  useEffect(() => {
    const onConnect = () => {
      socket.emit('event-entry')
    }

    const onLoadUnexpiredTickets = (data: EventTicket[]) => {
      console.log(data)
    }

    socket.on('connect', onConnect)
    socket.on('load-unexpired-tickets', onLoadUnexpiredTickets)

    return () => {
      socket.off('connect', onConnect)
      socket.off('load-unexpired-tickets', onLoadUnexpiredTickets)
    }
  }, [user])

  return <div></div>
}
