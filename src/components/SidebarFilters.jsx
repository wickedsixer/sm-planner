import React from 'react'
import { useStore } from '../store'

export default function SidebarFilters() {
  const { tags, filters, setFilterTags } = useStore()
  const selected = filters.selectedTagIds || new Set()

  function toggleTag(id) {
    const s = new Set(selected)
    if (s.has(id)) s.delete(id)
    else s.add(id)
    setFilterTags(s)
  }

  const groups = tags.reduce((acc, t) => {
    acc[t.category] = acc[t.category] || []
    acc[t.category].push(t)
    return acc
  }, {})

  return (
    <div>
      <h3 className="font-semibold mb-2">Filter</h3>

      {['fokus','undertema','kanal'].map(cat => (
        <div key={cat} className="mb-4">
          <div className="text-xs text-gray-500 mb-1">{cat}</div>
          <div className="flex flex-col gap-2">
            {(groups[cat] || []).map(tag => (
              <label key={tag.id} className="flex items-center gap-2">
                <input type="checkbox" checked={selected.has(tag.id)} onChange={() => toggleTag(tag.id)} />
                <span className="text-sm">{tag.name}</span>
                <span className="ml-auto text-xs px-2 rounded" style={{background: tag.color, color:'#fff'}}>{tag.category}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="text-sm text-gray-500 mt-4">
        Tips: använd filter för att visa endast idéer med valda taggar.
      </div>
    </div>
  )
}
