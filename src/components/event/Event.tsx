import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Modal, Button, Input } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { useSchedules } from "@/provider/SchedulesProvider";
import { useEvents } from "@/provider/EventsProvider";

import { Schedule, Event } from "../../types/index";

const inter = Inter({ subsets: ["latin"] });

const defaultEvent = {
  id: 0,
  value: "",
  label: "",
  status: false,
};

const EventComponent = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [event, setEvent] = useState<Event>(defaultEvent);
  const [eventAddModalOpen, setEventAddModalOpen] = useState(false);
  const [eventEditModalOpen, setEventEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventStatus, setEventStatus] = useState(true);

  const eventValidation = () => {
    if (!event) {
      setEventStatus(false);
      return false;
    }
    setEventStatus(event.label !== "" && event.value !== "");
    return event.label !== "" && event.value;
  };

  // Adding Event
  const openEventAddModal = () => {
    setEvent({ ...defaultEvent, id: events.length });
    setEventAddModalOpen(true);
  };

  const handleAddEventOk = () => {
    if (!eventValidation()) return;
    addEvent(event);
    setEvent(defaultEvent);
    setEventAddModalOpen(false);
    setEventStatus(true);
  };

  // Editing Event
  const openEventEditModal = (eventOne?: Event) => {
    eventOne && setEvent(eventOne);
    setEventEditModalOpen(true);
  };

  const handleEditEventOk = () => {
    if (!eventValidation()) return;
    updateEvent(event);
    setEvent(defaultEvent);
    setEventEditModalOpen(false);
    setEventStatus(true);
  };

  // Deleting Event
  const openEventDeleteModal = (eventOne: Event) => {
    console.log(eventOne);
    setEvent(eventOne);
    setDeleteModalOpen(true);
  };

  const handleEventDeleteOk = () => {
    deleteEvent(event);
    setDeleteModalOpen(false);
  };

  const handleEventCancel = () => {
    setEvent(defaultEvent);
    setEventAddModalOpen(false);
    setEventEditModalOpen(false);
    setDeleteModalOpen(false);
    setEventStatus(true);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-start py-4">
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => openEventAddModal()}
          >
            New event
          </Button>
        </div>

        <div className="flex w-full px-6 py-4">
          <div className="w-2/3">Event Name</div>
          <div className="w-1/3">Actions</div>
        </div>
        <div className="w-full">
          {events?.length > 0 ? (
            events.map((eventOne, index) => {
              return (
                <div
                  key={eventOne.id}
                  className="flex w-full px-6 py-4 my-4 bg-white shadow-sm"
                >
                  <div
                    className={`${eventOne.status && `text-[#b3b4b6]`} w-2/3`}
                  >
                    {eventOne.label}
                  </div>
                  <div className="w-1/3">
                    <button
                      disabled={eventOne.status}
                      className={`${eventOne.status && `text-[#b3b4b6]`} mr-3`}
                      onClick={() => openEventEditModal(eventOne)}
                    >
                      <EditOutlined />
                    </button>
                    <button
                      disabled={eventOne.status}
                      className={`${eventOne.status && `text-[#b3b4b6]`}`}
                      onClick={() => openEventDeleteModal(eventOne)}
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
        title="Edit Schedule"
        open={eventAddModalOpen}
        onOk={handleAddEventOk}
        onCancel={handleEventCancel}
        className="w-1/3"
        destroyOnClose={true}
      >
        <div className="flex flex-col gap-5 py-10">
          <Input
            placeholder="Event Name"
            size="large"
            value={event.label}
            onChange={(e) => {
              setEvent({
                ...event,
                label: e.target.value,
                value: e.target.value.replace(/ /g, "").toLowerCase(),
              });
            }}
          />
          {!eventStatus && (
            <span className="text-red-600">All fields are required.</span>
          )}
        </div>
      </Modal>

      <Modal
        title="Edit Schedule"
        open={eventEditModalOpen}
        onOk={handleEditEventOk}
        onCancel={handleEventCancel}
        className="w-1/3"
        destroyOnClose={true}
      >
        <div className="flex flex-col gap-5 py-10">
          <Input
            placeholder="Event Name"
            size="large"
            value={event.label}
            onChange={(e) => {
              setEvent({
                ...event,
                label: e.target.value,
                value: e.target.value.replace(/ /g, "").toLowerCase(),
              });
            }}
          />
          {!eventStatus && (
            <span className="text-red-600">Event name is required.</span>
          )}
        </div>
      </Modal>

      <Modal
        title="Delete schedule"
        open={deleteModalOpen}
        onOk={handleEventDeleteOk}
        onCancel={handleEventCancel}
        className="w-1/3"
      ></Modal>
    </>
  );
};

export default EventComponent;
