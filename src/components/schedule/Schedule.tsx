import { useState } from "react";
import { Inter } from "next/font/google";
import { Modal, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { useSchedules } from "@/provider/SchedulesProvider";

import { Schedule } from "../../types/index";

import ScheduleModal from "../modal/ScheduleModal";

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
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule);
  const [scheduleAddModalOpen, setScheduleAddModalOpen] = useState(false);
  const [scheduleEditModalOpen, setScheduleEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Adding Schedule
  const openScheduleAddModal = () => {
    setScheduleAddModalOpen(true);
  };

  const handleAddScheduleOk = (schedule: Schedule) => {
    addSchedule(schedule);
    setScheduleAddModalOpen(false);
  };

  const handleAddScheduleCancel = () => {
    setScheduleAddModalOpen(false);
  };

  // Editing Schedule
  const openScheduleEditModal = (scheduleOne?: Schedule) => {
    scheduleOne && setSchedule(scheduleOne);
    setScheduleEditModalOpen(true);
  };

  const handleEditScheduleOk = (schedule: Schedule) => {
    updateSchedule(schedule);
    setScheduleEditModalOpen(false);
  };

  const handleEditScheduleCancel = () => {
    setScheduleEditModalOpen(false);
  };

  // Deleting Schedule
  const openScheduleDeleteModal = (scheduleOne: Schedule) => {
    setSchedule(scheduleOne);
    setDeleteModalOpen(true);
  };

  const handleScheduleDeleteOk = () => {
    deleteSchedule(schedule);
    setDeleteModalOpen(false);
  };

  const handleScheduleDeleteCancel = () => {
    setDeleteModalOpen(false);
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

      {/* Add Modal */}
      <ScheduleModal
        scheduleOk={handleAddScheduleOk}
        scheduleCancel={handleAddScheduleCancel}
        modalOpen={scheduleAddModalOpen}
      />

      {/* Edit Modal */}
      <ScheduleModal
        scheduleOk={handleEditScheduleOk}
        scheduleCancel={handleEditScheduleCancel}
        modalOpen={scheduleEditModalOpen}
        data={schedule}
      />

      {/* Delete Modal */}
      <Modal
        title="Delete schedule"
        open={deleteModalOpen}
        onOk={handleScheduleDeleteOk}
        onCancel={handleScheduleDeleteCancel}
        className="w-1/3"
      ></Modal>
    </>
  );
};

export default ScheduleComponent;
