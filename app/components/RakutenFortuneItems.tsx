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

// Vercel Hobby プラン 商用利用NG規約（Fair Use Guidelines）対応のため無効化（2026/04/23）
// 収益化見込みが立った段階で Vercel Pro 切替＋元の実装復活
export function buildAffiliateUrl(_keyword: string): string {
  return "#";
}

interface Props {
  fortuneType: FortuneType;
}

export default function RakutenFortuneItems(_props: Props) {
  return null;
}

