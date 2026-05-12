import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors font-lexend py-3 px-6 uppercase italic font-black",
  {
    variants: {
      variant: {
        primary: "bg-[#32CD32] text-black hover:bg-[#32CD32]/90",
        secondary: "bg-[#1A1A1A] text-white border border-white/10 hover:bg-[#1A1A1A]/80",
        inverted: "bg-white text-black hover:bg-white/90",
        outlined: "bg-transparent border border-white/20 text-white hover:border-white/50",
      },
      size: {
        default: "h-11 px-8",
        sm: "h-9 px-4",
        lg: "h-14 px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

// Hacemos que className y size sean opcionales para evitar el error ts(2739)
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string; 
  size?: VariantProps<typeof buttonVariants>["size"];
}

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};