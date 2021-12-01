const prepareFormData = (form) => {
    const pureForm = {}
    Object.entries(form).forEach(([key, value]) => {
        console.warn({ value });
        if (typeof value !== 'object' && typeof value !== 'array' && value && value?.trim()) {
            pureForm[key] = value.trim()
        }
    })
    return pureForm
}

const covertClientList = (clientList = []) => {
    return clientList.map((client) => ({
        expandable: !!client.contactFaceList?.length,
        ...client.clientInfos,
        ...client,
    }))
}

const covertClient = (client = {}) => {
    return {
        ...client.clientInfos,
        ...client
    }
}

export { prepareFormData, covertClientList, covertClient }