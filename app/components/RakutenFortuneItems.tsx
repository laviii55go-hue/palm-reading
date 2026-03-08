import { FortuneType } from "../types";

export const AFFILIATE_BASE =
  // TODO: ここをあなたの楽天アフィリエイトIDに差し替えてください
  // 例）https://hb.afl.rakuten.co.jp/hgc/あなたのID/?pc=
  "https://hb.afl.rakuten.co.jp/hgc/51b2aa6a.41cda442.51b2aa6b.ec7875f8/?pc=";

export type FortuneItems = {
  title: string;
  lead: string;
  items: {
    label: string;
    keyword: string;
    description: string;
  }[];
};

export function getFortuneItems(fortuneType: FortuneType): FortuneItems {
  switch (fortuneType) {
    case "money":
      return {
        title: "金運アップにおすすめの開運アイテム",
        lead: "金運の流れをさらに良い方向へ後押ししてくれるアイテムです。",
        items: [
          {
            label: "開運財布",
            keyword: "開運財布",
            description: "お金が育つと言われるカラーや素材の財布で、金運の土台を整えましょう。",
          },
          {
            label: "タイガーアイのパワーストーン",
            keyword: "タイガーアイ パワーストーン",
            description: "判断力と行動力を高め、チャンスをつかみやすくしてくれる金運の定番ストーンです。",
          },
        ],
      };
    case "love":
    case "marriage":
    case "relationship":
      return {
        title: "恋愛運・ご縁を育てる開運アイテム",
        lead: "優しいご縁や出会いを呼び込みたいときにおすすめの組み合わせです。",
        items: [
          {
            label: "ローズクォーツのアクセサリー",
            keyword: "ローズクォーツ",
            description: "自己肯定感を高め、恋愛運アップのお守りとして人気のストーンです。",
          },
          {
            label: "縁結びのお守り",
            keyword: "縁結び お守り",
            description: "ご縁を大切に育てたい人に。カバンやポーチにつけてさりげなく持ち歩けます。",
          },
        ],
      };
    case "career":
      return {
        title: "仕事運を底上げする実用アイテム",
        lead: "集中力と成果アップをサポートしてくれるビジネス向けアイテムです。",
        items: [
          {
            label: "高機能システム手帳",
            keyword: "システム手帳",
            description: "タスクや目標を書き出して整理することで、チャンスを逃さず掴みやすくなります。",
          },
          {
            label: "勝負運アクセサリー",
            keyword: "勝負運 アクセサリー",
            description: "ここ一番のプレゼンや商談など、勝負どころでそっと背中を押してくれるお守りです。",
          },
        ],
      };
    case "health":
      return {
        title: "健康運を整えるセルフケアアイテム",
        lead: "日々のコンディションづくりをサポートしてくれる心強い味方たちです。",
        items: [
          {
            label: "サプリメント・栄養サポート",
            keyword: "サプリメント",
            description: "不足しがちな栄養素を補って、ベースの体調を整えることから始めましょう。",
          },
          {
            label: "勝負運アクセサリー",
            keyword: "勝負運 アクセサリー",
            description: "検査や試合など、体力勝負の場面で心を落ち着かせてくれるお守りアイテムです。",
          },
        ],
      };
    default:
      return {
        title: "運気全体を底上げする開運アイテム",
        lead: "どの運気にもバランスよく働きかけてくれる、汎用性の高いアイテムです。",
        items: [
          {
            label: "開運グッズ・お守り",
            keyword: "開運 グッズ",
            description: "毎日目に入る場所に置ける小さな開運アイテムで、気分と運気を整えましょう。",
          },
          {
            label: "パワーストーンブレスレット",
            keyword: "パワーストーン ブレスレット",
            description: "自分に合った石の組み合わせを選んで、さりげなく運気アップを目指せます。",
          },
        ],
      };
  }
}

export function buildAffiliateUrl(keyword: string): string {
  const searchUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`;
  return `${AFFILIATE_BASE}${encodeURIComponent(searchUrl)}`;
}

interface Props {
  fortuneType: FortuneType;
}

export default function RakutenFortuneItems({ fortuneType }: Props) {
  const fortuneItems = getFortuneItems(fortuneType);

  return (
    <section className="rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 p-4 space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <span className="text-2xl" aria-hidden="true">
            🛍️
          </span>
          <div>
            <p className="text-xs font-bold text-pink-700">{fortuneItems.title}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-gray-600">{fortuneItems.lead}</p>
          </div>
        </div>
        <span className="text-[11px] text-gray-400 font-medium">PR</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {fortuneItems.items.map((item) => {
          const href = buildAffiliateUrl(item.keyword);
          return (
            <a
              key={item.keyword}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-pink-100 bg-white/80 p-3 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-md"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-pink-700">{item.label}</p>
                <span className="text-[10px] text-gray-400">楽天市場</span>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-600 mb-2">{item.description}</p>
              <div className="flex items-center justify-between text-[11px] text-pink-600">
                <span className="inline-flex items-center gap-1">
                  <span>楽天で詳しく見る</span>
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
                <span className="text-[10px] text-gray-400">広告リンク</span>
              </div>
            </a>
          );
        })}
      </div>

      <p className="text-[10px] leading-relaxed text-gray-400">
        ※リンク先は楽天市場の検索結果ページです。商品購入などにより、サイト運営者に報酬が発生する場合があります。
      </p>
    </section>
  );
}

