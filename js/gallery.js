'use strict';

(function () {

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
      if (evt.keyCode === window.ENTER_KEY) {
        window.preview.show(photo);
      }
    });
    return photoElement;
  };

  var renderPictures = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.length; i++) {
      fragment.appendChild(renderPicture(window.data[i]));
    }
    pictures.appendChild(fragment);
  };
  renderPictures();

  var onSuccess = function (imagesArray) {

    window.photo = imagesArray.map(function (photo, id) {
      photo.id = id + 1;
      return photo;
    });

    window.onSuccessPhoto(window.photo);
  };

  var onError = function (errorMessage) {
    var mainSection = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorTemplateBlock = errorTemplate.cloneNode(true);

    errorTemplateBlock.querySelector('.error__title').textContent = errorMessage;
    mainSection.insertAdjacentElement('afterbegin', errorTemplateBlock);
  };

  window.backend.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);
})();
