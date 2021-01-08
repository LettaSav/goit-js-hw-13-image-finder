import api from './apiService';
import debounce from 'lodash/debounce';
import { error } from '@pnotify/core';
import gallery from '../templates/gallery.hbs';

const searchForm = document.querySelector('#search-form');
const imgGallery = document.querySelector('#gallery');

searchForm.addEventListener('input', debounce(onSearch, 500));

window.scrollTo(0, 1000);

function onSearch(e) {
  e.preventDefault();

  api.searchQuery = e.target.value;

  api
    .fetchImages()
    .finally(() => resetForm())
    .then(imagesSearch)
    .catch(onFetchError);
}

function renderImg(data, template) {
  const markup = template(data);
  imgGallery.insertAdjacentHTML('afterbegin', markup);
}
function imagesSearch(data) {
  if (data.status === 404) {
    error({
      text: 'Ops, images is not found!!!',
      delay: 1000,
    });
  } else {
    renderImg(data, gallery);
  }
}

function onFetchError() {
  error({ text: 'Ops, something went wrong...' });
}
function resetForm() {
  imgGallery.innerHTML = '';
}
