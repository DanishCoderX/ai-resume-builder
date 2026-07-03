const express = require('express');
const cors = require('cors');
require('dotenv').config();

const aiRoutes = require('./routes/ai');
const pdfRoutes = require('./routes/pdf');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/ai', aiRoutes);
app.use('/api/pdf', pdfRoutes);

app.get('/', (req, res) => res.json({ message: 'AI Resume Builder API running ✓' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));