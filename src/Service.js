class Service {

    async GetAllItems(url) {
            let response = await fetch(url);
            const data = await response.json();
            return data;
    }
    
}

const SERVICE = (() => ({ Service }))();