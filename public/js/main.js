$(document).ready(() => {
    $('.delete-blog').on('click', (e) => {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/blogs/' + id,
            success: (success) => {
                alert('Deleting blog');
                window.location.href = '/blogs';
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
});
