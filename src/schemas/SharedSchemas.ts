import { z } from 'zod';

export const LocalizedStringSchema = z.string();
export type LocalizedStringResponse = z.infer<typeof LocalizedStringSchema>;
