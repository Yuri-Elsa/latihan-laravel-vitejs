import React from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { ListTodo, Home } from "lucide-react";

export default function AppLayout({ children }) {
    const onLogout = () => {
        router.get("/auth/logout");
    };

    const isActive = (path) => {
        return window.location.pathname === path;
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="border-b bg-card">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="text-lg font-bold">
                                DelTodos
                            </Link>
                            <div className="flex space-x-4">
                                <Link href="/">
                                    <Button
                                        variant={
                                            isActive("/") ? "default" : "ghost"
                                        }
                                        size="sm"
                                    >
                                        <Home className="mr-2 h-4 w-4" />
                                        Home
                                    </Button>
                                </Link>
                                <Link href="/todos">
                                    <Button
                                        variant={
                                            isActive("/todos")
                                                ? "default"
                                                : "ghost"
                                        }
                                        size="sm"
                                    >
                                        <ListTodo className="mr-2 h-4 w-4" />
                                        Todos
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={onLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t bg-card py-6 mt-12">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    &copy; 2025 Delcom Labs. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
