
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
    func: T, 
    waitFor: number
) {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>): void => {
        const later = () => {
            timeout = null
            // Função a ser executada que foi passada como parâmetro
            func(...args)
        }

        if(timeout !== null) {
            clearTimeout(timeout)
        }
        // Executa a função após o tempo determinado
        timeout = setTimeout(later, waitFor)
    }
}