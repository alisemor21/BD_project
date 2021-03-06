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
    const { contactFaceList, clientInfos, id } = client ?? {};
    const { name, phone, city, email, fax, mailAdress, denied, inn, ogrn, status } = clientInfos ?? {};
    return {
        expandable: !!contactFaceList?.length,
        id,
        contactFaceList,
        name,
        inn,
        status,
        phone,
        city,
        mailAdress,
        denied,
        email,
        fax,
        ogrn,
    }
}

export { prepareFormData, covertClientList, covertClient }