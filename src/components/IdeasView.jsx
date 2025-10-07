import React, { useMemo, useState } from 'react'
import { useStore } from '../store'
import IdeaCard from './IdeaCard'
import IdeaEditor from './IdeaEditor'

export default function IdeasView({ statusFilter }) {
  const { ideas, filters } = useStore()
  const [editorOpenFor, setEditorOpenFor] = useState(null)

  const selectedTags = filters.selectedTagIds || new Set()

  const filtered = useMemo(() => {
    return ideas.filter(i => i.status === statusFilter)
      .filter(i => {
        if (selectedTags.size === 0) return true
        // require that idea has all selected tags (AND)
        for (let t of selectedTags) {
          if (!i.tags.includes(t)) return false
        }
        return true
      })
  }, [ideas, statusFilter, selectedTags])

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {filtered.map(idea => (
          <IdeaCard key={idea.id} idea={idea} onEdit={() => setEditorOpenFor(idea)} />
        ))}
      </div>

      {editorOpenFor && <IdeaEditor idea={editorOpenFor} onClose={() => setEditorOpenFor(null)} />}
    </div>
  )
}
