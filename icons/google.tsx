import { cn } from "@/lib/utils";
import { IconProps } from "@/types";

export const GoogleIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    role="img"
    className={cn(className)}
  >
    <path
      d="M12.5,10.2v3.8H18c-0.7,2.3-2.6,4-5.4,4c-3.3,0-6-2.7-6-6s2.7-6,6-6c1.5,0,2.9,0.5,3.9,1.5l2.8-2.8C17.5,3,15.1,2,12.5,2
  C7,2,2.5,6.5,2.5,12s4.5,10,10,10c8.4,0,10.2-7.9,9.4-11.7L12.5,10.2z"
      fill="currentColor"
    />
  </svg>
);
