import { getUsers } from '@/api/api'
import Role from '@/components/role/Role'
import ServerData from '@/components/role/ServerData'
import React from 'react'

export default async function page() {
  const data = await getUsers()
  
  return (
    <div>
        <ServerData data={data} />
        <Role />
    </div>
  )
}
