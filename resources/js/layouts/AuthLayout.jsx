import React from "react";

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="text-center">
                        <img
                            src="/logo.png"
                            alt="DelTodos Logo"
                            className="w-20 h-20 mx-auto mb-4"
                        />
                        <h1 className="text-3xl font-bold text-foreground">
                            DelTodos
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Kelola aktivitas harian Anda
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <main>{children}</main>
            </div>
        </div>
    );
}
