"use client";

import React from "react";
import Sidebar from "@/components/fragments/admin/sidebar";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed h-screen w-64">
        <Sidebar />
      </div>

      <main className="flex-1 ml-64 p-4 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
