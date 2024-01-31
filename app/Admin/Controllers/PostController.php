<?php

namespace App\Admin\Controllers;

use OpenAdmin\Admin\Controllers\AdminController;
use OpenAdmin\Admin\Form;
use OpenAdmin\Admin\Grid;
use OpenAdmin\Admin\Show;
use \App\Models\Post;

class PostController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Post';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Post());

        $grid->column('post_id', __('Post id'));
        $grid->column('user_id', __('User id'));
        $grid->column('image', __('Image'));
        $grid->column('captions', __('Captions'));
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
        $show = new Show(Post::findOrFail($id));

        $show->field('post_id', __('Post id'));
        $show->field('user_id', __('User id'));
        $show->field('image', __('Image'));
        $show->field('captions', __('Captions'));
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
        $form = new Form(new Post());

        $form->number('post_id', __('Post id'));
        $form->number('user_id', __('User id'));
        $form->image('image', __('Image'))->move('storage/public/images');
        $form->textarea('captions', __('Captions'));

        return $form;
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        admin_toastr(__('Post deleted successfully'));

        return redirect()->route('admin.posts.index');
    }
}
