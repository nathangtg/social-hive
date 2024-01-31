<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCountryStateCityToUserPortfolios extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_portfolios', function (Blueprint $table) {
            $table->string('country')->nullable()->after('user_description'); // Adds 'country' column
            $table->string('state')->nullable()->after('country');           // Adds 'state' column
            $table->string('city')->nullable()->after('state');              // Adds 'city' column
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_portfolios', function (Blueprint $table) {
            $table->dropColumn(['country', 'state', 'city']); // Drops the columns when rolling back the migration
        });
    }
}
