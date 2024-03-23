import { SignIn } from "@clerk/nextjs";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <a
        href="/"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "absolute top-0 left-0"
        )}
      >
        <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
        <span className="ml-2">Home</span>
      </a>
      <SignIn />
    </div>
  );
}
