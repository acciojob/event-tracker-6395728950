import React, { useState } from "react";
import BigCalendar from "react-big-calendar";
import moment, { parseTwoDigitYear } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './Calendar.css'
import CustomToolbar from "./CustomToolbar";
import Popup from "react-popup";
import { useDispatch, useSelector } from "react-redux";
import { CreateEvent, UpdateEvent ,DeleteEvent} from "./EventSlice";

// Localizer setup for old version
const localizer = BigCalendar.momentLocalizer(moment);

 

export default function MyCalendar() {
 
 
  const events = useSelector((state) => state.Event.events);
  const dispatch   =useDispatch();
  console.log("what is come in events",events);
  const openCreatePopup = (date) => {

    Popup.create({
      title: "Create Event",
      content: (
        <div>
          <input id="newEventTitle" type="text" placeholder="Event Title" style={{ padding: "5px", width: "100%" }} />
          <input id="newEventLocation" type="text" placeholder="Event Location" style={{ padding: "5px", width: "100%" }} />
        </div>
      ),
      buttons: {
        left: ["cancel"],
        right: [
          {
            text: "Save",
            className: "btn",
            action: () => {
              const title = document.getElementById("newEventTitle").value;
              const location = document.getElementById("newEventLocation").value;
  
              if (title) {
                const newEvent = {
                  id: new Date().getTime(), // add unique id
                  title,
                  location,
                  start: date.toISOString(),
                  end: date.toISOString(),
                  allDay: true
                };
                dispatch(CreateEvent(newEvent));
              }
  
              Popup.close();
            },
          },
        ],
      },
    });
  };
  

  // Open popup to edit or delete an event
  const openEditPopup = (event) => {
    Popup.create({
      title: "Edit / Delete Event",
      content: (
        <div>
          <input id="editEventTitle" type="text" defaultValue={event.title} style={{ padding: "5px", width: "100%" }} />
        </div>
      ),
      buttons: {
        left: [
          {
            text: "Delete",
             className:'btn',
            action: () => {
              dispatch(DeleteEvent({ type: "delete", event }));
              Popup.close();
            },
          },
        ],
        right: [
          {
            text: "Edit",
            className: "success",
            action: () => {
              const newTitle = document.getElementById("editEventTitle").value;
              console.log("what is come in newTitle",newTitle)
              dispatch(UpdateEvent({ type: "update", event: { ...event, title: newTitle } }));
              Popup.close();
            },
          },
        ],
      },
    });
  };
  

  const eventStyleGetter = (event) => {
    const newDate = moment(event.start).startOf("day");
    const today = moment().startOf("day");
    const isPast = newDate.isBefore(today);
  
    const style = {
      backgroundColor: isPast ? "pink" : "green",
      color: "white",
      borderRadius: "6px",       // ✅ fixed typo
      padding: "2px 5px",
      height: "30px",
      textAlign: "center",       // ✅ fixed typo
    };
    return { style };
  };
  


  return (
    <div style={styles.container}>
  

      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month"]}
        selectable
        style={styles.calendar}
        components={{
          toolbar:CustomToolbar
        }}
        onSelectSlot={(slotInfo)=>openCreatePopup(slotInfo.start)}
        onSelectEvent={(event)=>openEditPopup(event)}
        eventPropGetter ={eventStyleGetter}
      />

       
          <Popup/>
          
      
    </div>
  );
}

const styles = {
  container: {
    width: "90%",
    margin: "20px auto",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#007bff",
  },
  calendar: {
    height: "600px",
    marginTop: "10px",
  },
  danger:{
    background:' #dc3545',
    color: 'white',
  }

};
