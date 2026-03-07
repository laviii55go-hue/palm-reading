"use client";

export default function AdBanner() {
  return (
    <div className="flex flex-col items-center gap-1 py-2">
      <p className="text-xs text-gray-400">PR</p>
      <a
        href="https://px.a8.net/svt/ejp?a8mat=4AZAW7+8XI3G2+2PEO+1BSGQ9"
        rel="nofollow"
        target="_blank"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          border={0}
          width={468}
          height={120}
          alt="ココナラ占い"
          src="https://www20.a8.net/svt/bgt?aid=260307943540&wid=001&eno=01&mid=s00000012624008027000&mc=1"
          className="max-w-full rounded-lg"
        />
      </a>
      <img
        border={0}
        width={1}
        height={1}
        src="https://www14.a8.net/0.gif?a8mat=4AZAW7+8XI3G2+2PEO+1BSGQ9"
        alt=""
      />
    </div>
  );
}
