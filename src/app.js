const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Backend is running successfully!",
        status: "Healthy",
        timestamp: new Date()
    });
});

// Start server only if not being required by tests
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app; // Export for testing