import api from "../utils/api";
import { CreateStatusRequest, Status, FilterStatusParams } from "../types/status";

export const create = (payload: CreateStatusRequest ) =>
  api.post<Status>(`status`, payload);

  export const statusList = (params: FilterStatusParams) =>
  api.get<Status[]>(`status`, {
    params,
  });

//   export const update = (params: UpdateCategoryRequest) => api.put<Category>(`category/${params.id}`, {
//     title: params.title
//   });
  export const deleteStatus = (id: number) => api.delete(`status/${id}`);