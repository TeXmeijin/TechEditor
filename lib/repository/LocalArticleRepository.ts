import { IArticleRepository } from "./IArticleRepository";
import { Article } from "../domain/Article";

const STORAGE = 'ArticleObjective:data:v7'
export default class LocalArticleRepository implements IArticleRepository {
  create(article: Article): void {
    localStorage.setItem(STORAGE, JSON.stringify(article));
  }
  find(): Article | null {
    const data = localStorage.getItem(STORAGE);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
}
