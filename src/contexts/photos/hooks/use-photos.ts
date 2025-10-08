import { useQuery } from "@tanstack/react-query";
import type { Photo } from "../models/photo";
import { fetcher } from "../../../helpers/api";
import { createSerializer, parseAsString, useQueryState } from 'nuqs'

const toSearchParams = createSerializer({
    albumId: parseAsString,
    q: parseAsString
})

export default function usePhotos(){
    const [ albumId, setAlbumId ] = useQueryState("albumId")
    const [ q, setQ ] = useQueryState("q")

    const { data, isLoading } = useQuery<Photo[]>({
        queryKey: ['photos', albumId, q],
        queryFn: async () => await fetcher(`/photos${toSearchParams({ albumId, q })}`),
    });

    return { 
        photos: data || [], 
        isLoading,
        filter: {
            albumId,
            setAlbumId,
            q,
            setQ
        }
    };
}