import { NextRequest, NextResponse } from "next/server";
import { getTarotResult } from "../../data/tarotData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cardId = searchParams.get("cardId");
  const isReversedParam = searchParams.get("isReversed");

  if (cardId === null || cardId === undefined) {
    return NextResponse.json(
      { error: "cardId is required" },
      { status: 400 }
    );
  }

  const id = parseInt(cardId, 10);
  if (isNaN(id) || id < 0 || id > 21) {
    return NextResponse.json(
      { error: "cardId must be 0-21" },
      { status: 400 }
    );
  }

  const isReversed =
    isReversedParam === "true" ||
    isReversedParam === "1" ||
    isReversedParam === "yes";

  const result = getTarotResult(id, isReversed);
  if (!result) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json({
    cardName: result.cardName,
    isReversed: result.isReversed,
    love: result.love,
    work: result.work,
    general: result.general,
    advice: result.advice,
    emoji: result.emoji,
  });
}
