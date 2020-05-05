import { Article } from "../domain/Article";
import { User } from "../domain/User";
export interface IArticleRepository {
  create(article: Article): void;
  find(user?: User): Article | null;
}
