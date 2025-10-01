import Button from "./components/button";
import ButtonIcon from "./components/button-icon";
import ChevronLeftIcon from "./assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "./assets/icons/chevron-right.svg?react";
import Badge from "./components/badge";
import Alert from "./components/alert";
import Divider from "./components/divider";
import InputText from "./components/input-text";
import searchIcon from "./assets/icons/search.svg?react";
import InputCheckbox from "./components/input-checkbox";
import { useForm } from "react-hook-form";
import InputSingleFile from "./components/input-single-file";
import ImageFilePreview from "./components/image-file-preview";

export default function App() {
	// Cria o formulário usando react-hook-form
	const form = useForm()	

	// Observa o campo 'file' do formulário para obter o arquivo selecionado
	const file = form.watch('file')

	// Cria uma URL para o arquivo selecionado para pré-visualização. O arquivo se encontra no computador do usuário.
	// Se nenhum arquivo for selecionado, fileSource será undefined.
	// URL.createObjectURL cria uma URL temporária que pode ser usada como fonte para elementos de mídia, como imagens ou vídeos.
	// Isso permite que o componente exiba uma pré-visualização do arquivo selecionado.
	// Lembre-se de que essa URL deve ser liberada usando URL.revokeObjectURL quando não for mais necessária para evitar vazamentos de memória.
	const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined

	return (
		<div className="grid gap-7 p-6">
			<div className="flex gap-3">
				<Button>Button</Button>
				<Button variant="secondary">Button</Button>
				<Button disabled>Button</Button>
				<Button handling>Loading</Button>
				<Button icon={ChevronRightIcon}>Próxima Imagem</Button>
				<Button variant="ghost" size="sm">
					Button
				</Button>
				<Button variant="primary" size="sm">
					Button
				</Button>
			</div>

			<div className="flex gap-3">
				<ButtonIcon icon={ChevronLeftIcon} />
				<ButtonIcon icon={ChevronRightIcon} variant="secondary" />
			</div>

			<div className="flex gap-3">
				<Badge>Todos</Badge>
				<Badge>Natureza</Badge>
				<Badge>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
			</div>

			<div>
				<Alert>
					Tamanho máximo: 50MB
					<br />
					Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP
				</Alert>
			</div>

			<div>
				<Divider />
			</div>

			<div>
				<InputText icon={searchIcon} placeholder="Buscar foto"/>
				<hr />
				<InputCheckbox />
			</div>

			<div>
				<InputSingleFile 
					form={form} 
					{...form.register('file')} 
					allowedFileTypes={['jpeg', 'png']} 
					maxFileSizeInMB={50}
					replaceBy={<ImageFilePreview src={fileSource} />}
				/>
			</div>
		</div>
	);
}
