export default interface IUser {
  id?: any | null,
  full_name: string,
  email: string,
  password: string,
  roles?: Array<string>
}