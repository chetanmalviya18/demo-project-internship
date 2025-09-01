import express from "express";
import jwt from "jsonwebtoken";

const authenticationToken = async (req, res, next) => {
  // console.log("Authenticating...");

  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    // console.log(req.user);

    next();
  } catch (error) {
    throw new Error({ message: "Invalid Token", error });
  }
};

export default authenticationToken;
