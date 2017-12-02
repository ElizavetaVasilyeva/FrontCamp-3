'use strict';

var service = new SERVICE.Service();
var htmlHelper = new HTML_HELPER.HtmlHelper();
var ELEMENTS = {
	container: document.getElementById('sources'),
	modalBody: document.getElementById('modalBody'),
	search: document.getElementById('search'),
	searchId: document.getElementById('searchId')
};
var COMMON_ERROR = 'An error occurred during getting information!';
var NOTEXIST_ERROR = 'Current source does not exist!';

window.onload = () => {
	BindAutocomplete(sources);
	LoadMainPage(sources);
	addEventListeners();
};

var addEventListeners = () => {

	document.getElementById('searchBtn').addEventListener('click', () => { LoadArticles(ELEMENTS.searchId.value); });

	document.getElementById('mainPage').addEventListener('click', () => { LoadMainPage(sources); });
};

const query = `${Constants.SERVICE_URL_SOURCES}?apiKey=${Constants.API_KEY}`;
const sources = service.GetAllItems(query).then((data) => {
	return data.sources;
});

function LoadMainPage(sources) {

	sources.then((data) => {
		htmlHelper.clearContainer(ELEMENTS.container);
		const top10sources = htmlHelper.getFirstNElements(data, 10);
		top10sources.map(source => {
			var sourceItem = new SourceItem(source);
			ELEMENTS.container.appendChild(sourceItem.getTemplate());
		});
	}).catch((error) => {
		ELEMENTS.modalBody.innerHTML = COMMON_ERROR;
		$('#dialog').modal('show');
	});
}

function LoadArticles(sourceId) {
    const query = Constants.SERVICE_URL_ARTICLES + '?sources=' + sourceId + '&apiKey=' + Constants.API_KEY;
	if (sourceId) {
		service.GetAllItems(query).then((data) => {
			htmlHelper.clearContainer(ELEMENTS.container);
			const articles = data.articles;
			articles.map(article => {
				var articleItem = new ArticleItem(article);
				ELEMENTS.container.appendChild(articleItem.getTemplate());
			});
		}).catch((error) => {
			ELEMENTS.modalBody.innerHTML = COMMON_ERROR;
			$('#dialog').modal('show');
		});
	} else {
		ELEMENTS.modalBody.innerHTML = NOTEXIST_ERROR;
		$('#dialog').modal('show');
	}
}

function BindAutocomplete(sources) {

	sources.then((data) => {
		$("#search").autocomplete({
			source: data.map((s) => {
				return { value: s.id, label: s.name };
			}),
			select: (event, ui) => {
				$("#search").val(ui.item.label);
				$("#searchId").val(ui.item.value);
				return false;
			},
			selectFirst: true,
			change: (event, ui) => {
				if (ui.item == null) {
					$("#searchId").val("");
				}
			}
		});
	});
}