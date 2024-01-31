<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\UserPortfolio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilePageController extends Controller
{
    public function showProfile($email)
    {
        $user = User::where('email', $email)->firstOrFail();
        $posts = Post::where('user_id', $user->id)->get();
        $portfolio = UserPortfolio::where('user_id', $user->id)->first();

        $formattedPosts = $posts->map(function ($post) {
            return [
                'post_id' => $post->id, // Assuming 'id' is the correct column name for post ID
                'user_id' => $post->user_id,
                'image' => asset('' . $post->image),
                'captions' => $post->captions,
                'user_name' => $post->user->name, // Access the name property from the user relationship
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
            ];
        });

        return Inertia::render('ProfilePage', [
            'profileUser' => $user,
            'posts' => $formattedPosts, // Send the formatted posts
            'user_portfolio' => $portfolio,
        ]);
    }
}
