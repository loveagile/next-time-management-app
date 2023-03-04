import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Radio, Modal, Button, Input, Select, DatePicker } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { useSchedules } from "@/provider/SchedulesProvider";
import { useEvents } from "@/provider/EventsProvider";

import { Schedule, Event } from "../../types/index";

const inter = Inter({ subsets: ["latin"] });

const defaultSchedule = {
  id: 0,
  name: "",
  date: dayjs().format("YYYY-MM-DD"),
  service: {
    id: 0,
    label: "General Cleaning",
    value: "generalClearning",
    status: true,
  },
};

const ScheduleComponent = () => {
  const { schedules, addSchedule, updateSchedule, deleteSchedule } =
    useSchedules();
  const { events } = useEvents();
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule);
  const [scheduleAddModalOpen, setScheduleAddModalOpen] = useState(false);
  const [scheduleEditModalOpen, setScheduleEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState(true);

  const scheduleValidation = () => {
    if (!schedule) {
      setScheduleStatus(false);
      return false;
    }
    setScheduleStatus(schedule.name !== "" && schedule.service.value !== "");
    return schedule.name !== "" && schedule.service.value !== "";
  };

  // Adding Schedule
  const openScheduleAddModal = () => {
    console.log(schedule);
    setSchedule({ ...defaultSchedule, id: schedules.length });
    setScheduleAddModalOpen(true);
  };

  const handleAddScheduleOk = () => {
    if (!scheduleValidation()) return;
    addSchedule(schedule);
    setSchedule(defaultSchedule);
    setScheduleAddModalOpen(false);
  };

  // Editing Schedule
  const openScheduleEditModal = (scheduleOne?: Schedule) => {
    scheduleOne && setSchedule(scheduleOne);
    setScheduleEditModalOpen(true);
  };

  const handleEditScheduleOk = () => {
    if (!scheduleValidation()) return;
    updateSchedule(schedule);
    setSchedule(defaultSchedule);
    setScheduleEditModalOpen(false);
    setScheduleStatus(true);
  };

  // Deleting Schedule
  const openScheduleDeleteModal = (scheduleOne: Schedule) => {
    setSchedule(scheduleOne);
    setDeleteModalOpen(true);
  };

  const handleScheduleDeleteOk = () => {
    deleteSchedule(schedule);
    setDeleteModalOpen(false);
    setScheduleStatus(true);
  };

  const handleScheduleCancel = () => {
    setSchedule(defaultSchedule);
    setScheduleAddModalOpen(false);
    setScheduleEditModalOpen(false);
    setDeleteModalOpen(false);
    setScheduleStatus(true);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end py-4">
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => openScheduleAddModal()}
          >
            New schedule
          </Button>
        </div>

        <div className="flex w-full px-6 py-4">
          <div className="w-1/4">Event Name</div>
          <div className="w-1/4">Date</div>
          <div className="w-1/3">Service</div>
          <div className="">Actions</div>
        </div>
        <div className="w-full">
          {schedules?.length > 0 ? (
            schedules.map((scheduleOne, index) => {
              return (
                <div
                  key={scheduleOne.id}
                  className="flex w-full px-6 py-4 my-4 bg-white shadow-sm"
                >
                  <div className="w-1/4">{scheduleOne.name}</div>
                  <div className="w-1/4">{scheduleOne.date}</div>
                  <div className="w-1/3">{scheduleOne.service.label}</div>
                  <div className="">
                    <button
                      className="mr-5"
                      onClick={() => openScheduleEditModal(scheduleOne)}
                    >
                      <EditOutlined />
                    </button>
                    <button
                      onClick={() => openScheduleDeleteModal(scheduleOne)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="mt-16 text-center">There is no schedules yet</div>
          )}
        </div>
      </div>

      <Modal
        title="Add Schedule"
        open={scheduleAddModalOpen}
        onOk={handleAddScheduleOk}
        onCancel={handleScheduleCancel}
        className="w-1/3"
        destroyOnClose={true}
      >
        <div className="flex flex-col gap-5 py-10">
          <Input
            placeholder="Event Name"
            size="large"
            value={schedule.name}
            onChange={(e) => {
              setSchedule({ ...schedule, name: e.target.value });
            }}
          />
          <Select
            className="w-full"
            size="large"
            defaultValue={events[0].value}
            value={schedule.service.value}
            allowClear
            options={events}
            onChange={(value) => {
              setSchedule({
                ...schedule,
                service: events.filter((event) => event.value === value)[0],
              });
            }}
          />
          <DatePicker
            size="large"
            defaultValue={dayjs()}
            onChange={(date, dateString) => {
              setSchedule({ ...schedule, date: dateString });
            }}
          />
          {!scheduleStatus && (
            <span className="text-red-600">All fields are required.</span>
          )}
        </div>
      </Modal>

      <Modal
        title="Edit Schedule"
        open={scheduleEditModalOpen}
        onOk={handleEditScheduleOk}
        onCancel={handleScheduleCancel}
        className="w-1/3"
        destroyOnClose={true}
      >
        <div className="flex flex-col gap-5 py-10">
          <Input
            placeholder="Event Name"
            value={schedule.name}
            onChange={(e) => {
              setSchedule({ ...schedule, name: e.target.value });
            }}
          />
          <Select
            className="w-full"
            defaultValue={events[0].value}
            value={schedule.service.value}
            allowClear
            options={events}
            onChange={(value) => {
              setSchedule({
                ...schedule,
                service: events.filter((event) => event.value === value)[0],
              });
            }}
          />
          <DatePicker
            defaultValue={
              schedule.date ? dayjs(schedule.date, "YYYY-MM-DD") : dayjs()
            }
            onChange={(date, dateString) => {
              setSchedule({ ...schedule, date: dateString });
            }}
          />
          {!scheduleStatus && (
            <span className="text-red-600">All fields are required.</span>
          )}
        </div>
      </Modal>

      <Modal
        title="Delete schedule"
        open={deleteModalOpen}
        onOk={handleScheduleDeleteOk}
        onCancel={handleScheduleCancel}
        className="w-1/3"
      ></Modal>
    </>
  );
};

export default ScheduleComponent;
