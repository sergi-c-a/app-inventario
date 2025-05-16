document.getElementById('add-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    fetch('http://localhost:3000/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al añadir el elemento');
        alert('Elemento añadido correctamente');
        window.location.href = 'index.html';
    })
    .catch(err => {
        alert('Error al añadir el elemento');
        console.error(err);
    });
});