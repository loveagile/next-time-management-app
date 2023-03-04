import { useState } from "react";
import { Modal, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useEvents } from "@/provider/EventsProvider";
import EventModal from "../modal/EventModal";

import { Event } from "../../types/index";

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

  // Adding Event
  const openEventAddModal = () => {
    setEventAddModalOpen(true);
  };

  const handleAddEventOk = (event: Event) => {
    addEvent(event);
    setEventAddModalOpen(false);
  };

  const handleAddEventCancel = () => {
    setEventAddModalOpen(false);
  };

  // Editing Event
  const openEventEditModal = (eventOne?: Event) => {
    eventOne && setEvent(eventOne);
    setEventEditModalOpen(true);
  };

  const handleEditEventOk = (event: Event) => {
    updateEvent(event);
    setEventEditModalOpen(false);
  };

  const handleEditEventCancel = () => {
    setEventEditModalOpen(false);
  };

  // Deleting Event
  const openEventDeleteModal = (eventOne: Event) => {
    setEvent(eventOne);
    setDeleteModalOpen(true);
  };

  const handleEventDeleteOk = () => {
    deleteEvent(event);
    setDeleteModalOpen(false);
  };

  const handleEventDeleteCancel = () => {
    setDeleteModalOpen(false);
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
            <div className="mt-16 text-center">There is no Event yet</div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <EventModal
        eventOk={handleAddEventOk}
        eventCancel={handleAddEventCancel}
        modalOpen={eventAddModalOpen}
      />

      {/* Edit Modal */}
      <EventModal
        eventOk={handleEditEventOk}
        eventCancel={handleEditEventCancel}
        modalOpen={eventEditModalOpen}
        data={event}
      />

      {/* Delete Modal */}
      <Modal
        title="Delete Event"
        open={deleteModalOpen}
        onOk={handleEventDeleteOk}
        onCancel={handleEventDeleteCancel}
        className="w-1/3"
      ></Modal>
    </>
  );
};

export default EventComponent;
