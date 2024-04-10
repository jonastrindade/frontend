import AppRoutes from "./app.routes"
import AuthRoutes from "./auth.routes"

export default function Routes() {
  const isLoged = localStorage.getItem('@auth')
  return isLoged? <AuthRoutes /> : <AppRoutes />
}