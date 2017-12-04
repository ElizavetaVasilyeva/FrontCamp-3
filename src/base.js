'use strict';

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
};

const addEventListeners = () => {
	document
		.getElementById('searchBtn')
		.addEventListener('click', () => { LoadArticles(ELEMENTS.searchId.value); });

	document
		.getElementById('mainPage')
		.addEventListener('click', () => { LoadMainPage(sources); });
};

const query = `${Constants.SERVICE_URL_SOURCES}?apiKey=${Constants.API_KEY}`;
const sources = service
	.GetAllItems(query)
	.then(data => { return data.sources; });

function LoadMainPage(sources) {
	sources
		.then(data => {
			htmlHelper.clearContainer(ELEMENTS.container);
			const top10sources = htmlHelper.getFirstNElements(data, 10);
			Array.from(top10sources)
				.forEach(source => {
					const sourceItem = new SourceItem(source);
					ELEMENTS.container.appendChild(sourceItem.getTemplate());
				});
		})
		.catch(error => {
			ELEMENTS.modalBody.innerHTML = COMMON_ERROR;
			console.log(error.get_message()); //test plugin
			$('#dialog').modal('show');
		});
}

function LoadArticles(sourceId) {
	const query = Constants.SERVICE_URL_ARTICLES + '?sources=' + sourceId + '&apiKey=' + Constants.API_KEY;
	if (sourceId) {
		service
			.GetAllItems(query)
			.then(data => {
				htmlHelper.clearContainer(ELEMENTS.container);
				const { articles } = data;
				Array.from(articles)
					.forEach(article => {
						const articleItem = new ArticleItem(article);
						ELEMENTS.container.appendChild(articleItem.getTemplate());
					});
			}).catch(error => {
				ELEMENTS.modalBody.innerHTML = COMMON_ERROR;
				$('#dialog').modal('show');
			});
	} else {
		ELEMENTS.modalBody.innerHTML = NOTEXIST_ERROR;
		$('#dialog').modal('show');
	}
}

function BindAutocomplete(sources) {
	sources.then(data => {
		$("#search").autocomplete({
			source: data.map(s => {
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