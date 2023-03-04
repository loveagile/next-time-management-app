import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import dayjs from "dayjs";

import { Schedule } from "../types";

interface scheduleValues {
  schedules: Schedule[];
  updateSchedule: (schedule: Schedule) => void;
  addSchedule: (schedule: Schedule) => void;
  deleteSchedule: (schedule: Schedule) => void;
}

const scheduleDefaultValues = {
  schedules: [
    {
      id: 0,
      name: "Default Schedule",
      date: dayjs().format("YYYY-MM-DD"),
      service: {
        id: 0,
        label: "General Cleaning",
        value: "generalClearning",
        status: true,
      },
    },
  ],
  updateSchedule: (schedule: Schedule) => {},
  addSchedule: (schedule: Schedule) => {},
  deleteSchedule: (schedule: Schedule) => {},
};

const SchedulesContext = createContext<scheduleValues>(scheduleDefaultValues);

export default function SchedulesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 0,
      name: "Default Schedule",
      date: dayjs().format("YYYY-MM-DD"),
      service: {
        id: 0,
        label: "General Cleaning",
        value: "generalClearning",
        status: true,
      },
    },
  ]);

  const updateSchedule = (schedule: Schedule) => {
    const newSchedules = schedules.map((scheduleOne, index) => {
      if (scheduleOne.id === schedule.id) {
        return schedule;
      } else {
        return scheduleOne;
      }
    });
    newSchedules.sort((a, b) =>
      dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
    );
    setSchedules(newSchedules);
  };

  const deleteSchedule = (schedule: Schedule) => {
    const newSchedules = schedules.filter((scheduleOne) => {
      console.log(scheduleOne.id, schedule.id, scheduleOne.id !== schedule.id);
      return scheduleOne.id !== schedule.id;
    });
    newSchedules.sort((a, b) =>
      dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
    );

    setSchedules(newSchedules);
  };

  const addSchedule = (event: Schedule) => {
    const newSchedules = [...schedules, event];
    newSchedules.sort((a, b) =>
      dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
    );
    setSchedules(newSchedules);
  };

  return (
    <SchedulesContext.Provider
      value={{
        schedules,
        updateSchedule,
        addSchedule,
        deleteSchedule,
      }}
    >
      {children}
    </SchedulesContext.Provider>
  );
}

const useSchedules = () => {
  const context = useContext(SchedulesContext);
  if (context === undefined) {
    new Error("useEvents must be used within a EventsProvider");
  }
  return context;
};

export { SchedulesProvider, useSchedules, SchedulesContext };
