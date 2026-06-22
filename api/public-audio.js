const { notion, getPropertyValue, getImagesFromPage, slugify } = require("./_lib/notion");

function getFirstValue(properties, names) {
  for (const name of names) {
    const value = getPropertyValue(properties[name]);
    if (value !== "" && value !== null && value !== undefined) {
      return value;
    }
  }
  return "";
}

function getBlockText(block) {
  if (!block || !block.type) return "";
  const value = block[block.type];
  if (!value || !Array.isArray(value.rich_text)) return "";
  return value.rich_text.map((item) => item.plain_text).join("").trim();
}

async function getPageText(pageId) {
  if (!pageId) return "";
  const lines = [];
  let cursor;
  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
      start_cursor: cursor,
    });
    for (const block of response.results) {
      if (
        ["paragraph", "heading_1", "heading_2", "heading_3", "quote", "callout"].includes(
          block.type,
        )
      ) {
        const text = getBlockText(block);
        if (text) lines.push(text);
      }
    }
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);
  return lines.join("\n\n").trim();
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const mentionPageId =
      process.env.NOTION_PUBLIC_AUDIO_MENTION_PAGE_ID || "38638fc91f6e802f82cece5a02eb600b";
    const dbId =
      process.env.NOTION_PUBLIC_AUDIO_DB_ID || "38638fc91f6e8057a54edbe8953673b1";

    if (!dbId) {
      return res.status(500).json({ error: "NOTION_PUBLIC_AUDIO_DB_ID is not set" });
    }

    const [intro, response] = await Promise.all([
      getPageText(mentionPageId),
      notion.databases.query({
        database_id: dbId,
        sorts: [{ property: "Date", direction: "descending" }],
      }),
    ]);

    const audioItems = response.results.map((page) => {
      const props = page.properties;
      const title = getFirstValue(props, ["Title"]);
      const artist = getFirstValue(props, ["Artist"]);
      const city = getFirstValue(props, ["City"]);
      const date = getFirstValue(props, ["Date"]);
      const playEnabled = getPropertyValue(props["Play"]) === true;
      const playFileName = getFirstValue(props, ["Play File Name"]);
      const audioUrl = playEnabled && playFileName ? `/audio/${playFileName}` : "";
      const cdLink = getFirstValue(props, ["CD Link"]);
      const fallbackTitle = title || artist || city || date || page.id;

      return {
        id: page.id,
        slug: slugify(fallbackTitle),
        title,
        artist,
        city,
        date,
        audioUrl,
        cdLink,
      };
    });

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1200");
    return res.status(200).json({ intro, items: audioItems });
  } catch (error) {
    console.error("Error fetching public audio:", error);
    return res.status(500).json({ error: "Failed to fetch public audio" });
  }
};
