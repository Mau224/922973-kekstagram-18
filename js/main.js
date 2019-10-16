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

var Resize = {
  MIN: 25,
  MAX: 100
};

var ESC_KEY = 27;

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

var resizeImage = function (value) {
  imageUploadPreview.style.transform = 'scale(' + value / 100 + ')'; // измненяет размер исходя из значения в value через метод transform
};

var changeValue = function (isGrow) {
  var currentValue = parseInt(scaleControlValue.value, 10);
  if (!isGrow && currentValue > Resize.MIN) {
    currentValue -= Resize.MIN;
  } else if (isGrow && currentValue < Resize.MAX) {
    currentValue += Resize.MIN; // если isGrow не ровно или value больше шагов ,то отнять шаг от value ,если isGrow или value меньше 100 то прибавить шаг к value
  }
  resizeImage(currentValue); // изменить размер в соотвествии с value
  currentValue = currentValue; // прировнять значения
  scaleControlValue.value = currentValue + '%'; // изменяет значение атрибута у пременной указанного в value
};

// Увеличение масштаба изображения
var imageForm = document.querySelector('#upload-select-image');
var imageUploadScale = imageForm.querySelector('.img-upload__scale');// ищет по документу
var scaleControlValue = imageUploadScale.querySelector('.scale__control--value');// ищет по переменной
var buttonSmall = imageUploadScale.querySelector('.scale__control--smaller');
var buttonlBig = imageUploadScale.querySelector('.scale__control--bigger');
var imageUploadPreview = imageForm.querySelector('.img-upload__preview');


buttonSmall.addEventListener('click', function () { // отменяет событие и присваивает ему false
  changeValue(false);
});

buttonlBig.addEventListener('click', function () { // отменяет событие и присваивает ему true
  changeValue(true);
});


// Наложение эффекта на изображение
var FILTERS = {
  'chrome': function () {
    var effectValue = parseInt(imageForm.querySelector('.effect-level__value').value, 10);
    return 'grayscale(' + (effectValue / 100) + ')';
  }, // Присваение классу эффекта с модификатором
  'sepia': function () {
    var effectValue = parseInt(imageForm.querySelector('.effect-level__value').value, 10);
    return 'sepia(' + (effectValue / 100) + ')';
  },
  'marvin': function () {
    var effectValue = parseInt(imageForm.querySelector('.effect-level__value').value, 10);
    return 'marvin(' + (effectValue / 100) + ')';
  },
  'phobos': function () {
    var effectValue = parseInt(imageForm.querySelector('.effect-level__value').value, 10);
    return 'phobos(' + Math.floor(effectValue / 33) + 'px' + ')';
  },
  'heat': function () {
    var effectValue = parseInt(imageForm.querySelector('.effect-level__value').value, 10);
    return 'heat(' + (effectValue / 300) * 1 + ')';
  },
  'none': 'none'
};

var imageUploadEffects = imageForm.querySelector('.img-upload__effects');
var effectsItems = imageUploadEffects.querySelectorAll('.effects__item');// Ищет список всех указанных селекторов
/*

var filterContainer = imageForm.querySelector('.img-upload__effects');

filterContainer.addEventListener('click', function (evt) {
  var target = evt.target;
  var inputElement = null;

  if (target.tagName === 'SPAN') {
    // попал
    inputElement = target.parentElement().closest('input');
  } else if (target.tagName === 'LABEL') {
    // попал
    inputElement = target.closest('input');
  }
});
*/
for (var i = 0; i < effectsItems.length; i++) { // Обработчик кликов добавляет срабатывание кликов по длине effectsItems
  addThumbnailClickHandler(effectsItems[i]);
}

var picture = imageUploadPreview.querySelector('img'); // возвращает класс img
var currentFilter = 'none';

function addThumbnailClickHandler(thumbnail) {
  thumbnail.addEventListener('click', function () { // вешаем обработчик события на thumbnail
    var item = thumbnail.querySelector('.effects__label');// возвращает класс .effects__label
    var filterName = item.getAttribute('for').replace('effect-', ''); // присваивает пременной атрибут .for

    picture.classList.remove(currentFilter);

    currentFilter = FILTERS[filterName];
    picture.classList.add('effects__preview--' + currentFilter);
    picture.style.filter = FILTERS[currentFilter]();
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

var errorCode = inputHashtags();
if (errorCode !== '') {
  inputHashtags.setCustomValidity(HASHTAG_ERRORS[errorCode]);// устанавливает специальное значение из переменной HASHTAG_ERRORS
} else {
  inputHashtags.setCustomValidity(errorCode);
}

inputHashtags.addEventListener('input', function () {

  var MAX_SYMVOLS = 25;
  var MAX_HASHTAG = 5;

  var invalidMessage = [];

  var inputText = window.domElements.textHashtags.value.toLowerCase().trim();

  if (!inputText) {
    return;
  }

  var inputHashtags = inputText.split(/\s+/).filter(function (item) {
    return item !== '';
  });

  var isStartNoHashtag = inputHashtags.some(function (item) {
    return item[0] !== '#';
  });

  if (isStartNoHashtag) {
    invalidMessage.push('хэш-тег начинается с символа # (решётка)');
  }

  var isOnlyLatticeHashtag = inputHashtags.some(function (item) {
    return item === '#';
  });

  if (isOnlyLatticeHashtag) {
    invalidMessage.push('хеш-тег не может состоять только из одной решётки');
  }

  var isSplitSpaceHashtag = inputHashtags.some(function (item) {
    return item.index0f('#', 1) >= 1;
  });

  if (isSplitSpaceHashtag) {
    invalidMessage.push('хэш-теги разделяются пробелами');
  }

  var isRepeatHashtag = inputHashtags.some(function (item) {
    return indexOf(item, i + 1) >= i + 1;
  });

  if (isRepeatHashtag) {
    invalidMessage.push('один и тот же хэш-тег не может быть использован дважды');
  }

  var isLongHashtag = inputHashtags.some(function (item) {
    return item.length > MAX_SYMVOLS;
  });

  if (isLongHashtag) {
    invalidMessage.push('максимальная длина одного хэш-тега 20 символов, включая решётку');
  }

  if (inputHashtags.length > MAX_HASHTAG) {
    invalidMessage.push('нельзя указать больше пяти хэш-тегов');
  }
});
