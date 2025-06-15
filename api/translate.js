// /api/translate.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { text, target_lang } = req.body;

  if (!text || !target_lang) {
    return res.status(400).json({ message: "Missing parameters" });
  }

  const response = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      auth_key: process.env.DEEPL_API_KEY,
      text: text,
      target_lang: target_lang.toUpperCase(),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(500).json({ message: "DeepL error", details: errorText });
  }

  const data = await response.json();
  return res.status(200).json(data);
}
