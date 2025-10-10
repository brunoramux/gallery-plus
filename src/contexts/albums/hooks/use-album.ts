import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Album } from "../models/album";
import { api, fetcher } from "../../../helpers/api";
import type { AlbumNewFormData } from "../schemas";

interface AlbumDetailResponse extends Album {}

export default function useAlbum(id?: string) {
    const { data, isLoading } = useQuery<AlbumDetailResponse>({
        queryKey: ['albums', id],
        queryFn: async () => await fetcher(`/albums/${id}`),
        enabled: !!id,
    })

    const queryClient = useQueryClient()

    async function createAlbum(payload: AlbumNewFormData){
        console.log(payload);
         
        try {
            const { data } = await api.post<Album>('/albums', {
                title: payload.title,
            })

            if (payload.photosIds && payload.photosIds.length > 0) {
                payload.photosIds.forEach(async (id) => {
                    await api.put(`/photos/${id}/albums`, {
                        albumsIds: [data.id]
                    })
                })
            }

            queryClient.invalidateQueries({ queryKey: ['albums'] })

            toast.success('Album criado com sucesso!')

        } catch (error) {
            toast.error('Erro ao criar o álbum!')
            throw error
        }
    }

    return { 
        album: data, 
        isLoading,
        createAlbum
    }
}