import { CLIENT_STATUSES } from '@/utils/enums';

const getCLientEnumColor = (code) => {
    switch (code) {
        case 'CURRENT':
            return 'green accent-2';
        case 'INACTIVE':
            return 'grey lighten-1';
        case 'FUTURE':
            return 'cyan accent-1';
        default:
            return 'green accent-2';
    }
}

const getEnumLabel = (code) => {
    return CLIENT_STATUSES[code] ?? 'Неизвестный статус';
}


export { getCLientEnumColor, getEnumLabel }