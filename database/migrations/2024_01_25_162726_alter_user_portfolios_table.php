<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('user_portfolios', function (Blueprint $table) {
            $table->text('user_description')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('user_portfolios', function (Blueprint $table) {
            $table->text('user_description')->nullable(false)->change();
        });
    }
};
