import React from "react";
import PriorityPage from "..";
import { Priority } from "@/state/api";
import { redirect } from "next/navigation";

type Props = {
  params: {
    priority: string;
  };
};

const Priorities = ({ params }: Props) => {
  const { priority } = params;

  // Validate if the priority is valid
  if (
    !priority ||
    !Object.values(Priority).some(
      (p) => p.toLowerCase() === priority.toLowerCase(),
    )
  ) {
    return redirect("/priority/urgent");
  }

  return <PriorityPage priority={priority as Priority} />;
};

export default Priorities;
