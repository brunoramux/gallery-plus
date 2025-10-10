import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";
import type { PhotoNewFormData } from "../schemas";
import { toast } from "sonner";

interface PhotoDetailResponse extends Photo {
    nextPhotoId?: string;
    previousPhotoId?: string;
}

export default function usePhoto(id?: string) {
    const { data, isLoading } = useQuery<PhotoDetailResponse>({
        queryKey: ['photo', id],
        queryFn: async () => await fetcher(`/photos/${id}`),
        enabled: !!id,
    })

    

    const queryClient = useQueryClient()

    async function createPhoto(payload: PhotoNewFormData){
         
        try {
            const { data } = await api.post<Photo>('/photos', {
                title: payload.title,
            })

            await api.post(`/photos/${data.id}/image`, {
                file: payload.file,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (payload.albumsIds && payload.albumsIds.length > 0) {
                await api.put(`/photos/${data.id}/albums`, {
                    albumsIds: payload.albumsIds
                })
            }

            queryClient.invalidateQueries({ queryKey: ['photos'] })

            toast.success('Foto criada com sucesso!')

        } catch (error) {
            toast.error('Erro ao criar a foto!')
            throw error
        }
    }

    async function deletePhoto(id: string) {
        try {
            await api.delete(`/photos/${id}`)
            queryClient.invalidateQueries({ queryKey: ['photos'] })
            toast.success('Foto deletada com sucesso!')
            setTimeout(() => window.location.href = '/', 1000)
        } catch (error) {
            toast.error('Erro ao deletar a foto!')
            throw error
        }
    }

    return { 
        photo: data, 
        nextPhotoId: data?.nextPhotoId,
        previousPhotoId: data?.previousPhotoId,
        isLoading,
        createPhoto,
        deletePhoto
    }
}