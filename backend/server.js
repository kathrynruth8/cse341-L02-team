const express = require('express');
const app = express();
const professionalRoutes = require('./routes/professionalRoutes');
const PORT = 8080;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow frontend access
  next();
});

// Use routes
app.use(professionalRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
