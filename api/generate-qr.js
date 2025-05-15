const QRCode = require("qrcode");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { ssid, password } = req.body;
  if (!ssid || !password) {
    res.status(400).json({ error: "SSID and password required" });
    return;
  }

  const wifiData = `WIFI:T:WPA;S:${ssid};P:${password};;`;

  try {
    const qr = await QRCode.toDataURL(wifiData);
    res.status(200).json({ qr });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};
