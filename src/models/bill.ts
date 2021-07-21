import Category from "./category";
import Month from "./month";

export default class Bill {
  id: string;
  name: string;
  value: number;
  date: Date;
  month: Month;
  category: Category;
}