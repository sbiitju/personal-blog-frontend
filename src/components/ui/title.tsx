import { cn } from "@/lib/utils";

export default function Title({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "inline-block text-2xl py-3 px-4 rounded-full rounded-tr-none  rounded-bl-none bg-gradient-to-b from-[#fff] to-[#ccc] border font-bold",
        className
      )}
      {...props}
    />
  );
}
