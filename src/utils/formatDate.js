export const formatDate = (date) => {
    return date ? (new Date(date)).toLocaleDateString('ru-RU') : '';;
}