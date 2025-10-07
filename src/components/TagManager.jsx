import React, { useState } from 'react'
import { useStore } from '../store'

export default function TagManager() {
  const { tags, createTag, updateTag, deleteTag } = useStore()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('fokus')
  const [color, setColor] = useState('#06b6d4')

  function add() {
    if (!name.trim()) return
    createTag({ name: name.trim(), category, color })
    setName('')
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Tagg-hantering</h3>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <input placeholder="Namn" value={name} onChange={e=>setName(e.target.value)} className="border p-2 rounded" />
        <select value={category} onChange={e=>setCategory(e.target.value)} className="border p-2 rounded">
          <option value="fokus">fokus</option>
          <option value="undertema">undertema</option>
          <option value="kanal">kanal</option>
        </select>
        <div className="flex gap-2">
          <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
          <button className="px-3 py-1 bg-sky-600 text-white rounded" onClick={add}>Skapa</button>
        </div>
      </div>

      <div className="space-y-2">
        {tags.map(t => (
          <div key={t.id} className="flex items-center gap-3 border rounded p-2">
            <div className="w-3 h-3 rounded" style={{ background: t.color }} />
            <div className="flex-1">
              <div className="font-medium">{t.name}</div>
              <div className="text-xs text-gray-500">{t.category}</div>
            </div>
            <div className="flex gap-2">
              <button className="text-sm" onClick={() => {
                const newName = prompt('Nytt namn', t.name)
                if (newName) updateTag(t.id, { name: newName })
              }}>Byt namn</button>
              <button className="text-sm" onClick={() => {
                const newColor = prompt('Ny färg (hex)', t.color)
                if (newColor) updateTag(t.id, { color: newColor })
              }}>Ändra färg</button>
              <button className="text-sm text-red-600" onClick={() => {
                if (confirm('Radera tag?')) deleteTag(t.id)
              }}>Radera</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
