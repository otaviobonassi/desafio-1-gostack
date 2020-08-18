const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const newObj = {id: uuid(), title, url, techs, likes: 0};
  repositories.push(newObj);

  return response.status(201).json(newObj);
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const {id} = request.params;

  const itemIndex = repositories.findIndex(item => item.id === id);

  if(itemIndex < 0) return response.status(400).json({message: "Item não encontrado"});

  repositories[itemIndex] = {...repositories[itemIndex], title, url, techs};
  return response.status(200).json(repositories[itemIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const itemIndex = repositories.findIndex(item => item.id === id);
  
  if(itemIndex < 0) return response.status(400).json({message: "Item não encontrado"});

  repositories.splice(itemIndex, 1);
  
  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const itemIndex = repositories.findIndex(item => item.id === id);
  if(itemIndex < 0) return response.status(400).json({message: "Item não encontrado"});
  const prevLikes = repositories[itemIndex].likes;
  repositories[itemIndex] = {...repositories[itemIndex], likes: prevLikes + 1};

  return response.status(200).json(repositories[itemIndex]);
});

module.exports = app;
