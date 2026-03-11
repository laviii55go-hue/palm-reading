"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import {
  getRokuyo,
  getRokuyoStyle,
  ROKUYO_DESC,
  getDaysInMonth,
  getFirstDayOfWeek,
} from "../data/calendarData";

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export default function CalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const days = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="text-xs text-amber-700 hover:underline">← トップに戻る</Link>
            <Link href="/calendar-guide" className="text-xs text-amber-700 hover:underline">📖 ガイド</Link>
          </div>
          <h1 className="text-2xl font-black text-amber-900 mt-3">📅 開運カレンダー</h1>
          <p className="text-amber-700 text-sm">六曜で吉日をチェック</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="rounded-xl border-2 border-amber-200 px-3 py-2 text-amber-800 font-bold"
            >
              {[2024, 2025, 2026, 2027].map((y) => (
                <option key={y} value={y}>{y}年</option>
              ))}
            </select>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="rounded-xl border-2 border-amber-200 px-3 py-2 text-amber-800 font-bold"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}月</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {WEEKDAYS.map((w) => (
                    <th key={w} className="py-1 text-center text-amber-700 font-bold">{w}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const rows: React.ReactNode[] = [];
                  let week: React.ReactNode[] = [];
                  for (let i = 0; i < firstDay; i++) {
                    week.push(<td key={`empty-${i}`} className="p-1" />);
                  }
                  for (let d = 1; d <= days; d++) {
                    const rokuyo = getRokuyo(year, month, d);
                    const style = getRokuyoStyle(rokuyo);
                    week.push(
                      <td key={d} className="p-1">
                        <div className={`rounded-lg p-1.5 text-center border ${style.border} ${style.bg}`}>
                          <div className={`font-bold ${style.text}`}>{d}</div>
                          <div className="text-[10px]">{rokuyo}</div>
                        </div>
                      </td>
                    );
                    if (week.length === 7) {
                      rows.push(<tr key={d}>{week}</tr>);
                      week = [];
                    }
                  }
                  if (week.length > 0) {
                    while (week.length < 7) week.push(<td key={`pad-${week.length}`} className="p-1" />);
                    rows.push(<tr key="last">{week}</tr>);
                  }
                  return rows;
                })()}
              </tbody>
            </table>
          </div>

          <div className="space-y-2 pt-2 border-t border-amber-100">
            <p className="text-amber-800 font-bold text-sm">六曜の意味</p>
            {Object.entries(ROKUYO_DESC).map(([name, desc]) => {
              const s = getRokuyoStyle(name);
              return (
                <div key={name} className={`rounded-lg px-3 py-2 ${s.bg} ${s.border} border`}>
                  <span className={`font-bold ${s.text}`}>{name}</span>
                  <span className="text-gray-600 text-xs ml-2">{desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        <AdBanner />
        <RakutenWidget />
      </div>
    </div>
  );
}
