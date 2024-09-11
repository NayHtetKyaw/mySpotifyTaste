<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', config('app.name', 'Laravel'))</title>

    <!-- Fonts -->
    <!-- Vite -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="font-sans antialiased">
    <x-main with-nav full-width>
            {{-- User --}}
            @auth
                <x-list-item :item="auth()->user()" value="name" sub-value="email" no-separator no-hover class="pt-2">
                    <x-slot:actions>
                        <x-button icon="o-power" class="btn-circle btn-ghost btn-xs" tooltip-left="logoff" no-wire-navigate
                            onclick="event.preventDefault(); document.getElementById('logout-form').submit();" />
                    </x-slot:actions>
                </x-list-item>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>

                <x-menu-separator />
            @endauth


        {{-- The main content area --}}
        <x-slot:content>
            @yield('content')
        </x-slot:content>
    </x-main>

</body>
</html>