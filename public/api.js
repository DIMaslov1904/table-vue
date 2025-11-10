var TABLE_VUE_API = () => {
  var baseURL = "/table-inner/api/api.php";
  var DEV = true;

  async function apiFetch({ event = "all", method = "GET", body = {}, getParams = {} }, getData = true) {
    var searchParams = new URLSearchParams({ s__type_event: event, ...getParams }).toString();
    var url = baseURL + "?" + searchParams;
    var params = {
      method,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    };
  	if (method === "POST") params.body = JSON.stringify(body);
    var res = await fetch(url, params);
    if (!getData) return res;

    try {
      return await res.json();
    } catch (e) {
      return res;
    }
  }

  async function apiFetchDev() {
    var res = await fetch("dev-result.json");
    return await res.json();
  }

  return {
    async getUserGroup() {
      if (DEV) {
        var res = (await apiFetchDev()).getUserGroup;
        return res;
      }

      var data = await fetch("/api/getUserGroup.php");
      return data.createRow;
    },

    async createRow(date) {
      if (DEV) {
        var res = (await apiFetchDev()).createRow;
        res.id = new Date().getTime();
        return res;
      }

      var data = await apiFetch({ event: "add", method: "POST", getParams: date });
      return data.createRow;
    },

    async updateItem(id, data) {
      if (DEV) return true;

      var response = await apiFetch({ event: "update", method: "POST", body: { id, data } }, false);
      return response?.update ?? false;
    },

    async getTableData(filters, isMounted) {
      if (DEV) {
        var res = await apiFetchDev();
        return isMounted ? res.fields : { items: res.fields.items };
      }

      var data = await apiFetch({ event: isMounted ? "get" : "get", getParams: filters });

      if (data.fields === undefined) {
        data.fields = {}
      };

      if (data.fields.columns === undefined) {
        data.fields.columns = []
      }

      if (data.fields.items === undefined) {
        data.fields.items = []
      }

      return data.fields;
    },

    async getHistory(id) {
      if (DEV) return (await apiFetchDev()).history;

      var data = await apiFetch({ event: "history", getParams: { id } });
      return data.history;
    },
  };
};
