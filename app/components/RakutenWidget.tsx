"use client";

import { useEffect, useRef } from "react";

export default function RakutenWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 変数設定スクリプトをコンテナに挿入
    const inlineScript = document.createElement("script");
    inlineScript.type = "text/javascript";
    inlineScript.text = `
      rakuten_affiliateId="0ea62065.34400275.0ea62066.204f04c0";
      rakuten_items="ranking";
      rakuten_genreId="0";
      rakuten_recommend="on";
      rakuten_design="slide";
      rakuten_size="468x60";
      rakuten_target="_blank";
      rakuten_border="on";
      rakuten_auto_mode="on";
      rakuten_adNetworkId="a8Net";
      rakuten_adNetworkUrl="https%3A%2F%2Frpx.a8.net%2Fsvt%2Fejp%3Fa8mat%3D4AZAW7%2B8RJREA%2B2HOM%2BBS629%26rakuten%3Dy%26a8ejpredirect%3D";
      rakuten_pointbackId="a26030787012_4AZAW7_8RJREA_2HOM_BS629";
      rakuten_mediaId="20011816";
    `;
    container.appendChild(inlineScript);

    // ウィジェット本体スクリプトをコンテナに挿入
    const widgetScript = document.createElement("script");
    widgetScript.type = "text/javascript";
    widgetScript.src = "//xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js";
    container.appendChild(widgetScript);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-1 py-1 w-full overflow-hidden">
      <div ref={containerRef} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{ border: 0 }}
        width={1}
        height={1}
        src="https://www19.a8.net/0.gif?a8mat=4AZAW7+8RJREA+2HOM+BS629"
        alt=""
      />
    </div>
  );
}
