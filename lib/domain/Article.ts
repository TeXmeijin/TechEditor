import { inputState, useInput } from "../hooks/inputState";
import { useState, Dispatch, SetStateAction } from "react";
export type ObjectiveProps = {
  mainObjective: inputState;
  target: inputState;
  targetKnows: inputState;
  youWantToDoForTarget: inputState;
};

export type Article = {
  markdownText: string;
} & {
  [key in keyof ObjectiveProps]: string;
};

export class ArticleState {
  objectiveProps: ObjectiveProps;
  markdownText: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  effectTargetValues: any[];

  constructor() {
    const mainObjective = useInput("", "本記事の主題文");
    const target = useInput("", "対象読者");
    const targetKnows = useInput(
      "",
      "対象読者が主題についてどこまで知っている想定か"
    );
    const youWantToDoForTarget = useInput(
      "",
      "読み手に本記事から得た知識でなにをしてほしいのか"
    );

    const [markdownText, setMarkdownText] = useState("");

    this.objectiveProps = {
      mainObjective,
      target,
      targetKnows,
      youWantToDoForTarget,
    };

    this.markdownText = {
      value: markdownText,
      set: setMarkdownText,
    };

    this.effectTargetValues = [
      mainObjective,
      target,
      targetKnows,
      youWantToDoForTarget,
      markdownText,
    ];
  }

  update(article: Article) {
    (Object.keys(this.objectiveProps) as (keyof ObjectiveProps)[]).forEach(
      (key) => {
        this.objectiveProps[key].set(article[key]);
      }
    );

    this.markdownText.set(article.markdownText);
  }

  pickArticleContents(): Article {
    return {
      mainObjective: this.objectiveProps.mainObjective.value,
      target: this.objectiveProps.target.value,
      targetKnows: this.objectiveProps.targetKnows.value,
      youWantToDoForTarget: this.objectiveProps.youWantToDoForTarget.value,
      markdownText: this.markdownText.value,
    };
  }
}
