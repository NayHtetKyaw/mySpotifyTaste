<?php

use App\Http\Controllers\Auth\SpotifyController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::get('/auth/spotify', [SpotifyController::class, 'redirectToProvider']);
    Route::get('/auth/spotify/callback', [SpotifyController::class, 'handleProviderCallback']);
});

// Add a route to check authentication status
Route::get('/api/auth/session', function () {
    return response()->json([
        'user' => auth()->user(),
        'authenticated' => auth()->check()
    ]);
});
