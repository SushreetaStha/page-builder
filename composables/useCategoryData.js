const useCategoryData = () => {
    const categoryData = useState('category', () => [])

    const setCategoryData = (category) => {
        categoryData.value = category
    }

    return {
        categoryData,
        setCategoryData
    }
}

export default useCategoryData