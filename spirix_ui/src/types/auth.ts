export type Role = "admin" | "editor" | "viewer";

export interface JwtPayload {
  sub: string;
  exp: number;
  roles?: Role[];
}
