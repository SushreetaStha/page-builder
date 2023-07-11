const usePageItem = () => {
    const pageItem = useState('page', () => [])

    const setPageItem = (page) => {
        pageItem.value = page
    }

    return {
        pageItem,
        setPageItem
    }
}

export default usePageItem