import Category from "./category";
import Year from "./year";
export default class User {
  id: string;
  name: string;
  login: string;
  password: string;
  categories: Category[];
  years: Year[];
  createdAt: Date;
  updateAt: Date;
}