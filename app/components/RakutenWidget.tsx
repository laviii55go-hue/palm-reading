"use client";

import { useEffect } from "react";

export default function RakutenWidget() {
  useEffect(() => {
    (window as unknown as Record<string, unknown>)["rakuten_affiliateId"] = "0ea62065.34400275.0ea62066.204f04c0";
    (window as unknown as Record<string, unknown>)["rakuten_items"] = "ranking";
    (window as unknown as Record<string, unknown>)["rakuten_genreId"] = "0";
    (window as unknown as Record<string, unknown>)["rakuten_recommend"] = "on";
    (window as unknown as Record<string, unknown>)["rakuten_design"] = "slide";
    (window as unknown as Record<string, unknown>)["rakuten_size"] = "468x60";
    (window as unknown as Record<string, unknown>)["rakuten_target"] = "_blank";
    (window as unknown as Record<string, unknown>)["rakuten_border"] = "on";
    (window as unknown as Record<string, unknown>)["rakuten_auto_mode"] = "on";
    (window as unknown as Record<string, unknown>)["rakuten_adNetworkId"] = "a8Net";
    (window as unknown as Record<string, unknown>)["rakuten_adNetworkUrl"] = "https%3A%2F%2Frpx.a8.net%2Fsvt%2Fejp%3Fa8mat%3D4AZAW7%2B8RJREA%2B2HOM%2BBS629%26rakuten%3Dy%26a8ejpredirect%3D";
    (window as unknown as Record<string, unknown>)["rakuten_pointbackId"] = "a26030787012_4AZAW7_8RJREA_2HOM_BS629";
    (window as unknown as Record<string, unknown>)["rakuten_mediaId"] = "20011816";

    const script = document.createElement("script");
    script.src = "//xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <div id="rakuten_widget" />
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
