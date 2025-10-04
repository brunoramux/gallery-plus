
import Divider from "../../../components/divider";
import InputCheckbox from "../../../components/input-checkbox";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Photo } from "../../photos/models/photo";
import type { Album } from "../models/album";

interface AlbumsListSelectableProps {
  loading?: boolean;
  albums: Album[];
  photo: Photo;
}

export default function AlbumsListSelectable({
  albums,
  photo,
  loading,
}: AlbumsListSelectableProps) {

  function isChecked(albumId: string) {
    return photo?.albums?.some((album) => album.id === albumId);
  }

  function handlePhotoOnAlbunms(albumId: string){
    let albumsIds = []
    // Se estiver marcado, devemos excluir o id do album do array de albums da foto
    if(isChecked(albumId)){
      // Se estiver marcado, desmarca usando o filter pegando todos os ids menos o que foi desmarcado. Retorna apenas os ids que não foram desmarcados
      albumsIds = photo.albums.filter((album) => album.id !== albumId).map((album) => album.id)
      photo.albums = [...photo.albums.filter((album) => album.id !== albumId)]
    } else {
      // Se estiver desmarcado, adiciona o id do album ao array de albums da foto
      const newAlbum = albums.find((album) => album.id === albumId)
      albumsIds = [...photo.albums.map((album) => album.id), albumId]
      photo.albums = [...photo.albums, newAlbum!]
    }
    console.log(albumsIds)
  }

  return (
    <ul className="flex flex-col gap-4">
      {!loading &&
        photo &&
        albums.length > 0 &&
        albums.map((album, index) => (
          <li key={album.id}>
            <div className="flex items-center justify-between gap-1">
              <Text variant="paragraph-large" className="truncate">
                {album.title}
              </Text>
              <InputCheckbox
                defaultChecked={isChecked(album.id)}
                onClick={() => handlePhotoOnAlbunms(album.id)}
              />
            </div>
            {index !== albums.length - 1 && <Divider className="mt-4" />}
          </li>
        ))}
      {loading &&
        Array.from({ length: 5 }).map((_, index) => (
          <li key={`albums-list-${index}`}>
            <Skeleton className="h-[2.5rem]" />
          </li>
        ))}
    </ul>
  );
}