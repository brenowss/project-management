"use client";

import { useGetTeamsQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "../(components)/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import { dataGridClassNames, dataGridSxStyles } from "../lib/utils";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer className="toolbar flex gap-2">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "teamName", headerName: "Team Name", width: 150 },
  {
    field: "productOwnerUsername",
    headerName: "Product Owner",
    width: 150,
  },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 150,
  },
];

const Teams = () => {
  const { data: teams, isLoading, error } = useGetTeamsQuery();
  const { isDarkMode } = useAppSelector((state) => state.global);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error while fetching teams: {JSON.stringify(error)}</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />

      <div className="h-[650px] w-full">
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default Teams;
