"use client";

import React from "react";

interface LoadingProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    className?: string;
}

const Loading: React.FC<LoadingProps> = ({
    size = "md",
    text,
    className = ""
}) => {
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-8 h-8 border-2",
        lg: "w-12 h-12 border-4",
    };

    const spinnerSize = sizeClasses[size];

    return (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <div
                className={`${spinnerSize} border-t-transparent border-r-transparent border-l-transparent border-b-current rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            />
            {text && (
                <p className="text-sm text-gray-400 animate-pulse">{text}</p>
            )}
        </div>
    );
};

export default Loading;

