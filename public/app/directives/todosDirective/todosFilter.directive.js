angular.module('todosDirectives')
    .filter('myfilter', () => {
        return (items, text, type) => {
            let filtered = items;
            if (items) {
                switch (type) {
                    case "inprogress":
                        filtered = items.filter(item => item.status == 'In progress');
                        break;
                    case "planned":
                        filtered = items.filter(item => item.status == 'Planned');
                        break;
                    case "done":
                        filtered = items.filter(item => item.status == 'Done');
                        break;
                }
            }
            if (filtered && text) {
                Object.keys(text).forEach(key => {
                    filtered = filtered.filter(item => item[key].toLowerCase().startsWith(text[key].toLowerCase()))
                });
            }
            return filtered;
        };
    });