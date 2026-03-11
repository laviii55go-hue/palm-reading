import Link from "next/link";

interface FooterLinksProps {
  className?: string;
  linkClassName?: string;
}

export default function FooterLinks({ className = "text-center mt-4", linkClassName = "text-gray-400 text-xs hover:underline" }: FooterLinksProps) {
  return (
    <div className={className}>
      <Link href="/privacy" className={linkClassName}>
        プライバシーポリシー
      </Link>
      <span className="text-gray-300 mx-2">|</span>
      <Link href="/changelog" className={linkClassName}>
        更新履歴
      </Link>
    </div>
  );
}
