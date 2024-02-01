<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_portfolios', function (Blueprint $table) {
            // Adding a 'profile_picture_path' column as a string.
            // You can adjust the length (255) based on your requirements.
            $table->string('profile_picture_path', 255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_portfolios', function (Blueprint $table) {
            // Drop the 'profile_picture_path' column if this migration is rolled back.
            $table->dropColumn('profile_picture_path');
        });
    }
};

