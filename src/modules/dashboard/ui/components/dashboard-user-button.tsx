import GeneratedAvatar from '@/components/generated-avatar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { authClient } from '@/lib/auth-client';
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
          {data.user.image ? (
            <Avatar>
              <AvatarImage
                src={data.user.image}
                alt={data.user.name || 'User Avatar'}
              />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              variant="initials"
              className="size-9 mr-3"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden ml-2 flex-1 min-w-0">
            <p className="text-sm truncate w-full">{data.user.name}</p>
            <p className="text-xs truncate w-full">{data.user.email}</p>
          </div>
          <ChevronDownIcon className="h-4 w-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {data.user.name}
            </DrawerTitle>
            <DrawerDescription>
              {data.user.email}
            </DrawerDescription>           
          </DrawerHeader>
          <DrawerFooter>
            <Button variant={'outline'} onClick={() => {}}>
              Billing
              <CreditCardIcon className="ml-auto h-4 w-4" />
            </Button>
            <Button variant={'outline'} onClick={onLogout}>
              Logout
              <LogOutIcon className="ml-auto h-4 w-4" />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
        {data.user.image ? (
          <Avatar>
            <AvatarImage
              src={data.user.image}
              alt={data.user.name || 'User Avatar'}
            />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden ml-2 flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="h-4 w-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-74">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="truncate font-semibold">{data.user.name}</span>
            <span className="text-sm truncate font-medium text-muted-foreground">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={onLogout}
        >
          Logout
          <LogOutIcon className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;
