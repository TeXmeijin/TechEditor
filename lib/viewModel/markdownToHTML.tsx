import { convertToRaw, convertFromRaw } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import { BLOCK_TYPE, ENTITY_TYPE } from 'draftail'

const exporterConfig = {
  blockToHTML: (block) => {
    if (block.type === BLOCK_TYPE.BLOCKQUOTE) {
      return <blockquote />;
    }

    // Discard atomic blocks, as they get converted based on their entity.
    if (block.type === BLOCK_TYPE.ATOMIC) {
      return {
        start: "",
        end: "",
      };
    }

    return null;
  },

  entityToHTML: (entity, originalText) => {
    if (entity.type === ENTITY_TYPE.LINK) {
      return <a href={entity.data.url}>{originalText}</a>;
    }

    if (entity.type === ENTITY_TYPE.IMAGE) {
      return <img src={entity.data.src} alt={entity.data.alt} />;
    }

    if (entity.type === ENTITY_TYPE.HORIZONTAL_RULE) {
      return <hr />;
    }

    return originalText;
  },
};
const importerConfig = {
  htmlToEntity: (nodeName, node, createEntity) => {
    // a tags will become LINK entities, marked as mutable, with only the URL as data.
    if (nodeName === "a") {
      return createEntity(ENTITY_TYPE.LINK, "MUTABLE", { url: node.href });
    }

    if (nodeName === "img") {
      return createEntity(ENTITY_TYPE.IMAGE, "IMMUTABLE", {
        src: node.src,
      });
    }

    if (nodeName === "hr") {
      return createEntity(ENTITY_TYPE.HORIZONTAL_RULE, "IMMUTABLE", {});
    }

    return null;
  },
  htmlToBlock: (nodeName) => {
    if (nodeName === "hr" || nodeName === "img") {
      // "atomic" blocks is how Draft.js structures block-level entities.
      return "atomic";
    }

    console.log(nodeName)

    return nodeName;
  },
};

export const toHTML = (raw) =>
  raw ? convertToHTML(convertFromRaw(raw)) : "";
export const fromHTML = (html) => {
  console.log(convertFromHTML(html))
  console.log(convertToRaw(convertFromHTML(html)))
  return convertToRaw(convertFromHTML(html))
};