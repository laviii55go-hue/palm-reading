/**
 * 恐竜キャラ切り抜き（public/dinosaur/characters/）
 * OneDrive からリネーム配置する想定のファイル名と対応
 */

/** ライフパス番号 → 画像パス（未配置時は 404 になるので、配置後に表示される） */
export const DINOSAUR_CHARACTER_PATHS: Record<number, string> = {
  1: "/dinosaur/characters/01_tyrannosaurus.webp",
  2: "/dinosaur/characters/02_maiasaura.webp",
  3: "/dinosaur/characters/03_pteranodon.webp",
  4: "/dinosaur/characters/04_ankylosaurus.webp",
  5: "/dinosaur/characters/05_velociraptor.webp",
  6: "/dinosaur/characters/06_triceratops.webp",
  7: "/dinosaur/characters/07_stegosaurus.webp",
  8: "/dinosaur/characters/08_spinosaurus.webp",
  9: "/dinosaur/characters/09_brachiosaurus.webp",
  11: "/dinosaur/characters/11_parasaurolophus.webp",
  /** 指示書の 10_ケツァルコアトルス（翼竜） */
  22: "/dinosaur/characters/10_quetzalcoatlus.webp",
  /** 指示書の 12_オヴィラプトル */
  33: "/dinosaur/characters/12_oviraptor.webp",
};

/**
 * 恐竜画像パス取得（喜び・悲しみ対応）
 * 喜び・悲しみ画像が無い場合は通常画像にフォールバック
 */
export function getDinosaurImagePath(
  dinoNumber: number,
  emotion: "normal" | "happy" | "sad" = "normal"
): string {
  const basePath = DINOSAUR_CHARACTER_PATHS[dinoNumber];
  if (!basePath) return "";
  if (emotion === "normal") return basePath;
  return basePath.replace(".webp", `_${emotion}.webp`);
}
