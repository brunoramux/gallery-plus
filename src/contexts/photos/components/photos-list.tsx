import PhotoWidget from "./photo-widget";
import type { Photo } from "../models/photo";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";

interface PhotosListProps {
  photos: Photo[];
  loading?: boolean;
}

export default function PhotosList({ photos, loading }: PhotosListProps) {
  return (
    <div className="space-y-6">
      <Text
        as="div"
        variant="paragraph-large"
        className="flex items-center justify-end gap-1 text-accent-span"
      >
        Total: {" "}
        {
          !loading ? (
            <div>{photos.length}</div>
          ) : (
            <Skeleton className="w-6 h-6"/>
          )
        }
      </Text>

      {!loading && photos.length > 0 && (
          <div className="grid grid-cols-4 space-y-4">
            {photos.map((photo) => (
              <PhotoWidget key={photo.id} photo={photo} />
            ))}
          </div>
      )}

      {!loading && photos.length === 0 && (
        <Text variant="paragraph-medium" className="text-center text-accent-span">
          Nenhuma foto encontrada
        </Text>
      )}

      {loading && (
        <div className="grid grid-cols-4 space-y-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <PhotoWidget 
              key={`photo-loading-${index}`} 
              photo={{} as Photo} 
              loading 
            />
          ))}
        </div>
      )}
    </div>
    
  )
}