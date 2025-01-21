"use client";
import { isBrowser } from "@/config/Variables";
import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const updateTheme = () => {
      if (isBrowser) {
        const currentTheme = isBrowser && document.body.getAttribute("theme");
        setTheme(currentTheme);
      }
    };

    updateTheme();

    // Observe changes in theme attribute
    const observer = new MutationObserver(() => {
      updateTheme();
    });

    if (isBrowser) {
      observer.observe(isBrowser && document.body, {
        attributes: true,
        attributeFilter: ["theme"],
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return theme;
};
