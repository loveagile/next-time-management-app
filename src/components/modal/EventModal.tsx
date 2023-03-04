import { useState, useEffect } from "react";
import { Modal, Input } from "antd";

import { useEvents } from "@/provider/EventsProvider";
import { Event } from "../../types/index";

const defaultEvent = {
  id: 0,
  value: "",
  label: "",
  status: false,
};

interface ModalProps {
  eventOk: (event: Event) => void;
  eventCancel: () => void;
  modalOpen: boolean;
  data?: Event;
}

const EventModal = (props: ModalProps) => {
  const { events } = useEvents();
  const [event, setEvent] = useState<Event>(defaultEvent);
  const [eventStatus, setEventStatus] = useState(true);

  useEffect(() => {
    if (props.modalOpen) {
      props.data
        ? setEvent({ ...props.data })
        : setEvent({ ...defaultEvent, id: events.length });
    }
  }, [props]);

  const eventValidation = (event: Event) => {
    if (!event) {
      setEventStatus(false);
      return false;
    }
    setEventStatus(event.label !== "" && event.value !== "");
    return event.label !== "" && event.value;
  };

  const handleEventOk = () => {
    if (!eventValidation(event)) return;
    setEvent(defaultEvent);
    setEventStatus(true);
    props.eventOk(event);
  };

  const handleEventCancel = () => {
    setEvent(defaultEvent);
    setEventStatus(true);
    props.eventCancel();
  };

  return (
    <Modal
      title="Add Event"
      open={props.modalOpen}
      onOk={handleEventOk}
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
  );
};

export default EventModal;
