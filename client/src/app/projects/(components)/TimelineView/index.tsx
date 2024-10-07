import React, { useMemo, useState } from "react";
import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

type Props = {
  projectId: string;
  setIsModalNewTaskOpen: (value: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

function TimelineView({ projectId, setIsModalNewTaskOpen }: Props) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({
    projectId: +projectId,
  });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const formattedTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error while fetching tasks: {JSON.stringify(error)}</div>;

  function handleDisplayOptionsChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  }

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h2 className="me-2 text-lg font-bold dark:text-white">
          Project Tasks Timeline
        </h2>
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline boreder block w-full appearance-none rounded border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white dark:placeholder-gray-300 dark:placeholder-opacity-75 dark:focus:shadow"
            value={displayOptions.viewMode}
            onChange={handleDisplayOptionsChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={formattedTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={isDarkMode ? "#101214" : "#aeb8c2"}
            barBackgroundSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
        <div className="px-4 pb-5 pt-1">
          <button
            className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimelineView;
