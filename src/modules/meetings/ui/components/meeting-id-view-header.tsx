import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronRightIcon,  PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface MeetingIdViewHeaderProps {
  meetingId: string;
  meetingName: string;
  onEdit: () => void;
  onRemove: () => void;
}

const MeetingIdViewHeader = ({
  meetingId,
  meetingName,
  onEdit = () => {},
  onRemove = () => {}
}: MeetingIdViewHeaderProps) => {
  
  return (
    <div className='flex items-center justify-between'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className='font-medium text-xl'>
              <Link href="/meetings">
                My Meetings
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='text-foreground text-xl font-medium [&>svg]:w-4 [&svg]:h-4'>
            <ChevronRightIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem >
            <BreadcrumbLink asChild className='font-medium text-xl text-foreground'>
              <Link href={`/meetings/${meetingId}`}>
                {meetingName}
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
        <Button variant="default1" size="sm" onClick={onEdit}>
          <PencilIcon className="h-4 w-4" />
          Edit Meeting
        </Button>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          <TrashIcon className="h-4 w-4" />
          Delete Meeting
        </Button>
      </div>
    </div>
  )
}

export default MeetingIdViewHeader