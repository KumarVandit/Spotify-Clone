"use client";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation"; 
// usePathname return the pathname of the page

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import SidebarItem from "./SidebarItem";
import Box from "./Box";
import Library from "./Library";
import { useMemo } from "react";

// INTERFACES are just like type for objects
// it defines properties and types of the properties
// object must have all the properties defined in the interface and adhere to the types

interface SidebarProps {
  children: React.ReactNode;
  // ReactNode is a type in React that represents a node in the React element tree. 
  // It can hold a wide range of elements, including JSX elements, strings, numbers, null, and undefined. 
  // ReactNode is often used as the type for the children prop,
  //  which is a reserved prop name in React that is used to pass content to a component from its parent component.
  songs: Song[];
}

const Sidebar = ({ children, songs }: SidebarProps) => {
  const pathname = usePathname();
  const player = usePlayer();









  const routes = useMemo(() => [
    {
      // By using useMemo, a function's result can be memoized so that the function will only be 
      // executed when its dependencies change. This can help reduce the number of times the function
      // is executed and improve the performance of the component.
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search',
      href: '/'
    },
    {
      icon: BiSearch,
      label: 'Search',
      href: '/search',
      active: pathname === '/search'
    },
  ], [pathname]);
  // so the routes will only be updated when pathname changes
  // i.e. when the user navigates to a different page the pathname changes and hence
  // the routes will be updated. This will cause the SidebarItem to re-render and the
  // active class will be updated accordingly.









  return (
    <div 
      className={twMerge(`
        flex 
        h-full
        `,
        player.activeId && 'h-[calc(100%-80px)]'
      )}
    >
      <div 
        className="
          hidden 
          md:flex 
          flex-col 
          gap-y-2 
          bg-black 
          h-full 
          w-[300px] 
          p-2
        "
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </div>
  );
}
 
export default Sidebar;
