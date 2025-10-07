import React, { useState } from 'react'
import { useStore } from '../store'
import IdeaEditor from './IdeaEditor'

export default function Topbar({ setActiveTab, activeTab }) {
  const [editorOpen, setEditorOpen] = useState(false)

  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">SM Planner</h1>
        <div className="text-sm text-gray-500">Enkel prototyp — LocalStorage</div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => { setEditorOpen(true); setActiveTab('production') }}
          className="bg-sky-600 text-white px-4 py-2 rounded"
        >
          Ny idé
        </button>
      </div>

      {editorOpen && <IdeaEditor onClose={() => setEditorOpen(false)} />}
    </header>
  )
}
