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

var pictures = document.querySelector('.pictures');// big-pictures
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

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var createBigPicture = function (photoInfo) {
  var bigPictureElemente = document.querySelector('.big-picture__img img');
  bigPictureElemente.src = pictures[0].url;
  var bigPictureLikesElement = document.querySelector('.likes-count');
  bigPictureLikesElement.textContent = pictures[0].likes;
  var bigPictureCommentsElement = document.querySelector('.comments-count');
  bigPictureCommentsElement.textContent = pictures[0].comments.length;
  var bigPictureDescription = document.querySelector('.social__caption');
  bigPictureDescription.textContent = pictures[0].description;
  photoInfo.querySelector('.social__picture');
  photoInfo.src = pictures[0].comments[0].avatar;
  photoInfo.querySelector('.social__picture');
  photoInfo.alt = pictures[0].comments[0].name;
  photoInfo.querySelector('.social__text');
  photoInfo.textContent = pictures[0].comments[0].message;
};
createBigPicture(photoDescriptions[0]);

var renderComments = function (data) {
// Список комментариев под фотографией
  var inquiryTemplate = document.querySelector('#my__comment');
  var callTemplate = inquiryTemplate.querySelector('.social__comment'); // вызвает li
  var elementRender = document.querySelector('.social__comments');
  var commentList = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var comment = data[i];//  элемент массива который выводит объект
    var element = callTemplate.cloneNode(true); // клонирование тег li и дети
    var commentImg = element.querySelector('img');
    commentImg.src = comment.avatar;
    commentImg.alt = comment.names;
    var socialText = element.querySelector('.social__text');
    socialText.textContent = comment.message;// длина массива
    commentList.appendChild(element);// добавляет клонированый li
  }
  elementRender.appendChild(commentList);// должен вставить в ul
};
renderComments();

var commentCount = document.querySelector('.social__comment-count ');
commentCount.classList.add('.visually-hidden');

var commentLoad = document.querySelector('.comments-loader');
commentLoad.classList.add('.visually-hidden');

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
  'chrome': function (value) {
    return 'grayscale(' + (value / 100) + ')';
  }, // Присваение классу эффекта с модификатором
  'sepia': function (value) {
    return 'sepia(' + (value / 100) + ')';
  },
  'marvin': function (value) {
    return 'invert(' + value + '%)';
  },
  'phobos': function (value) {
    return 'blur(' + Math.floor(value * 3 / 100) + 'px)';
  },
  'heat': function (value) {
    return 'brightness(' + (value * 2 / 100 + 1) + ')';
  },
  'none': function () {
    return '';
  }
};

var imageUploadEffects = imageForm.querySelector('.img-upload__effects');
var effectsItems = imageUploadEffects.querySelectorAll('.effects__radio');// Ищет список всех указанных селекторов
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
  thumbnail.addEventListener('change', function (evt) { // вешаем обработчик события на thumbnail
    var filterName = evt.target.value;

    picture.classList.remove('effects__preview--' + currentFilter);
    currentFilter = filterName;
    var checkEffectsNone = document.querySelector('.effect-level');
    checkEffectsNone.classList.add('visually-hidden');
    var checkEffectsScroll = function () {
      if (currentFilter === 'none') {
        checkEffectsNone.classList.add('visually-hidden');
      } else {
        checkEffectsNone.classList.remove('visually-hidden');
      }
    };
    checkEffectsScroll();

    picture.classList.add('effects__preview--' + currentFilter);
    var effectValue = parseInt(imageForm.querySelector('.effect-level__value').value, 10);
    picture.style.filter = FILTERS[currentFilter](effectValue);
  });
}

// Добавление хэш-тегов и валидация

var inputHashtags = document.querySelector('.text__hashtags');// Поик по документу

var checkHashTags = function () {
  var MAX_SYMVOLS = 20;
  var MAX_HASHTAG = 5;

  var invalidMessage = [];

  var inputText = inputHashtags.value.toLowerCase().trim();

  if (!inputText) {
    return false;
  }

  var parts = inputText.split(/\s+/).filter(function (item) {
    return item !== '';
  });

  var isStartNoHashtag = parts.some(function (item) {
    return item[0] !== '#';
  });

  if (isStartNoHashtag) {
    invalidMessage.push('хэш-тег начинается с символа # (решётка)');
  }

  var isOnlyLatticeHashtag = parts.some(function (item) {
    return item === '#';
  });

  if (isOnlyLatticeHashtag) {
    invalidMessage.push('хеш-тег не может состоять только из одной решётки');
  }

  var isSplitSpaceHashtag = parts.some(function (item) {
    return item.indexOf('#', 1) >= 1;
  });

  if (isSplitSpaceHashtag) {
    invalidMessage.push('хэш-теги разделяются пробелами');
  }

  var isRepeatHashtag = parts.some(function (item, index) {
    return parts.indexOf(item, index + 1) >= index + 1;
  });

  if (isRepeatHashtag) {
    invalidMessage.push('один и тот же хэш-тег не может быть использован дважды');
  }

  var isLongHashtag = parts.some(function (item) {
    return item.length > MAX_SYMVOLS;
  });

  if (isLongHashtag) {
    invalidMessage.push('максимальная длина одного хэш-тега 20 символов, включая решётку');
  }

  if (parts.length > MAX_HASHTAG) {
    invalidMessage.push('нельзя указать больше пяти хэш-тегов');
  }

  return invalidMessage.join('. \n');
};

inputHashtags.addEventListener('input', function () {
  var errorCode = checkHashTags();

  if (errorCode !== '') {
    inputHashtags.setCustomValidity(errorCode);// устанавливает специальное значение из переменной HASHTAG_ERRORS
  } else {
    inputHashtags.setCustomValidity('');
  }
});
