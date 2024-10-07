<?php

use App\Http\Controllers\SpotifyController;
use Illuminate\Support\Facades\Route;

// Test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// Spotify routes
Route::prefix('spotify')->group(function () {
    Route::get('/login', [SpotifyController::class, 'login'])->name('spotify.login');
    Route::get('/callback', [SpotifyController::class, 'callback'])->name('spotify.callback');
    
    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/profile', [SpotifyController::class, 'profile']);
        Route::get('/top-tracks', [SpotifyController::class, 'topTracks']);
        Route::get('/recently-played', [SpotifyController::class, 'recentlyPlayed']);
        Route::get('/top-artists', [SpotifyController::class, 'topArtists']);
        Route::get('/playlists', [SpotifyController::class, 'playlists']);
    });
});