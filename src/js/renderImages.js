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
  loadMoreBtn.show();

  const form = event.currentTarget;
  api.query = form.elements.query.value;
  imgGallery.innerHTML = '';

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

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const lazyImg = entry.target;
      console.log(lazyImg);
      observer.unobserve(lazyImg);
    }
  });
}, options);

const arr = document.querySelectorAll('img');
arr.forEach(i => {
  observer.observe(i);
});