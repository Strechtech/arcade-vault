import { createClient } from './client'

// Users
export async function getUserByEmail(email: string) {
  const client = createClient()
  const { data, error } = await client
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code === 'PGRST116') return null
  if (error) throw error
  return data
}

export async function getUserById(id: string) {
  const client = createClient()
  const { data, error } = await client
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error && error.code === 'PGRST116') return null
  if (error) throw error
  return data
}

// Scores
export async function getScoresByUser(userId: string) {
  const client = createClient()
  const { data, error } = await client
    .from('scores')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getTopScores(limit = 10) {
  const client = createClient()
  const { data, error } = await client
    .from('scores')
    .select('*')
    .order('score', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function checkTestDataExists() {
  const client = createClient()
  const { data, error } = await client
    .from('users')
    .select('*')
    .limit(1)

  if (error) throw error
  return (data?.length || 0) > 0
}
