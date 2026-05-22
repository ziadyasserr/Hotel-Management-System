import { useState, useEffect } from "react";
import {
    FaBullhorn,
    FaCalendarAlt,
    FaLongArrowAltLeft,
    FaLongArrowAltRight,
    FaSignOutAlt,
    FaTools,
    FaUser,
} from "react-icons/fa";


import { MdDashboard, MdMeetingRoom } from "react-icons/md";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import { Link, useLocation } from "react-router-dom";

interface SideBarProps {
    toggled: boolean;
    setToggled: (toggled: boolean) => void;
}

function SideBar({ toggled, setToggled }: SideBarProps) {

    const location = useLocation();

    // Close sidebar on mobile when route changes
    useEffect(() => {
        setToggled(false);
    }, [location.pathname, setToggled]);

    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem("sidebarStatus");
        return saved ? JSON.parse(saved) : false;
    });

    // ✅ SAVE SIDEBAR STATE
    localStorage.setItem("sidebarStatus", JSON.stringify(collapsed));

    // ✅ ACTIVE ITEM
    const isActive = (path: string) => location.pathname === path;

    return (
        <Sidebar
            collapsed={collapsed}
            toggled={toggled}
            onBackdropClick={() => setToggled(false)}
            breakPoint="md"
            className="h-screen border-r border-gray-800"
        >

            <Menu
                menuItemStyles={{
                    button: ({ active }) => ({
                        backgroundColor: active ? "#182841ff" : "transparent",
                        color: "#fff",
                        borderRadius: "12px",
                        margin: "6px 12px",
                        transition: "all 0.2s ease",

                        "&:hover": {
                            backgroundColor: "#1F2937",
                        },
                    }),

                    icon: {
                        color: "#fff",
                    },
                }}
            >

                {/* COLLAPSE BUTTON */}
                <MenuItem>

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="
                            w-full flex items-center justify-center
                            text-white py-2
                            hover:bg-gray-800
                            rounded-xl
                            transition
                            cursor-pointer
                        "
                    >
                        {collapsed ? (
                            <FaLongArrowAltRight size={18} />
                        ) : (
                            <FaLongArrowAltLeft size={18} />
                        )}
                    </button>

                </MenuItem>

                {/* HOME */}
                <MenuItem
                    component={<Link to="/dashboard/home" />}
                    icon={<MdDashboard size={20} />}
                    active={isActive("/dashboard/home")}
                >
                    Home
                </MenuItem>

                {/* USERS */}
                <MenuItem
                    component={<Link to="/dashboard/users" />}
                    icon={<FaUser size={18} />}
                    active={isActive("/dashboard/users")}
                >
                    Users
                </MenuItem>

                {/* ROOMS */}
                <MenuItem
                    component={<Link to="/dashboard/rooms" />}
                    icon={<MdMeetingRoom size={20} />}
                    active={isActive("/dashboard/rooms")}
                >
                    Rooms
                </MenuItem>

                {/* ADS */}
                <MenuItem
                    component={<Link to="/dashboard/ads" />}
                    icon={<FaBullhorn size={18} />}
                    active={isActive("/dashboard/ads")}
                >
                    Ads
                </MenuItem>

                {/* BOOKINGS */}
                <MenuItem
                    component={<Link to="/dashboard/bookings" />}
                    icon={<FaCalendarAlt size={18} />}
                    active={isActive("/dashboard/bookings")}
                >
                    Bookings
                </MenuItem>

                {/* FACILITIES */}
                <MenuItem
                    component={<Link to="/dashboard/room-facilities" />}
                    icon={<FaTools size={18} />}
                    active={isActive("/dashboard/room-facilities")}
                >
                    Facilities
                </MenuItem>
                <MenuItem
                    component={<Link to="/login" />}
                    icon={<FaSignOutAlt size={18} />}
                    active={isActive("/dashboard/logout")}
                    onClick={() => localStorage.removeItem("token")}
                >
                    LogOut
                </MenuItem>

            </Menu>
        </Sidebar>
    );
}

export default SideBar;