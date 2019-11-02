'use strict';

window.preview = (function () {

  var ENTER_KEY = 13;

  var bigPicture = document.querySelector('.big-picture');

  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var commentLoad = bigPicture.querySelector('.comments-loader');
  commentLoad.classList.add('visually-hidden');
  window.photoClosed = function () {
    window.photoElement.addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
      createBigPicture(window.photo);
    });

    // обработчик по enter
    window.photoElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY) {
        createBigPicture(window.photo);
      }
    });
    return window.photoElement;
  };


  // Закрывает пользовательский пост
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');

    bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var onBigPictureCloseClick = function () {
    closeBigPicture();
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEY) {
      closeBigPicture();
    }
  };

  var renderComments = function (data) {
    var socialComments = bigPicture.querySelector('.social__comments');

    var callTemplate = socialComments.querySelector('.social__comment');
    socialComments.innerHTML = '';

    var commentList = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var element = callTemplate.cloneNode(true); // клонирование тег li и дети
      var commentImg = element.querySelector('img');
      commentImg.src = data[i].url;
      commentImg.alt = data[i].names;
      var socialText = element.querySelector('.social__text');
      socialText.textContent = data[i].message;// длина массива
      commentList.appendChild(element);// добавляет клонированый li
    }
    socialComments.appendChild(commentList);// должен вставить в ul
  };

  var createBigPicture = function (photoInfo) {
    var bigPictureElement = bigPicture.querySelector('.big-picture__img img');
    bigPictureElement.src = photoInfo.url;

    var bigPictureLikesElement = bigPicture.querySelector('.likes-count');
    bigPictureLikesElement.textContent = photoInfo.likes;

    var bigPictureDescription = bigPicture.querySelector('.social__caption');
    bigPictureDescription.textContent = photoInfo.description;

    var avatar = bigPicture.querySelector('.social__picture');

    avatar.src = photoInfo.comments[0].url;
    avatar.alt = photoInfo.comments[0].name;
    var socialText = bigPicture.querySelector('.social__text');
    socialText.textContent = photoInfo.comments[0].message;

    var renderCommentCout = document.querySelector('.social__comment-count');
    renderCommentCout.innerHTML = '';
    renderCommentCout.textContent = photoInfo.comments.length + ' ' + 'из' + ' ' + photoInfo.comments.length + ' ' + 'коментариев';

    renderComments(photoInfo.comments);

    var onCommentsLoaderClick = function () {
      renderComments();
    };

    commentLoad.addEventListener('click', onCommentsLoaderClick);

    bigPictureClose.addEventListener('click', onBigPictureCloseClick);

    document.addEventListener('keydown', onBigPictureEscPress);
  };
})();
