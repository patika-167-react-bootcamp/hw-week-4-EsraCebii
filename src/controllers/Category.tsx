import api from "../utils/api";
import { CreateCategoryRequest, Category, UpdateCategoryRequest } from "../types/categoy";

export const create = (payload: CreateCategoryRequest ) =>
  api.post<Category>(`category`, payload);

  export const categoryList = () =>
  api.get<Category[]>(`category`);

  export const update = (params: UpdateCategoryRequest) => api.put<Category>(`category/${params.id}`, {
    title: params.title
  });

  export const deleteCategory = (id: number) => api.delete(`category/${id}`);