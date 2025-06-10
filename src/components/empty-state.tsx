
import Image from 'next/image';
import React from 'react'

interface ErrorStateProps {
  title: string;
  description?: string;
  image?: string;
};

const EmptyState = ({ title, description, image = "/empty.svg" }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <Image 
          src={image}
          alt="Empty State"
          width={340}
          height={340}
          className="mb-4"
        />
        <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
          <h6 className='text-lg font-medium'>{title}</h6>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
    </div>
  )
}

export default EmptyState;