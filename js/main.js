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
  return photoComments;
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
};
getDiscriptionsPhotos();

var renderPicture = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

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

var imgUploadForm = document.querySelector('.img-upload__form');
var imgEditOverlay = imgUploadForm.querySelector('.img-upload__overlay');
var uploadButton = imgUploadForm.querySelector('#upload-file');
var closeEditButton = imgUploadForm.querySelector('#upload-cancel');
var ESC_KEY = 27;
var hashtagInput = imgUploadForm.querySelector('.text__hashtags');

var onEscButtonCloseEdit = function (evt) {
  if (evt.keyCode === ESC_KEY && evt.target !== hashtagInput && !evt.target.classList.contains('.text__description')) {
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

// Увеличение масштаба изображения
var STEP = 25;
var imageUploadScale = document.querySelector('.img-upload__scale');// ищет по документу
var scaleControlValue = imageUploadScale.querySelector('.scale__control--value');// ищет по переменной
var buttonSmall = imageUploadScale.querySelector('.scale__control--smaller');
var buttonlBig = imageUploadScale.querySelector('.scale__control--bigger');
var imageUploadPreview = document.querySelector('.img-upload__preview');

scaleControlValue.setAttribute('value', '100%');// присваивает атрибуты

var currentValue = parseInt(scaleControlValue.getAttribute('value'), 10);// принимает строку в качестве аргумента и возвращает целое число в соответствии с указанным основанием системы счисления.

buttonSmall.addEventListener('click', function (evt) { // отменяет событие и присваивает ему false
  evt.preventDefault();
  changeValue(currentValue, false);
});

buttonlBig.addEventListener('click', function (evt) { // отменяет событие и присваивает ему true
  evt.preventDefault();
  changeValue(currentValue, true);
});

function changeValue(value, isGrow) {
  if (!isGrow && value > STEP) {
    value -= STEP;
  } else if (isGrow && value < 100) {
    value += STEP;// если isGrow не ровно или value больше шагов ,то отнять шаг от value ,если isGrow или value меньше 100 то прибавить шаг к value
  }
  resizeImage(value);// изменить размер в соотвествии с value
  currentValue = value;// прировнять значения
  scaleControlValue.setAttribute('value', value + '%');// изменяет значение атрибута у пременной указанного в value
}

function resizeImage(value) {
  imageUploadPreview.style.transform = 'scale(' + value / 100 + ')';// измненяет размер исходя из значения в value через метод transform
}
// Наложение эффекта на изображение
var FILTERS = {
  'effect-chrome': 'effects__preview--chrome', // Присваение классу эффекта с модификатором
  'effect-sepia': 'effects__preview--sepia',
  'effect-marvin': 'effects__preview--marvin',
  'effect-phobos': 'effects__preview--phobos',
  'effect-heat': 'effects__preview--heat'
};
var imageUploadEffects = document.querySelector('.img-upload__effects');
var effectsItems = imageUploadEffects.querySelectorAll('.effects__item');// Ищет список всех указанных селекторов

for (var i = 0; i < effectsItems.length; i++) { // Обработчик кликов добавляет срабатывание кликов по длине effectsItems
  addThumbnailClickHandler(effectsItems[i]);
}

function addThumbnailClickHandler(thumbnail) {
  thumbnail.addEventListener('click', function () { // вешаем обработчик события на thumbnail
    var item = thumbnail.querySelector('.effects__label');// возвращает класс .effects__label
    var filterName = item.getAttribute('for');// присваивает пременной атрибут .for
    var picture = imageUploadPreview.querySelector('img');// возвращает класс img
    picture.removeAttribute('class');// убирает сlass у пременной picture

    if (FILTERS[filterName]) { // если классы в переменных соответствую добавить их picture
      picture.classList.add(FILTERS[filterName]);
    }
  });
}

// Добавление хэш-тегов и валидация
var HASHTAG_ERRORS = {
  'symbol': 'Отсутствует обязательный символ #',
  'symbol_wrong': 'Символ # должен стоять в начале хештега',
  'max': 'Максимальное кол-во хештегов должно быть 5',
  'same': 'Есть повторяющиеся хештеги',
  'maxLength': 'Слишком длинный хештег'
};

var inputHashtags = document.querySelector('.text__hashtags');// Поик по документу

// функция выводящия ошибку, если не пустой, то вывыведет ошибку из HASHTAG_ERRORS
inputHashtags.addEventListener('change', function () {
  // var hashtagsArr = inputHashtags.value.split(' ');
  var errorCode = checkHashtag(hashtagsArr);// результат действия checkHashtag

  if (errorCode !== '') {
    inputHashtags.setCustomValidity(HASHTAG_ERRORS[errorCode]);// устанавливает специальное значение из переменной HASHTAG_ERRORS
  } else {
    inputHashtags.setCustomValidity(errorCode);
  }
});

// функция проверки хештегов
// function checkHashtag(array) {
//   if (array.length > 5) {
//     return 'max';
//   }
//
//   for (var k = 0; k < array.length; k++) {
//     if (array[k].length > 20) {
//       return 'maxLength';
//     }
//     if (array[k].indexOf('#') < 0) {
//       return 'symbol';
//     }
//     if (array[k].indexOf('#') > 0) {
//       return 'symbol_wrong';
//     }
//     for (var j = 0; j < array.length; j++) {
//       if ((array[k].toLowerCase() === array[j].toLowerCase()) && (k !== j)) {
//         return 'same';
//       }
//     }
//   }

  return '';
}
