import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { usePage, Link } from "@inertiajs/react";
import { ListTodo, CheckSquare, Calendar } from "lucide-react";

export default function HomePage() {
    const { auth } = usePage().props;

    return (
        <AppLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: "&#128075;",
                                }}
                            />{" "}
                            Hai! {auth.name}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-6">
                            Kelola aktivitas harian Anda dengan mudah
                        </p>
                        <Link href="/todos">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <ListTodo className="mr-2" />
                                Lihat Todos Saya
                            </Button>
                        </Link>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                                        <ListTodo className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-center">
                                    Kelola Todo
                                </CardTitle>
                                <CardDescription className="text-center">
                                    Buat, edit, dan hapus todo dengan mudah
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                                        <CheckSquare className="h-8 w-8 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-center">
                                    Lacak Progress
                                </CardTitle>
                                <CardDescription className="text-center">
                                    Pantau perkembangan aktivitas Anda
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                                        <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-center">
                                    Organisasi
                                </CardTitle>
                                <CardDescription className="text-center">
                                    Atur aktivitas dengan cover dan deskripsi
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Mulai Kelola Aktivitas Anda</CardTitle>
                            <CardDescription>
                                Aplikasi todo list ini membantu Anda untuk:
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start">
                                    <CheckSquare className="mr-2 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>
                                        Mencatat semua aktivitas yang perlu
                                        dilakukan
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckSquare className="mr-2 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>
                                        Menambahkan deskripsi lengkap dengan
                                        rich text editor
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckSquare className="mr-2 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>
                                        Upload cover image untuk setiap
                                        aktivitas
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckSquare className="mr-2 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>
                                        Filter dan cari aktivitas dengan mudah
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckSquare className="mr-2 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>Melihat statistik progress Anda</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
