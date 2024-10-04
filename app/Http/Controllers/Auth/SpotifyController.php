<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use App\Models\User;

class SpotifyController extends Controller
{
    public function redirectToProvider()
    {
        return Socialite::driver('spotify')
            ->scopes(['user-read-email', 'user-read-private'])
            ->redirect();
    }

    public function handleProviderCallback(Request $request)
    {
        try {
            $spotifyUser = Socialite::driver('spotify')->user();
            
            $user = User::updateOrCreate(
                ['spotify_id' => $spotifyUser->id],
                [
                    'name' => $spotifyUser->name,
                    'email' => $spotifyUser->email,
                    'spotify_token' => $spotifyUser->token,
                    'spotify_refresh_token' => $spotifyUser->refreshToken,
                ]
            );

            // You might want to create a JWT token here if needed
            
            return response()->json([
                'user' => $user,
                'access_token' => $spotifyUser->token,
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Authentication failed'], 401);
        }
    }
}