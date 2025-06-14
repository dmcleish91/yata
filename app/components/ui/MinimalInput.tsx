import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";

interface MinimalInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /**
   * The Lucide icon component to render
   */
  icon?: LucideIcon;
  /**
   * Callback function when the input value changes
   */
  onChange?: (value: string) => void;
}

/**
 * A minimal input component with a customizable icon and focus states
 * @param props - Component props including all HTML input attributes and custom props
 */
export default function MinimalInput({
  icon: Icon,
  onChange,
  ...inputProps
}: MinimalInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="max-w-md">
      <div className="relative">
        <div className="flex items-center">
          {Icon && (
            <Icon
              className={`mr-2 w-4 h-4 transition-colors duration-200 ${
                isFocused ? "text-primary" : "text-base-content/40"
              }`}
            />
          )}
          <input
            type="text"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            className="flex-1 py-1.5 text-sm bg-transparent outline-none border-0 placeholder-base-content/40"
            {...inputProps}
          />
        </div>
      </div>
    </div>
  );
}
