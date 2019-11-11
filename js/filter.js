'use strict';

(function () {

  var BTN_CLASS = 'img-filters__button';
  // фильтр фото
  var imgFilters = document.querySelector('.img-filters');
  var filterForm = document.querySelector('.img-filters__form');
  var photos = [];

  var showFilters = function (pics) {
    photos = pics;
    imgFilters.classList.remove('img-filters--inactive');
  };

  filterForm.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains(BTN_CLASS)) {
      var activeBtn = filterForm.querySelector('.' + BTN_CLASS + '--active');
      activeBtn.classList.remove(BTN_CLASS + '--active');
      target.classList.add(BTN_CLASS + '--active');
      debouncedFilter(target.id);
    }
  });

  var filterPhotos = function (filterId) {
    var filteringPhotos = [];
    switch (filterId) {
      case 'filter-popular':
        filteringPhotos = photos;
        break;
      case 'filter-random':
        filteringPhotos = shuffle(photos.slice());
        break;
      case 'filter-discussed':
        filteringPhotos = photos.slice().sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        break;
    }
    window.renderPicture(filteringPhotos);
  };

  var debouncedFilter = window.debounce(filterPhotos);

  var shuffle = function (pics) {
    var resultArr = [];
    for (var i = 0; i < 10; i++) {
      var randomIndex = window.util.getRandomInt(0, pics.length - 1);
      var randomItem = pics.slice(randomIndex, 1)[0];
      resultArr.push(randomItem);
    }
    return resultArr;
  };

  window.showFilters = showFilters;

})();
