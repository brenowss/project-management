"use client";
import React, { useState } from "react";

import ProjectHeader from "@/app/projects/(components)/ProjectHeader";
import BoardView from "../(components)/BoardView";
import ListView from "../(components)/ListView";
import TimelineView from "../(components)/TimelineView";
import TableView from "../(components)/TableView";
import ModalNewTask from "@/app/(components)/ModalNewTask";

type Props = {
  params: {
    id: string;
  };
};

function Project({ params }: Props) {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ModalNewTask
        open={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Board" && (
        <BoardView
          projectId={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}

      {activeTab === "List" && (
        <ListView
          projectId={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}

      {activeTab === "Timeline" && (
        <TimelineView
          projectId={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}

      {activeTab === "Table" && (
        <TableView
          projectId={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
    </div>
  );
}

export default Project;
