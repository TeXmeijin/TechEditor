import React from "react";

import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";

const initial = "";
const onSave = (content) => {
  console.log("saving", content);
};

export default function MarkdownEditor(props) {
  return (
    <DraftailEditor
      rawContentState={initial || null}
      onSave={onSave}
      enableHorizontalRule
      enableLineBreak
      showUndoControl
      autoComplete
      showRedoControl
      stripPastedStyles={false}
      maxListNesting={6}
      spellCheck
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
        { type: INLINE_STYLE.MARK },
        { type: INLINE_STYLE.QUOTATION },
        { type: INLINE_STYLE.STRIKETHROUGH },
      ]}
    />
  );
}
