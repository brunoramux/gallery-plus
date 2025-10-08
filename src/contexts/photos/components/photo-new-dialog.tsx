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
import { photoNewFormSchema, type PhotoNewFormData } from "../schemas";
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from "react";
import usePhoto from "../hooks/use-photo";

interface PhotoNewDialogProps {
    trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
    const [isOpen, setIsOpen] = useState(false)

    const form = useForm<PhotoNewFormData>({
        resolver: zodResolver(photoNewFormSchema),
    })

    const { albums, isLoadingAlbums } = useAlbums()
    const [ isCreatingPhoto, setIsCreatingPhoto ] = useTransition()
    const { createPhoto } = usePhoto()

    // Pegar URL completa de localização do arquivo para enviar ao componente de Preview da Imagem
    const file = form.watch("file")
    const albumsIds = form.watch("albumsIds")
    const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined

    function handleSubmit(payload: PhotoNewFormData) {
        setIsCreatingPhoto(async () => {
            await createPhoto(payload)
            setIsOpen(false)
        })
    }

    React.useEffect(() => {
        if (!isOpen) {
            form.reset()
        }
    }, [isOpen, form])

    function handleToggleAlbum(albumId: string) {
        const albumsIds = form.getValues("albumsIds") || []
        const albumsSet = new Set(albumsIds)

        if(albumsSet.has(albumId)) {
            albumsSet.delete(albumId)
        } else {
            albumsSet.add(albumId)
        }

        form.setValue("albumsIds", Array.from(albumsSet))
    }
    

    return (    
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            
                <DialogContent>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <DialogHeader>Adicionar foto</DialogHeader>

                        <DialogBody className="flex flex-col gap-5">
                            <InputText 
                                placeholder="Adicione uma título " 
                                error={form.formState.errors.title?.message} 
                                {...form.register('title')}
                                disabled={isCreatingPhoto}
                            />

                            <Alert>
                                Tamanho máximo de 50MB. 
                                <br />
                                Formatos suportados: JPG, PNG e JPEG.
                            </Alert>

                            <InputSingleFile 
                                form={form} 
                                allowedFileTypes={['png', 'jpg', 'jpeg']} 
                                maxFileSizeInMB={50} 
                                replaceBy={<ImageFilePreview src={fileSource} className="w-full h-56"/>} 
                                error={form.formState.errors.file?.message}
                                {...form.register('file')}
                                disabled={isCreatingPhoto}
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
                                                variant={albumsIds?.includes(album.id) ? "primary" : "ghost"}
                                                size="sm"
                                                className="truncate"
                                                onClick={() => handleToggleAlbum(album.id)}
                                                disabled={isCreatingPhoto}
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
                                <Button variant="secondary" disabled={isCreatingPhoto}>Cancelar</Button>
                            </DialogClose>

                            <Button disabled={isCreatingPhoto} handling={isCreatingPhoto} type="submit">{isCreatingPhoto ? "Adicionando..." : "Adicionar"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            
        </Dialog>
    )
}