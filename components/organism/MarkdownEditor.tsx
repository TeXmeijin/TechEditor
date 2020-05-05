import React from "react";
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";
import { toHTML } from "../../lib/viewModel/markdownToHTML";

export default function MarkdownEditor({ markdownText, onChange }) {

  return (
    <DraftailEditor
      editorState={markdownText}
      blockTypes={[
        { type: BLOCK_TYPE.HEADER_ONE },
        { type: BLOCK_TYPE.HEADER_TWO },
        { type: BLOCK_TYPE.HEADER_THREE },
        { type: BLOCK_TYPE.HEADER_FOUR },
        { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
        { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
        { type: BLOCK_TYPE.CODE },
        { type: BLOCK_TYPE.BLOCKQUOTE },
      ]}
      inlineStyles={[
        { type: INLINE_STYLE.BOLD },
        { type: INLINE_STYLE.ITALIC },
        { type: INLINE_STYLE.CODE },
        { type: INLINE_STYLE.QUOTATION },
      ]}
    />
  );
}
