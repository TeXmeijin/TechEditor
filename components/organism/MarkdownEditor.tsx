import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
const mdParser = new MarkdownIt(/* Markdown-it options */);

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export default function ({ markdownText, onChange }) {
  return (
    <MdEditor
      value={markdownText}
      style={{ height: "100%" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={({ text }) => onChange(text)}
    />
  );
}
