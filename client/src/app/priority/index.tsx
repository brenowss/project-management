"use client";

import { Priority, useGetTasksByUserQuery } from "@/state/api";
import React, { useState } from "react";
import { useAppSelector } from "../redux";
import ModalNewTask from "../(components)/ModalNewTask";
import Header from "../(components)/Header";
import TaskCard from "../(components)/TaskCard";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "../lib/utils";

type Props = {
  priority: Priority;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "title", headerName: "Task", width: 100 },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "points",
    headerName: "Points",
    width: 120,
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 130,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 160,
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 160,
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: "author",
    headerName: "Author",
    width: 120,
    renderCell: (params) => params.value?.author || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 120,
    renderCell: (params) => params.value?.assignee || "Unassigned",
  },
];

const PriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const userId = 1;
  const {
    data: tasks,
    error: tasksError,
    isLoading: tasksIsLoading,
  } = useGetTasksByUserQuery(userId, {
    pollingInterval: 0,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const filteredTasks = tasks?.filter(
    (task) => task.priority?.toLowerCase() === priority.toLowerCase(),
  );

  if (tasksError) {
    return <div>Error: {JSON.stringify(tasksError)}</div>;
  }

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        open={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 p-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          } rounded-r`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>

      {tasksIsLoading ? (
        <div>Loading...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="w-full">
            <DataGrid
              rows={filteredTasks || []}
              columns={columns}
              getRowId={(row) => row.id}
              checkboxSelection
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default PriorityPage;
