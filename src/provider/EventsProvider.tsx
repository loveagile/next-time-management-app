import React, { createContext, useState, useContext, ReactNode } from "react";

import { Event } from "../types";

interface EventValues {
  events: Event[];
  updateEvent: (event: Event) => void;
  addEvent: (event: Event) => void;
  deleteEvent: (event: Event) => void;
}

const eventDefaultValues = {
  events: [
    {
      id: 0,
      label: "General Cleaning",
      value: "generalClearning",
      status: true,
    },
    { id: 1, label: "Wash Clothes", value: "washClothes", status: true },
    { id: 2, label: "Maintenance", value: "maintenance", status: true },
  ],
  updateEvent: () => {},
  addEvent: () => {},
  deleteEvent: () => {},
};

const EventsContext = createContext<EventValues>(eventDefaultValues);

export default function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(eventDefaultValues.events);

  const updateEvent = (event: Event) => {
    const newEvents = events.map((eventOne, index) => {
      if (eventOne.id === event.id) {
        return event;
      } else {
        return eventOne;
      }
    });
    setEvents(newEvents);
  };

  const addEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  const deleteEvent = (event: Event) => {
    const newEvents = events.filter((eventOne) => {
      console.log(eventOne.id, event.id, eventOne.id !== event.id);
      return eventOne.id !== event.id;
    });
    console.log("s", event, newEvents);

    setEvents(newEvents);
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        updateEvent,
        addEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    new Error("useEvents must be used within a EventsProvider");
  }
  return context;
};

export { EventsProvider, useEvents, EventsContext };
