const {
  notion,
  slugify,
  getPropertyValue,
  getImagesFromPage,
} = require("./_lib/notion");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const dbId = process.env.NOTION_PRINTS_DB_ID;
    const response = await notion.databases.query({ database_id: dbId });

    const products = await Promise.all(
      response.results.map(async (page) => {
        const props = page.properties;
        const name = getPropertyValue(props["Product Name"]);
        const slug = slugify(name);

        const images = await getImagesFromPage(page.id);

        return {
          id: page.id,
          slug,
          name,
          price: getPropertyValue(props["Price"]) || 0,
          language: getPropertyValue(props["Language(s)"]),
          year: getPropertyValue(props["Year"]),
          author: getPropertyValue(props["Author"]),
          designer: getPropertyValue(props["Designer"]),
          size: getPropertyValue(props["Size"]),
          pages: getPropertyValue(props["Pages"]),
          description: getPropertyValue(props["Description"]),
          mainImage: images.main[0] || null,
        };
      })
    );

    res.setHeader(
      "Cache-Control",
      "s-maxage=600, stale-while-revalidate=1200"
    );
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching prints:", error);
    return res.status(500).json({ error: "Failed to fetch prints" });
  }
};
