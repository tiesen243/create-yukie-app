interface Error {
  message: string
  fieldsError?: Record<string, string>
}

interface Res<T = any> {
  message: string
  data?: T
}
