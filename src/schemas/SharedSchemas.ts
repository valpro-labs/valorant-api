import { z } from 'zod';

/** Schema for a localized string value. */
export const LocalizedStringSchema = z.string();
/** A localized string value. */
export type LocalizedStringResponse = z.infer<typeof LocalizedStringSchema>;
