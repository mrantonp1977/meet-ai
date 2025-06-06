import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";


export const useConfirm = (
  title: string,
  description: string,
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise<boolean>((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
      setPromise(null);
  }

  const handleConfirm = () => {
    if (promise) {
      promise.resolve(true);
      handleClose();
    }
  };

  const handleCancel = () => {
    if (promise) {
      promise.resolve(false);
      handleClose();
    }
  };

  const ConfirmationDialog = () => {
    return (
      <ResponsiveDialog open={promise !== null} onOpenChange={handleClose} title={title} description={description}>
        <div className="pt-4 flex w-full flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
          <Button variant="outline" onClick={handleCancel} className="w-full lg:w-auto">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} className="w-full lg:w-auto">
            Confirm
          </Button>
        </div>
      </ResponsiveDialog>
    )
    
  };

  return [ConfirmationDialog, confirm];

};