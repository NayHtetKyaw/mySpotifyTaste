<?php

use App\Http\Controllers\SpotifyController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::get('/test', fn() => response()->json(['message' => 'API is working!']));
 
});
