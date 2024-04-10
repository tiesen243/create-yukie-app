interface Error {
  message: string
  fieldErrors?: Record<string, string>
}

interface Res<T = any> {
  message: string
  data?: T
}
