<?php

namespace App\Admin\Controllers;

use OpenAdmin\Admin\Controllers\AdminController;
use OpenAdmin\Admin\Form;
use OpenAdmin\Admin\Grid;
use OpenAdmin\Admin\Show;
use \App\Models\ChMessage;

class ChMessageController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'ChMessage';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new ChMessage());

        $grid->column('id', __('Id'));
        $grid->column('from_id', __('From id'));
        $grid->column('to_id', __('To id'));
        $grid->column('body', __('Body'));
        $grid->column('attachment', __('Attachment'));
        $grid->column('seen', __('Seen'));
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
        $show = new Show(ChMessage::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('from_id', __('From id'));
        $show->field('to_id', __('To id'));
        $show->field('body', __('Body'));
        $show->field('attachment', __('Attachment'));
        $show->field('seen', __('Seen'));
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
        $form = new Form(new ChMessage());

        $form->number('from_id', __('From id'));
        $form->number('to_id', __('To id'));
        $form->text('body', __('Body'));
        $form->file('attachment', __('Attachment'));
        $form->switch('seen', __('Seen'));

        return $form;
    }
}
