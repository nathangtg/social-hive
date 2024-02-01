<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class UserRelationshipController extends Controller
{
    /**
     * Follow a user.
     *
     * @param  Request $request
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     * @var \App\Models\User $user **/

    public function follow(Request $request, $userId, User $user)
    {
        $userToFollow = User::find($userId);
        if (!$userToFollow) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $currentUser = Auth::user();
        if ($currentUser->id === $userToFollow->id) {
            return response()->json(['message' => 'Cannot follow yourself'], 400);
        }

        $currentUser->following()->syncWithoutDetaching([$userToFollow->id]);
        return response()->json(['message' => 'Successfully followed the user']);
    }

    public function unfollow(Request $request, $userId)
    {
        $currentUser = Auth::user();
        $currentUser->following()->detach($userId);

        return response()->json(['message' => 'Successfully unfollowed the user']);
    }
}
