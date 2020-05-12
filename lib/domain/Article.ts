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
  id?: string;
  markdownText: string;
} & {
  [key in keyof ObjectiveProps]: string;
} &
  {
    [key in keyof Headings]: string;
  };

export class ArticleState {
  id: {
    value: string | null;
    set: Dispatch<SetStateAction<string>>;
  };
  objectiveProps: ObjectiveProps;
  headings: Headings;
  markdownText: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  effectTargetValues: any[];

  constructor() {
    const [id, setId] = useState(null);
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
      mainObjective.value,
      target.value,
      youWantToDoForTarget.value,
      markdownText,
    ];

    this.id = {
      value: id,
      set: setId,
    };
  }

  setId(id: string) {
    this.id.set(id);
  }

  update(article: ArticleDTO) {
    (Object.keys(this.objectiveProps) as (keyof ObjectiveProps)[]).forEach(
      (key) => {
        this.objectiveProps[key].set(article[key]);
      }
    );
    (Object.keys(this.headings) as (keyof Headings)[]).forEach((key) => {
      this.headings[key].set(article[key]);
    });

    this.id.set(article.id);

    this.markdownText.set(article.markdownText);
  }

  pickArticleContents(): ArticleDTO {
    console.log(this.id.value)
    return {
      id: this.id.value,
      title: this.headings.title.value,
      mainObjective: this.objectiveProps.mainObjective.value,
      target: this.objectiveProps.target.value,
      youWantToDoForTarget: this.objectiveProps.youWantToDoForTarget.value,
      markdownText: this.markdownText.value,
    };
  }
}
