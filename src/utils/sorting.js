export function getCleanName(value) {
    const isDown = value.endsWith('_down');
    const cleanName = value.replace('_down', '').replace('_up', '');
    return {cleanName,  isDown}
}


export function sortTable(arr, field, columns) {
    if (!field) {
        return arr;
    }
    const {cleanName,  isDown} = getCleanName(field);
    const type = columns.find((item)=> item.name === cleanName)?.type;

    const sorting = (a, b) => isDown ? (b - a) : (a - b);

    return arr.sort((a, b) => {
        const aValue = a[cleanName];
        const bValue = b[cleanName];
        if (type === 'money') {
            return sorting(parseFloat(bValue), parseFloat(aValue))
        } else if (type === 'date') {
            return sorting(new Date(bValue), new Date(aValue))
        } else {
            return isDown ? ('' + bValue).localeCompare(aValue) : ('' + aValue).localeCompare(bValue)
        }
    })  
}