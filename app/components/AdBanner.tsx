"use client";

function RakutenMotionAd() {
  return (
    <iframe
      src="/rakuten-widget.html"
      title="楽天アフィリエイト"
      className="w-full max-w-[468px] min-h-[160px] border-0 overflow-hidden"
      style={{ minHeight: 160 }}
    />
  );
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
