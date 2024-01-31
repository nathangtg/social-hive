<?php

namespace App\Admin\Controllers;

use OpenAdmin\Admin\Controllers\AdminController;
use OpenAdmin\Admin\Form;
use OpenAdmin\Admin\Grid;
use OpenAdmin\Admin\Show;
use \App\Models\UserPortfolio;

class UserPortfolioController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'UserPortfolio';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new UserPortfolio());

        $grid->column('portfolio_id', __('Portfolio id'));
        $grid->column('user_id', __('User id'));
        $grid->column('user_description', __('User description'));
        $grid->column('country', __('Country'));
        $grid->column('state', __('State'));
        $grid->column('city', __('City'));
        $grid->column('created_at', __('Created at'));
        $grid->column('updated_at', __('Updated at'));

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
        $show = new Show(UserPortfolio::findOrFail($id));

        $show->field('portfolio_id', __('Portfolio id'));
        $show->field('user_id', __('User id'));
        $show->field('user_description', __('User description'));
        $show->field('country', __('Country'));
        $show->field('state', __('State'));
        $show->field('city', __('City'));
        $show->field('created_at', __('Created at'));
        $show->field('updated_at', __('Updated at'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new UserPortfolio());

        $form->number('user_id', __('User id'));
        $form->textarea('user_description', __('User description'));
        $form->text('country', __('Country'));
        $form->text('state', __('State'));
        $form->text('city', __('City'));

        return $form;
    }
}
