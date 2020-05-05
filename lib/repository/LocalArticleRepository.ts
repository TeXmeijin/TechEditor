import { IArticleRepository } from "./IArticleRepository";
import { Article } from "../domain/Article";
export default class LocalArticleRepository implements IArticleRepository {
  create(article: Article): void {
    localStorage.setItem("ArticleObjective:data:v1", JSON.stringify(article));
  }
  find(): Article | null {
    const data = localStorage.getItem("ArticleObjective:data:v1");
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
}
