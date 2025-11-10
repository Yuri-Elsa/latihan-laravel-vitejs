import React, { useState, useEffect, useRef } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { X, Upload } from "lucide-react";
import "trix/dist/trix.css";
import "trix";

export default function TodoModal({ todo, onClose }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: todo?.title || "",
        description: todo?.description || "",
        cover: null,
        _method: todo ? "PUT" : "POST",
    });

    const [preview, setPreview] = useState(
        todo?.cover ? `/storage/${todo.cover}` : null
    );
    const trixEditorRef = useRef(null);
    const trixInputRef = useRef(null);

    useEffect(() => {
        // Initialize Trix editor
        if (trixInputRef.current && trixEditorRef.current) {
            const editor = trixEditorRef.current.editor;
            if (editor && data.description) {
                editor.loadHTML(data.description);
            }

            // Listen for changes
            const handleTrixChange = (e) => {
                setData("description", e.target.innerHTML);
            };

            trixEditorRef.current.addEventListener(
                "trix-change",
                handleTrixChange
            );

            return () => {
                if (trixEditorRef.current) {
                    trixEditorRef.current.removeEventListener(
                        "trix-change",
                        handleTrixChange
                    );
                }
            };
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("cover", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (todo) {
            post(`/todos/${todo.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post("/todos", {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>
                        {todo ? "Edit Todo" : "Tambah Todo Baru"}
                    </CardTitle>
                    <Button variant="ghost" size="icon-sm" onClick={onClose}>
                        <X />
                    </Button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="title">
                                    Judul Todo *
                                </FieldLabel>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    placeholder="Masukkan judul todo"
                                    required
                                />
                                {errors.title && (
                                    <div className="text-sm text-destructive">
                                        {errors.title}
                                    </div>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel>Deskripsi</FieldLabel>
                                <input
                                    id="trix"
                                    type="hidden"
                                    ref={trixInputRef}
                                />
                                <trix-editor
                                    ref={trixEditorRef}
                                    input="trix"
                                    className="trix-content border rounded-md min-h-[200px]"
                                />
                                {errors.description && (
                                    <div className="text-sm text-destructive">
                                        {errors.description}
                                    </div>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="cover">
                                    Cover Image
                                </FieldLabel>
                                <div className="space-y-4">
                                    {preview && (
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon-sm"
                                                className="absolute top-2 right-2"
                                                onClick={() => {
                                                    setPreview(null);
                                                    setData("cover", null);
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id="cover"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="flex-1"
                                        />
                                    </div>
                                    {errors.cover && (
                                        <div className="text-sm text-destructive">
                                            {errors.cover}
                                        </div>
                                    )}
                                </div>
                            </Field>

                            <div className="flex gap-2 justify-end pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                >
                                    Batal
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? "Menyimpan..."
                                        : todo
                                        ? "Update"
                                        : "Simpan"}
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
