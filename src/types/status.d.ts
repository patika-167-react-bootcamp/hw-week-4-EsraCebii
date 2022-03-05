export type Status = {
    id: number
    categoryId: number
    color: string
    title: string
    updatedAt: string
    createdAt: string
  }
  
  export type CreateStatusRequest = Pick<Status, "title", "color", "categoryId">
  
  export type UpdateStatusRequest = Pick<Status, "title", "id", "categoryId", "color">
  export type FilterStatusParams = Omit<Status, "createdAt", "updatedAt">   