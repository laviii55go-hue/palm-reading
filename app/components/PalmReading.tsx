"use client";

import FortuneSelect from "./FortuneSelect";
import FooterLinks from "./FooterLinks";

export default function PalmReading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-purple-900">手のひらの予言者</h1>
          <p className="text-gray-500 text-sm mt-1">総合占いで、あなたの未来を楽しく紐解く</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <FortuneSelect />
        </div>
        <FooterLinks className="text-center mt-4" />
      </div>
    </div>
  );
}
