const TABLE_VUE_API = () => {
  const baseURL = "https://kumi-kemerovo.ru/table-inner/api/api.php";
  const DEV = true;

  async function apiFetch({ event = "all", method = "GET", body = {}, getParams = {} }, getData = true) {
    const url = new URL(baseURL);
    url.search = new URLSearchParams({ s__type_event: event, ...getParams }).toString();
    const params = {
      method,
      credentials: "same-origin",
      headers: { "Content-Type": "application/json;charset=utf-8" },
    };
    if (method === "POST") params.body = JSON.stringify(body);
    const res = await fetch(url, params);
    if (!getData) return res;
    return await res.json();
  }

  async function apiFetchDev() {
    const res = await fetch("dev-result.json");
    return await res.json();
  }

  return {
    async createRow() {
      if (DEV) {
        const res = (await apiFetchDev()).createRow;
        res.id = new Date().getTime();
        return res;
      }

      const data = await apiFetch({ event: "create", method: "POST" });
      return data;
    },

    async updateItem(id, data) {
      if (DEV) return true;

      const response = await apiFetch({ event: "update", method: "POST", body: { id, data } }, false);
      return response?.ok ?? false;
    },

    async getTableData(filters, isMounted) {
      if (DEV) {
        const res = await apiFetchDev();
        return isMounted ? res.fields : { items: res.fields.items };
      }

      const data = await apiFetch({ event: isMounted ? "all" : "get_fields", body: filters });
      return data;
    },

    async getHistory(id) {
      if (DEV) return (await apiFetchDev()).history;

      const data = await apiFetch({ event: "get_history", getParams: { id } });
      return data;
    },
  };
};
