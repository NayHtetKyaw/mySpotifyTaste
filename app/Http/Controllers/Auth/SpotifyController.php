<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SpotifyController extends Controller
{
    public function redirectToProvider()
    {
        return Socialite::driver('spotify')->redirect();
    }

    public function handleProviderCallback()
    {
        $user = Socialite::driver('spotify')->user();
        // Logic to save user details and create a session
    }
}
