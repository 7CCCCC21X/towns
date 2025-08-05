export default async function handler(req, res) {
  const { address = '' } = req.query;
  if (!/^0x[a-fA-F0-9]{40}$/.test(address))
    return res.status(400).json({ error: 'invalid address' });

  try {
    const upstream = `https://eligibility.towns.com/upstream-eligibility?address=${address}`;
    const r = await fetch(upstream);
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*'); // CORS for any client
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: 'upstream failed', detail: e.message });
  }
}
