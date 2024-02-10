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
        $posts = Post::with('likes', 'user')->where('user_id', $user->id)->get();
        $portfolio = UserPortfolio::where('user_id', $user->id)->first();
        $followersAmount = $user->followers()->count();
        $authUserId = auth()->id(); // Get the authenticated user's ID for later checks

        $formattedPosts = $posts->map(function ($post) use ($authUserId) {
            $likeCount = $post->likes->count(); // Count likes for the post
            // Check if the authenticated user has liked the post
            $isLikedByCurrentUser = $post->likes->contains(function ($like) use ($authUserId) {
                return $like->user_id === $authUserId;
            });

            return [
                'post_id' => $post->post_id,
                'user_id' => $post->user_id,
                'image' => asset($post->image),
                'captions' => $post->captions,
                'user_name' => $post->user->name,
                'created_at' => $post->created_at->toDateTimeString(),
                'updated_at' => $post->updated_at->toDateTimeString(),
                'likeCount' => $likeCount, // Include the like count
                'isLikedByCurrentUser' => $isLikedByCurrentUser, // Include the like status for the authenticated user
            ];
        });

        // Check if the authenticated user is following the profile user
        $isFollowing = false;
        if ($authUserId) {
            $isFollowing = auth()->user()->following()->where('user_id', $user->id)->exists();
        }

        return Inertia::render('ProfilePage', [
            'profileUser' => $user,
            'posts' => $formattedPosts,
            'user_portfolio' => $portfolio,
            'followersAmount' => $followersAmount,
            'followStatus' => $isFollowing,
        ]);
    }

}

