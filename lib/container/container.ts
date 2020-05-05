import { IArticleRepository } from "../repository/IArticleRepository";
import { User } from "../domain/User";
import LocalArticleRepository from "../repository/LocalArticleRepository";
export default class Container {
  static getArticleRepository(user?: User): IArticleRepository {
    // TODO: Userが存在するときはFirebaseでのRepositoryを使う
    return new LocalArticleRepository();
  }
}
