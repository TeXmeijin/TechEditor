import dynamic from "next/dynamic";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export default function MarkdownEditor(props) {
  return (
    <MdEditor
      config={{ view: { menu: true, md: true, html: false } }}
      value={props.markdownText}
      onChange={props.onChange}
    />
  );
}
