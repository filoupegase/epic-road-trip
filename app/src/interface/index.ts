export type Person = {
    id: string
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    gender: string
}

export type ResponseError = {
    message: string
}

export interface LoginForm {
    email: string
    password: string
}

export interface SignupForm {
    email: string
    password: string
    passwordCheck: string
}

export interface SignupForm {
    email: string
    password: string
    passwordCheck: string
}

