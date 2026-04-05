import Link from "next/link";
import Image from "next/image";

export default function TopBannerLink() {
  return (
    <Link href="/" className="block">
      <Image
        src="/top-banner.webp"
        alt="手のひらの予言者 - トップへ戻る"
        width={200}
        height={60}
        className="h-12 w-auto object-contain"
        priority
      />
    </Link>
  );
}
