<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'caption' => 'required|string',
            'image' => 'required|image',
        ]);

        $path = $request->file('image')->store('public/images', 'public');

        $path = 'storage/' .$path;

        $post = new Post();
        $post->user_id = Auth::id();
        $post->captions = $request->caption;
        $post->image = $path;
        $post->save();

        return redirect()->route('dashboard'); // Redirect after saving
    }

    public function create()
    {
        return Inertia::render('CreatePost');
    }
}


