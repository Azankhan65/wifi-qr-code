const express = require("express");
const path = require("path");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to generate QR code
app.post("/generate-qr", async (req, res) => {
  const { ssid, password } = req.body;
  const wifiData = `WIFI:T:WPA;S:${ssid};P:${password};;`;

  try {
    const qr = await QRCode.toDataURL(wifiData);
    res.json({ qr });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

// Serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
