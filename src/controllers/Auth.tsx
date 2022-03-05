import api from "../utils/api"
import {RegisterRequest, User, LoginRequest } from "../types/auth"

export const register = async (register: RegisterRequest) =>
api.post<User>("auth/register", register).then((response) => {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`
    return response
  })

export const login = (login: LoginRequest) =>
  api.post<User>("auth/login", login).then((response) => {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`
    return response
  })