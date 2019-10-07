'use strict';

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

var pictures = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var photoDescriptions = [];
var photoComments = [];

var getComments = function () {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photoComments.push({
      url: 'img/avatar-' + ((Math.floor(Math.random() * (AVATAR_MAX - AVATAR_MIN + 1)) + AVATAR_MIN)) + '.svg',
      message: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
      name: NAMES[Math.floor(Math.random() * NAMES.length)]
    });
  }
  photoComments();
};

var photoCommentsArr = getComments();

var getDiscriptionsPhotos = function () {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photoDescriptions.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
      likes: Math.floor(Math.random() * (LIKES_MAX - LIKES_MIN + 1)) + LIKES_MIN,
      comments: photoCommentsArr.slice(Math.floor(Math.random() * photoCommentsArr.length))
    });
  }
  getDiscriptionsPhotos();
};

var descriptionsArr = getDiscriptionsPhotos();
var renderPicture = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement;
};


var fragment = document.createDocumentFragment();

for (var i = 0; i < descriptionsArr.length; i++) {
  fragment.appendChild(renderPicture(descriptionsArr[i]));
}

pictures.appendChild(fragment);

var imgUploadForm = document.querySelector('.img-upload__form');
var imgEditOverlay = imgUploadForm.querySelector('.img-upload__overlay');
var uploadButton = imgUploadForm.querySelector('#upload-file');
var closeEditButton = imgUploadForm.querySelector('#upload-cancel');
var ESC_KEY = 27;
var hashtagInput = imgUploadForm.querySelector('.text__hashtags');

var onEscButtonCloseEdit = function (evt) {
  if (evt.keyCode === ESC_KEY && evt.target !== hashtagInput) {
    closeEdit();
  }
};

var closeEdit = function () {
  imgUploadForm.reset();
  imgEditOverlay.classList.add('hidden');
  closeEditButton.removeEventListener('click', closeEdit);
  document.removeEventListener('keydown', onEscButtonCloseEdit);
};

var openEdit = function () {
  imgEditOverlay.classList.remove('hidden');
  closeEditButton.addEventListener('click', closeEdit);
  document.addEventListener('keydown', onEscButtonCloseEdit);
};

uploadButton.addEventListener('change', openEdit);
