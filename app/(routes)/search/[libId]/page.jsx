// 'use client'
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import Header from './_components/Header'
// import { supabase } from '@/services/Supabase'
// import DisplayResult from './_components/DisplayResult'

// function SearchResultPage() {
//   const params = useParams()
//   const libId = params.libId
//   const [searchInputRecord, setsearchInputRecord] = useState()

//   useEffect(() => {
//     if (libId) {
//       GetSearchQueryRecord()
//     }
//   }, [libId])

//   const GetSearchQueryRecord = async () => {
//     const { data: Library, error } = await supabase
//       .from('Library')
//       .select('*')
//       .eq('libId', libId)

//     if (error) {
//       console.error('Supabase error:', error)
//     } else {
//       console.log(Library?.[0])
//       setsearchInputRecord(Library?.[0])
//     }
//   }

//   return (
//     <div>
//       <Header searchInputRecord={searchInputRecord}></Header>
//       <div className='px-10 md:px-20 lgA:px-36 xl:px-56 mt-20'>
//         <DisplayResult searchInputRecord={searchInputRecord}></DisplayResult>
//       </div>
//     </div>
//   )
// }

// export default SearchResultPage

// 'use client'
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import Header from './_components/Header'
// import { supabase } from '@/services/Supabase'
// import DisplayResult from './_components/DisplayResult'
// import {
//   MessageSquareText,
//   ImageIcon,
//   VideoIcon,
//   BookOpenCheck,
// } from 'lucide-react'
// import AnswerDisplay from './_components/AnswerDisplay'

// function SearchResultPage() {
//   const params = useParams()
//   const libId = params.libId
//   const [searchInputRecord, setsearchInputRecord] = useState()
//   const [activeTab, setActiveTab] = useState('Answer')

//   useEffect(() => {
//     if (libId) {
//       GetSearchQueryRecord()
//     }
//   }, [libId])

//   const GetSearchQueryRecord = async () => {
//     const { data: Library, error } = await supabase
//       .from('Library')
//       .select('*')
//       .eq('libId', libId)

//     if (error) {
//       console.error('Supabase error:', error)
//     } else {
//       setsearchInputRecord(Library?.[0])
//     }
//   }

//   const TABS = [
//     { label: 'Answer', icon: <MessageSquareText size={16} /> },
//     { label: 'Images', icon: <ImageIcon size={16} /> },
//     { label: 'Videos', icon: <VideoIcon size={16} /> },
//     { label: 'Sources', icon: <BookOpenCheck size={16} /> },
//   ]

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'Answer':
//         return <AnswerDisplay />
//       case 'Images':
//         return (
//           <div className='mt-4 text-muted-foreground'>
//             Image results will appear here.
//           </div>
//         )
//       case 'Videos':
//         return (
//           <div className='mt-4 text-muted-foreground'>
//             Video results will appear here.
//           </div>
//         )
//       case 'Sources':
//         return (
//           <div className='mt-4 text-muted-foreground'>
//             Sources will appear here.
//           </div>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div>
//       <Header searchInputRecord={searchInputRecord} />

//       {/* Tabs */}
//       <div className='px-10 md:px-20 lg:px-36 xl:px-56 mt-10'>
//         <div className='flex space-x-6 border-b pb-2'>
//           {TABS.map((tab) => (
//             <button
//               key={tab.label}
//               onClick={() => setActiveTab(tab.label)}
//               className={`flex items-center gap-1 text-sm font-medium pb-2 transition-all ${
//                 activeTab === tab.label
//                   ? 'border-b-2 border-black text-black'
//                   : 'text-muted-foreground hover:text-black'
//               }`}
//             >
//               {tab.icon}
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Tab content */}
//         <div className='mt-6'>{renderTabContent()}</div>
//       </div>
//     </div>
//   )
// }

// export default SearchResultPage

'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { supabase } from '@/services/Supabase'
import DisplayResult from './_components/DisplayResult'

function SearchResultPage() {
  const params = useParams()
  const libId = params.libId
  const [searchInputRecord, setsearchInputRecord] = useState()

  useEffect(() => {
    if (libId) {
      GetSearchQueryRecord()
    }
  }, [libId])

  const GetSearchQueryRecord = async () => {
    const { data: Library, error } = await supabase
      .from('Library')
      .select('*')
      .eq('libId', libId)

    if (error) {
      console.error('Supabase error:', error)
    } else {
      setsearchInputRecord(Library?.[0])
    }
  }

  return (
    <div>
      <Header searchInputRecord={searchInputRecord} />
      <div className='px-10 md:px-20 lg:px-36 xl:px-56 mt-20'>
        <DisplayResult searchInputRecord={searchInputRecord} />
      </div>
    </div>
  )
}

export default SearchResultPage
