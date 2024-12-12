const baseURL = 'https://kumi-kemerovo.ru/table-inner/api/'
const debug = true

export default {
    async getList(filters) {
        if (debug) return [
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
        ]

        const url = new URL(baseURL + 'list/')
        url.search = new URLSearchParams(filters).toString()
        const response = await fetch(url, {
            credentials: "same-origin",
        });
        const data = await response.json()
        return data
    },

    async createRow() {
        if (debug) return {id: 2, name: "Попов",date: new Date().toISOString().substring(0,10),object: "",sum: "",kbk: "",dateDeposit: "",nameAccountant: "",type: "",dateConclusion: ""}
        
        const response = await fetch(baseURL + 'create/', {
            method: 'POST',
            credentials: "same-origin",
        });
        const data = await response.json();  
        return data
    },

    async updateItem(id, data) {
        if (debug) return true
        const response = await fetch(baseURL + 'update/', {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({id, data})
        })
        return response?.ok ?? false
    },

    async getTableData() {
        if (debug) return {
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
            years: [2024, 2023, 2022]
        
        }
        const response = await fetch(baseURL + 'table-data.php/', {
             credentials: "same-origin"
        });
        const data = await response.json()
        return data
    },

    async getHistory(id) {
        if (debug) return [
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
        const response = await fetch(baseURL + `history/?id=${id}`, {
            credentials: "same-origin"
       });
        const data = await response.json()
        return data
    }
}