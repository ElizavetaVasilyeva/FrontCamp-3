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

window.onload = function () {
	BindAutocomplete(sources);
	LoadMainPage(sources);
	addEventListeners();
};

var addEventListeners = function addEventListeners() {

	document.getElementById('searchBtn').addEventListener('click', function () {
		LoadArticles(ELEMENTS.searchId.value);
	});

	document.getElementById('mainPage').addEventListener('click', function () {
		LoadMainPage(sources);
	});
};

var query = Constants.SERVICE_URL_SOURCES + '?apiKey=' + Constants.API_KEY;
var sources = service.GetAllItems(query).then(function (data) {
	return data.sources;
});

function LoadMainPage(sources) {

	sources.then(function (data) {
		htmlHelper.clearContainer(ELEMENTS.container);
		var top10sources = htmlHelper.getFirstNElements(data, 10);
		top10sources.map(function (source) {
			var sourceItem = new SourceItem(source);
			ELEMENTS.container.appendChild(sourceItem.getTemplate());
		});
	}).catch(function (error) {
		ELEMENTS.modalBody.innerHTML = COMMON_ERROR;
		$('#dialog').modal('show');
	});
}

function LoadArticles(sourceId) {
	var query = Constants.SERVICE_URL_ARTICLES + '?sources=' + sourceId + '&apiKey=' + Constants.API_KEY;
	if (sourceId) {
		service.GetAllItems(query).then(function (data) {
			htmlHelper.clearContainer(ELEMENTS.container);
			var articles = data.articles;
			articles.map(function (article) {
				var articleItem = new ArticleItem(article);
				ELEMENTS.container.appendChild(articleItem.getTemplate());
			});
		}).catch(function (error) {
			ELEMENTS.modalBody.innerHTML = COMMON_ERROR;
			$('#dialog').modal('show');
		});
	} else {
		ELEMENTS.modalBody.innerHTML = NOTEXIST_ERROR;
		$('#dialog').modal('show');
	}
}

function BindAutocomplete(sources) {

	sources.then(function (data) {
		$("#search").autocomplete({
			source: data.map(function (s) {
				return { value: s.id, label: s.name };
			}),
			select: function select(event, ui) {
				$("#search").val(ui.item.label);
				$("#searchId").val(ui.item.value);
				return false;
			},
			selectFirst: true,
			change: function change(event, ui) {
				if (ui.item == null) {
					$("#searchId").val("");
				}
			}
		});
	});
}