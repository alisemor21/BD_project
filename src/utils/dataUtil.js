const prepareFormData = (form) => {
    const pureForm = {}
    Object.entries(form).forEach(([key, value]) => {
        if (value?.length && value?.trim()) {
            pureForm[key] = value;
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