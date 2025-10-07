import React, { useState } from 'react'
import Topbar from './components/Topbar'
import SidebarFilters from './components/SidebarFilters'
import IdeasView from './components/IdeasView'
import CalendarView from './components/CalendarView'
import TagManager from './components/TagManager'
import { useStore } from './store'

export default function App() {
  const [activeTab, setActiveTab] = useState('backlog') // backlog | production | calendar | tags
  const { initSampleData } = useStore()
  // init sample data on first load (store handles idempotence)
  React.useEffect(() => {
    initSampleData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="flex">
        <aside className="w-64 border-r bg-white p-4">
          <SidebarFilters />
        </aside>

        <main className="flex-1 p-6">
          <div className="mb-4">
            <nav className="flex gap-2">
              <button
                onClick={() => setActiveTab('backlog')}
                className={`px-3 py-1 rounded ${activeTab==='backlog' ? 'bg-sky-600 text-white' : 'bg-white border'}`}
              >
                Backlogg
              </button>
              <button
                onClick={() => setActiveTab('production')}
                className={`px-3 py-1 rounded ${activeTab==='production' ? 'bg-sky-600 text-white' : 'bg-white border'}`}
              >
                Till produktion
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-3 py-1 rounded ${activeTab==='calendar' ? 'bg-sky-600 text-white' : 'bg-white border'}`}
              >
                Kalender
              </button>
              <button
                onClick={() => setActiveTab('tags')}
                className={`px-3 py-1 rounded ${activeTab==='tags' ? 'bg-sky-600 text-white' : 'bg-white border'}`}
              >
                Taggar
              </button>
            </nav>
          </div>

          {activeTab === 'backlog' && <IdeasView statusFilter="backlog" />}
          {activeTab === 'production' && <IdeasView statusFilter="production" />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'tags' && <TagManager />}
        </main>
      </div>
    </div>
  )
}
