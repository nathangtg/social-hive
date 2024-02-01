<?php

use App\Http\Controllers\BrowseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilePageController;
use App\Http\Controllers\UserRelationshipController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// ! AUTHENTICATION ROUTES
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// ! DASHBOARD ROUTING
Route::get('/dashboard', [DashboardController::class, 'showDashboard'])
     ->middleware(['auth', 'verified'])
     ->name('dashboard');

// ! PROFILE ROUTING
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/portfolio/addDescription', [PortfolioController::class, 'addDescription'])->name('portfolio.addDescription');
    Route::post('/portfolio/addLocation', [PortfolioController::class, 'addLocation'])->name('portfolio.addLocation');
    Route::post('/profile/addProfilePicture', [ProfileController::class, 'addProfilePicture'])->name('profile.addProfilePicture');
    Route::post('/user/follow/{userId}', [UserRelationshipController::class, 'follow'])->name('user.follow');
    Route::post('/user/unfollow/{userId}', [UserRelationshipController::class, 'unfollow'])->name('user.unfollow');
});

// ! BROWSE ROUTING
Route::get('/browse', [BrowseController::class, 'index'])->name('Browse');
Route::get('/browse/{id}', [BrowseController::class, 'show'])->name('Browse.show');

// ! CREATE POST ROUTING
Route::get('/create', [PostController::class, 'create'])->name('create');
Route::post('/create', [PostController::class, 'store'])->name('posts');

// ! USER PROFILE ROUTIING
// Route::get('/user/{id}', [ProfileController::class, 'show'])->name('user.show');
Route::get('/profile_page/{email}', [ProfilePageController::class, 'showProfile'] )->name('profile_page.showProfile');


require __DIR__.'/auth.php';
