export const CONSTANTS = {
  API_KEY: '743c48cccf844d00914aa7c2e83f0e31',
  SERVICE_URL_SOURCES: 'https://newsapi.org/v2/sources',
  SERVICE_URL_ARTICLES: 'https://newsapi.org/v2/top-headlines',

  COMMON_ERROR: 'An error occurred during getting information!',
  NOTEXIST_ERROR: 'Current source does not exist!',

  ARTICLES: 'Articles'
};

export const ELEMENTS = {
  container: document.getElementById('sources'),
  modalBody: document.getElementById('modalBody'),
  search: document.getElementById('search'),
  searchId: document.getElementById('searchId')
};