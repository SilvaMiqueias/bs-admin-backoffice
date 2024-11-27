import {Author} from "../author/author";
import {Category} from "../category/category";

export class Book{
  id?: string;
  price?: number;
  title?: string;
  description?: string;
  qtd?: number;
  page?: number;
  language?: string;
  code?: string;
  image?: string;
  releaseDate?: Date;
  authors?: Author[];
  categories?: Category[];

}
