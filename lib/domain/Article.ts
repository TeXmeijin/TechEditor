import { inputState, useInput } from "../hooks/inputState";
import { useState, Dispatch, SetStateAction } from 'react'
export type ObjectiveProps = {
  mainObjective: inputState;
  target: inputState;
};

export type Article = {
  markdownText: string;
} & {
  [key in keyof ObjectiveProps]: string;
};

export class ArticleState {
  objectiveProps: ObjectiveProps;
  markdownText: {
    value: string
    set: Dispatch<SetStateAction<string>>
  }
  effectTargetValues: any[]

  constructor() {
    const mainObjective = useInput("", "何を伝えるのか（主題文）");
    const target = useInput("", "対象読者");

    const [markdownText, setMarkdownText] = useState("");

    this.objectiveProps = {
      mainObjective,
      target
    }

    this.markdownText = {
      value: markdownText,
      set: setMarkdownText
    }

    this.effectTargetValues = [
      mainObjective,
      target,
      markdownText
    ]
  }

  update(article: Article) {
    (Object.keys(this.objectiveProps) as (keyof ObjectiveProps)[]).forEach(key => {
      this.objectiveProps[key].set(article[key])
    })

    this.markdownText.set(article.markdownText)
  }

  pickArticleContents(): Article {
    return {
      mainObjective: this.objectiveProps.mainObjective.value,
      target: this.objectiveProps.target.value,
      markdownText: this.markdownText.value,
    }
  }
}
