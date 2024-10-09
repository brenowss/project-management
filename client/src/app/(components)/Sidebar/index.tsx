"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { toggleSidebar } from "@/state";
import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDownIcon,
  ChevronUpIcon,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";

function Sidebar() {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const { isSideBarCollapsed } = useAppSelector((state) => state.global);

  const { data: currentUser } = useGetAuthUserQuery({});

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  }

  if (!currentUser) return null;

  const currentUserDetails = currentUser.userDetails;

  const sidebarLinks = useMemo(() => {
    return [
      {
        href: "/",
        icon: Home,
        label: "Dashboard",
      },
      {
        href: "/timeline",
        icon: Briefcase,
        label: "Timeline",
      },
      {
        href: "/search",
        icon: Search,
        label: "Search",
      },
      {
        href: "/settings",
        icon: Settings,
        label: "Settings",
      },
      {
        href: "/users",
        icon: User,
        label: "Users",
      },
      {
        href: "/teams",
        icon: Users,
        label: "Teams",
      },
    ];
  }, []);

  const priorityLinks = useMemo(() => {
    return [
      {
        href: "/priority/urgent",
        icon: AlertCircle,
        label: "Urgent",
      },
      {
        href: "/priority/high",
        icon: ShieldAlert,
        label: "High",
      },
      {
        href: "/priority/medium",
        icon: AlertTriangle,
        label: "Medium",
      },
      {
        href: "/priority/low",
        icon: AlertOctagon,
        label: "Low",
      },
      {
        href: "/priority/backlog",
        icon: Layers3,
        label: "Backlog",
      },
    ];
  }, []);

  const sidebarClassnames = `fixed z-40 flex h-full flex-col justify-between overflow-y-auto bg-white shadow-xl transition-all duration-300 dark:bg-black ${isSideBarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sidebarClassnames}>
      <div className="flex h-full w-full flex-col justify-start">
        {/* Top Logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            Project Management
          </div>
          {!isSideBarCollapsed && (
            <button className="py-3" onClick={() => dispatch(toggleSidebar())}>
              <XIcon className="h-6 w-6 cursor-pointer text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src="https://pm-s3-images-bucket.s3.amazonaws.com/logo.png"
            alt="logo"
            width={40}
            height={40}
          />

          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              {"Breno's Team"}
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Private
              </p>
            </div>
          </div>
        </div>

        {/* Navbar Links */}
        <nav className="z-10 w-full">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
            />
          ))}
        </nav>

        {/* Projects Links */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>

        {/* Projects List */}
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              href={`/projects/${project.id}`}
              icon={Briefcase}
              label={project.name}
            />
          ))}

        {/* Priority List */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <>
            {priorityLinks.map((link) => (
              <SidebarLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </>
        )}
      </div>
      <div className="z-10 mt-32 flex w-full flex-col items-center gap-4 bg-white px-8 py-4 dark:bg-black md:hidden">
        <div className="flex w-full items-center">
          <div className="align-center flex h-9 w-9 justify-center">
            {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://pm-s3-images-bucket.s3.amazonaws.com/${currentUserDetails.profilePictureUrl}`}
                alt={currentUserDetails.username}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            )}
          </div>

          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetails?.username}
          </span>

          <button
            className="self-start rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""} justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1 bg-blue-200"></div>
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
