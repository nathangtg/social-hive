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
                'post_id' => $post->post_id,
                'user_id' => $post->user_id,
                'image' => asset('' . $post->image),
                'captions' => $post->captions,
                'user_name' => $post->user->name,
                'created_at' => $post->created_at->toDateTimeString(),
                'updated_at' => $post->updated_at->toDateTimeString(),
            ];
        });

        // Check if the authenticated user is following the profile user
        $isFollowing = false;
        if (auth()->user()) {
            $isFollowing = auth()->user()->following()->where('user_id', $user->id)->exists();
        }

        return Inertia::render('ProfilePage', [
            'profileUser' => $user,
            'posts' => $formattedPosts,
            'user_portfolio' => $portfolio,
            'followStatus' => $isFollowing, // Add this line to pass the following status to the frontend
        ]);
    }
}
