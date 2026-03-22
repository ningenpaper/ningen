const {
  notion,
  getPropertyValue,
  getImagesFromPage,
} = require("./_lib/notion");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const dbId = process.env.NOTION_PDF_LIBRARY_DB_ID;
    const response = await notion.databases.query({ database_id: dbId });

    const books = await Promise.all(
      response.results.map(async (page) => {
        const props = page.properties;
        const images = await getImagesFromPage(page.id);

        return {
          id: page.id,
          author: getPropertyValue(props["Author"]),
          title: getPropertyValue(props["Title"]),
          pdf: getPropertyValue(props["PDF"]),
          image: images.main[0] || null,
        };
      })
    );

    res.setHeader(
      "Cache-Control",
      "s-maxage=600, stale-while-revalidate=1200"
    );
    return res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching library:", error);
    return res.status(500).json({ error: "Failed to fetch library" });
  }
};
