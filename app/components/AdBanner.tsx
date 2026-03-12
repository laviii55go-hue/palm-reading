"use client";

export default function AdBanner() {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-gray-400">PR</p>
      <a
        href="https://rpx.a8.net/svt/ejp?a8mat=4AZAW7+8RJREA+2HOM+601S1&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa26030787012_4AZAW7_8RJREA_2HOM_601S1%3Fpc%3Dhttp%253A%252F%252Fwww.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252F"
        rel="nofollow"
        target="_blank"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="http://hbb.afl.rakuten.co.jp/hsb/0eb4bbb1.717c6090.0eb4bbaa.95151395/"
          style={{ border: 0 }}
          alt="楽天市場"
          className="max-w-full rounded-lg"
        />
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{ border: 0 }}
        width={1}
        height={1}
        src="https://www19.a8.net/0.gif?a8mat=4AZAW7+8RJREA+2HOM+601S1"
        alt=""
      />
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
