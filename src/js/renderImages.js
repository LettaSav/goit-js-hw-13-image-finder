import api from './apiService';
import { error } from '@pnotify/core';
import gallery from '../templates/gallery.hbs';
import LoadMoreBtn from './load_more_btn';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';

import 'handlebars';

const searchForm = document.querySelector('#search-form');
const imgGallery = document.querySelector('#gallery');

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

searchForm.addEventListener('submit', onSearch);

loadMoreBtn.refs.button.addEventListener('click', loadImg);

imgGallery.addEventListener('click', openModal);

function openModal(evt) {
  const instance = basicLightbox.create(`
    <img src = "${evt.target.dataset.source}" width = "100%"   
    alt=" ${evt.target.alt}"/>
    `);
  instance.show();
  console.log(evt.target.dataset.source);
}

function loadImg() {
  loadMoreBtn.disable();
  api.fetchImages().then(imagesSearch).catch(onFetchError);
  loadMoreBtn.enable();
}

function onSearch(e) {
  e.preventDefault();
  loadMoreBtn.show();

  const form = event.currentTarget;
  api.query = form.elements.query.value;
  imgGallery.innerHTML = '';
  loadMoreBtn.disable();
  api.resetPage();
  loadImg();
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  });
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

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};
