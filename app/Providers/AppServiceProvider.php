<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use SocialiteProviders\Spotify\Provider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Socialite::extend('spotify', function ($app) {
        $config = $app['config']['services.spotify'];
        return \Socialite::buildProvider(Provider::class, $config);
    });
    }
}
