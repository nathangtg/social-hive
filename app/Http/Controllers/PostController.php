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

    public function like($post_id)
    {
        Log::info('Liking/unliking post with id: ' . $post_id);

        $post = Post::findOrFail($post_id);
        $userId = Auth::id();

        // Check if the like already exists for this user and post
        $like = $post->likes()->where('user_id', $userId)->first();
        $isLikedByCurrentUser = false; // Assume not liked by current user initially

        if ($like) {
            // If a like exists, delete it to "unlike" the post
            $like->delete();
            $message = 'Post unliked successfully';
            // Since a like was found and deleted, user had liked the post before this action
            $isLikedByCurrentUser = false;
        } else {
            // If no like exists, create a new like
            $post->likes()->create([
                'user_id' => $userId,
            ]);
            $message = 'Post liked successfully';
            // A new like was created, so the user likes the post after this action
            $isLikedByCurrentUser = true;
        }

        // Count the current number of likes for the post
        $likeCount = $post->likes()->count();

        return response()->json([
            'success' => $message,
            'likeCount' => $likeCount,
            'isLikedByCurrentUser' => $isLikedByCurrentUser,
        ]);
    }

}


