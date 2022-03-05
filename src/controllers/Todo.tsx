import api from "../utils/api";
import { Todo, CreateTodoRequest, FilterTodoParams } from "../types/todo";

export const create = (payload: CreateTodoRequest ) =>
  api.post<Todo>(`todo`, payload);


  export const list = (params: FilterTodoParams) =>
  api.get<Todo[]>(`todo`, { params })
  