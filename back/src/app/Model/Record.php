<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Record extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'description'
    ];
}
