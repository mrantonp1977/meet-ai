import EmptyState from '@/components/empty-state';




const ProcessingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/processing.svg"
        title="Meeting Completed"
        description="Your meeting has been successfully processed. You can now view the details and recordings."
      />
    </div>
  );
};

export default ProcessingState;
