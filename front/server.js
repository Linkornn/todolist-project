const express = require('express');

const app = express();

app.use(express.static("public"));

const PORT = 9999;
app.listen(PORT, () => {
  console.log(`Frontend Server ready at http://localhost:${PORT}`);
});