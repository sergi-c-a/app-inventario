// File: /app-inventario-frontend/app-inventario-frontend/src/app.js

let allData = [];

function renderTable(data) {
    const tableBody = document.getElementById('inventory-table-body');
    tableBody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        const fields = [
            'id', 'Estado', 'Nombre', 'Fabricante', 'Tipo', 'Rol', 'IP', 'Subnet',
            'Gateway', 'MAC', 'PROFINET', 'Firmware', 'Serial', 'Localización',
            'Responsable', 'Planta', 'Lugar'
        ];
        fields.forEach(field => {
            const td = document.createElement('td');
            td.textContent = item[field];
            td.setAttribute('data-field', field);
            row.appendChild(td);
        });

        // Add Edit and Delete buttons (same as before)
        const editTd = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.style.backgroundColor = '#4CAF50';
        editBtn.style.color = 'white';
        editBtn.style.border = 'none';
        editBtn.style.padding = '6px 12px';
        editBtn.style.cursor = 'pointer';
        editBtn.style.margin = '0';
        let editing = false;

        editBtn.addEventListener('click', () => {
            if (!editing) {
                for (let i = 1; i < row.cells.length; i++) {
                    row.cells[i].setAttribute('contenteditable', 'true');
                    row.cells[i].style.backgroundColor = '#fffbe6';
                }
                editBtn.textContent = 'Guardar';
                editBtn.style.backgroundColor = '#f39c12';
                editing = true;
            } else {
                const updatedItem = {};
                fields.forEach((field, idx) => {
                    updatedItem[field] = row.cells[idx].textContent;
                });
                fetch('http://localhost:3000/api/inventory', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedItem)
                })
                .then(res => {
                    if (!res.ok) throw new Error('Error updating data');
                    for (let i = 1; i < row.cells.length; i++) {
                        row.cells[i].setAttribute('contenteditable', 'false');
                        row.cells[i].style.backgroundColor = '';
                    }
                    editBtn.textContent = 'Editar';
                    editBtn.style.backgroundColor = '#4CAF50';
                    editing = false;
                })
                .catch(err => {
                    alert('Error al guardar los cambios');
                    console.error(err);
                });
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Borrar';
        deleteBtn.style.backgroundColor = '#e74c3c';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.padding = '6px 12px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.margin = '0';

        deleteBtn.addEventListener('click', () => {
            if (confirm('¿Seguro que quieres borrar esta fila?')) {
                fetch(`http://localhost:3000/api/inventory/${item.id}`, {
                    method: 'DELETE'
                })
                .then(res => {
                    if (!res.ok) throw new Error('Error al borrar el elemento');
                    row.remove();
                })
                .catch(err => {
                    alert('Error al borrar el elemento');
                    console.error(err);
                });
            }
        });

        const btnContainer = document.createElement('div');
        btnContainer.className = 'action-buttons';
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        editTd.appendChild(btnContainer);
        row.appendChild(editTd);
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/inventory')
        .then(response => response.json())
        .then(data => {
            allData = data;
            renderTable(allData);
        })
        .catch(error => console.error('Error fetching inventory data:', error));

    document.getElementById('search-btn').addEventListener('click', () => {
        const searchText = document.getElementById('search-box').value.trim();
        if (!searchText) {
            renderTable(allData);
            return;
        }
        const filtered = allData.filter(item =>
            Object.values(item).some(val => String(val).toLowerCase() === searchText.toLowerCase())
        );
        renderTable(filtered);
    });
});