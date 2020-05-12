import { IArticleRepository } from "./IArticleRepository";
import { ArticleDTO } from "../domain/Article";

const STORAGE = "ArticleObjective:data:v17";
export default class LocalArticleRepository implements IArticleRepository {
  create(article: ArticleDTO): string {
    article.id = this.nextIdentity();
    const data = localStorage.getItem(STORAGE);
    if (data) {
      const allData = JSON.parse(data) as ArticleDTO[];
      const index = allData.findIndex((el) => el.id === article.id);
      if (index < 0) {
        allData.push(article);
      } else {
        throw new Error();
      }
      localStorage.setItem(STORAGE, JSON.stringify(allData));
      return this.nextIdentity();
    }
    localStorage.setItem(STORAGE, JSON.stringify([article]));
    return this.nextIdentity();
  }
  update(article: ArticleDTO): void {
    if (!article.id) {
      throw new Error();
    }
    const data = localStorage.getItem(STORAGE);
    if (data) {
      const allData = JSON.parse(data) as ArticleDTO[];
      const index = allData.findIndex((el) => el.id === article.id);
      if (index < 0) {
        throw new Error();
      } else {
        allData[index] = article;
      }
      localStorage.setItem(STORAGE, JSON.stringify(allData));
      return;
    }
    throw new Error();
  }
  listAll(): ArticleDTO[] {
    const data = localStorage.getItem(STORAGE);
    if (data) {
      return (JSON.parse(data) as ArticleDTO[]).reverse().slice(0, 30);
    }
    return [];
  }
  find(id?: string): ArticleDTO | null {
    const data = localStorage.getItem(STORAGE);
    if (data) {
      const allData = JSON.parse(data) as ArticleDTO[];
      if (id) {
        return allData.find((el) => el.id === id);
      }
      return allData[allData.length - 1];
    }
    return null;
  }
  delete(id: string): void {
    const data = localStorage.getItem(STORAGE);
    if (data) {
      const allData = JSON.parse(data) as ArticleDTO[];
      const index = allData.findIndex((el) => el.id === id);
      if (index < 0) {
        throw new Error();
      } else {
        allData.splice(index, 1);
      }
      localStorage.setItem(STORAGE, JSON.stringify(allData));
      return;
    }
  }
  nextIdentity(): string {
    const data = localStorage.getItem(STORAGE);
    if (data) {
      const allData = JSON.parse(data) as ArticleDTO[];
      return `${allData.length + 1}`;
    }
    return "1";
  }
}
