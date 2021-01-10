import api from './apiService';
import { error } from '@pnotify/core';
import gallery from '../templates/gallery.hbs';
import LoadMoreBtn from './load_more_btn';
import 'handlebars';

const searchForm = document.querySelector('#search-form');
const imgGallery = document.querySelector('#gallery');

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

searchForm.addEventListener('submit', onSearch);

loadMoreBtn.refs.button.addEventListener('click', loadImg);

function loadImg() {
  loadMoreBtn.disable();
  api.fetchImages().then(imagesSearch).catch(onFetchError);
  loadMoreBtn.enable();
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  });
}

function onSearch(e) {
  e.preventDefault();

  const form = event.currentTarget;
  api.query = form.elements.query.value;
  imgGallery.innerHTML = '';
  loadMoreBtn.show();
  api.resetPage();
  loadImg();
  form.reset();
}

function onFetchError() {
  error({ text: 'Ops, something went wrong...' });
}

function renderImg(hits, template) {
  const markup = template(hits);
  imgGallery.insertAdjacentHTML('beforeend', markup);
}
function imagesSearch(hits) {
  if (hits.length === 0) {
    error({
      text: 'Ops, images is not found!!!',
      delay: 1000,
    });
  } else {
    renderImg(hits, gallery);
  }
}
