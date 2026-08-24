'use client'

import { useState } from 'react'
import { createClient } from '@/lib/client'

interface UseSaveScoreOptions {
  onSaved?: () => void
  onError?: (error: Error) => void
}

export function useSaveScore(options?: UseSaveScoreOptions) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const saveScore = async (userId: string, gameId: string, score: number) => {
    if (saved || loading) return

    setLoading(true)
    setError(null)
    try {
      const client = createClient()
      const { error: dbError } = await client.from('scores').insert([
        {
          user_id: userId,
          game_id: gameId,
          score: score,
        },
      ])

      if (dbError) throw dbError

      setSaved(true)
      options?.onSaved?.()
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Error saving score')
      setError(e)
      options?.onError?.(e)
    } finally {
      setLoading(false)
    }
  }

  return {
    saveScore,
    loading,
    saved,
    error,
  }
}
