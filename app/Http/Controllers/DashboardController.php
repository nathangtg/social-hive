<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\UserPortfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function showDashboard()
    {
        $user = Auth::user();
        $posts = Post::with('user') // Eager load the user relationship
                     ->where('user_id', $user->id)
                     ->get();
        $user_portfolio = UserPortfolio::where('user_id', $user->id)->first();
        $followersAmount = $user->followers()->count();

        // Format the posts for the frontend
        $formattedPosts = $posts->map(function ($post) {
            return [
                'post_id' => $post->post_id,
                'user_id' => $post->user_id,
                'image' => $post->image,
                'captions' => $post->captions,
                'user_name' => $post->user->name, // Access the name property from the user relationship
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
            ];
        });

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user, // Pass the authenticated user's data
            ],
            'posts' => $formattedPosts,
            'followersAmount' => $followersAmount, // Pass the followers amount to the frontend
            'user_portfolio' => $user_portfolio,
        ]);
    }

}
