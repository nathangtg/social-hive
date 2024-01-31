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
        Schema::create('user_portfolios', function (Blueprint $table) {
            $table->id('portfolio_id'); // Assuming 'post_id' is your primary key
            $table->unsignedBigInteger('user_id'); // Use unsignedBigInteger for the foreign key
            $table->text('user_description');
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_portfolios');
    }
};
