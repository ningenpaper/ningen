const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function getPlainText(richTextArray) {
  if (!richTextArray || !Array.isArray(richTextArray)) return "";
  return richTextArray.map((t) => t.plain_text).join("");
}

function getTitle(titleArray) {
  return getPlainText(titleArray);
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getPropertyValue(property) {
  if (!property) return "";
  switch (property.type) {
    case "title":
      return getTitle(property.title);
    case "rich_text":
      return getPlainText(property.rich_text);
    case "number":
      return property.number;
    case "select":
      return property.select?.name || "";
    case "multi_select":
      return property.multi_select?.map((s) => s.name).join(", ") || "";
    case "url":
      return property.url || "";
    case "date":
      return property.date?.start || "";
    case "files":
      return (
        property.files?.[0]?.file?.url ||
        property.files?.[0]?.external?.url ||
        ""
      );
    case "checkbox":
      return property.checkbox || false;
    default:
      return "";
  }
}

async function getImagesFromPage(pageId) {
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  const sections = { main: [], detail: [] };
  let currentSection = null;

  for (const block of blocks.results) {
    if (block.type === "heading_2") {
      const text = getPlainText(block.heading_2.rich_text)
        .trim().toUpperCase().replace(/^#+\s*/, "");
      if (text === "MAIN") {
        currentSection = "main";
        continue;
      } else if (text === "DETAIL") {
        currentSection = "detail";
        continue;
      } else {
        currentSection = null;
      }
    }

    if (block.type === "paragraph") {
      const text = getPlainText(block.paragraph.rich_text)
        .trim().toUpperCase().replace(/^#+\s*/, "");
      if (text === "MAIN") {
        currentSection = "main";
        continue;
      } else if (text === "DETAIL") {
        currentSection = "detail";
        continue;
      }
    }

    if (currentSection && block.type === "image") {
      const url =
        block.image.type === "file"
          ? block.image.file.url
          : block.image.external.url;
      sections[currentSection].push(url);
    }
  }

  return sections;
}

module.exports = {
  notion,
  getPlainText,
  getTitle,
  slugify,
  getPropertyValue,
  getImagesFromPage,
};
