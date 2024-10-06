import Header from "@/app/(components)/Header";
import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/app/lib/utils";

type Props = {
  projectId: string;
  setIsModalNewTaskOpen: (value: boolean) => void;
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
    renderCell: (params) => params.value.username || "Unassigned",
  },
];

function TableView({ projectId, setIsModalNewTaskOpen }: Props) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({
    projectId: +projectId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error while fetching tasks: {JSON.stringify(error)}</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>

      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
}

export default TableView;
