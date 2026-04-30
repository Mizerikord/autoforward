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

  postEmail(emailData, order) {
    console.log(emailData, order);
    
    return fetch(`${this._addres}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailData.email,
        phone: emailData.phone,
        city: emailData.city,
        inn: emailData.inn,
        products: order
      }),
    }).then(this._getAnswer);
  }
}

const Api = new dataApi({
  baseUrl: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
