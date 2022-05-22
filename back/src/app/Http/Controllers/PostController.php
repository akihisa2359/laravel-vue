<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function create(Request $request)
    {
        Validator::make($request->all(), [
            'title' => ['required', 'max:50'],
            'description' => ['required', 'max:140']
        ])->validate();

        // loginユーザー取得処理
    }
}