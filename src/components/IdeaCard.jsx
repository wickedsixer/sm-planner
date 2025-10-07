import React, { useState } from 'react'
import { useStore } from '../store'
import PreviewModal from './PreviewModal'
import { formatPretty } from '../utils/date'

export default function IdeaCard({ idea, onEdit }) {
  const { tags, moveIdeaToStatus, updateIdea, deleteIdea } = useStore()
  const [previewOpen, setPreviewOpen] = useState(false)

  const ideaTags = idea.tags.map(tid => tags.find(t => t.id === tid)).filter(Boolean)

  return (
    <div className="bg-white border rounded p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h4 className="font-medium">{idea.title}</h4>
          <p className="text-sm text-gray-600 line-clamp-3 mt-1">{idea.body}</p>
          <div className="flex gap-2 flex-wrap mt-2">
            {ideaTags.map(t => (
              <span key={t.id} className="text-xs px-2 py-0.5 rounded" style={{ background: t.color, color: '#fff' }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">{formatPretty(idea.suggestedDate)}</div>
          <div className="flex flex-col gap-2 mt-3">
            <button className="text-sm bg-sky-600 text-white px-2 py-1 rounded" onClick={() => setPreviewOpen(true)}>Preview</button>
            <button className="text-sm bg-gray-100 px-2 py-1 rounded" onClick={onEdit}>Edit</button>
            {idea.status === 'backlog' ? (
              <button className="text-sm bg-green-100 px-2 py-1 rounded" onClick={() => moveIdeaToStatus(idea.id, 'production')}>Flytta → Produktion</button>
            ) : (
              <button className="text-sm bg-yellow-100 px-2 py-1 rounded" onClick={() => moveIdeaToStatus(idea.id, 'backlog')}>Flytta → Backlogg</button>
            )}
            <button className="text-sm text-red-600" onClick={() => deleteIdea(idea.id)}>Radera</button>
          </div>
        </div>
      </div>

      {previewOpen && <PreviewModal idea={idea} onClose={() => setPreviewOpen(false)} />}
    </div>
  )
}
