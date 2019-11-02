'use strict';

window.form = (function () {

  var Resize = {
    MIN: 25,
    MAX: 100
  };
  var ESC_KEY = 27;

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

  var addThumbnailClickHandler = function (thumbnail) {
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
  };

  for (var i = 0; i < effectsItems.length; i++) { // Обработчик кликов добавляет срабатывание кликов по длине effectsItems
    addThumbnailClickHandler(effectsItems[i]);
  }

  var picture = imageUploadPreview.querySelector('img'); // возвращает класс img
  var currentFilter = 'none';

})();
