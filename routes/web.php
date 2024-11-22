<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\VideoChatController;

Route::get('/', [VideoChatController::class, 'index']);

