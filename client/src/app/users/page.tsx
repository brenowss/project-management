"use client";

import { useGetUsersQuery } from "@/state/api";
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
  { field: "userId", headerName: "ID", width: 40 },
  { field: "username", headerName: "Name", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const Users = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const { isDarkMode } = useAppSelector((state) => state.global);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error while fetching users: {JSON.stringify(error)}</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />

      <div className="h-[650px] w-full">
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
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

export default Users;
