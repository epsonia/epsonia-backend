import express from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/teams", async (req, res) => {
  const teams = await prisma.team.findMany();

  res.json(teams);
});

app.get("/teams/:id", async (req, res) => {
  const { id } = req.params;

  const getTeam = await prisma.team.findUnique({ where: { id: Number(id) } });

  res.json(getTeam);
});

app.post("/teams", async (req, res) => {
  const { name } = req.body;

  const newTeam = await prisma.team.create({
    data: {
      name: name,
      linuxScore: 0,
      totalScore: 0,
      windowsScore: 0,
    },
  });

  res.json(newTeam);
});

app.put("/teams/:id/linux_score", async (req, res) => {
  const { id } = req.params;
  const { new_score } = req.body;

  console.log("Updating Linux Score to " + new_score);

  const updateScore = await prisma.team.update({
    where: { id: Number(id) },
    data: {
      linuxScore: new_score,
    },
  });

  res.json(updateScore);
});

app.put("/teams/:id/windows_score", async (req, res) => {
  const { id } = req.params;
  const { new_score } = req.body;

  console.log("Updating windows score to " + new_score);

  const updateScore = await prisma.team.update({
    where: {
      id: Number(id),
    },
    data: {
      windowsScore: new_score,
    },
  });

  res.json(updateScore);
});

app.delete("/teams/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting team with id: ${id}`);

  const deleteRes = await prisma.team.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(deleteRes);
});

app.delete("/teams", async (req, res) => {
  console.log("Deleting all teams");

  const deleteRes = await prisma.team.deleteMany();

  res.json(deleteRes);
});

const server = app.listen(8773);
