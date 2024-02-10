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
        $posts = Post::with(['user', 'likes']) // Eager load the user and likes relationships to optimize performance
                     ->where('user_id', $user->id)
                     ->get();
        $user_portfolio = UserPortfolio::where('user_id', $user->id)->first();
        $followersAmount = $user->followers()->count();

        // Correctly use $user->id to compare against user_id in the likes collection
        $formattedPosts = $posts->map(function ($post) use ($user) {
            $isLikedByCurrentUser = $post->likes->contains(function ($like) use ($user) {
                return $like->user_id === $user->id;
            });

            return [
                'post_id' => $post->post_id, // Make sure this is the correct primary key attribute for your Post model
                'user_id' => $post->user_id,
                'image' => $post->image,
                'captions' => $post->captions,
                'isLikedByCurrentUser' => $isLikedByCurrentUser,
                'user_name' => $post->user->name, // Access the name property from the user relationship
                'created_at' => $post->created_at->toDateTimeString(),
                'updated_at' => $post->updated_at->toDateTimeString(),
                'likeCount' => $post->likes->count(), // Get the amount of likes for the post efficiently
            ];
        });

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user->only('id', 'name', 'email'), // Pass only necessary user attributes for better security
            ],
            'posts' => $formattedPosts,
            'followersAmount' => $followersAmount, // Pass the followers amount to the frontend
            'user_portfolio' => $user_portfolio, // Ensure sensitive information is not exposed unintentionally
        ]);
    }


}
