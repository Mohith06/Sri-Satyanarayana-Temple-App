import { TempleColors } from "@/constants/Colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof TempleColors
): string {
  return props.light ?? TempleColors[colorName];
}
