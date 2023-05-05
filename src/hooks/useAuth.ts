export function useAuth(): boolean {
  return localStorage.getItem("token") ? true : false;
}
