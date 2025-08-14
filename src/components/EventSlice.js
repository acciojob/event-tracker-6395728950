import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  allEvents: [],  // stores all raw data
  events: []      // filtered events (past/upcoming/all)
};

const EventSlice = createSlice({
  name: "Event",
  initialState,
  reducers: {
    CreateEvent: (state, action) => {
      state.allEvents.push(action.payload);
      state.events.push(action.payload); // update current view
    },

    All: (state) => {
      state.events = [...state.allEvents];
    },

    Past: (state) => {
      const today = moment().startOf('day')
      state.events = state.allEvents.filter(
        (item) => moment(item.start).startOf("day").isBefore(today)
      );
    },

    Upcoming: (state) => {
      const today = moment().startOf('day');
      state.events = state.allEvents.filter(
        (item) => moment(item.start).startOf("day").isAfter(today)
      );
    },

    UpdateEvent: (state, action) => {
      const updated = action.payload;                                                                                                                                                                                  
      console.log("what is come in updated",updated);
       state.allEvents = state.allEvents.map((event) =>
       event.id ==  updated.event.id ? updated.event: event
       );
  
      state.events = [...state.allEvents];  
    },

    DeleteEvent:(state,action)=>{
       const Delete = action.payload;
       state.allEvents = state.allEvents.filter((event)=>event.id!=Delete.event.id)
       state.events = [...state.allEvents]

    }
  }
});

export const { All, Past, Upcoming, CreateEvent, UpdateEvent,DeleteEvent } = EventSlice.actions;
export default EventSlice.reducer;
