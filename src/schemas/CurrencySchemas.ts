import { z } from 'zod';

export const CurrencySchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  displayNameSingular: z.string(),
  displayIcon: z.string().url(),
  largeIcon: z.string().url(),
  rewardPreviewIcon: z.string().url(),
  assetPath: z.string(),
});
export type CurrencyResponse = z.infer<typeof CurrencySchema>;

export const CurrenciesSchema = z.array(CurrencySchema);
export type CurrenciesResponse = z.infer<typeof CurrenciesSchema>;
