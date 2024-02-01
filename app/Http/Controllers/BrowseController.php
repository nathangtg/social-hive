<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\UserPortfolio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrowseController extends Controller
{
    public function index(){

        $users = User::all();
        $posts = Post::all();
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

        return Inertia::render('Browse', compact('users', 'formattedPosts'));
    }
}
