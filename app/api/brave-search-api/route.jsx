import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req) {
  //get user input
  const { searchInput, searchType } = await req.json()

  if (searchInput) {
    const result = await axios.get(
      'https://api.search.brave.com/res/v1/web/search?q=' +
        searchInput +
        '&count=5',
      {
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip',
          'X-Subscription-Token': process.env.BRAVE_API_KEY, // Store your API key in .env.local
        },
      }
    )

    console.log(result.data)

    return NextResponse.json(result.data)
  } else {
    return NextResponse.json(
      { error: 'Failed to fetch search results' },
      { status: 500 }
    )
  }
}

// import { NextResponse } from 'next/server'
// import axios from 'axios'

// export async function POST(req) {
//   try {
//     // Step 1: Get user input and search type from request body
//     const { searchInput, searchType } = await req.json()

//     // Step 2: Prepare Brave API endpoint
//     const endpoint = `https://api.search.brave.com/res/v1/${searchType}/search`

//     // Step 3: Call Brave API using axios
//     const response = await axios.get(endpoint, {
//       params: {
//         q: searchInput,
//       },
//       headers: {
//         Accept: 'application/json',
//         'Accept-Encoding': 'gzip',
//         'X-Subscription-Token': process.env.BRAVE_API_KEY, // Store your API key in .env.local
//       },
//     })

//     // Step 4: Return the response data to frontend
//     console.log(response.data)
//     return NextResponse.json({ data: response.data })
//   } catch (error) {
//     console.error('Brave API error:', error.response?.data || error.message)
//     return NextResponse.json(
//       { error: 'Failed to fetch search results' },
//       { status: 500 }
//     )
//   }
// }
