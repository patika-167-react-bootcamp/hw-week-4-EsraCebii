export type Category = {
    id: number
    userId: number
    title: string
    updatedAt: string
    createdAt: string
  }
  
  export type CreateCategoryRequest = Pick<Category, "title">

  export type UpdateCategoryRequest = Pick<Category, "title", "id">