/**
 * VIN validation constants and rules
 */

export const VIN_REGEX = /^[A-HJ-NPR-Z0-9]+$/i;
export const VIN_MAX_LENGTH = 17;

export const VIN_VALIDATION_RULES = {
  required: "VIN code is required",
  maxLength: {
    value: VIN_MAX_LENGTH,
    message: "VIN code must not exceed 17 characters",
  },
  pattern: {
    value: VIN_REGEX,
    message: "VIN code contains invalid characters (I, O, Q are not allowed)",
  },
} as const;
