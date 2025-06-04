"use client";


import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-flters";
import DataPagination from "../components/data-pagination";

const AgentsView = () => {
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({...filters }));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns}/>
      <DataPagination 
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState 
          title="No Agents Found. Create Your First Agent!"
          description="It seems like you don't have any agents yet. Create one to get started." 
        />
      )}
    </div>
  )
}

export default AgentsView;

export const AgentsViewLoading = () => {
  return (
    <LoadingState 
      title="Loading Agents" 
      description="Please wait while we fetch the agents data. This may take a few seconds."
    />
  )
};


export const AgentsViewError = () => {
  return (
    <ErrorState 
      title="Error Loading Agents"
      description="An error occurred while trying to load the agents. Please try again later." 
    />
  )
};