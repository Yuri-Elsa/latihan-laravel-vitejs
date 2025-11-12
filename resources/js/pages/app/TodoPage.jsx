import React, { useState, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import { usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Plus,
    Search,
    CheckCircle2,
    Circle,
    Edit,
    Trash2,
    Image as ImageIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import Chart from "react-apexcharts";
import TodoModal from "@/components/TodoModal";
import TodoCard from "@/components/TodoCard";

export default function TodoPage() {
    const { todos, stats, filters, flash } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const [search, setSearch] = useState(filters?.search || "");
    const [filter, setFilter] = useState(filters?.filter || "all");

    // Alert feedback
    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: flash.success,
                timer: 2000,
                showConfirmButton: false,
            });
        }
        if (flash?.error) {
            Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: flash.error,
                timer: 2000,
                showConfirmButton: false,
            });
        }
    }, [flash]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/todos",
            { search, filter },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        router.get(
            "/todos",
            { search, filter: newFilter },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleEdit = (todo) => {
        setEditingTodo(todo);
        setShowModal(true);
    };

    const handleDelete = (todo) => {
        Swal.fire({
            title: "Hapus Todo?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/todos/${todo.id}`, { preserveScroll: true });
            }
        });
    };

    const handleToggleFinish = (todo) => {
        router.patch(`/todos/${todo.id}/toggle`, {}, { preserveScroll: true });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingTodo(null);
    };

    // Chart configuration
    const chartOptions = {
        chart: { type: "donut" },
        labels: ["Selesai", "Belum Selesai"],
        colors: ["#10b981", "#f59e0b"],
        legend: { position: "bottom" },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { width: 200 },
                    legend: { position: "bottom" },
                },
            },
        ],
    };

    const chartSeries = [stats?.finished || 0, stats?.unfinished || 0];

    return (
        <AppLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Daftar Aktivitas
                            </h1>
                            <p className="text-muted-foreground">
                                Kelola aktivitas harian Anda
                            </p>
                        </div>
                        <Button onClick={() => setShowModal(true)}>
                            <Plus className="mr-2" />
                            Tambah Todo
                        </Button>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Total
                                </p>
                                <p className="text-3xl font-bold">
                                    {stats?.total || 0}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Selesai
                                </p>
                                <p className="text-3xl font-bold text-green-600">
                                    {stats?.finished || 0}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Belum Selesai
                                </p>
                                <p className="text-3xl font-bold text-amber-600">
                                    {stats?.unfinished || 0}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                {stats?.total > 0 ? (
                                    <Chart
                                        options={chartOptions}
                                        series={chartSeries}
                                        type="donut"
                                        height={150}
                                    />
                                ) : (
                                    <div className="text-center text-muted-foreground text-sm py-8">
                                        Belum ada data
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Search & Filter */}
                    <Card className="mb-6">
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <form
                                    onSubmit={handleSearch}
                                    className="flex-1 flex gap-2"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Cari todo..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="flex-1"
                                    />
                                    <Button type="submit">
                                        <Search className="mr-2" />
                                        Cari
                                    </Button>
                                </form>
                                <div className="flex gap-2">
                                    <Button
                                        variant={
                                            filter === "all"
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() =>
                                            handleFilterChange("all")
                                        }
                                    >
                                        Semua
                                    </Button>
                                    <Button
                                        variant={
                                            filter === "finished"
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() =>
                                            handleFilterChange("finished")
                                        }
                                    >
                                        Selesai
                                    </Button>
                                    <Button
                                        variant={
                                            filter === "unfinished"
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() =>
                                            handleFilterChange("unfinished")
                                        }
                                    >
                                        Belum Selesai
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Todo List */}
                    {todos.data.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center text-muted-foreground">
                                <p className="text-lg">
                                    Belum ada todo yang tersedia
                                </p>
                                <p className="text-sm mt-2">
                                    Klik tombol "Tambah Todo" untuk membuat
                                    aktivitas baru
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                {todos.data.map((todo) => (
                                    <TodoCard
                                        key={todo.id}
                                        todo={todo}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onToggle={handleToggleFinish}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {todos.last_page > 1 && (
                                <div className="flex justify-center gap-2 items-center">
                                    {/* Previous */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        disabled={!todos.prev_page_url}
                                        onClick={() => {
                                            if (todos.prev_page_url)
                                                router.get(
                                                    todos.prev_page_url,
                                                    {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    }
                                                );
                                        }}
                                        className="bg-black text-white hover:bg-black/90 disabled:bg-gray-300 disabled:text-gray-500"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="15 18 9 12 15 6" />
                                        </svg>
                                    </Button>

                                    {/* Page Numbers */}
                                    {todos.links
                                        .filter(
                                            (link) =>
                                                !link.label.includes(
                                                    "Previous"
                                                ) &&
                                                !link.label.includes("Next")
                                        )
                                        .map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={
                                                    link.active
                                                        ? "default"
                                                        : "outline"
                                                }
                                                disabled={!link.url}
                                                onClick={() => {
                                                    if (link.url)
                                                        router.get(link.url, {
                                                            preserveState: true,
                                                            preserveScroll: true,
                                                        });
                                                }}
                                                className={
                                                    link.active
                                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                                        : ""
                                                }
                                            >
                                                {link.label}
                                            </Button>
                                        ))}

                                    {/* Next */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        disabled={!todos.next_page_url}
                                        onClick={() => {
                                            if (todos.next_page_url)
                                                router.get(
                                                    todos.next_page_url,
                                                    {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    }
                                                );
                                        }}
                                        className="bg-black text-white hover:bg-black/90 disabled:bg-gray-300 disabled:text-gray-500"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <TodoModal todo={editingTodo} onClose={handleCloseModal} />
            )}
        </AppLayout>
    );
}
