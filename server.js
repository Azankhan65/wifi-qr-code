const express = require("express");
const QRCode = require("qrcode");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files (like HTML, CSS, and JS)
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming data (JSON)
app.use(express.json());

// Route to generate Wi-Fi QR Code
app.post("/generate-qr", (req, res) => {
  const { ssid, password } = req.body;

  // Validate inputs
  if (!ssid || !password) {
    return res.status(400).send({ error: "SSID and password are required!" });
  }

  // Format Wi-Fi data as QR code string
  const qrData = `WIFI:T:WPA;S:${ssid};P:${password};;`;

  // Generate QR code
  QRCode.toDataURL(qrData, (err, qrCodeUrl) => {
    if (err) {
      return res.status(500).send({ error: "Failed to generate QR code" });
    }
    // Send the generated QR code as the response
    res.send({ qrCodeUrl });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
