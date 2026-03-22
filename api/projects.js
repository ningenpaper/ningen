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
    const dbId = process.env.NOTION_PROJECTS_DB_ID;
    const response = await notion.databases.query({ database_id: dbId });

    const projects = await Promise.all(
      response.results.map(async (page) => {
        const props = page.properties;
        const images = await getImagesFromPage(page.id);

        return {
          id: page.id,
          category: getPropertyValue(props["Category"]),
          title: getPropertyValue(props["Title"]),
          date: getPropertyValue(props["Date"]),
          place: getPropertyValue(props["Place"]),
          image: images.main[0] || null,
        };
      })
    );

    res.setHeader(
      "Cache-Control",
      "s-maxage=600, stale-while-revalidate=1200"
    );
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
};
