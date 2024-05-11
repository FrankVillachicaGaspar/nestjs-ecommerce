import { Expose} from "class-transformer"

export class ShortCategoryDto {
  @Expose()
  id: number

  @Expose()
  name: string
}