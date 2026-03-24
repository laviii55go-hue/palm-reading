"use client";

import { useEffect, useRef } from "react";

/** 楽天公式サンプルに合わせたキャッシュバスター付きURL（https 固定） */
const RAKUTEN_WIDGET_JS =
  "https://xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js?20230106";

function ensureRakutenWidgetScriptLoaded(): void {
  if (typeof document === "undefined") return;
  const existing = document.querySelector(
    `script[src^="https://xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js"]`
  );
  if (existing) return;
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src = RAKUTEN_WIDGET_JS;
  s.async = true;
  document.body.appendChild(s);
}

export default function RakutenWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const inlineScript = document.createElement("script");
    inlineScript.type = "text/javascript";
    // A8ネットワーク連携（adNetworkId / pointback 等）は mtwidget*.affiliate 経由の
    // 追加スクリプトを読み、応答が JS でない場合に SyntaxError になることがあるため付けない。
    // public/rakuten-widget.html と同様、楽天ウィジェット本体のみ。
    inlineScript.text = [
      'rakuten_affiliateId="0ea62065.34400275.0ea62066.204f04c0";',
      'rakuten_items="ranking";',
      'rakuten_genreId="0";',
      'rakuten_recommend="on";',
      'rakuten_design="slide";',
      'rakuten_size="468x60";',
      'rakuten_target="_blank";',
      'rakuten_border="on";',
      'rakuten_auto_mode="on";',
      'rakuten_theme="gray";',
      `rakuten_ts="${Date.now()}";`,
    ].join("\n");

    container.appendChild(inlineScript);
    ensureRakutenWidgetScriptLoaded();

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
        src="https://www19.a8.net/0.gif?a8mat=4AZAW7%2B8RJREA%2B2HOM%2BBS629"
        alt=""
      />
    </div>
  );
}
