import { SignIn } from "@clerk/nextjs";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <a
        href="/"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "absolute left-4 top-4",
        )}
      >
        <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
        <span className="ml-2">Home</span>
      </a>
      <SignIn />
    </div>
  );
}
