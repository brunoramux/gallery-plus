import InputText from "./input-text";
import SearchIcon from "../assets/icons/search.svg?react"
import React from "react";
import { debounce } from "../helpers/utils";

export default function PhotosSearch() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = React.useCallback(
        debounce((value: string) => {
            console.log("Valor com debounce", value)
        }, 1000), 
        []
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