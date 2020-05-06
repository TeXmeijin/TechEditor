import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import { inputState } from "../../lib/hooks/inputState";
import { ComponentType } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

// TODO: implement upload images
// function onImageUpload(file) {
//   return new Promise(resolve => {
//     const reader = new FileReader();
//     reader.onload = data => {
//       resolve(data.target.result);
//     };
//     reader.readAsDataURL(file);
//   });
// }

export type Mode = {
  refine: boolean;
};

type Props = {
  markdownText: string;
  onChange: inputState["set"];
  mode: Mode;
};


let Editor = null

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
}) as ComponentType<any>;

export default function (props: Props) {
  const view = {
    menu: true,
    md: true,
    html: !props.mode.refine,
  };

  const canView = {
    menu: true,
    md: false,
    html: false,
    fullScreen: true,
    hideMenu: true,
  };

  return (
    <MdEditor
      value={props.markdownText}
      style={{ flex: 1 }}
      config={{ view, canView }}
      // onImageUpload={onImageUpload}
      renderHTML={(text) => mdParser.render(text)}
      onChange={({ text }) => props.onChange(text)}
    />
  );
}
