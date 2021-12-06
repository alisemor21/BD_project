const prepareFormData = (form) => {
    const pureForm = {}
    Object.entries(form).forEach(([key, value]) => {
        if (value && typeof value !== "object") {
            pureForm[key] = value;
        }
    })
    return pureForm
}

const covertClientList = (clientList = []) => {
    return clientList.map(covertClient)
}

const covertClient = (client = {}) => {
    const { contactFaceList, clientInfos, id, status } = client ?? {};
    const { name, address, phone, city, email, fax, mailAdress, inn, ogrn } = clientInfos ?? {};
    return {
        expandable: !!contactFaceList?.length,
        id,
        contactFaceList,
        name,
        inn,
        status,
        address,
        phone,
        city,
        mailAdress,
        email,
        fax,
        ogrn,
    }
}

export { prepareFormData, covertClientList, covertClient }