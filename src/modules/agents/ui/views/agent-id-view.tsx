"use client";

import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import AgentIdViewHeader from '../components/agent-id-view-header';
import GeneratedAvatar from '@/components/generated-avatar';
import { Badge } from '@/components/ui/badge';
import { VideoIcon } from 'lucide-react';

interface AgentIdViewProps {
  agentId: string;
}

const AgentIdView = ({ agentId }: AgentIdViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));
  return (
    <div className='flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <AgentIdViewHeader 
          agentId={agentId}
          agentName={data.name}
          onEdit={() => {}}
          onRemove={() => {}}
        />
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar 
                variant='botttsNeutral'
                seed={data.name}
              />
              <h2 className="text-2xl font-semibold">
                {data.name}
              </h2>
            </div>
            <Badge variant={"outline"} className="flex items-center gap-x-2 [&>svg]:w-4 [&>svg]:h-4">
              <VideoIcon className='text-blue-700'/>
              {data.meetingCount} {data.meetingCount === 1 ? 'Meeting' : 'Meetings'}
            </Badge>
            <div className="flex flex-col gap-y-2">
              <p className='font-medium text-lg'>Instructions</p>
              <p className='text-neutral-800'>{data.instructions}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export const AgentsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Please wait while we fetch the agents data. This may take a few seconds."
    />
  );
};

export const AgentsIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="An error occurred while trying to load the agents. Please try again later."
    />
  );
};

export default AgentIdView