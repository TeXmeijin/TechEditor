import { ArticleDTO } from "../domain/Article";
import { User } from "../domain/User";
export interface IArticleRepository {
  create(article: ArticleDTO): void;
  update(article: ArticleDTO): void;
  find(id?: string, user?: User): ArticleDTO | null;
  listAll(user?: User): ArticleDTO[];
  nextIdentity(): string;
}
