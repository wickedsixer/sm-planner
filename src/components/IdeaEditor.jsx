import React, { useState } from 'react'
import { useStore } from '../store'
import { formatDateISO } from '../utils/date'

export default function IdeaEditor({ idea = null, onClose = ()=>{} }) {
  const isNew = !idea
  const { createIdea, updateIdea, tags } = useStore()

  const [title, setTitle] = useState(idea?.title || '')
  const [body, setBody] = useState(idea?.body || '')
  const [selectedTags, setSelectedTags] = useState(new Set(idea?.tags || []))
  const [date, setDate] = useState(formatDateISO(idea?.suggestedDate) || '')
  const [images, setImages] = useState(idea?.images || [])

  function toggleTag(id) {
    const s = new Set(selectedTags)
    if (s.has(id)) s.delete(id)
    else s.add(id)
    setSelectedTags(s)
  }

  function onFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImages(prev => [...prev, { id: Date.now().toString(), dataUrl: reader.result }])
    }
    reader.readAsDataURL(file)
  }

  function save() {
    const payload = {
      title, body, images, tags: Array.from(selectedTags), suggestedDate: date || null,
      status: idea?.status || 'backlog'
    }
    if (isNew) createIdea(payload)
    else updateIdea(idea.id, payload)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white w-[880px] max-h-[90vh] overflow-auto p-6 rounded">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{isNew ? 'Ny idé' : 'Redigera idé'}</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1" onClick={onClose}>Avbryt</button>
            <button className="px-3 py-1 bg-sky-600 text-white rounded" onClick={save}>Spara</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Titel</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border rounded p-2" />

            <label className="block text-sm mt-3">Text</label>
            <textarea value={body} onChange={e=>setBody(e.target.value)} rows={6} className="w-full border rounded p-2" />

            <label className="block text-sm mt-3">Bild</label>
            <input type="file" accept="image/*" onChange={onFile} />
            <div className="flex gap-2 mt-2">
              {images.map(img => (
                <div key={img.id} className="w-24 h-16 bg-gray-100 border rounded overflow-hidden">
                  <img src={img.dataUrl} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm">Taggar</label>
            <div className="flex flex-col gap-2 mt-2">
              {tags.map(t => (
                <label key={t.id} className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedTags.has(t.id)} onChange={() => toggleTag(t.id)} />
                  <span>{t.name}</span>
                  <span className="ml-auto text-xs px-2 rounded" style={{background: t.color, color:'#fff'}}>{t.category}</span>
                </label>
              ))}
            </div>

            <label className="block text-sm mt-4">Föreslaget datum</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full border rounded p-2" />

            <div className="mt-4">
              <label className="block text-sm">Status</label>
              <select value={idea?.status || 'backlog'} disabled className="w-full border rounded p-2">
                <option value="backlog">Backlogg</option>
                <option value="production">Till produktion</option>
                <option value="scheduled">Schemalagd</option>
                <option value="published">Publicerad</option>
              </select>
              <div className="text-xs text-gray-500 mt-2">Status ändras via kortet (Flytta → Produktion)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
