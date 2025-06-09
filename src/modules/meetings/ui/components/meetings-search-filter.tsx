import React from 'react'
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useMeetingsFilters } from '../../hooks/use-meetings-flters';

const MeetingsSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  return (
    <div className='relative bg-white'>
      <Input 
        placeholder='Filter by name'
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        className='h-9 w-[200px] md:w-[300px] pl-7 '
        autoComplete='off'
        type='search'
      />
      <SearchIcon className='size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground'/>
    </div>
  )
}

export default MeetingsSearchFilter