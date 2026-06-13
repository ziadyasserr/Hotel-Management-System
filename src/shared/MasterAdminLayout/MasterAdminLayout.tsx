import { useState } from "react";
import SideBar from "../../features/admin/components/shared/sideBar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function MasterAdminLayout() {
    const [toggled, setToggled] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen w-full">

            {/* SIDEBAR */}
            <div className="flex-shrink-0 h-screen z-50 relative">
                <SideBar toggled={toggled} setToggled={setToggled} />
            </div>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* MOBILE HEADER */}
                <div className="md:hidden flex items-center p-4 bg-white border-b border-gray-200">
                    <button 
                        onClick={() => setToggled(true)} 
                        className="text-gray-600 focus:outline-none hover:text-gray-900 transition-colors"
                    >
                        <FaBars size={24} />
                    </button>
                    <span className="ml-4 font-bold text-lg text-[#1F263E]">{t('adminDashboard')}</span>
                </div>

                {/* PAGE CONTENT */}
                <div className="flex-1 overflow-auto p-6 lg:p-10">
                    <Outlet />
                </div>

            </main>

        </div>
    );
}

export default MasterAdminLayout;