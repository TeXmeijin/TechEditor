import { ArticleDTO } from "../domain/Article";
import { User } from "../domain/User";
export interface IArticleRepository {
  create(article: ArticleDTO): string;
  update(article: ArticleDTO): void;
  find(id?: string, user?: User): ArticleDTO | null;
  listAll(user?: User): ArticleDTO[];
  delete(id: string): void;
  nextIdentity(): string;
}
