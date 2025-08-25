import { createHash } from 'crypto';

export type DownsellVariant = 'A' | 'B';

export interface ABTestConfig {
  variant: DownsellVariant;
  showDownsell: boolean;
  originalPrice: number;
  discountedPrice: number;
  discountAmount: number;
}

/**
 * Generates a deterministic variant based on user ID using crypto hash
 * This ensures the same user always gets the same variant
 */
export function generateDeterministicVariant(userId: string): DownsellVariant {
  // Create SHA-256 hash of user ID
  const hash = createHash('sha256').update(userId).digest('hex');
  
  // Use first character of hash to determine variant (0-7 = A, 8-f = B)
  const firstChar = hash[0];
  const charCode = parseInt(firstChar, 16);
  
  // 50/50 split: 0-7 (8 values) = A, 8-15 (8 values) = B
  return charCode < 8 ? 'A' : 'B';
}

/**
 * Gets A/B test configuration for downsell offer
 */
export function getABTestConfig(
  variant: DownsellVariant, 
  originalPrice: number = 25
): ABTestConfig {
  const discountAmount = 10;
  const discountedPrice = Math.max(originalPrice - discountAmount, 0);
  
  return {
    variant,
    showDownsell: variant === 'B',
    originalPrice,
    discountedPrice,
    discountAmount
  };
}

/**
 * Client-side variant assignment (fallback if no server data)
 */
export function assignVariantClientSide(): DownsellVariant {
  // Use crypto.getRandomValues for secure randomness
  const array = new Uint8Array(1);
  crypto.getRandomValues(array);
  
  // 50/50 split
  return array[0] < 128 ? 'A' : 'B';
}