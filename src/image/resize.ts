/**
 * Compresses and resizes an image to a given size.
 * @param file The image file to compress and resize.
 * @param maxWidth The maximum width of the image.
 * @param maxHeight The maximum height of the image.
 * @param quality The quality of the image. 0 is worst, 100 is best.
 * @returns The compressed and resized image.
 */
export const compressAndResizeImage = async (file: File, maxWidth = 2000, maxHeight = 2000, quality = 90): Promise<File> => {
    const image = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if(!ctx) throw new Error('Failed to create canvas context');
    const ratio = Math.min(Math.min(maxWidth / image.width, maxHeight / image.height), 1);
    canvas.width = image.width * ratio;
    canvas.height = image.height * ratio;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const blob = await fetch(dataUrl).then(r => r.blob());
    return new File([blob], file.name, {type: file.type});
}