import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listPosts(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}

export async function createNewPost(req, res) {
  const newPost = req.body;
  try {
    const postCreated = await createPost(newPost);
    res.status(201).json(postCreated);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Internal Server Error" });
  }
}

export async function uploadImage(req, res) {
  const newPost = { descricao: "", imgUrl: req.file.originalname, alt: "" };
  try {
    const postCreated = await createPost(newPost);
    const imageUpdated = `uploads/${postCreated.insertedId}.png`;
    fs.renameSync(req.file.path, imageUpdated);
    res.status(201).json(postCreated);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Internal Server Error" });
  }
}

export async function updateNewPost(req, res) {
  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`;
  const post = {
    imgUrl: urlImage,
    descricao: req.body.descricao,
    alt: req.body.alt,
  };

  try {
    const postCreated = await updatePost(id, post);
    res.status(201).json(postCreated);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Internal Server Error" });
  }
}
