<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\UserPortfolio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrowseController extends Controller
{
    public function index()
    {
        $userId = auth()->id(); // Get the authenticated user's ID

        $users = User::all();
        $posts = Post::with('likes')->get(); // Eager load likes to optimize performance

        $formattedPosts = $posts->map(function ($post) use ($userId) {
            // Check if the current user has liked this post
            $isLikedByCurrentUser = $post->likes->contains('user_id', $userId);

            return [
                'post_id' => $post->post_id, // Ensure this matches your post's primary key name
                'user_id' => $post->user_id,
                'image' => $post->image,
                'captions' => $post->captions,
                'likeCount' => $post->likes->count(),
                'isLikedByCurrentUser' => $isLikedByCurrentUser,
                'user_name' => $post->user->name, // Assuming there's a user relationship defined in the Post model
                'created_at' => $post->created_at->toDateTimeString(),
                'updated_at' => $post->updated_at->toDateTimeString(),
            ];
        });

        return Inertia::render('Browse', compact('users', 'formattedPosts'));
    }

}

