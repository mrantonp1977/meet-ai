"use client";

import { DataTable } from "@/components/data-table";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
  return (
    <div className="flex-1 pb-4 px-4 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns}/>
      {data.items.length === 0 && (
        <EmptyState
          title="No Meetings Found. Create Your First Meeting!"
          description="It seems like you don't have any meetings yet. Create one to get started. Each meeting lets you collaborate, share ideas, and interact with participants in real-time."
        />
      )}
    </div>
  )
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="Please wait while we fetch the meetings data. This may take a few seconds."
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="An error occurred while trying to load the meetings. Please try again later."
    />
  );
};
