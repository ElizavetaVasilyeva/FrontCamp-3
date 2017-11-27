
const service = new SERVICE.Service();
const htmlHelper = new HTML_HELPER.HtmlHelper();
const ELEMENTS = {
	container: document.getElementById('sources'),
	modalBody: document.getElementById('modalBody'),
	search: document.getElementById('search'),
	searchId: document.getElementById('searchId')
};
const COMMON_ERROR = 'An error occurred during getting information!';
const NOTEXIST_ERROR = 'Current source does not exist!';

window.onload = () => {
	BindAutocomplete(sources);
	LoadMainPage(sources);
	addEventListeners();
}

const addEventListeners = () => {

	document.getElementById('searchBtn').addEventListener('click', function () {
		LoadArticles(ELEMENTS.searchId.value);
	});


	document.getElementById('mainPage').addEventListener('click', function () {
		LoadMainPage(sources);
	});
}

const sources = service.GetAllItems(`${Constants.SERVICE_URL_SOURCES}?apiKey=${Constants.API_KEY}`)
	.then(data => data.sources);


function LoadMainPage(sources) {

	sources.then(function (data) {
		htmlHelper.clearContainer(ELEMENTS.container);
		let top10sources = htmlHelper.getFirstNElements(data, 10);
		top10sources.map(source => {
			let sourceItem = new SourceItem(source);
			htmlHelper.appendElement(ELEMENTS.container, sourceItem.getTemplate());
		});
	})
		.catch(function (error) {
			ELEMENTS.modalBody.innerHTML = COMMON_ERROR;
			$('#dialog').modal('show');
		});

}

function LoadArticles(sourceId) {

	if (sourceId) {
		service.GetAllItems(`${Constants.SERVICE_URL_ARTICLES}?sources=${sourceId}&apiKey=${Constants.API_KEY}`)
			.then(function (data) {
				htmlHelper.clearContainer(ELEMENTS.container);
				let articles = data.articles;
				articles.map(article => {
					let articleItem = new ArticleItem(article);
					htmlHelper.appendElement(ELEMENTS.container, articleItem.getTemplate());
				});
			})
			.catch(function (error) {
				ELEMENTS.modalBody.innerHTML = COMMON_ERROR;
				$('#dialog').modal('show');
			});
	}
	else {
		ELEMENTS.modalBody.innerHTML = NOTEXIST_ERROR;
		$('#dialog').modal('show');
	}
}

function BindAutocomplete(sources) {

	sources.then(function (data) {
		$("#search").autocomplete({
			source: data.map(s => ({ value: s.id, label: s.name })),
			select: function (event, ui) {
				$("#search").val(ui.item.label);
				$("#searchId").val(ui.item.value);
				return false;
			},
			selectFirst: true,
			change: function (event, ui) {
							if (ui.item == null){ 
									$("#searchId").val("");
							}
					}
		})
	});

}

