'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {cn} from '@/lib/utils';
import {
    FileText,
    Mail,
    Brain,
    Mic,
    MessageSquare,
    Megaphone,
    ChevronDown,
    ChevronRight,
    Home,
    Settings,
    LogOut
} from 'lucide-react';
import {sidebarSections} from '@/lib/menuItems';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useAuth} from '@/lib/hooks';
import LogoutDialog from '@/components/auth/LogoutDialog';

const iconMap = {
    Home,
    Settings,
    LogOut
};

interface SidebarProps {
    isCollapsed?: boolean;
}

export default function Sidebar({isCollapsed = false}: SidebarProps) {
    const [expandedSections, setExpandedSections] = useState<string[]>(['resume', 'letters']);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const {user} = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Extract permission names from store or localStorage fallback
    const permissionNames = useMemo(() => {
        const fromStore = (user as any)?.role?.permission_names as string[] | undefined;
        if (fromStore && Array.isArray(fromStore)) return fromStore;
        try {
            const raw = typeof window !== 'undefined' ? localStorage.getItem('auth_user') : null;
            if (!raw) return [] as string[];
            const parsed = JSON.parse(raw);
            const names = parsed?.role?.permission_names;
            return Array.isArray(names) ? (names as string[]) : [];
        } catch (_) {
            return [] as string[];
        }
    }, [user]);

    const hasPermission = (perm?: string) => {
        if (!perm) return true; // if no permission required, show by default
        return permissionNames.includes(perm);
    };

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    return (
        <div className={cn(
            "bg-white border-r border-gray-200 h-full transition-all duration-300 ease-in-out",
            isCollapsed ? "w-16" : "w-72"
        )}>
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div
                        className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">JP</span>
                    </div>
                    {!isCollapsed && (
                        <span className="font-bold text-xl text-gray-900">JobPrep</span>
                    )}
                </div>

                <nav className="space-y-2">
                    <Link
                        href="/dashboard"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                            pathname === '/dashboard'
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                        )}
                    >
                        <Home size={20}/>
                        {!isCollapsed && <span className="font-medium">Dashboard</span>}
                    </Link>

                    {mounted && sidebarSections.map((section) => {
                        const Icon = (section.icon as any) || Home;
                        const isExpanded = expandedSections.includes(section.id);
                        const visibleItems = (section.items || []).filter((item: any) =>
                            hasPermission((item.id as string).replace(/-/g, '_').toUpperCase())
                        );
                        const hasVisibleItems = visibleItems.length > 0;

                        if (!hasVisibleItems) {
                            return null;
                        }

                        return (
                            <div key={section.id} className="space-y-1">
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-left",
                                        "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                                    )}
                                >
                                    <Icon size={20}/>
                                    {!isCollapsed && (
                                        <>
                                            <span className="font-medium flex-1">{section.title}</span>
                                            {isExpanded ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                                        </>
                                    )}
                                </button>

                                {!isCollapsed && isExpanded && (
                                    <div className="ml-8 space-y-1">
                                        {visibleItems.map((item: any) => (
                                            <Link
                                                key={item.id}
                                                href={item.path}
                                                className={cn(
                                                    "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
                                                    pathname === item.path
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
                                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-gray-200">
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                        >
                            <Settings size={20}/>
                            {!isCollapsed && <span className="font-medium">Settings</span>}
                        </Link>

                        <LogoutDialog>
                            <button
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 text-gray-700 hover:text-red-600">
                                <LogOut size={20}/>
                                {!isCollapsed && <span className="font-medium">Logout</span>}
                            </button>
                        </LogoutDialog>
                    </div>
                </nav>
            </div>
        </div>
    );
}
