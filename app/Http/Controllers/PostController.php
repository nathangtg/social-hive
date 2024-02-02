<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
        $post->post_id = $request->post_id;
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

    public function destroy($post_id)
    {
        Log::info('Deleting post with id: ' . $post_id);

        $post = Post::findOrFail($post_id);
        // Add authorization check here if needed
        $post->delete();

        return response()->json(['success' => 'Post deleted successfully']);
    }
}


