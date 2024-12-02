import express from "express";
import multer from "multer";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};
import {
  listPosts,
  createNewPost,
  uploadImage,
  updateNewPost,
} from "../controllers/postsController.js";

// Configuração do multer para reconhecer as pastas do windows corretamente. No Linux ou Mac não é necessário, mas não tem problema deixar o código assim.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.get("/posts", listPosts);

  app.post("/posts", createNewPost);

  app.post("/upload", upload.single("image"), uploadImage);

  app.put("/upload/:id", updateNewPost);
};

export default routes;
