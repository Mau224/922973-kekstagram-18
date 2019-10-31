'use strict';

(function () {
// создание картинки

  var pictures = document.querySelector('.pictures');

  var photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var photoDescriptions = [];

  var renderPicture = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
  };

  var renderPictures = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photoDescriptions.length; i++) {
      fragment.appendChild(renderPicture(photoDescriptions[i]));
    }
    pictures.appendChild(fragment);
  };
  renderPictures();

  window.gallery = {
    renderPicture: renderPicture,
    photoElement: []
  };
})();
