import { z } from "zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Input } from "@/components/ui/input";
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
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";

const createCategoryFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(2, { message: "Description must be at least 2 characters" }),
  icon: z.string(),
});

export type CategoryFormProps = {
  onSubmit: (data: z.infer<typeof createCategoryFormSchema>) => void;
  initialValues?: Partial<z.infer<typeof createCategoryFormSchema>>;
  type: "create" | "edit";
};

export const CategoryForm: FC<CategoryFormProps> = ({
  onSubmit,
  initialValues,
  type,
}) => {
  const form = useForm<z.infer<typeof createCategoryFormSchema>>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Create a Category" : "Edit the Category"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "We will create a new category here"
              : "Edit the category here"}
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
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about the category"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A brief description of the category
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="icon"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <>
                      <Input placeholder="brush" {...field} />
                      {field.value ? (
                        <div className="flex items-center space-x-2">
                          <p className="text-sm">
                            This is the icon you chose:{" "}
                          </p>
                          <DynamicIcon className="h-4 w-4" name={field.value} />
                        </div>
                      ) : null}
                    </>
                  </FormControl>
                  <FormDescription>
                    The icon should be one of the availables in Lucide, see the
                    list{" "}
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
              // disabled={!form.formState.isValid}
              className={cn(buttonVariants())}
            >
              Save
            </TooltipTrigger>
            <TooltipContent side="top" className="w-fit p-0">
              <DialogClose asChild>
                <Button
                  // disabled={!form.formState.isValid}
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
  );
};
