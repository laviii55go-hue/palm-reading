/**
 * 恐竜キャラ切り抜き（public/dinosaur/characters/）
 * OneDrive からリネーム配置する想定のファイル名と対応
 */

/** ライフパス番号 → 画像パス（未配置時は 404 になるので、配置後に表示される） */
export const DINOSAUR_CHARACTER_PATHS: Record<number, string> = {
  1: "/dinosaur/characters/01_tyrannosaurus.png",
  2: "/dinosaur/characters/02_maiasaura.png",
  3: "/dinosaur/characters/03_pteranodon.png",
  4: "/dinosaur/characters/04_ankylosaurus.png",
  5: "/dinosaur/characters/05_velociraptor.png",
  6: "/dinosaur/characters/06_triceratops.png",
  7: "/dinosaur/characters/07_stegosaurus.png",
  8: "/dinosaur/characters/08_spinosaurus.png",
  9: "/dinosaur/characters/09_brachiosaurus.png",
  11: "/dinosaur/characters/11_parasaurolophus.png",
  /** 指示書の 10_ケツァルコアトルス（翼竜） */
  22: "/dinosaur/characters/10_quetzalcoatlus.png",
  /** 指示書の 12_オヴィラプトル */
  33: "/dinosaur/characters/12_oviraptor.png",
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
  return basePath.replace(".png", `_${emotion}.png`);
}
