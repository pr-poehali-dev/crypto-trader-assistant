import express from "express";
import { prisma } from "../index";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Получить список отслеживания
router.get("/", authMiddleware, async (req, res) => {
  try {
    const watchlist = await prisma.watchlist.findMany({
      where: { userId: req.userId! },
    });
    res.json(watchlist);
  } catch (error) {
    console.error("Get watchlist error:", error);
    res.status(500).json({ error: "Ошибка получения списка" });
  }
});

// Добавить в список отслеживания
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { coinId, coinName } = req.body;

    const watchlistItem = await prisma.watchlist.create({
      data: {
        userId: req.userId!,
        coinId,
        coinName,
      },
    });

    res.json(watchlistItem);
  } catch (error) {
    console.error("Add to watchlist error:", error);
    res.status(500).json({ error: "Ошибка добавления в список" });
  }
});

// Удалить из списка отслеживания
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.watchlist.delete({
      where: {
        id,
        userId: req.userId!,
      },
    });

    res.json({ message: "Удалено из списка отслеживания" });
  } catch (error) {
    console.error("Remove from watchlist error:", error);
    res.status(500).json({ error: "Ошибка удаления из списка" });
  }
});

export default router;
