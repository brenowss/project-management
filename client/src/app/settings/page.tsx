import React from "react";
import Header from "../(components)/Header";

const Settings = () => {
  const MOCK_USER_SETTINGS = {
    username: "johndoe",
    email: "johndoe@mail.com",
    teamName: "Developers",
    roleName: "Backend Developer",
  };

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white dark:border-gray-700";

  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label className={labelStyles}>Username</label>
          <div className={textStyles}>{MOCK_USER_SETTINGS.username}</div>
        </div>

        <div>
          <label className={labelStyles}>Email</label>
          <div className={textStyles}>{MOCK_USER_SETTINGS.email}</div>
        </div>

        <div>
          <label className={labelStyles}>Team</label>
          <div className={textStyles}>{MOCK_USER_SETTINGS.teamName}</div>
        </div>

        <div>
          <label className={labelStyles}>Role</label>
          <div className={textStyles}>{MOCK_USER_SETTINGS.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
