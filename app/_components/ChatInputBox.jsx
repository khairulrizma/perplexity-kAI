// import Image from 'next/image'
// import React from 'react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import {
//   AtomIcon,
//   AudioLinesIcon,
//   CpuIcon,
//   GlobeIcon,
//   Mic2Icon,
//   PaperclipIcon,
//   SearchCheckIcon,
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { AIModelsOption } from '@/services/Shared'

// function Chatbox() {
//   return (
//     <div className='flex h-screen flex-col items-center justify-center w-full'>
//       <Image
//         className='p-5'
//         src={'/logo.png'}
//         alt='logo'
//         width={260}
//         height={260}
//       />
//       <div className='p-2 mt-10 w-full border max-w-2xl rounded-2xl'>
//         <div className='flex justify-between items-end'>
//           <Tabs defaultValue='search' className='w-[400px]'>
//             <TabsContent value='search'>
//               <input
//                 type='text'
//                 name=''
//                 id=''
//                 placeholder='Ask Anything with k-AI...'
//                 className='w-full p-4 outline-none'
//               />
//             </TabsContent>
//             <TabsContent value='research'>
//               <input
//                 type='text'
//                 name=''
//                 id=''
//                 placeholder='Research Anything...'
//                 className='w-full p-4 outline-none'
//               />
//             </TabsContent>
//             <TabsList>
//               <TabsTrigger value='search' className={'text-primary'}>
//                 <SearchCheckIcon /> Search
//               </TabsTrigger>
//               <TabsTrigger value='research' className={'text-primary'}>
//                 <AtomIcon /> Research
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>
//           <div className='flex gap-4 items-center'>
//             <DropdownMenu>
//               <DropdownMenuTrigger>
//                 <Button variant={'ghost'}>
//                   <CpuIcon className='text-gray-500 h-4 w-4' />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator /> */}
//                 {AIModelsOption.map((model, index) => {
//                   ;<DropdownMenuItem key={index}>
//                     <div>
//                       <h2>{model.name}</h2>
//                       <p>{model.desc}</p>
//                     </div>
//                   </DropdownMenuItem>
//                 })}
//                 <DropdownMenuItem>Profile</DropdownMenuItem>
//                 <DropdownMenuItem>Billing</DropdownMenuItem>
//                 <DropdownMenuItem>Team</DropdownMenuItem>
//                 <DropdownMenuItem>Subscription</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <Button variant={'ghost'}>
//               <GlobeIcon className='text-gray-500 h-4 w-4' />
//             </Button>
//             <Button variant={'ghost'}>
//               <PaperclipIcon className='text-gray-500 h-4 w-4' />
//             </Button>
//             <Button variant={'ghost'}>
//               <Mic2Icon className='text-gray-500 h-4 w-4' />
//             </Button>
//             <Button>
//               <AudioLinesIcon className='text-white h-4 w-4' />
//             </Button>
//           </div>
//         </div>
//       </div>
//       <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 pt-10'>
//         <Button variant='outline' className='rounded-xl text-sm'>
//           What's trending now?
//         </Button>
//         <Button variant='outline' className='rounded-xl text-sm'>
//           Explain AI to a 5-year-old
//         </Button>
//         <Button variant='outline' className='rounded-xl text-sm'>
//           Latest news in tech
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default Chatbox

'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowRight,
  AtomIcon,
  AudioLinesIcon,
  CpuIcon,
  GlobeIcon,
  Mic2Icon,
  PaperclipIcon,
  SearchCheckIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AIModelsOption } from '@/services/Shared'
import { supabase } from '@/services/Supabase'
import { useUser } from '@clerk/nextjs'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'

function Chatbox() {
  //whenever user type in the search bar it will save here thats why need state to hold that value.
  const [userSearchInput, setUserSearchInput] = useState()
  const [searchType, setSearchType] = useState('search')
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  const router = useRouter()
  const onSearchQuery = async () => {
    setLoading(true)
    const libId = uuidv4()
    const { data } = await supabase
      .from('Library')
      .insert([
        {
          searchInput: userSearchInput,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          type: searchType,
          libId: libId,
        },
      ])
      .select()
    setLoading(false)

    router.push('/search/' + libId)
    console.log(data[0])
  }

  return (
    <div className='flex h-screen flex-col items-center justify-center w-full px-4'>
      {/* Logo */}
      <Image
        className='p-5'
        src='/logo.png'
        alt='logo'
        width={260}
        height={260}
      />

      {/* Input area */}
      <div className='p-4 mt-6 w-full max-w-2xl border rounded-2xl bg-background shadow-sm'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4'>
          {/* Tabs */}
          <Tabs defaultValue='search' className='w-full sm:w-[400px]'>
            <TabsList className='flex gap-4 justify-center'>
              <TabsTrigger
                value='search'
                className='text-primary flex items-center gap-2'
                onClick={() => setSearchType('search')}
              >
                <SearchCheckIcon className='w-4 h-4' /> Search
              </TabsTrigger>
              <TabsTrigger
                value='research'
                className='text-primary flex items-center gap-2'
                onClick={() => setSearchType('research')}
              >
                <AtomIcon className='w-4 h-4' /> Research
              </TabsTrigger>
            </TabsList>

            <TabsContent value='search'>
              <input
                type='text'
                placeholder='Ask Anything with k-AI...'
                className='w-full p-4 mt-2 rounded-xl border outline-none'
                onChange={(e) => {
                  setUserSearchInput(e.target.value)
                }}
              />
            </TabsContent>
            <TabsContent value='research'>
              <input
                type='text'
                placeholder='Research Anything...'
                className='w-full p-4 mt-2 rounded-xl border outline-none'
                onChange={(e) => {
                  setUserSearchInput(e.target.value)
                }}
              />
            </TabsContent>
          </Tabs>

          {/* Control icons */}
          <div className='flex gap-2 items-center'>
            {/* Model selector dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='cursor-pointer'>
                  <CpuIcon className='text-gray-500 w-5 h-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-64'>
                {AIModelsOption.map((model, index) => (
                  <DropdownMenuItem
                    key={index}
                    className='flex flex-col items-start'
                  >
                    <span className='font-medium'>{model.name}</span>
                    <span className='text-xs text-muted-foreground'>
                      {model.desc}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant='ghost' size='icon' className='cursor-pointer'>
              <GlobeIcon className='text-gray-500 w-5 h-5' />
            </Button>
            <Button variant='ghost' size='icon' className='cursor-pointer'>
              <PaperclipIcon className='text-gray-500 w-5 h-5' />
            </Button>
            <Button variant='ghost' size='icon' className='cursor-pointer'>
              <Mic2Icon className='text-gray-500 w-5 h-5' />
            </Button>
            <Button
              size='icon'
              className='bg-primary text-white rounded-full cursor-pointer'
              onClick={() => {
                if (userSearchInput) {
                  onSearchQuery()
                } else {
                  null
                }
              }}
            >
              {!userSearchInput ? (
                <AudioLinesIcon className='w-4 h-4' />
              ) : (
                <ArrowRight className='w-4 h-4' disabled={loading} />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Suggested buttons */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 pt-10 max-w-2xl w-full'>
        <Button variant='outline' className='rounded-xl text-sm'>
          What's trending now?
        </Button>
        <Button variant='outline' className='rounded-xl text-sm'>
          Explain AI to a 5-year-old
        </Button>
        <Button variant='outline' className='rounded-xl text-sm'>
          Latest news in tech
        </Button>
      </div>
    </div>
  )
}

export default Chatbox
