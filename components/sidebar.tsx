// Sidebar responsive — cachée sur mobile, visible sur desktop

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Zap,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/invoices", label: "Factures", icon: FileText },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900">Lumina</span>
          <span className="font-bold text-blue-600">Invoice</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profil */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition">
          <UserButton />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-700">Mon compte</span>
            <span className="text-xs text-slate-400">Gérer le profil</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col fixed h-full z-40">
        <NavContent />
      </aside>

      {/* ===== MOBILE HEADER ===== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 h-14 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-slate-900 text-sm">Lumina</span>
          <span className="font-bold text-blue-600 text-sm">Invoice</span>
        </Link>

        {/* Bouton hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-slate-50 transition"
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-slate-600" />
          ) : (
            <Menu className="w-5 h-5 text-slate-600" />
          )}
        </button>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)}>
          <aside
            className="w-64 bg-white h-full flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <NavContent />
          </aside>
        </div>
      )}
    </>
  );
}