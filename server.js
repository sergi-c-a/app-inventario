const express = require('express');
const cors = require('cors');
const reader = require('xlsx');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Get inventory
app.get('/api/inventory', (req, res) => {
    try {
        const file = reader.readFile('./inventario.xlsx');
        const ws = file.Sheets["elementos"];
        const data = reader.utils.sheet_to_json(ws);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error reading Excel file' });
    }
});

// Update inventory row
app.put('/api/inventory', (req, res) => {
    try {
        const updatedItem = req.body;
        const file = reader.readFile('./inventario.xlsx');
        const ws = file.Sheets["elementos"];
        let data = reader.utils.sheet_to_json(ws);

        // Find the row by id and update it
        const idx = data.findIndex(row => String(row.id) === String(updatedItem.id));
        if (idx === -1) {
            return res.status(404).json({ error: 'Item not found' });
        }
        data[idx] = updatedItem;

        // Write back to Excel
        const newWs = reader.utils.json_to_sheet(data);
        file.Sheets["elementos"] = newWs;
        reader.writeFile(file, './inventario.xlsx');

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error updating Excel file' });
    }
});

// Add new inventory row
app.post('/api/inventory', (req, res) => {
    try {
        const newItem = req.body;
        const file = reader.readFile('./inventario.xlsx');
        const ws = file.Sheets["elementos"];
        let data = reader.utils.sheet_to_json(ws);

        // Optionally check for duplicate ID
        if (data.some(row => String(row.id) === String(newItem.id))) {
            return res.status(400).json({ error: 'ID ya existe' });
        }

        data.push(newItem);

        const newWs = reader.utils.json_to_sheet(data);
        file.Sheets["elementos"] = newWs;
        reader.writeFile(file, './inventario.xlsx');

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error añadiendo elemento' });
    }
});

// Delete inventory row
app.delete('/api/inventory/:id', (req, res) => {
    try {
        const id = req.params.id;
        const file = reader.readFile('./inventario.xlsx');
        const ws = file.Sheets["elementos"];
        let data = reader.utils.sheet_to_json(ws);

        const idx = data.findIndex(row => String(row.id) === String(id));
        if (idx === -1) {
            return res.status(404).json({ error: 'Elemento no encontrado' });
        }

        data.splice(idx, 1);

        const newWs = reader.utils.json_to_sheet(data);
        file.Sheets["elementos"] = newWs;
        reader.writeFile(file, './inventario.xlsx');

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error borrando elemento' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});