<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Configuration
    |--------------------------------------------------------------------------
    |
    | define the CORS settings for the application here. Adjust the
    | settings as needed for the specific use case.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'], // Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    'allowed_origins' => ['http://localhost:3000'], // Allows all origins (you can specify particular domains)
    'allowed_origins_patterns' => [], // Define patterns if needed for allowed origins
    'allowed_headers' => ['*'], // Allows all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,

];
