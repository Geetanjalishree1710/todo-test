'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase'

export default function Home() {
  const supabase = useMemo(() => getSupabaseClient(), [])
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  const fetchTodos = useCallback(async () => {
    if (!supabase) return

    const { data } = await supabase
      .from('todos')
      .select('*')
    setTodos(data || [])
  }, [supabase])

  useEffect(() => {
    if (!supabase) return

    // Initial client-side data load from Supabase.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTodos()
  }, [fetchTodos, supabase])

  async function addTodo() {
    if (!supabase || !title.trim()) return

    await supabase
      .from('todos')
      .insert({ title: title.trim() })
    setTitle('')
    fetchTodos()
  }

  async function toggleTodo(id, is_complete) {
    if (!supabase) return

    await supabase
      .from('todos')
      .update({ is_complete: !is_complete })
      .eq('id', id)
    fetchTodos()
  }

  if (!supabase) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in Vercel project
          environment variables to enable the app.
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Naya todo..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      {todos.map(todo => (
        <div
          key={todo.id}
          className="flex items-center gap-2 p-2 border rounded mb-2 cursor-pointer"
          onClick={() => toggleTodo(todo.id, todo.is_complete)}
        >
          <span className={todo.is_complete ? 'line-through text-gray-400' : ''}>
            {todo.title}
          </span>
        </div>
      ))}
    </div>
  )
}
