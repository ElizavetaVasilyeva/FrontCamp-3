class Service {

    async GetAllItems(url) {

            let response = await fetch(url);
            var data = await response.json();
            return data;
    }
    
}

const SERVICE = (() => ({ Service }))();