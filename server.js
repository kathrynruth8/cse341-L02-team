const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./backend/db/connect');
const professionalRoutes = require('./backend/routes/professionalRoutes');
const PORT = process.env.PORT || 8080;
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const cors = require('cors');
//contacts
const contactsRoutes = require('./backend/routes/contacts');

// Use routes
app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow frontend access
    next();
  })
  .use('/contacts', contactsRoutes)
  .use(express.json());

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
