import styled from "styled-components";
// const gitDiff = require('git-diff')
import * as diff2Html from "diff2html";
import * as Diff from "diff";

const RefineTarget = (props: {
  className?: string;
  current: string;
  refined: string;
}) => {
  const diff = Diff.createPatch("編集中の記事", props.current, props.refined);
  console.log({ diff });
  const __html = diff2Html.html(diff2Html.parse(diff), { drawFileList: false });

  return (
    <div className={props.className} dangerouslySetInnerHTML={{ __html }}></div>
  );
};

export const StyledRefineTarget = styled(RefineTarget)`
  flex: 1;
  line-height: 1.7;
`;
