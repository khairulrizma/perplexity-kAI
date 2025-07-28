// import React from 'react'

// function DisplayResult({ searchInputRecord }) {
//   return (
//     <div className='mt-7'>
//       <h2 className='font-medium text-3xl line-clamp-2'>
//         {searchInputRecord?.searchInput}
//       </h2>
//     </div>
//   )
// }

// export default DisplayResult

import React, { useEffect, useState } from 'react'
import {
  MessageSquareText,
  ImageIcon,
  VideoIcon,
  BookOpenCheck,
} from 'lucide-react'
import AnswerDisplay from './AnswerDisplay'
import axios from 'axios'

function DisplayResult({ searchInputRecord }) {
  const [activeTab, setActiveTab] = useState('Answer')

  useEffect(() => {
    //update this method
    // searchInputRecord && GetSearchAPIResult()
  }),
    [searchInputRecord]

  const GetSearchAPIResult = async () => {
    const result = await axios.post('/api/brave-search-api', {
      searchInput: searchInputRecord?.searchInput,
      searchType: searchInputRecord?.type,
    })
    console.log(result.data)
    console.log(JSON.stringify(result.data))
  }

  const TABS = [
    { label: 'Answer', icon: <MessageSquareText size={16} /> },
    { label: 'Images', icon: <ImageIcon size={16} /> },
    { label: 'Videos', icon: <VideoIcon size={16} /> },
    { label: 'Sources', icon: <BookOpenCheck size={16} /> },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Answer':
        return <AnswerDisplay searchInputRecord={searchInputRecord} />
      case 'Images':
        return (
          <div className='mt-4 text-muted-foreground'>
            Image results will appear here.
          </div>
        )
      case 'Videos':
        return (
          <div className='mt-4 text-muted-foreground'>
            Video results will appear here.
          </div>
        )
      case 'Sources':
        return (
          <div className='mt-4 text-muted-foreground'>
            Sources will appear here.
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className='mt-7'>
      <h2 className='font-medium text-3xl line-clamp-2'>
        {searchInputRecord?.searchInput}
      </h2>

      {/* Tabs */}
      <div className='mt-6'>
        <div className='flex space-x-6 border-b pb-2'>
          {TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-1 text-sm font-medium pb-2 transition-all ${
                activeTab === tab.label
                  ? 'border-b-2 border-black text-black'
                  : 'text-muted-foreground hover:text-black'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className='mt-6'>{renderTabContent()}</div>
      </div>
    </div>
  )
}

export default DisplayResult
