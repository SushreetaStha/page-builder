const useImageData = () => {
    const imageData = useState('image', () => [])

    const setImageData = (image) => {
        imageData.value = image
    }

    return {
        imageData,
        setImageData
    }
}

export default useImageData