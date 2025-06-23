import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
// import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import GeneratedAvatar from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,

}: AgentFormProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
       await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
       await queryClient.invalidateQueries(trpc.premium.getFreeUsage.queryOptions());

        onSuccess?.();
        toast.success("Agent created successfully!");
        
      },
      onError: (error) => {
        toast.error("Something went wrong or you have reached your agent limit. Please upgrade your plan to create more agents.");

        if (error.data?.code === 'FORBIDDEN') {
           router.push("/upgrade");
        }
      },
    }),
  )

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
       await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

        if (initialValues?.id) {
         await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id }),
          )
        }
        onSuccess?.();
        toast.success("Agent updated successfully!");
        // router.push("/dashboard/agents");
      },
      onError: () => {     
        toast.error("Failed upadate agent. Please try again.");
      },
    }),
  )

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    }
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      updateAgent.mutate({
        ...values,
        id: initialValues.id,
      })
    } else {
      createAgent.mutate(values)
    }
  }


  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar seed={form.watch("name")} variant="botttsNeutral" className="size-11"/>
        <FormField 
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Agent Name"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Instructions
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="You are a helpful assistant that can answer questions and help with assingments."
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end space-x-2">
          {onCancel && (
            <Button 
              variant={"outline"}
              type="button" 
              onClick={() => onCancel()}
              disabled={isPending}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isPending}
          >
            {isEdit ? "Update Agent" : "Create Agent"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AgentForm