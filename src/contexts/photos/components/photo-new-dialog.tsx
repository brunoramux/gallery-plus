import { useForm } from "react-hook-form";
import Alert from "../../../components/alert";
import Button from "../../../components/button";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog";
import ImageFilePreview from "../../../components/image-file-preview";
import InputSingleFile from "../../../components/input-single-file";
import InputText from "../../../components/input-text";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import useAlbums from "../../albums/hooks/use-albums";

interface PhotoNewDialogProps {
    trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
    const form = useForm()
    const { albums, isLoadingAlbums} = useAlbums()
    

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>Adicionar foto</DialogHeader>

                <DialogBody className="flex flex-col gap-5">
                    <InputText placeholder="Adicione uma título " />

                    <Alert>
                        Tamanho máximo de 50MB. 
                        <br />
                        Formatos suportados: JPG, PNG e JPEG.
                    </Alert>

                    <InputSingleFile 
                        form={form} 
                        allowedFileTypes={['png', 'jpg', 'jpeg']} 
                        maxFileSizeInMB={50} 
                        replaceBy={<ImageFilePreview className="w-full h-56"/>} 
                    />

                    <div className="space-y-2">
                        <div>
                            <Text variant="label-small">Selecionar álbuns</Text>
                        </div>
                        

                        <div className="flex flex-wrap gap-3">
                            {!isLoadingAlbums && albums.length > 0 &&
                                albums.map((album) => (
                                    <Button
                                        key={album.id}
                                        variant="ghost"
                                        size="sm"
                                        className="truncate"
                                    >
                                        {album.title}
                                    </Button>
                                ))}

                            {isLoadingAlbums &&
                                Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton
                                    key={`album-loading-${index}`}
                                    className="w-20 h-7"
                                />
                            ))}
                        </div>
                    </div>
                </DialogBody>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button>Adicionar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}