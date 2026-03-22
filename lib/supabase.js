// import { createClient } from '@supabase/supabase-js'

// let supabaseClient

// export function hasSupabaseEnv() {
//   return Boolean(
//     process.env.NEXT_PUBLIC_SUPABASE_URL &&
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   )
// }

// export function getSupabaseClient() {
//   if (!hasSupabaseEnv()) {
//     return null
//   }

//   if (!supabaseClient) {
//     supabaseClient = createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//       {
//         auth: {
//           persistSession: false
//         }
//       }
//     )
//   }

//   return supabaseClient
// }



import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  },
  global: {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  }
})