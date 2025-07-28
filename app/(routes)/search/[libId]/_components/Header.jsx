import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Clock10Icon, Link, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function Header({ searchInputRecord }) {
  return (
    <div className='p-4 border-b flex justify-between'>
      <div className='flex gap-2 items-center'>
        <UserButton />
        <div className='flex gap-1 items-center'>
          <Clock10Icon className='h-5 w-5 text-gray-500' />
          <h2 className='text-sm text-gray-500'>
            {moment(searchInputRecord?.created_at).fromNow()}
          </h2>
        </div>
      </div>
      <h2 className='text-sm text-gray-500 line-clamp-1 max-w-md flex items-center'>
        {searchInputRecord?.searchInput}
      </h2>
      <div className='flex gap-3'>
        <Button>
          <Link></Link>
        </Button>
        <Button>
          <Send></Send> Share
        </Button>
      </div>
    </div>
  )
}

export default Header
