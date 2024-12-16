const baseURL = 'https://kumi-kemerovo.ru/table-inner/api/api.php'
const DEV = import.meta.env.DEV
const testResult = DEV ? await import('./dev-result.json', { assert: { type: 'json' }}) : {}

async function apiFetch({event='all', method='GET', body = {}, getParams = {}}, getData = true) {
    const url = new URL(baseURL)
    url.search = new URLSearchParams({'s__type_event': event, ...getParams}).toString()
    const params = {
        method,
        credentials: "same-origin",
        headers: {'Content-Type': 'application/json;charset=utf-8'},
    }
    if (method === 'POST') params.body = JSON.stringify(body)
    const res = await fetch(url, params)
    if (!getData) return res
    return await res.json()
}

export default {
    async createRow() {
        if (DEV) return testResult.createRow
        
        const data = await apiFetch({event:'create', method: 'POST',})
        return data
    },

    async updateItem(id, data) {
        if (DEV) return true

        const response = await apiFetch({event: 'update', method: 'POST', body:{id, data}}, false)
        return response?.ok ?? false
    },

    async getTableData(filters, isMounted) {
        if (DEV) return isMounted ? testResult.fields : {items: testResult.fields.items}

        const data = await apiFetch({event: isMounted ? 'all' : 'get_fields', body:filters})
        return data
    },

    async getHistory(id) {
        if (DEV) return testResult.history

        const data = await apiFetch({event: 'get_history', getParams:{id}})
        return data
    }
}