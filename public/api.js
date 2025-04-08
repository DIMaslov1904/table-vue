const TABLE_VUE_API = () => {
  const baseURL = "https://kumi-kemerovo.ru/table-inner/api/api.php";
  const DEV = false;

  async function apiFetch({ event = "all", method = "GET", body = {}, getParams = {} }, getData = true) {
    const url = new URL(baseURL);
    url.search = new URLSearchParams({ s__type_event: event, ...getParams }).toString();
    const params = {
      method,
      credentials: "same-origin",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    };
  	if (method === "POST") params.body = JSON.stringify(body);
    const res = await fetch(url, params);
    if (!getData) return res;

    try {
      return await res.json();
    } catch (e) {
      return res;
    }
  }

  async function apiFetchDev() {
    const res = await fetch("dev-result.json");
    return await res.json();
  }

  return {
    async createRow(date) {
      if (DEV) {
        const res = (await apiFetchDev()).createRow;
        res.id = new Date().getTime();
        return res;
      }

      const data = await apiFetch({ event: "add", method: "POST", getParams: date });
      return data;
    },

    async updateItem(id, data) {
      if (DEV) return true;

      const response = await apiFetch({ event: "update", method: "POST", body: { id, data } }, false);
      return response?.update ?? false;
    },

    async getTableData(filters, isMounted) {
      if (DEV) {
        const res = await apiFetchDev();
        return isMounted ? res.fields : { items: res.fields.items };
      }

      const data = await apiFetch({ event: isMounted ? "get" : "get", getParams: filters });

      if (data.fields === undefined) {
        data.fields = {}
      };

      if (data.fields.columns === undefined) {
        data.fields.columns = []
      }

      if (data.fields.items === undefined) {
        data.fields.items = []
      }

		data.fields.columns.push({
        "name": "history",
        "title": "история измен.",
        "type": "history"
      })


      return data.fields;
    },

    async getHistory(id) {
      if (DEV) return (await apiFetchDev()).history;

      const data = await apiFetch({ event: "history", getParams: { id } });
      return data.history;
    },
  };
};
