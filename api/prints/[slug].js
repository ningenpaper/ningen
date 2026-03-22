const {
  notion,
  slugify,
  getPropertyValue,
  getImagesFromPage,
} = require("../_lib/notion");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug } = req.query;

  try {
    const dbId = process.env.NOTION_PRINTS_DB_ID;
    const response = await notion.databases.query({ database_id: dbId });

    const page = response.results.find((p) => {
      const name = getPropertyValue(p.properties["Product Name"]);
      return slugify(name) === slug;
    });

    if (!page) {
      return res.status(404).json({ error: "Product not found" });
    }

    const props = page.properties;
    const name = getPropertyValue(props["Product Name"]);
    const images = await getImagesFromPage(page.id);

    const product = {
      id: page.id,
      slug: slugify(name),
      name,
      price: getPropertyValue(props["Price"]) || 0,
      soldOut: getPropertyValue(props["Sold Out"]) || false,
      language: getPropertyValue(props["Language(s)"]),
      year: getPropertyValue(props["Year"]),
      author: getPropertyValue(props["Author"]),
      designer: getPropertyValue(props["Designer"]),
      size: getPropertyValue(props["Size"]),
      pages: getPropertyValue(props["Pages"]),
      description: getPropertyValue(props["Description"]),
      mainImage: images.main[0] || null,
      detailImages: images.detail,
    };

    res.setHeader(
      "Cache-Control",
      "s-maxage=300, stale-while-revalidate=600"
    );
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: "Failed to fetch product" });
  }
};
