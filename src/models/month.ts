import Bill from "./bill";
import Income from "./income";
import Year from "./year";

export default class Month {
  id: string;
  name: string;
  year: Year;
  incomes: Income[];
  bills: Bill[];
}