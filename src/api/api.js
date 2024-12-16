const baseURL = 'https://kumi-kemerovo.ru/table-inner/api/api.php'
const DEV = import.meta.env.DEV

async function apiFetch({event='all', method='GET', body = {}, getParams = {}}, getData = true) {
    const url = new URL(baseURL)
    url.search = new URLSearchParams({'s__type_event': event, ...getParams}).toString();
    const params = {
        method,
        credentials: "same-origin",
        headers: {'Content-Type': 'application/json;charset=utf-8'},
    }
    if (method === 'POST') params.body = JSON.stringify(body);
    const res = await fetch(url, params)
    if (!getData) return res
    const data = await res.json()
    return data;
}

export default {
    async createRow() {
        if (DEV) return {id: 2, name: "Попов",date: new Date().toISOString().substring(0,10),object: "",sum: "",kbk: "",dateDeposit: "",nameAccountant: "",type: "",dateConclusion: ""}
        
        const data = await apiFetch({event:'create', method: 'POST',});
        return data
    },

    async updateItem(id, data) {
        if (DEV) return true

        const response = await apiFetch({event: 'update', method: 'POST', body:{id, data}}, false);
        return response?.ok ?? false
    },

    async getTableData(filters, isMounted) {
        if (DEV) return {
            items: [
                {
                    id: 0,
                    name: "Попов",
                    date: "2024-11-05",
                    object: "заправки",
                    sum: "10000000",
                    kbk: "453",
                    dateDeposit: "2024-11-06",
                    nameAccountant: "Чериаковцева",
                    type: "Договор",
                    dateConclusion: "2024-11-07",
                },
                {
                    id: 1,
                    name: "Попов",
                    date: "2024-11-04",
                    object: "заправки",
                    sum: "30000",
                    kbk: "453",
                    dateDeposit: "2024-11-07",
                    nameAccountant: "Петров",
                    type: "Договор",
                    dateConclusion: "2023-11-12"
                }
            ],
            columns: [
                {
                name: 'name',
                title: "ФИО инициатора",
                type: "select",
                options: ["Попов","Иванов", "Петров", "Сидоров"]
                },
                {
                name: 'date',
                title: "Дата служ.зап.",
                type: "date"
                },
                {
                name: 'object',
                title: "предмет",
                type: "text",
                },
                {
                name: 'sum',
                title: "сумма, руб",
                type: "money",
                },
            
                {
                name: 'kbk',
                title: "КБК",
                type: "select",
                options: ["453", "454", "455", "456"]
                },
                {
                name: 'dateDeposit',
                title: "дата внес. В П-Г",
                type: "date"
                },
                {
                name: 'nameAccountant',
                title: "ФИО чл.к.сл.",
                type: "select",
                options: ["Чериаковцева", "Иванов", "Петров", "Сидоров"]
                },
                {
                name: 'type',
                title: "Тип",
                type: "select",
                options: ["Договор", "Контракт", "аукцион"],
                width: "100"
                },
                {
                name: 'dateConclusion',
                title: "дата заключ.",
                type: "date"
                },
                {
                name: 'history',
                title: "история измен.",
                type: "history"
                }
            ],
        }

        const data = await apiFetch({event: isMounted ? 'all' : 'get_fields', body:filters});
        return data
    },

    async getHistory(id) {
        if (DEV) return [
            {
                name: "Попов",
                date: "2024-02-24",
                text: "Добавил предмет"
            },
            {
                name: "Сидоров",
                date: "2024-02-25",
                text: "Изменил КБК"
            }
        ]

        const data = await apiFetch({event: 'get_history', getParams:{id}});
        return data
    }
}