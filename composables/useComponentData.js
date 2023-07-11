const useComponentData = () => {
    const componentData = useState('component', () => [])

    const setComponentData = (component) => {
        componentData.value = component
    }

    return {
        componentData,
        setComponentData
    }
}

export default useComponentData