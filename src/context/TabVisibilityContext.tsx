"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface TabVisibilityContextProps {
  isTabActive: boolean;
}

const TabVisibilityContext = createContext<
  TabVisibilityContextProps | undefined
>(undefined);

export const useTabVisibility = () => {
  const context = useContext(TabVisibilityContext);
  if (!context) {
    throw new Error(
      "useTabVisibility must be used within a TabVisibilityProvider",
    );
  }
  return context;
};

export const TabVisibilityProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isTabActive, setIsTabActive] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
      document.title = document.hidden ? "😢 别走啊！" : "🎉 欢迎回来，英雄！";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 在组件卸载时清除事件监听器
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <TabVisibilityContext.Provider value={{ isTabActive }}>
      {children}
    </TabVisibilityContext.Provider>
  );
};
