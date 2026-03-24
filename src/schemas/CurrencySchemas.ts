import { z } from 'zod';

/** Schema for a single in-game currency. */
export const CurrencySchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  displayNameSingular: z.string(),
  displayIcon: z.string().url(),
  largeIcon: z.string().url(),
  rewardPreviewIcon: z.string().url(),
  assetPath: z.string(),
});
/** A single in-game currency. */
export type CurrencyResponse = z.infer<typeof CurrencySchema>;

/** Schema for a list of in-game currencies. */
export const CurrenciesSchema = z.array(CurrencySchema);
/** A list of in-game currencies. */
export type CurrenciesResponse = z.infer<typeof CurrenciesSchema>;
