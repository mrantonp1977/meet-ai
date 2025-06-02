'use client';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import {  ArrowLeftToLine, ArrowRightToLine, SearchIcon } from 'lucide-react';
import DashboardCommand from './dashboard-command';
import { useEffect, useState } from 'react';

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
    };
  }, []);


  return (
    <>
    <DashboardCommand open={commandOpen} setOpen={setCommandOpen}/>
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-sidebar">
        <Button className="size-7 mr-2" variant={'default'} onClick={toggleSidebar}>
          {state === 'collapsed' || isMobile ? (
            <ArrowRightToLine className="h-4 w-4 " />
          ) : (
            <ArrowLeftToLine className="h-4 w-4 " />
          )}
        </Button>
        <Button
          variant={'outline'}
          size={'sm'}
          onClick={() => setCommandOpen((open) => !open)}
          className="h-9 w-[280px] justify-start font-normal text-white/70 hover:text-white/70 bg-sidebar hover:bg-sidebar/80 border border-border/30 hover:border-border/20 transition-colors disabled:opacity-50 disabled:pointer-events-none gap-x-2"
        >
          <SearchIcon className="h-4 w-4" />
          Search...
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded gap-1 border px-2 font-mono text-[10px] font-medium text-white/70 bg-sidebar border-none">
            <span className="text-xs">Ctrl + k</span>
          </kbd>
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
