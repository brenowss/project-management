import {
  Task as TaskType,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/state/api";
import {
  EllipsisVertical,
  MessageSquareMore,
  PlusIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  projectId: string;
  setIsModalNewTaskOpen: (value: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

function BoardView({ projectId, setIsModalNewTaskOpen }: Props) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({
    projectId: +projectId,
  });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  function moveTask(id: number, toStatus: string) {
    updateTaskStatus({
      id,
      status: toStatus,
    });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error while fetching tasks: {JSON.stringify(error)}</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks?.filter((task) => task.status === status)}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
}

type TaskColumnProps = {
  status: string;
  tasks?: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (value: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksCount = tasks?.length || 0;

  const statusColor: Record<string, string> = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center gap-2 text-lg font-semibold dark:text-white">
            {status}{" "}
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-center text-sm leading-none dark:bg-dark-tertiary">
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <PlusIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {tasks?.map((task) => <Task key={task.id} task={task} />)}
    </div>
  );
};

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagsSplit = task.tags?.split(",") ?? [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";

  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const commentsCount = task.comments?.length || 0;

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => {
    return (
      <div
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          priority === "Urgent"
            ? "bg-red-200 text-red-700"
            : priority === "High"
              ? "bg-yellow-200 text-yellow-700"
              : priority === "Medium"
                ? "bg-green-200 text-green-700"
                : priority === "Low"
                  ? "bg-blue-200 text-blue-700"
                  : "bg-gray-200 text-gray-700"
        }`}
      >
        {priority}
      </div>
    );
  };

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow transition-opacity dark:bg-dark-secondary ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}

      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} points
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate}</span>}
          {formattedStartDate && formattedDueDate && " - "}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>
        <p className="text-xs text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <>
                {task.assignee.profilePictureUrl ? (
                  <Image
                    key={task.assignee.userId}
                    src={`/${task.assignee.profilePictureUrl}`}
                    alt={task.assignee.username}
                    width={30}
                    height={30}
                    className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                  />
                ) : (
                  <div
                    key={task.assignee.userId}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700"
                  >
                    <UserIcon size={20} />
                  </div>
                )}
              </>
            )}
            {task.author && task.authorUserId !== task.assignedUserId && (
              <>
                {task.author.profilePictureUrl ? (
                  <Image
                    key={task.author.userId}
                    src={`/${task.author.profilePictureUrl}`}
                    alt={task.author.username}
                    width={30}
                    height={30}
                    className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                  />
                ) : (
                  <div
                    key={task.author.userId}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700"
                  >
                    <UserIcon size={20} />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore size={20} />

            <span className="ml-1 text-sm dark:text-neutral-400">
              {commentsCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
