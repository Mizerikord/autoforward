class dataApi {
  constructor({ baseUrl, headers }) {
    this._addres = baseUrl;
    this._headers = headers;
    // this._auth = auth;
  }

  _getAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  }

  getData() {
    const cards = fetch(`${this._addres}`, {
      method: "GET",
      headers: this._headers,
    });
    return cards.then(this._getAnswer);
  }
}

const Api = new dataApi({
  baseUrl: "http://localhost:3001/",
  headers: {
      'Content-Type': 'application/json'
  },
});

export default Api;
