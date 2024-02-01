<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function addDescription(Request $request): RedirectResponse
    {
        $request->validate([
            'user_description' => ['required', 'string', 'max:255'],
        ]);

        $portfolio = $request->user()->userPortfolio()->firstOrCreate([
            'user_id' => $request->user()->id
        ]);

        // Set the user_description field with the value from the request
        $portfolio->user_description = $request->input('user_description');
        $portfolio->save();

        return Redirect::route('profile.edit')->with('success', 'Description added successfully.');
    }

    public function addLocation(Request $request): RedirectResponse
    {
        Log::info('Add Location Request:', $request->all());


        $request->validate([
            'country' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
        ]);

        $portfolio = $request->user()->userPortfolio()->firstOrCreate([
            'user_id' => $request->user()->id
        ]);

        // Set the country, state, and city fields with the values from the request
        $portfolio->country = $request->input('country');
        $portfolio->state = $request->input('state');
        $portfolio->city = $request->input('city');
        $portfolio->save();

        return Redirect::route('profile.edit')->with('success', 'Location added successfully.');
    }

    // public function addProfilePicture(Request $request): RedirectResponse
    // {

    //     Log::info('Add Profile Picture Request:', $request->all());
    //     $request->validate([
    //         'profile_picture_path' => ['required', 'image', 'max:1024'],
    //     ]);

    //     $portfolio = $request->user()->userPortfolio()->firstOrCreate([
    //         'user_id' => $request->user()->id
    //     ]);

    //     // Store the profile picture and get the path
    //     $path = $request->file('profile_picture_path')->store('public/images', 'public');

    //     // Update the path to be consistent with the store method
    //     $path = 'storage/' . $path;

    //     // Set the profile_picture_path field with the modified path
    //     $portfolio->profile_picture_path = $path;
    //     $portfolio->save();

    //     return Redirect::route('profile.edit')->with('success', 'Profile picture added successfully.');
    // }


    public function index (Request $request)
    {
        $portfolio = $request->user()->portfolio()->first();

        return Inertia::render('profile');
    }
}
