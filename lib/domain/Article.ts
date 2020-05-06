import { inputState, useInput } from "../hooks/inputState";
import { useState, Dispatch, SetStateAction } from "react";
export type ObjectiveProps = {
  mainObjective: inputState;
  target: inputState;
  youWantToDoForTarget: inputState;
};

export type Headings = {
  title: inputState;
};

export type ArticleDTO = {
  id?: string
  markdownText: string;
} & {
  [key in keyof ObjectiveProps]: string;
} & {
  [key in keyof Headings]: string;
};

export class ArticleState {
  id?: string
  objectiveProps: ObjectiveProps;
  headings: Headings;
  markdownText: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  effectTargetValues: any[];

  constructor() {
    const title = useInput("", "記事のタイトル");
    const mainObjective = useInput("", "本記事の主題");
    const target = useInput(
      "",
      "対象読者の知識レベル(どこまで主題について知っているか)"
    );
    const youWantToDoForTarget = useInput(
      "",
      "読者に本記事から得た知識で成し遂げてほしいこと"
    );

    const [markdownText, setMarkdownText] = useState("");

    this.headings = {
      title,
    };

    this.objectiveProps = {
      mainObjective,
      target,
      youWantToDoForTarget,
    };

    this.markdownText = {
      value: markdownText,
      set: setMarkdownText,
    };

    this.effectTargetValues = [
      mainObjective,
      target,
      youWantToDoForTarget,
      markdownText,
    ];
  }

  update(article: ArticleDTO) {
    (Object.keys(this.objectiveProps) as (keyof ObjectiveProps)[]).forEach(
      (key) => {
        this.objectiveProps[key].set(article[key]);
      }
    );
    (Object.keys(this.headings) as (keyof Headings)[]).forEach(
      (key) => {
        this.headings[key].set(article[key]);
      }
    );

    this.id = article.id

    this.markdownText.set(article.markdownText);
  }

  pickArticleContents(): ArticleDTO {
    return {
      id: this.id,
      title: this.headings.title.value,
      mainObjective: this.objectiveProps.mainObjective.value,
      target: this.objectiveProps.target.value,
      youWantToDoForTarget: this.objectiveProps.youWantToDoForTarget.value,
      markdownText: this.markdownText.value,
    };
  }
}
