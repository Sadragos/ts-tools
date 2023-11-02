/**
 * Converts a file to a base64 string
 * @param blob 
 * @returns 
 */
export const file2base64 = async (blob: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            if(typeof reader.result === 'string') resolve(reader.result);
            else reject(new Error('Failed to read file'));
        }
        reader.onerror = reject;
    });
}

/**
 * Converts a base64 string to a file
 * @param base64
 * @param filename
 * @returns
 */
export const base642file = async (base64: string, filename: string): Promise<File> => {
    return fetch(base64)
        .then(res => res.blob())
        .then(blob => new File([blob], filename, { type: blob.type }));
}