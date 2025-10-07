import React, { useMemo } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useStore } from '../store'

export default function CalendarView() {
  const { ideas, updateIdea } = useStore()

  const events = useMemo(() => {
    return ideas
      .filter(i => i.suggestedDate)
      .map(i => ({
        id: i.id,
        title: i.title,
        start: i.suggestedDate
      }))
  }, [ideas])

  function handleEventDrop(info) {
    // info.event.startStr
    const id = info.event.id
    updateIdea(id, { suggestedDate: info.event.startStr, status: 'scheduled' })
  }

  function handleDateClick(info) {
    // optional: open editor for new idea with date prefilled
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        eventDrop={handleEventDrop}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
        height="auto"
      />
    </div>
  )
}
