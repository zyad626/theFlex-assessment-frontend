import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-50 shadow-sm">
            <div className="max-w-[1600px] mx-auto">
                <h1 className="text-2xl font-bold text-[#284E4C]">Manager Dashboard</h1>
            </div>
        </header>
    );
};
