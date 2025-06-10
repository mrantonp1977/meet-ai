import EmptyState from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { BanIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link';

interface UpcomingStateProps {
  meetingId: string;
  onCancelMeeting?: () => void;
  isCanceling: boolean;
}

const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCanceling,
}: UpcomingStateProps) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="No Meetings Scheduled"
        description="You have no upcoming meetings at the moment. Click below to schedule a new meeting."
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button
          variant={'destructive'}
          className="w-full lg:w-auto"
          onClick={onCancelMeeting}
          disabled={isCanceling}
        >
          <BanIcon />
          Cancel Meeting
        </Button>
        <Button disabled={isCanceling} asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UpcomingState;
