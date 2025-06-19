import { useState, useEffect } from "react";

export function useScreenWidth(minWidth: number): boolean {
  const [isGreater, setIsGreater] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      setIsGreater(window.innerWidth >= minWidth);
    }

    handleResize(); // Set initial value

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [minWidth]);

  return isGreater;
}
