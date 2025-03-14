"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LogOut,
  Users,
  Stethoscope,
  HeartHandshake,
  Activity,
  ChevronRight,
  Pill,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isJanjiTemuPath = pathname?.includes("/admin/janji-temu/");

  const [isJanjiTemuOpen, setIsJanjiTemuOpen] = useState(isJanjiTemuPath);

  useEffect(() => {
    if (isJanjiTemuPath) {
      setIsJanjiTemuOpen(true);
    }
  }, [pathname, isJanjiTemuPath]);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const menus = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Dokter", path: "/admin/dokter", icon: Stethoscope },
    { name: "Pasien", path: "/admin/pasien", icon: Users },
    {
      name: "Janji Temu",
      path: "/admin/janji-temu",
      icon: HeartHandshake,
      subMenus: [
        { name: "Data Janji Temu", path: "/admin/janji-temu/data-janji-temu" },
        {
          name: "Request Janji Temu",
          path: "/admin/janji-temu/request-janji-temu",
        },
      ],
    },
    { name: "Obat", path: "/admin/obat", icon: Pill },
  ];

  const toggleJanjiTemuDropdown = () => {
    setIsJanjiTemuOpen(!isJanjiTemuOpen);
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-50 border-r shadow-lg">
      <div className="flex items-center gap-3 py-6 px-6 border-b border-blue-100">
        <div className="flex items-center justify-center h-10 w-10 bg-blue-600 rounded-lg shadow-md">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold ">
            <span className="text-blue-600">Medi</span>Connect
          </h1>
          <p className="text-xs text-gray-500">Healthcare Management</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menus.map((menu) => {
          const isActive = pathname === menu.path && !menu.subMenus;
          const hasSubMenus = menu.subMenus && menu.subMenus.length > 0;

          return (
            <div key={menu.name}>
              {hasSubMenus ? (
                <div>
                  <Button
                    variant="ghost"
                    className={`w-full justify-between space-x-2 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 border-l-4 border-blue-500 font-medium hover:text-blue-700"
                        : "hover:bg-blue-50 hover:text-blue-700 text-gray-600"
                    }`}
                    onClick={toggleJanjiTemuDropdown}
                  >
                    <div className="flex items-center space-x-2">
                      <menu.icon className="h-4 w-4" />
                      <span>{menu.name}</span>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isJanjiTemuOpen ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                  {isJanjiTemuOpen && (
                    <div className="pl-6">
                      {menu.subMenus.map((subMenu) => {
                        const isSubMenuActive = pathname === subMenu.path;
                        return (
                          <Link href={subMenu.path} key={subMenu.name} passHref>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start space-x-2 ${
                                isSubMenuActive
                                  ? "bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 border-l-4 border-blue-500 font-medium hover:text-blue-700"
                                  : "hover:bg-blue-50 hover:text-blue-700 text-gray-600"
                              }`}
                            >
                              <span>{subMenu.name}</span>
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={menu.path} passHref>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start space-x-2 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-100 to-white-50 text-blue-700 border-l-4 border-blue-500 font-medium hover:text-blue-700"
                        : "hover:bg-blue-50 hover:text-blue-700 text-gray-600"
                    }`}
                  >
                    <menu.icon
                      className={`h-4 w-4 ${isActive ? "font-semibold" : ""}`}
                    />
                    <span>{menu.name}</span>
                  </Button>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-xl">
          <div className="flex items-center gap-3">
            <Avatar className="border-2 border-emerald-100">
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-r from-emerald-400 to-blue-400 text-white">
                ME
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-800">
                {session?.user?.name?.split(" ")[0]}
              </p>
              <p className="text-xs font-medium text-emerald-600">
                {session?.user?.role === "admin" ? "Administrator" : ""}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full hover:bg-red-50 hover:text-red-600"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
