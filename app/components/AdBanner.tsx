"use client";

import { useEffect, useRef } from "react";

function RakutenMotionAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const inlineScript = document.createElement("script");
    inlineScript.type = "text/javascript";
    inlineScript.text = `
      rakuten_design="slide";
      rakuten_affiliateId="36aa5de7.f708acbb.36aa5de8.4921b4af";
      rakuten_items="ctsmatch";
      rakuten_genreId="0";
      rakuten_size="468x160";
      rakuten_target="_blank";
      rakuten_theme="gray";
      rakuten_border="off";
      rakuten_auto_mode="on";
      rakuten_genre_title="off";
      rakuten_recommend="on";
      rakuten_ts="1773443832333";
    `;
    container.appendChild(inlineScript);

    const widgetScript = document.createElement("script");
    widgetScript.type = "text/javascript";
    widgetScript.src = "https://xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js?20230106";
    container.appendChild(widgetScript);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="w-full max-w-[468px] min-h-[160px]" />;
}

export default function AdBanner() {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-gray-400">PR</p>
      <RakutenMotionAd />
      <a
        href="https://hb.afl.rakuten.co.jp/hsc/51b2aa6a.41cda442.51b2aa6b.ec7875f8/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiI0NCIsImJhbiI6Mjc5NDg1OCwiYW1wIjpmYWxzZX0%3D"
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://hbb.afl.rakuten.co.jp/hsb/51b2aa6a.41cda442.51b2aa6b.ec7875f8/?me_id=1&me_adv_id=2794858&t=pict"
          alt=""
          style={{ border: 0, margin: 2 }}
          className="max-w-full rounded-lg"
        />
      </a>
      <a
        href="https://px.a8.net/svt/ejp?a8mat=4AZAW7+8XI3G2+2PEO+1BSGQ9"
        rel="nofollow"
        target="_blank"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{ border: 0 }}
          width={468}
          height={120}
          alt="ココナラ占い"
          src="https://www20.a8.net/svt/bgt?aid=260307943540&wid=001&eno=01&mid=s00000012624008027000&mc=1"
          className="max-w-full rounded-lg"
        />
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{ border: 0 }}
        width={1}
        height={1}
        src="https://www14.a8.net/0.gif?a8mat=4AZAW7+8XI3G2+2PEO+1BSGQ9"
        alt=""
      />
    </div>
  );
}
