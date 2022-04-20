import React, {useState} from 'react';
import Navigationbar from './Navigationbar';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import actionCreators from '../store/actions'
import { getHashValues } from '../store/utils'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'

function Calendar(props) {
    const user_id = useLocation().state.id;
    const dispatch = useDispatch();
    console.log(user_id);
      const [events, setEvents] = useState([
        {
            title: "Test Title",
            date: "2022-04-27"
        },
        {
            title: "Test Title 2",
            date: "2022-04-14"
        }
    ]);

     const renderSidebar = () => {
        return (
          <div className='demo-app-sidebar'>
            <div className='demo-app-sidebar-section'>
              <h2>Instructions</h2>
              <ul>
                <li>Select dates and you will be prompted to create a new event</li>
                <li>Drag, drop, and resize events</li>
                <li>Click an event to delete it</li>
              </ul>
            </div>
            <div className='demo-app-sidebar-section'>
              <label>
                <input
                  type='checkbox'
                  checked={props.weekendsVisible}
                  onChange={props.toggleWeekends}
                ></input>
                toggle weekends
              </label>
            </div>
            <div className='demo-app-sidebar-section'>
              <h2>All Events ({props.events.length})</h2>
              <ul>
                {props.events.map(renderSidebarEvent)}
              </ul>
            </div>
          </div>
        )
      }
    
      // handlers for user actions
      // ------------------------------------------------------------------------------------------
    
      const handleDateSelect = (selectInfo) => {
        let calendarApi = selectInfo.view.calendar
        let title = prompt('Please enter a new title for your event')
    
        calendarApi.unselect() // clear date selection
        console.log("Start time: " + selectInfo.startStr);
        console.log("End time: " + selectInfo.endStr);
        if (title) {
          calendarApi.addEvent({ // will render immediately. will call handleEventAdd
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          }, true) // temporary=true, will get overwritten when reducer gives new events
        }
      }
    
      const handleEventClick = (clickInfo) => {
        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove() // will render immediately. will call handleEventRemove
        }
      }
    
      // handlers that initiate reads/writes via the 'action' props
      // ------------------------------------------------------------------------------------------
    
      const handleDates = (rangeInfo) => {
        console.log(rangeInfo);
        props.requestEvents(rangeInfo.startStr, rangeInfo.endStr)
          .catch(reportNetworkError)
      }
    
      const handleEventAdd = (addInfo) => {
        props.createEvent(addInfo.event.toPlainObject())
          .catch(() => {
            reportNetworkError()
            addInfo.revert()
          })
      }
    
      const handleEventChange = (changeInfo) => {
        props.updateEvent(changeInfo.event.toPlainObject())
          .catch(() => {
            reportNetworkError()
            changeInfo.revert()
          })
      }
    
      const handleEventRemove = (removeInfo) => {
        props.deleteEvent(removeInfo.event.id)
          .catch(() => {
            reportNetworkError()
            removeInfo.revert()
          })
      }

    return (
      <div>
        <Navigationbar id={user_id}/>
        {renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            /* Uncomment this to trigger the problem
            hiddenDays={[ 0 ]}
            */
            weekends={props.weekendsVisible}
            datesSet={handleDates}
            select={handleDateSelect}
            events={events}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventAdd={handleEventAdd}
            eventChange={handleEventChange} // called for drag-n-drop/resize
            eventRemove={handleEventRemove}
          />
        </div>
      </div>
    )

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(plainEventObject) {
  return (
    <li key={plainEventObject.id}>
      <b>{formatDate(plainEventObject.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{plainEventObject.title}</i>
    </li>
  )
}

function reportNetworkError() {
  alert('This action could not be completed')
}

function mapStateToProps() {
  const getEventArray = createSelector(
    (state) => state.eventsById,
    getHashValues
  )

  return (state) => {
    return {
      events: getEventArray(state),
      weekendsVisible: state.weekendsVisible
    }
  }
}

export default connect(mapStateToProps, actionCreators)(Calendar)
