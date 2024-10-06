"use client";
import React, { useMemo, useState } from "react";

import Header from "@/app/(components)/Header";
import {
  Clock,
  FilterIcon,
  Grid3X3,
  List,
  PlusSquare,
  Share2Icon,
  Table,
} from "lucide-react";
import ModalNewProject from "../ModalNewProject";

interface ProjectHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  const tabsList = useMemo(() => {
    return [
      {
        name: "Board",
        icon: <Grid3X3 className="h-5 w-5" />,
      },
      {
        name: "List",
        icon: <List className="h-5 w-5" />,
      },
      {
        name: "Timeline",
        icon: <Clock className="h-5 w-5" />,
      },
      {
        name: "Table",
        icon: <Table className="h-5 w-5" />,
      },
    ];
  }, []);

  return (
    <div className="px-4 xl:px-6">
      <ModalNewProject
        open={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />
      <div className="py-6 lg:pb-4 lg:pt-8">
        <Header
          name="Product Design Development"
          buttonComponent={
            <button
              onClick={() => setIsModalNewProjectOpen(true)}
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            >
              <PlusSquare className="mr-2 h-5 w-5" />
              New Board
            </button>
          }
        />
      </div>

      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 py-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          {tabsList.map((tab) => (
            <TabButton
              key={tab.name}
              name={tab.name}
              icon={tab.icon}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <FilterIcon className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2Icon className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search tasks"
              className="dark:border-dar k-secondary rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:bg-dark-secondary dark:text-white"
            />
            <Grid3X3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabButton = ({ name, icon, activeTab, setActiveTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      onClick={() => setActiveTab(name)}
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""}`}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
