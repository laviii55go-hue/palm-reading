import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-purple-900 mb-6">プライバシーポリシー</h1>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="font-bold text-gray-800 mb-2">1. 基本方針</h2>
            <p>本サービス「手相診断」（以下「当サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-800 mb-2">2. 収集する情報</h2>
            <p>当サービスでは、手相診断の入力情報（手相の選択データ）を一時的に処理しますが、サーバーへの保存は行いません。ユーザーを特定できる個人情報の収集は行っておりません。</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-800 mb-2">3. Cookieおよびアクセス解析</h2>
            <p>当サービスでは、Google AdSenseによる広告配信のためにCookieを使用することがあります。Cookieにより収集される情報は匿名であり、個人を特定するものではありません。ブラウザの設定によりCookieを無効にすることができます。</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-800 mb-2">4. 広告について</h2>
            <p>当サービスはGoogle AdSense、A8.netのアフィリエイトプログラムを利用しています。これらの広告配信業者はCookieを使用して、ユーザーの興味に応じた広告を表示することがあります。</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-800 mb-2">5. 第三者へのデータ提供</h2>
            <p>当サービスは、法令に基づく場合を除き、ユーザーの情報を第三者に提供・開示することはありません。</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-800 mb-2">6. 免責事項</h2>
            <p>当サービスの診断結果はエンターテインメント目的であり、占いや医療・法律等の専門的なアドバイスに代わるものではありません。診断結果に基づく行動については、ユーザー自身の責任においてご判断ください。</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-800 mb-2">7. プライバシーポリシーの変更</h2>
            <p>本ポリシーは必要に応じて変更することがあります。変更後はこのページに掲載します。</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-800 mb-2">8. お問い合わせ</h2>
            <p>本ポリシーに関するお問い合わせはサイト内のお問い合わせフォームよりご連絡ください。</p>
          </section>

          <p className="text-gray-400 text-xs pt-4">制定日：2026年3月8日</p>
        </div>

        <div className="mt-8 text-center space-x-4">
          <Link href="/changelog" className="text-purple-600 hover:underline text-sm">
            更新履歴
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-purple-600 hover:underline text-sm">
            ← トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
