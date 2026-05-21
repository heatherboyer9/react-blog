declare global {
  namespace Express {
    interface Request {
      user?: import("firebase-admin/auth").DecodedIdToken;
    }
  }
}
