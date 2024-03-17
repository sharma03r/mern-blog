import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(errorHandler(403, "Forbidden"));
  }
  if (!req.body.title || !req.body.content) {
    return errorHandler(400, "Fill out all the required fields");
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-z0-9-]/g, "-");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};
