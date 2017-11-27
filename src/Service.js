class Service {

    GetAllItems(url) {

        var req = new Request(url);

        return fetch(req)
            .then((response) => response.json());
    }
}

const SERVICE = (() => ({ Service }))();