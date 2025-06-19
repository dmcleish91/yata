import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../libs/cn";

interface MinimalInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  icon?: LucideIcon;
  onChange?: (value: string) => void;
  ariaLabel?: string;
  type?: string;
  className?: string;
}

export default function MinimalInput({
  icon: Icon,
  onChange,
  ariaLabel,
  type = "text",
  className,
  ...inputProps
}: MinimalInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="flex items-center">
      {Icon && (
        <Icon
          className={`mr-2 h-4 w-4 flex-shrink-0 transition-colors duration-200 ${isFocused ? "text-primary" : "text-base-content/40"}`}
        />
      )}
      <input
        type={type}
        aria-label={ariaLabel}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        className={cn(
          "placeholder-base-content/40 min-w-0 flex-1 border-0 bg-transparent py-1.5 text-sm outline-none",
          className,
        )}
        {...inputProps}
      />
    </div>
  );
}
