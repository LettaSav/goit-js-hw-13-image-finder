export default {
  page: 1,
  query: '',
  async fetchImages(query) {
    const apiKey = '19802061-3be92f8f70a4c15057ca115c8';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;
    const res = await fetch(url);
    const parseRes = await res.json();
    this.incrementPage();
    return parseRes.hits;
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
};
