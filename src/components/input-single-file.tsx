import { tv, type VariantProps } from "tailwind-variants";
import Icon from "./icon";
import Text, { textVariants } from "./text";
import UploadFileIcon from "../assets/icons/upload-file.svg?react";
import FileImageIcon from "../assets/icons/upload-file.svg?react";
import { useWatch } from "react-hook-form";
import React from "react";

export const inputSingleFileVariants = tv({
  base: `
    flex flex-col items-center justify-center w-full
    border border-solid border-border-primary
    group-hover:border-border-active
    rounded-lg gap-1 transition
  `,
  variants: {
    size: {
      md: "px-5 py-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const inputSingleFileIconVariants = tv({
  base: "fill-placeholder",
  variants: {
    size: {
      md: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface InputSingleFileProps
  extends VariantProps<typeof inputSingleFileVariants>,
    Omit<React.ComponentProps<"input">, "size"> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form: any,
        error?: React.ReactNode
        allowedFileTypes: string[]
        maxFileSizeInMB: number
        replaceBy: React.ReactNode
    }

export default function InputSingleFile({ size, error, form, allowedFileTypes, maxFileSizeInMB, replaceBy, ...props }: InputSingleFileProps) {
    // Lógica para lidar com o arquivo selecionado no formulário. useMemo para otimizar e impedir re-renderizações desnecessárias.
    // formValues é um objeto que contém todos os valores do formulário, onde a chave é o nome do campo.
    // formField é o valor específico do campo de arquivo, que é o primeiro arquivo selecionado (index 0).
    // Se nenhum arquivo for selecionado, formField será undefined.
    // Isso permite que o componente reaja às mudanças no campo de arquivo e exiba o nome do arquivo ou outras informações conforme necessário.
    // Se o formField mudar, a função dentro do useMemo será reexecutada para obter o novo valor e o componente será atualizado.

    const formValues = useWatch({ control: form.control });
    const name = props.name || ""
    const formField: File = React.useMemo(() => formValues[name]?.[0], [formValues, name]);

    const { fileExtension, fileSize } = React.useMemo(() => ({
        fileExtension: formField?.name?.split('.')?.pop()?.toLowerCase() || "",
        fileSize: formField?.size || 0,
    }), [formField])

    function isValidFileExtension() {
        return allowedFileTypes.includes(fileExtension) 
    }

    function isValidFileSize(){
        return fileSize <= maxFileSizeInMB * 1024 * 1024
    }

    function validateFile(){
        return isValidFileExtension() && isValidFileSize()
    }


  return (
    <div>
        { !formField || !validateFile() ? (
            <>
                <div className="w-full relative group cursor-pointer">
                    <input
                        type="file"
                        className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
                        {...props}
                    />
                    <div className={inputSingleFileVariants({ size })}>
                        <Icon
                            svg={UploadFileIcon}
                            className={inputSingleFileIconVariants({ size })}
                        />
                        <Text variant="label-medium" className="text-placeholder text-center">
                            Arraste o arquivo aqui
                            <br />
                            ou clique para selecionar
                        </Text>
                    </div>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                    {
                        formField && !isValidFileExtension() && (
                            <Text variant="label-small" className="text-accent-red">
                                Formato inválido. Tipos permitidos: { allowedFileTypes?.join(", ") }
                            </Text>
                        )
                    }
                    {
                        formField && !isValidFileSize() && (
                            <Text variant="label-small" className="text-accent-red">
                                Tamanho do arquivo excede o limite de { maxFileSizeInMB }MB.
                            </Text>
                        )
                    }
                    {
                        error && (
                            <Text variant="label-small" className="text-accent-red">
                                Erro
                            </Text>
                        )
                    }
                </div>
                
            </>
        ): (
            <>
                { replaceBy }
                <div className="flex gap-3 items-center border border-solid border-border-primary mt-5 p-3 rounded">
                    <Icon svg={FileImageIcon} className="fill-white w-6 h-6" />
                    <div className="flex flex-col">
                        <div className="truncate max-w-80">
                            <Text variant="label-medium" className="text-placeholder">
                                {formField.name}
                            </Text>
                        </div>
                        <div className="flex">
                            <button
                                type="button"
                                className={textVariants({
                                variant: "label-small",
                                className: "text-accent-red cursor-pointer hover:underline",
                            })}
                                onClick={() => { form.setValue(name, null) }}
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )}
    </div>
  );
}