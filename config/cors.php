<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, 
];

use Laravel\Socialite\Facades\Socialite;

Route::get('/auth/spotify', function () {
    return Socialite::driver('spotify')
        ->scopes(['user-read-email', 'user-read-private'])
        ->redirect();
});

Route::get('/auth/spotify/callback', function () {
    try {
        $user = Socialite::driver('spotify')->user();
        // Handle the user data here
        return response()->json([
            'user' => $user,
            'token' => $user->token,
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});
