import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronRightIcon,  PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface AgentIdViewHeaderProps {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onRemove: () => void;
}

const AgentIdViewHeader = ({
  agentId,
  agentName,
  onEdit = () => {},
  onRemove = () => {}
}: AgentIdViewHeaderProps) => {

  return (
    <div className='flex items-center justify-between'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className='font-medium text-xl'>
              <Link href="/agents">
                My Agents
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='text-foreground text-xl font-medium [&>svg]:w-4 [&svg]:h-4'>
            <ChevronRightIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem >
            <BreadcrumbLink asChild className='font-medium text-xl text-foreground'>
              <Link href={`/agents/${agentId}`}>
                {agentName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={onEdit}>
            <PencilIcon className="mr-2 h-4 w-4 text-black" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRemove}>
            <TrashIcon className="mr-2 h-4 w-4 text-black" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
      <div className='flex items-center gap-x-4'>
        <Button className='bg-white text-black font-semibold border-2 border-black hover:bg-black hover:text-white' size="sm" onClick={onEdit}>
          <PencilIcon className="h-4 w-4" />
          Edit Agent
        </Button>
        <Button className='bg-white text-red-500 font-semibold border-2 border-red-500 hover:bg-red-500 hover:text-white' size="sm" onClick={onRemove}>
          <TrashIcon className="h-4 w-4" />
          Delete Agent
        </Button>
      </div>
    </div>
  )
}

export default AgentIdViewHeader