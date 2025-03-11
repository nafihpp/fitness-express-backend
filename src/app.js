const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accountRoutes');
const { handleValidationErrors } = require('./middlewares/validationMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(handleValidationErrors);

// Routes
app.use('/api', accountRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
