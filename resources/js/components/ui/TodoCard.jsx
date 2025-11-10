import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    Circle,
    Edit,
    Trash2,
    Image as ImageIcon,
} from "lucide-react";

export default function TodoCard({ todo, onEdit, onDelete, onToggle }) {
    return (
        <Card
            className={`transition-all ${todo.is_finished ? "opacity-75" : ""}`}
        >
            {todo.cover && (
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img
                        src={`/storage/${todo.cover}`}
                        alt={todo.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <CardHeader>
                <CardTitle className="flex items-start justify-between gap-2">
                    <span
                        className={`flex-1 ${
                            todo.is_finished
                                ? "line-through text-muted-foreground"
                                : ""
                        }`}
                    >
                        {todo.title}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onToggle(todo)}
                    >
                        {todo.is_finished ? (
                            <CheckCircle2 className="text-green-600" />
                        ) : (
                            <Circle className="text-muted-foreground" />
                        )}
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {todo.description && (
                    <div
                        className="text-sm text-muted-foreground mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: todo.description }}
                    />
                )}
                <div className="flex gap-2 justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(todo)}
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(todo)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
