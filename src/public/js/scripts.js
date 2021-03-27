const btnLike = document.getElementById('btn-like')

btnLike.addEventListener('click', async e => {
    e.preventDefault()
    const imgId = btnLike.dataset.id;
    const data = await fetch(`/images/${imgId}/like`, { method: 'POST'})
    const res = await data.json()
    if (res.likes) {
        const count = document.querySelector('.likes-count')
        count.innerHTML = `<i class="fas fa-heart"></i> ${res.likes}`
    }
})