import React from 'react'
import { Button } from './ui/button';
import { ChevronsUpDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from './ui/command';


interface CommandSelectProps {
  options: Array<{
    id: string;
    value: string;
    children: React.ReactNode;
  }>
  onSelect: (value: string) => void;
  onSearch?: (query: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
  iSearchable?: boolean;
}

const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = 'Select an option',
  className,
  iSearchable = false,
}: CommandSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const selectedOption = options.find(option => option.value === value);

  const handleOpenChange = (open: boolean) => {
    onSearch?.("");
    setOpen(open);
  };

  return (
    <>
    <Button
      onClick={() => setOpen(true)} 
      type='button'
      variant='outline'
      className={cn(
        "h-9 justify-between font-normal px-2",
        !selectedOption && "text-muted-foreground",
        className,
      )}
    >
      <div className=''>
        {selectedOption?.children ?? placeholder}
      </div>
      <ChevronsUpDownIcon className='ml-2 h-4 w-4' />
    </Button>
      <CommandResponsiveDialog open={open} onOpenChange={handleOpenChange} shouldFilter={!onSearch && iSearchable}>
        <CommandInput 
          placeholder="Search..."
          onValueChange={onSearch}
        />
        <CommandList>
          <CommandEmpty>
            <span className='text-muted-foreground'>
              No options found
            </span>
          </CommandEmpty>
          {options.map(option => (
            <CommandItem key={option.id} onSelect={() => {
              onSelect(option.value);
              setOpen(false);
            }}>
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  )
}

export default CommandSelect