import { useState, useEffect } from "react";

export const useDetectClick = (el, initialState) => {
  // debugger
  const [isActive, setIsActive] = useState(initialState);
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (el.current !== null && !el.current.contains(e.target))
      setIsActive(!isActive);
    };
    
    if (isActive)
    window.addEventListener('click', pageClickEvent);

    return () => window.removeEventListener('click', pageClickEvent);
  }, [isActive, el]);
  return [isActive, setIsActive];
};