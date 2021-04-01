const btnLike = document.getElementById('btn-like');
const btnDelete = document.getElementById('btn-delete');
const btnToggleComment = document.getElementById('btn-toggle-comment');
const postComment = document.getElementById('post-comment');

btnLike.addEventListener('click', async (e) => {
    e.preventDefault();
    const imgId = btnLike.dataset.id;
    const data = await fetch(`/images/${imgId}/like`, { method: 'POST' });
    const res = await data.json();
    if (res.likes) {
        const count = document.querySelector('.likes-count');
        count.innerHTML = `<i class="fas fa-heart"></i> ${res.likes}`;
    }
});

btnDelete.addEventListener('click', async (e) => {
    e.preventDefault();
    const response = confirm('¿Está seguro que desea eliminar esta imagen?');
    if (response) {
        const imgId = btnDelete.dataset.id;
        const data = await fetch(`/images/${imgId}`, { method: 'DELETE'});
        const res = await data.json();
        if (res === true) {
            window.location.href = "/";
        } else {
            alert('No se ha podido eliminar esta imagen');
        }
    }
});

btnToggleComment.addEventListener('click', (e) => {
    e.preventDefault();
    if (postComment.style.display === 'none') {
        postComment.style.display = 'block';
        btnToggleComment.classList.replace('fa-plus', 'fa-minus');
    } else {
        postComment.style.display = 'none';
        btnToggleComment.classList.replace('fa-minus', 'fa-plus');
    }
});