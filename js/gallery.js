'use strict';

(function () {

  var MAX_PHOTOS = 25;
  var photos = [];

  var pictures = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPicture = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    photoElement.addEventListener('click', function () {
      window.preview.element.classList.remove('hidden');
      window.preview.show(photo);
    });

    // обработчик по enter
    photoElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEY) {
        window.preview.show(photo);
      }
    });
    return photoElement;
  };

  var renderPictures = function (items) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < items.length; i++) {
      fragment.appendChild(renderPicture(items[i]));
    }
    pictures.appendChild(fragment);
  };


  var onSuccess = function (imagesArray) {
    photos = imagesArray.slice(0, MAX_PHOTOS);
    renderPictures(photos);
  };


  var onError = function (errorMessage) {
    var mainSection = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorTemplateBlock = errorTemplate.cloneNode(true);

    errorTemplateBlock.querySelector('.error__title').textContent = errorMessage;
    mainSection.insertAdjacentElement('afterbegin', errorTemplateBlock);
    var errorButton = document.querySelector('.error_close');
    errorButton.addEventListener('click', function () {
      mainSection.removeChild(errorTemplateBlock);
    });

  };

  window.backend.load(onSuccess, onError);
  window.gallery = {
    renderPicture: renderPicture,
  };
})();
