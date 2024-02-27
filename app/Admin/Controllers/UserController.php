<?php

namespace App\Admin\Controllers;

use OpenAdmin\Admin\Controllers\AdminController;
use OpenAdmin\Admin\Form;
use OpenAdmin\Admin\Grid;
use OpenAdmin\Admin\Show;
use \App\Models\User;

class UserController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'User';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new User());

        $grid->column('id', __('Id'));
        $grid->column('name', __('Name'));
        $grid->column('email', __('Email'));
        $grid->column('email_verified_at', __('Email verified at'));
        $grid->column('password', __('Password'));
        $grid->column('profile_picture_path', __('Profile picture path'))->image();
        $grid->column('two_factor_secret', __('Two factor secret'));
        $grid->column('two_factor_recovery_codes', __('Two factor recovery codes'));
        $grid->column('two_factor_confirmed_at', __('Two factor confirmed at'));
        $grid->column('remember_token', __('Remember token'));
        $grid->column('created_at', __('Created at'));
        $grid->column('updated_at', __('Updated at'));
        $grid->column('active_status', __('Active status'));
        $grid->column('avatar', __('Avatar'));
        $grid->column('dark_mode', __('Dark mode'));
        $grid->column('messenger_color', __('Messenger color'));

        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(User::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('name', __('Name'));
        $show->field('email', __('Email'));
        $show->field('email_verified_at', __('Email verified at'));
        $show->field('password', __('Password'));
        $show->field('profile_picture_path', __('Profile picture path'));
        $show->field('two_factor_secret', __('Two factor secret'));
        $show->field('two_factor_recovery_codes', __('Two factor recovery codes'));
        $show->field('two_factor_confirmed_at', __('Two factor confirmed at'));
        $show->field('remember_token', __('Remember token'));
        $show->field('created_at', __('Created at'));
        $show->field('updated_at', __('Updated at'));
        $show->field('active_status', __('Active status'));
        $show->field('avatar', __('Avatar'));
        $show->field('dark_mode', __('Dark mode'));
        $show->field('messenger_color', __('Messenger color'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new User());

        $form->text('name', __('Name'));
        $form->email('email', __('Email'));
        $form->datetime('email_verified_at', __('Email verified at'))->default(date('Y-m-d H:i:s'));
        $form->password('password', __('Password'));
        $form->text('profile_picture_path', __('Profile picture path'));
        $form->textarea('two_factor_secret', __('Two factor secret'));
        $form->textarea('two_factor_recovery_codes', __('Two factor recovery codes'));
        $form->datetime('two_factor_confirmed_at', __('Two factor confirmed at'))->default(date('Y-m-d H:i:s'));
        $form->text('remember_token', __('Remember token'));
        $form->switch('active_status', __('Active status'));
        $form->image('avatar', __('Avatar'))->default('avatar.png');
        $form->switch('dark_mode', __('Dark mode'));
        $form->text('messenger_color', __('Messenger color'));

        return $form;
    }
}
