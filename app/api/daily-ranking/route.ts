import { NextResponse } from "next/server";
import { getDailyFortuneRanking } from "../../data/dailyFortuneData";

export async function GET() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const ranking = getDailyFortuneRanking(year, month, day);

  return NextResponse.json({ year, month, day, ranking });
}
