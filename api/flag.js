export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const sourceUrl = typeof request.query.url === "string" ? request.query.url : "";
  let parsedUrl;

  try {
    parsedUrl = new URL(sourceUrl);
  } catch {
    return response.status(400).json({ error: "URL ảnh không hợp lệ." });
  }

  if (parsedUrl.hostname !== "flags.restcountries.com") {
    return response.status(403).json({ error: "Nguồn ảnh không được phép." });
  }

  try {
    const upstreamResponse = await fetch(parsedUrl);
    if (!upstreamResponse.ok) {
      return response.status(upstreamResponse.status).json({ error: "Không thể tải ảnh cờ." });
    }

    const image = Buffer.from(await upstreamResponse.arrayBuffer());
    response.setHeader("Content-Type", upstreamResponse.headers.get("content-type") || "image/png");
    response.setHeader("Cache-Control", "public, max-age=86400");
    return response.status(200).send(image);
  } catch {
    return response.status(502).json({ error: "Không thể kết nối đến nguồn ảnh cờ." });
  }
}
