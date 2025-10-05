import Button from "../../../components/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react";
import Skeleton from "../../../components/skeleton";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";
import usePhotos from "../../photos/hooks/use-photos";


interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const { photos, isLoading } = usePhotos()

  function handleTogglePhoto(selected: boolean, photoId: string) {
    console.log({ selected, photoId });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>Criar álbum</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um título" />

          <div className="space-y-3">
            <Text as="div" variant="label-small" className="mb-3">
              Fotos cadastradas
            </Text>

            {!isLoading && photos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {photos.map((photo) => (
                  // Todas as props que eu passaria para o PhotoImagePreview posso passar para o PhotoImageSelectable pois ele extende as props
                  <PhotoImageSelectable
                    key={photo.id}
                    src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                    title={photo.title}
                    className="w-20 h-20 rounded"
                    onSelectImage={(selected) => handleTogglePhoto(selected, photo.id)}
                  />
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={`photo-loading-${index}`}
                    className="w-20 h-20 rounded"
                  />
                ))}
              </div>
            )}

            {!isLoading && photos.length === 0 && (
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <SelectCheckboxIllustration />
                <Text variant="paragraph-medium" className="text-center">
                  Nenhuma foto disponível para seleção
                </Text>
              </div>
            )}
          </div>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}