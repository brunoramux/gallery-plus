import { z } from 'zod'

export const albumNewFormSchema = z.object({
    title: z.string().min(1, 'Campo obrigatório').max(255, 'Máximo de 255 caracteres'),
    photosIds: z.array(z.string().uuid()).optional(),
})


export type AlbumNewFormData = z.infer<typeof albumNewFormSchema>