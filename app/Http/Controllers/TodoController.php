<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $filter = $request->input('filter'); // 'all', 'finished', 'unfinished'

        $query = Todo::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($filter === 'finished') {
            $query->where('is_finished', true);
        } elseif ($filter === 'unfinished') {
            $query->where('is_finished', false);
        }

        $todos = $query->paginate(20)->withQueryString();

        // Statistics
        $stats = [
            'total' => Todo::where('user_id', Auth::id())->count(),
            'finished' => Todo::where('user_id', Auth::id())->where('is_finished', true)->count(),
            'unfinished' => Todo::where('user_id', Auth::id())->where('is_finished', false)->count(),
        ];

        return Inertia::render('app/TodoPage', [
            'todos' => $todos,
            'stats' => $stats,
            'filters' => [
                'search' => $search,
                'filter' => $filter,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover' => 'nullable|image|max:2048',
        ]);

        $data = [
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'is_finished' => false,
        ];

        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('todos', 'public');
            $data['cover'] = $path;
        }

        Todo::create($data);

        return back()->with('success', 'Todo berhasil ditambahkan!');
    }

    public function update(Request $request, Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover' => 'nullable|image|max:2048',
        ]);

        $data = [
            'title' => $request->title,
            'description' => $request->description,
        ];

        if ($request->hasFile('cover')) {
            // Delete old cover
            if ($todo->cover) {
                Storage::disk('public')->delete($todo->cover);
            }
            $path = $request->file('cover')->store('todos', 'public');
            $data['cover'] = $path;
        }

        $todo->update($data);

        return back()->with('success', 'Todo berhasil diperbarui!');
    }

    public function toggleFinish(Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        $todo->update([
            'is_finished' => !$todo->is_finished,
        ]);

        return back()->with('success', 'Status todo berhasil diubah!');
    }

    public function destroy(Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        // Delete cover if exists
        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }

        $todo->delete();

        return back()->with('success', 'Todo berhasil dihapus!');
    }
}