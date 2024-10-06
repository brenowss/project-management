"use client";

import { useSearchQuery } from "@/state/api";
import React, { useState } from "react";
import { debounce } from "../lib/functions";
import Header from "../(components)/Header";
import TaskCard from "../(components)/TaskCard";
import ProjectCard from "../(components)/ProjectCard";
import UserCard from "../(components)/UserCard";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    data: searchResults,
    error,
    isLoading,
  } = useSearchQuery(
    {
      query: searchTerm,
    },
    {
      skip: !searchTerm || searchTerm.length < 3,
    },
  );

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 300);

  return (
    <div className="p-8">
      <Header name="Search" />

      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleChange}
        />
      </div>

      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {JSON.stringify(error, null, 2)}</p>}
        {!isLoading && !error && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks.length > 0 && (
              <>
                <h2>Tasks</h2>
                {searchResults.tasks?.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </>
            )}

            {searchResults.projects && searchResults.projects.length > 0 && (
              <>
                <h2>Projects</h2>
                {searchResults.projects?.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </>
            )}

            {searchResults.users && searchResults.users.length > 0 && (
              <>
                <h2>Users</h2>
                {searchResults.users?.map((user) => (
                  <UserCard key={user.userId} user={user} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
