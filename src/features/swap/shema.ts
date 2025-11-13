import { z } from 'zod'

export const SwapFormSchema = z.object({
  fromAmount: z
    .string()
    .trim()
    .regex(/^\d*\.?\d+$/, { message: 'Enter a number' })
    .refine((v) => Number(v) > 0, { message: 'Must be greater than 0' }),
})

export type SwapFormValues = z.infer<typeof SwapFormSchema>
