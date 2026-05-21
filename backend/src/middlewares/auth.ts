import express from "express";
import admin from "firebase-admin";

export const authMiddleware: express.RequestHandler = async (req, res, next) => {
  console.log("Auth middleware called");
  const { authorization } = req.headers;
  if (authorization && typeof authorization === "string" && authorization.startsWith("Bearer ")) {
    try {
      const authToken = authorization.split(" ")[1];
      const decodedToken = await admin.auth().verifyIdToken(authToken as string);
      (req as any).user = decodedToken;
      next();
    } catch (err) {
      console.error("Invalid auth token", err);
      res.status(401).json({ message: "Invalid auth token" });
      return;
    }
  } else {
    console.warn("No auth token provided");
    res.status(401).json({ message: "No auth token provided" });
    return;
  }
  
};
