import React from "react";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { toggleDarkMode, toggleSidebar } from "@/state";
import { useGetAuthUserQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import Image from "next/image";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isSideBarCollapsed, isDarkMode } = useAppSelector(
    (state) => state.global,
  );

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

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Search Bar */}
      <div className="flex items-center gap-8">
        {isSideBarCollapsed && (
          <button onClick={() => dispatch(toggleSidebar())}>
            <Menu className="h-8 w-8 cursor-pointer dark:text-white" />
          </button>
        )}

        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-2 top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            type="search"
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className={
            isDarkMode
              ? "rounded p-2 dark:hover:bg-gray-700"
              : "rounded p-2 hover:bg-gray-100"
          }
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <Link
          href="/settings"
          className={
            isDarkMode
              ? "h-min w-min rounded p-2 dark:hover:bg-gray-700"
              : "h-min w-min rounded p-2 hover:bg-gray-100"
          }
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>

        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
        <div className="hidden items-center justify-between md:flex">
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
            className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
