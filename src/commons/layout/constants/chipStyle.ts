const CHIP_BASE_CLASS_NAME = "rounded-button";

export const CHIP_PADDING_CLASS_NAME = {
  sm: "px-2 py-1",
  md: "px-3 py-1.5",
} as const;

export type ChipSize = keyof typeof CHIP_PADDING_CLASS_NAME;

export const CHIP_CLASS_NAME = `${CHIP_BASE_CLASS_NAME} ${CHIP_PADDING_CLASS_NAME.sm}`;

export const chipClassName = (size: ChipSize) =>
  `${CHIP_BASE_CLASS_NAME} ${CHIP_PADDING_CLASS_NAME[size]}`;
