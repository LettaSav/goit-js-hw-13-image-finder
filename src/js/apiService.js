export default {
  page: 1,
  searchQuery: '',
  async fetchImages() {
    const apiKey = '19802061-3be92f8f70a4c15057ca115c8';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${apiKey}`;

    const res = await fetch(url);
    const parseRes = await res.json();
    this.incrementPage();
    return parseRes.hits;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
