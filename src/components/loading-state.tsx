import { Loader2Icon } from 'lucide-react';
import React from 'react'

interface LoadingProps {
  title: string;
  description?: string;
};

const LoadingState = ({ title, description }: LoadingProps) => {
  return (
    <div className="flex flex-1 py-4 px-8 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className='text-lg font-medium'>{title}</h6>
          <p className='text-sm'>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingState