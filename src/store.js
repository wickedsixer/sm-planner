import create from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'

const STORAGE_KEY = 'smPlanner:v1'

// Helper: sample tags & ideas
function sampleTags() {
  return [
    { id: 'tag-fokus-klimat', name: 'Klimat', category: 'fokus', color: '#06b6d4' },
    { id: 'tag-fokus-miljo', name: 'Miljö', category: 'fokus', color: '#34d399' },
    { id: 'tag-undtema-biodiv', name: 'Biologisk mångfald', category: 'undertema', color: '#f97316' },
    { id: 'tag-kanal-instagram', name: 'Instagram', category: 'kanal', color: '#ef4444' },
    { id: 'tag-kanal-linkedin', name: 'LinkedIn', category: 'kanal', color: '#0ea5e9' }
  ]
}
function sampleIdeas() {
  return [
    {
      id: uuid(),
      title: 'Hållbara rev — del 1',
      body: 'Kort förklaring om konstgjorda rev och varför de hjälper livet under ytan.',
      images: [],
      tags: ['tag-fokus-klimat','tag-undtema-biodiv','tag-kanal-instagram'],
      status: 'backlog',
      suggestedDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuid(),
      title: 'Internatid: miljökoll',
      body: 'En kort LinkedIn-post om företagets miljöarbete.',
      images: [],
      tags: ['tag-fokus-miljo','tag-kanal-linkedin'],
      status: 'production',
      suggestedDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export const useStore = create(
  persist(
    (set, get) => ({
      tags: [],
      ideas: [],
      filters: {
        selectedTagIds: new Set()
      },

      // init sample data only once
      initSampleData: () => {
        const s = get()
        if (s.tags.length === 0 && s.ideas.length === 0) {
          set({
            tags: sampleTags(),
            ideas: sampleIdeas()
          })
        }
      },

      createTag: ({ name, category, color }) => {
        const newTag = { id: uuid(), name, category, color }
        set(state => ({ tags: [...state.tags, newTag] }))
        return newTag
      },
      updateTag: (id, patch) => {
        set(state => ({ tags: state.tags.map(t => t.id === id ? { ...t, ...patch } : t) }))
      },
      deleteTag: (id) => {
        set(state => ({
          tags: state.tags.filter(t => t.id !== id),
          ideas: state.ideas.map(idea => ({ ...idea, tags: idea.tags.filter(tid => tid !== id) }))
        }))
      },

      createIdea: (payload) => {
        const now = new Date().toISOString()
        const idea = { id: uuid(), createdAt: now, updatedAt: now, ...payload }
        set(state => ({ ideas: [idea, ...state.ideas] }))
        return idea
      },
      updateIdea: (id, patch) => {
        set(state => ({ ideas: state.ideas.map(i => i.id === id ? { ...i, ...patch, updatedAt: new Date().toISOString() } : i) }))
      },
      deleteIdea: (id) => {
        set(state => ({ ideas: state.ideas.filter(i => i.id !== id) }))
      },
      moveIdeaToStatus: (id, status) => {
        get().updateIdea(id, { status })
      },
      setFilterTags: (setOfIds) => {
        set(() => ({ filters: { selectedTagIds: setOfIds } }))
      },

      clearAllData: () => set({ tags: [], ideas: [] })
    }),
    {
      name: STORAGE_KEY
    }
  )
)
