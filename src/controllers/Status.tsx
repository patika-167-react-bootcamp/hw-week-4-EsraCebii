import api from "../utils/api";
import { CreateStatusRequest, Status, FilterStatusParams, UpdateStatusRequest } from "../types/status";

export const create = (payload: CreateStatusRequest ) =>
  api.post<Status>(`status`, payload);

  export const statusList = (params: FilterStatusParams) =>
  api.get<Status[]>(`status`, {
    params,
  });

  export const updateStatus = (params: UpdateStatusRequest) => api.put<Status>(`status/${params.id}`, {
    title: params.title,
    categoryId: params.categoryId

  });
  export const deleteStatus = (id: number) => api.delete(`status/${id}`);