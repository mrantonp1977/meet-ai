"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
  return (
    <div>
      <h1>Meetings</h1>
      {JSON.stringify(data, null, 2)}
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
