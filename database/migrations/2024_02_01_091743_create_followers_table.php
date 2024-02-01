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
        Schema::create('followers', function (Blueprint $table) {
            $table->id();

            // 'user_id' refers to the user who is being followed
            $table->unsignedBigInteger('user_id');

            // 'is_following_user_id' refers to the user who is following
            $table->unsignedBigInteger('is_following_user_id');

            // Timestamps for creating and updating records
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade'); // Adjust the 'onDelete' behavior as needed

            $table->foreign('is_following_user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade'); // Adjust the 'onDelete' behavior as needed

            // Optional: Unique constraint to prevent duplicate follow relationships
            $table->unique(['user_id', 'is_following_user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('followers');
    }
};
