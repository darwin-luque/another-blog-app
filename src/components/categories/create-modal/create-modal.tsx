"use client";

import { z } from "zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { useToast } from "@/components/ui/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const createCategoryFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  icon: z.string(),
});

export const CreateCategoryModal: FC = () => {
  const { toast } = useToast();
  const apiUtils = api.useUtils();
  const form = useForm<z.infer<typeof createCategoryFormSchema>>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });
  const createCategory = api.categories.create.useMutation({
    onError(val1, val2, val3) {
      console.log({
        val1,
        val2,
        val3,
      });
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Could not create category. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess(_, data) {
      toast({
        title: "Category created",
        description: (
          <div className="flex items-center space-x-1">
            <p>Category {data.name}</p>
            <DynamicIcon name={data.icon} />
            <p>has been created.</p>
          </div>
        ),
      });
    },
    onSettled() {
      return apiUtils.categories.list.invalidate();
    },
  });

  function onSubmit(values: z.infer<typeof createCategoryFormSchema>) {
    createCategory.mutate(values);
    form.reset();
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a Category</DialogTitle>
            <DialogDescription>
              We will create a new category here
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Art" {...field} />
                  </FormControl>
                  <FormDescription>The name of the category</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="icon"
              control={form.control}
              render={({ field }) => {
                const icon = form.watch("icon");
                return (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <>
                        <Input placeholder="brush" {...field} />
                        {icon ? (
                          <div className="flex items-center space-x-2">
                            <p className="text-sm">
                              This is the icon you chose:{" "}
                            </p>
                            <DynamicIcon className="h-4 w-4" name={icon} />
                          </div>
                        ) : null}
                      </>
                    </FormControl>
                    <FormDescription>
                      The icon should be one of the availables in Lucide, see
                      the list{" "}
                      <a
                        className="text-blue-600 dark:text-blue-400"
                        href="https://lucide.dev/icons/"
                        target="_blank"
                      >
                        here
                      </a>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <DialogFooter>
            <Tooltip delayDuration={200}>
              <TooltipTrigger
                type="button"
                disabled={!form.formState.isValid}
                className={cn(buttonVariants())}
              >
                Save
              </TooltipTrigger>
              <TooltipContent side="top" className="w-fit p-0">
                <DialogClose asChild>
                  <Button
                    disabled={!form.formState.isValid}
                    type="submit"
                    size="sm"
                    className="bg-green-600 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400"
                  >
                    Press here to save
                  </Button>
                </DialogClose>
              </TooltipContent>
            </Tooltip>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
