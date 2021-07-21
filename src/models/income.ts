import Category from "./category";
import Month from "./month";
export default class Income {
  id: string;
  name: string;
  value: number;
  date: Date;
  month: Month;
  category: Category;
}