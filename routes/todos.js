import express from "express";
import { getTodos,createTodos, updateTodos, deleteTodos } from "../controllers/todos.js";


const router = express.Router();


  router.get('/todos', getTodos);

  router.post('/todos', createTodos);

  router.patch('/todo/:id', updateTodos);

  router.delete('/todo/:id', deleteTodos);

  export default router;