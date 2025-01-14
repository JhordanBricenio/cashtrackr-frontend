import React from "react";

export default function SuccessMessage({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-center my-4 bg-amber-400 text-white font-bold p-3 uppercase text-sm rounded-sm">
            {children}
        </p>
    )
}
