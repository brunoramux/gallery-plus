import { z } from 'zod'

export const photoNewFormSchema = z.object({
    title: z.string().min(1, { message: "Campo obrigatório" }).max(255, { message: "Máximo de 255 scaracteres" }),
    file: z.instanceof(FileList).refine(file => file.length > 0, { message: "Arquivo obrigatório" }),
    albumsIds: z.array(z.string().uuid()).optional(),
})

export type PhotoNewFormData = z.infer<typeof photoNewFormSchema>