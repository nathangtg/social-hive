<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Followers extends Model
{
    use HasFactory;

    protected $table = 'followers';

    // Specify the fields that are mass assignable
    protected $fillable = ['user_id', 'is_following_user_id'];

    // Indicate if the IDs are auto-incrementing
    public $incrementing = true;
}
