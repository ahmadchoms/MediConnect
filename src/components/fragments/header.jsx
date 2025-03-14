"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  User,
  LogOut,
  Info,
  Stethoscope,
  CalendarCheck,
  Phone,
  BriefcaseMedical,
  FileText,
  History,
  Settings,
  Bell,
  HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const showHeader =
    !pathname.startsWith("/admin") && !pathname.startsWith("/auth") && !pathname.startsWith("/404");

  const navigation = [
    { name: "Dokter", href: "/doctors", icon: Stethoscope },
    { name: "Janji Temu", href: "/appointment", icon: CalendarCheck },
    { name: "Layanan", href: "/services", icon: BriefcaseMedical },
    { name: "Tentang", href: "/about", icon: Info },
    { name: "Kontak", href: "/contact", icon: Phone },
  ];

  const mobileAdditionalMenu = [
    { name: "Riwayat Janji Temu", href: "/appointment-list", icon: History },
    { name: "Resep Obat", href: "/prescription", icon: FileText },
    { name: "Pengaturan", href: "/settings", icon: Settings },
    { name: "Bantuan", href: "/help", icon: HelpCircle },
  ];

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <>
      {showHeader && (
        <header className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href={"/"} className="self-center cursor-pointer">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center"
                  >
                    <span className="text-2xl font-bold text-blue-600">
                      Medi
                    </span>
                    <span className="text-2xl font-bold text-gray-800">
                      Connect
                    </span>
                  </motion.div>
                </Link>
                <nav className="hidden md:ml-6 md:flex md:space-x-8 pt-0.5">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors duration-200 ${isActive
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          }`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="hidden md:ml-6 md:flex md:items-center gap-4">
                {status === "loading" ? (
                  <Skeleton className="w-32 h-9 rounded-md" />
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2 pl-2 pr-4 border-gray-200">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User avatar"} />
                          <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{session?.user?.name || "Guest"}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link href="/profile" className="flex w-full items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profil</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/appointment-list" className="flex w-full items-center">
                            <History className="mr-2 h-4 w-4" />
                            <span>Riwayat Janji Temu</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/prescription" className="flex w-full items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Resep Obat</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link href="/settings" className="flex w-full items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Pengaturan</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/help" className="flex w-full items-center">
                            <HelpCircle className="mr-2 h-4 w-4" />
                            <span>Bantuan</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-500 hover:text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <div className="flex items-center md:hidden">
                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0">
                    <SheetHeader className="p-4 border-b">
                      <SheetTitle className="flex items-center">
                        <span className="text-xl font-bold text-blue-600">
                          Medi
                        </span>
                        <span className="text-xl font-bold text-gray-800">
                          Connect
                        </span>
                      </SheetTitle>
                    </SheetHeader>

                    {session?.user && (
                      <div className="p-4 bg-blue-50">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={session.user.image || ""} alt={session.user.name || "User avatar"} />
                            <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{session.user.name}</p>
                            <p className="text-sm text-gray-500">{session.user.email}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="px-1 py-2 overflow-y-auto">
                      <div className="mb-2 px-4 pt-1 pb-2">
                        <p className="text-sm font-medium text-gray-500">Menu Utama</p>
                      </div>
                      <nav className="space-y-1 px-2">
                        {navigation.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center py-2 px-3 rounded-md transition-colors ${isActive
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                              <item.icon className="mr-3 h-5 w-5" />
                              {item.name}
                            </Link>
                          );
                        })}
                      </nav>

                      <Separator className="my-3" />

                      <div className="mb-2 px-4 pt-1 pb-2">
                        <p className="text-sm font-medium text-gray-500">Akun Saya</p>
                      </div>
                      <nav className="space-y-1 px-2">
                        <Link
                          href="/profile"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                          <User className="mr-3 h-5 w-5" />
                          Profile
                        </Link>

                        {mobileAdditionalMenu.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100"
                          >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                          </Link>
                        ))}
                      </nav>
                    </div>

                    <SheetFooter className="border-t p-4">
                      <Button
                        variant="destructive"
                        className="w-full justify-center"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleSignOut();
                        }}
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        Logout
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}