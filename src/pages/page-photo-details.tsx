
import Button from "../components/button";
import Container from "../components/container";
import ImageFilePreview from "../components/image-file-preview";
import Skeleton from "../components/skeleton";
import Text from "../components/text";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-albums";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import type { Photo } from "../contexts/photos/models/photo";

export default function PagePhotoDetails() {
  const { albums, isLoadingAlbums } = useAlbums();

  const photo = {
    id: "123",
    title: "Olá mundo!",
    imageId: "portrait-tower.png",
    albums
  } as Photo;

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingAlbums ? (
          <Text variant="heading-large">{photo.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingAlbums ? (
            <ImageFilePreview
              src={`/images/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}

          {!isLoadingAlbums ? (
            <Button
              variant="destructive"
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