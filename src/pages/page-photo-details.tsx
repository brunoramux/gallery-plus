
import { useParams } from "react-router";
import Button from "../components/button";
import Container from "../components/container";
import ImageFilePreview from "../components/image-file-preview";
import Skeleton from "../components/skeleton";
import Text from "../components/text";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-albums";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import type { Photo } from "../contexts/photos/models/photo";
import usePhoto from "../contexts/photos/hooks/use-photo";
import { useQueryClient } from "@tanstack/react-query";

export default function PagePhotoDetails() {
  const { id } = useParams()
  const { photo, nextPhotoId, previousPhotoId, deletePhoto } = usePhoto(id);
  const { albums, isLoadingAlbums } = useAlbums();
  const queryClient = useQueryClient()
  
  async function handleDeletePhoto(id: string) {
    await deletePhoto(id);
    queryClient.invalidateQueries({ queryKey: ['photos'] })
  }

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingAlbums ? (
          <Text variant="heading-large">{photo?.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator 
          previousPhotoId={previousPhotoId} 
          nextPhotoId={nextPhotoId} 
        />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingAlbums ? (
            <ImageFilePreview
              src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}

          {!isLoadingAlbums ? (
            <Button
              variant="destructive"
              onClick={() => handleDeletePhoto(photo!.id)}
            >
              Excluir foto
            </Button>
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>

        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>
          <AlbumsListSelectable
            photo={photo as Photo}
            albums={albums}
          />
        </div>
      </div>
    </Container>
  );
}