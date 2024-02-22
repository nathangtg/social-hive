<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     *
     */

     public function update(ProfileUpdateRequest $request): RedirectResponse
     {
         $request->user()->fill($request->validated());

         if ($request->user()->isDirty('email')) {
             $request->user()->email_verified_at = null;
         }

         $request->user()->save();

         return Redirect::route('profile.edit');
     }

     public function addProfilePicture(Request $request): RedirectResponse
     {

         Log::info('Add Profile Picture Request:', $request->all());
         $request->validate([
             'profile_picture_path' => ['required', 'image', 'max:1024'],
         ]);

         $portfolio = $request->user()->userPortfolio()->firstOrCreate([
             'user_id' => $request->user()->id
         ]);

         $user = $request->user();

         // Store the profile picture and get the path
         $path = $request->file('profile_picture_path')->store('public/images', 'public');

         // Update the path to be consistent with the store method
         $path = 'storage/' . $path;

         // Set the profile_picture_path field with the modified path
         $user->profile_picture_path = $path;
         $user->save();

         return Redirect::route('profile.edit')->with('success', 'Profile picture added successfully.');
     }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

}
