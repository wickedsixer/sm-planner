import React, { useState } from 'react'
import { useStore } from '../store'

export default function PreviewModal({ idea, onClose }) {
  const [channel, setChannel] = useState('instagram')
  const { tags } = useStore()

  const ideaTags = idea.tags.map(tid => tags.find(t => t.id === tid)).filter(Boolean)

  function renderPreview() {
    // Simplified channel variations
    if (channel === 'instagram') {
      return (
        <div className="w-[360px] border rounded overflow-hidden">
          <div className="h-56 bg-gray-100 flex items-center justify-center">
            {idea.images[0] ? <img src={idea.images[0].dataUrl} className="h-full w-full object-cover" /> : <div className="text-gray-400">Ingen bild</div>}
          </div>
          <div className="p-3">
            <div className="text-sm">{idea.body}</div>
            <div className="mt-2 text-xs text-gray-500">{ideaTags.map(t => `#${t.name.replace(/\s+/g,'')}`).join(' ')}</div>
          </div>
        </div>
      )
    }
    if (channel === 'linkedin') {
      return (
        <div className="w-[540px] border rounded p-4 bg-white">
          <div className="font-medium">{idea.title}</div>
          <div className="text-sm text-gray-700 mt-2">{idea.body}</div>
        </div>
      )
    }
    return <div>Preview kanal saknas</div>
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-[720px]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Preview</h3>
          <div className="flex gap-2">
            <select value={channel} onChange={e=>setChannel(e.target.value)} className="border rounded p-1">
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
            </select>
            <button onClick={onClose} className="px-3 py-1">Stäng</button>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div>{renderPreview()}</div>
          <div className="flex-1">
            <div className="text-sm text-gray-600">Metainformation</div>
            <div className="mt-2">
              <div><strong>Titel:</strong> {idea.title}</div>
              <div className="mt-1"><strong>Datum:</strong> {idea.suggestedDate || '-'}</div>
              <div className="mt-1"><strong>Taggar:</strong> {ideaTags.map(t => t.name).join(', ')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
