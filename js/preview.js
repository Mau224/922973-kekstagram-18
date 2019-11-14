'use strict';

(function () {

  var COMMENTS_MAX = 5;
  var bigPicture = document.querySelector('.big-picture');
  var socialComments = bigPicture.querySelector('.social__comments');
  var renderCommentCout = document.querySelector('.social__comment-count');

  var comments = [];

  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var commentLoad = bigPicture.querySelector('.comments-loader');
  // commentLoad.classList.add('visually-hidden');
  window.photoClosed = function () {
    window.photoElement.addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
      createBigPicture(window.photo);
    });

    // обработчик по enter
    window.photoElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEY) {
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
    if (evt.keyCode === window.util.ESC_KEY) {
      closeBigPicture();
    }
  };


  var renderComments = function (data) {

    var callTemplate = socialComments.querySelector('.social__comment');
    socialComments.innerHTML = '';

    var commentList = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var element = callTemplate.cloneNode(true); // клонирование тег li и дети
      var commentImg = element.querySelector('img');
      commentImg.src = data[i].avatar;
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

    avatar.src = photoInfo.comments[0].avatar;
    avatar.alt = photoInfo.comments[0].name;
    var socialText = bigPicture.querySelector('.social__text');
    socialText.textContent = photoInfo.comments[0].message;

    var onCommentsLoaderClick = function () {
      var nextComment = comments.slice(socialComments, socialComments + COMMENTS_MAX);
      renderComments(nextComment);
      socialComments += COMMENTS_MAX;
      if (socialComments >= comments.length || comments.length < COMMENTS_MAX) {
        commentLoad.classList.add('.vissualy-hidden');
      }
    };

    renderCommentCout.innerHTML = '';
    renderCommentCout.textContent = photoInfo.comments.length + ' ' + 'из' + ' ' + photoInfo.comments.length + ' ' + 'коментариев';

    renderComments(photoInfo.comments);

    commentLoad.addEventListener('click', onCommentsLoaderClick);

    bigPictureClose.addEventListener('click', onBigPictureCloseClick);

    document.addEventListener('keydown', onBigPictureEscPress);
  };

  window.preview = {
    element: bigPicture,
    show: createBigPicture
  };
})();
