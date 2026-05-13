import { cva } from "class-variance-authority";

 
const badge = cva(
  "inline-flex items-center font-black uppercase tracking-[0.3em]",
  {
    variants: {
      variant: {
        primary: "text-primary text-[10px]",
        muted: "text-gray-500 text-[9px]",
        outline: "border border-primary/40 text-primary text-[9px] px-3 py-1",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);
 