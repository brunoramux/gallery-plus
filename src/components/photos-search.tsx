import InputText from "./input-text";
import SearchIcon from "../assets/icons/search.svg?react"
import React from "react";
import { debounce } from "../helpers/utils";
import usePhotos from "../contexts/photos/hooks/use-photos";

export default function PhotosSearch() {
    const { filter } = usePhotos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = React.useCallback(
        debounce((value: string) => {
            filter.setQ(value)
        }, 500), 
        [filter.setQ]
    )
    
    const [inputValue, setInputValue] = React.useState('')

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setInputValue(value)
        debouncedSearch(value)
    }
    return (
        <InputText 
            icon={SearchIcon}
            placeholder="Buscar fotos"
            className="flex-1"
            value={inputValue}
            onChange={handleInputChange}
        />
    )
}