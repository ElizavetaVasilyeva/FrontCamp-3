
const service = new SERVICE.Service();
const htmlHelper = new HTML_HELPER.HtmlHelper();
const container = document.getElementById('sources');

window.onload = () => {
	BindAutocomplete(sources);
	LoadMainPage(sources);
	addEventListeners();
}

const addEventListeners = () => {

	document.getElementById('searchBtn').addEventListener('click', function () {
		LoadArticles(document.getElementById('searchId').value);
	});


	document.getElementById('mainPage').addEventListener('click', function () {
		LoadMainPage(sources);
	});

}

const sources = service.GetAllItems(`${Constants.SERVICE_URL_SOURCES}?apiKey=${Constants.API_KEY}`)
	.then(data => data.sources);


function LoadMainPage(sources) {

	sources.then(function (data) {
		htmlHelper.clearContainer(container);
		let top10sources = htmlHelper.getFirstNElements(data, 10);
		top10sources.map(source => {
			let sourceItem = new SourceItem(source);
			htmlHelper.appendElement(container, sourceItem.getTemplate());
		});
	})
		.catch(function (error) {
			$('#dialog').modal('show');
		});

}

function LoadArticles(sourceId) {

	service.GetAllItems(`${Constants.SERVICE_URL_ARTICLES}?sources=${sourceId}&apiKey=${Constants.API_KEY}`)
		.then(function (data) {
			htmlHelper.clearContainer(container);
			let articles = data.articles;
			articles.map(article => {
				let articleItem = new ArticleItem(article);
				htmlHelper.appendElement(container, articleItem.getTemplate());
			});
		})
		.catch(function (error) {
			$('#dialog').modal('show');
		});

}

function BindAutocomplete(sources) {

	sources.then(function (data) {
		$("#search").autocomplete({
			source: data.map(s => ({ value: s.id, label: s.name })),
			select: function (event, ui) {
				$("#search").val(ui.item.label);
				$("#searchId").val(ui.item.value);
				return false;
			}
		})
	});

}

