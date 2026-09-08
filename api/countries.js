export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const query = typeof request.query.q === "string" ? request.query.q.trim() : "";
  const limit = typeof request.query.limit === "string" ? request.query.limit : "5";
  const apiKey = process.env.REST_COUNTRIES_API_KEY;

  if (!query) {
    return response.status(400).json({ error: "Thiếu từ khóa tìm kiếm." });
  }

  if (!apiKey) {
    return response.status(500).json({
      error: "Vercel chưa cấu hình REST_COUNTRIES_API_KEY."
    });
  }

  try {
    const upstreamUrl = new URL("https://api.restcountries.com/countries/v5");
    upstreamUrl.searchParams.set("q", query);
    upstreamUrl.searchParams.set("limit", limit);

    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json"
      }
    });
    const body = await upstreamResponse.text();

    response.setHeader("Content-Type", "application/json");
    return response.status(upstreamResponse.status).send(body);
  } catch (error) {
    return response.status(502).json({
      error: "Không thể kết nối đến REST Countries API."
    });
  }
}
