const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const professionalRoutes = require('./routes/professionalRoutes');
const PORT = process.env.PORT || 8080;
//contacts
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow frontend access
  next();
});

// Use routes
app.use(professionalRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Initialize DB and then start server
mongodb.initDb((err, db) => {
  if (err) {
    console.log('DB connection failed:', err);
    process.exit(1); // Stop the app if DB init fails
  } else {
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening on http://localhost:${PORT}`);
    });
  }
});
