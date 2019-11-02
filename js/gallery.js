'use strict';

window.gallery = (function () {
  var LIKES_MAX = 200;
  var LIKES_MIN = 15;
  var AVATAR_MAX = 6;
  var AVATAR_MIN = 1;
  var PHOTOS_COUNT = 25;
  var DESCRIPTIONS = [];
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент'
  ];
  var NAMES = ['Глаша', 'Даша', 'Саша', 'Маша', 'Наташа'];

  // var Resize = {
  //   MIN: 25,
  //   MAX: 100
  // };

  // var ESC_KEY = 27;
  // var ENTER_KEY = 13;

  var pictures = document.querySelector('.pictures');
  // var bigPicture = document.querySelector('.big-picture');
  var photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var photoDescriptions = [];

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getComments = function () {
    var photoComments = [];
    for (var i = 0; i < getRandomInt(1, AVATAR_MAX); i++) {
      photoComments.push({
        url: 'img/avatar-' + getRandomInt(AVATAR_MIN, AVATAR_MAX) + '.svg',
        message: COMMENTS[getRandomInt(0, COMMENTS.length - 1)],
        name: NAMES[getRandomInt(0, NAMES.length - 1)]
      });
    }
    return photoComments;
  };


  var getDiscriptionsPhotos = function () {
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      photoDescriptions.push({
        url: 'photos/' + (i + 1) + '.jpg',
        description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
        likes: getRandomInt(LIKES_MIN, LIKES_MAX),
        comments: getComments()
      });
    }
  };
  getDiscriptionsPhotos();

  var renderPicture = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    photoElement.addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
      window.createBigPicture(photo);
    });

    // обработчик по enter
    photoElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY) {
        window.createBigPicture(photo);
      }
    });
    return photoElement;
  };

  var renderPictures = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photoDescriptions.length; i++) {
      fragment.appendChild(renderPicture(photoDescriptions[i]));
    }
    pictures.appendChild(fragment);
  };
  renderPictures();
})();
