import { useState, useEffect } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { Modal, Input, Select, DatePicker } from "antd";
import { useDropzone } from "react-dropzone";

import { useSchedules } from "@/provider/SchedulesProvider";
import { useEvents } from "@/provider/EventsProvider";

import { Schedule } from "../../types/index";

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

interface ModalProps {
  scheduleOk: (schedule: Schedule) => void;
  scheduleCancel: () => void;
  modalOpen: boolean;
  data?: Schedule;
}

const ScheduleModal = (props: ModalProps) => {
  const { schedules } = useSchedules();
  const { events } = useEvents();
  const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule);
  const [scheduleStatus, setScheduleStatus] = useState(true);

  useEffect(() => {
    if (props.modalOpen) {
      props.data
        ? setSchedule({ ...props.data })
        : setSchedule({ ...defaultSchedule, id: schedules.length });
    }
  }, [props]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const scheduleValidation = (schedule: Schedule) => {
    if (!schedule) {
      setScheduleStatus(false);
      return false;
    }
    setScheduleStatus(schedule.name !== "" && schedule.service.value !== "");
    return schedule.name !== "" && schedule.service.value !== "";
  };

  const handleScheduleOk = () => {
    console.log(schedule);
    if (!scheduleValidation(schedule)) return;
    setSchedule(defaultSchedule);
    setFiles([]);
    setScheduleStatus(true);
    props.scheduleOk(schedule);
  };

  const handleScheduleCancel = () => {
    setSchedule(defaultSchedule);
    setScheduleStatus(true);
    props.scheduleCancel();
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {},
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setSchedule({
        ...schedule,
        url: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )[0],
      });
    },
  });

  const thumbs = schedule.url && (
    <div
      className="inline-flex border-r-2 border-solid mb-2 mr-2 w-full h-full p-1 box-border"
      key={schedule.url.name}
    >
      <div className="flex min-w-0 overflow-hidden">
        <Image
          src={schedule.url?.preview}
          alt="preview"
          width={300}
          height={300}
          className="block"
          onLoad={() => {
            URL.revokeObjectURL(schedule.url?.preview || "");
          }}
        />
      </div>
    </div>
  );

  return (
    <Modal
      title="Add Schedule"
      open={props.modalOpen}
      onOk={handleScheduleOk}
      onCancel={handleScheduleCancel}
      className="w-1/3"
      destroyOnClose={true}
    >
      <div className="flex flex-col gap-5 py-10">
        <Input
          placeholder="Event Name"
          autoFocus
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
        <section className="dropdown-container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          {/* {schedule && ( */}
          <aside className="flex flex-row flex-wrap mt-4">{thumbs}</aside>
          {/* )} */}
        </section>
        {!scheduleStatus && (
          <span className="text-red-600">
            All fields are required except file.
          </span>
        )}
      </div>
    </Modal>
  );
};

export default ScheduleModal;
