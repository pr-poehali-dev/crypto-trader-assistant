import express from "express";
import { prisma } from "../index";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Получить сделки пользователя
router.get("/", authMiddleware, async (req, res) => {
  try {
    const trades = await prisma.trade.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: "desc" },
    });
    res.json(trades);
  } catch (error) {
    console.error("Get trades error:", error);
    res.status(500).json({ error: "Ошибка получения сделок" });
  }
});

// Создать сделку
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { coinId, type, amount, price } = req.body;

    const trade = await prisma.trade.create({
      data: {
        userId: req.userId!,
        coinId,
        type: type.toUpperCase(),
        amount: parseFloat(amount),
        price: parseFloat(price),
      },
    });

    res.json(trade);
  } catch (error) {
    console.error("Create trade error:", error);
    res.status(500).json({ error: "Ошибка создания сделки" });
  }
});

export default router;
