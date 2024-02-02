<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameIsFollowingUserIdToFollowedByIdOnFollowsTable extends Migration
{
    public function up()
    {
        Schema::table('followers', function (Blueprint $table) {
            $table->renameColumn('is_following_user_id', 'followed_by_id');
        });
    }

    public function down()
    {
        Schema::table('followers', function (Blueprint $table) {
            $table->renameColumn('followed_by_id', 'is_following_user_id');
        });
    }
}
