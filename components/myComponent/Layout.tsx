import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white min-h-screen">
                <div className="p-4">Sidebar Content</div>
            </aside>

            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="bg-blue-600 text-white p-4">
                    <h1 className="text-lg">Navbar</h1>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-4 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
