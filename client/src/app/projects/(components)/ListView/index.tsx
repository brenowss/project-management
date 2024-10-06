import React from "react";
import Header from "@/app/(components)/Header";
import TaskCard from "@/app/(components)/TaskCard";
import { useGetTasksQuery } from "@/state/api";

type ListViewProps = {
  projectId: string;
  setIsModalNewTaskOpen: (value: boolean) => void;
};

function ListView({ projectId, setIsModalNewTaskOpen }: ListViewProps) {
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
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.length &&
          tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
}

export default ListView;
