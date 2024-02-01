<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class UserPortfolio extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'portfolio_id';


    protected $fillable = [
        'user_id',
        'user_description',
        'country',
        'state',
        'city',
        'profile_picture_path'
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }
}
