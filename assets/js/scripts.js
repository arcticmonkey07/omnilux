// -------------------------------- Главная -----------------------------------

// Прелоадер
if ($('.preloader-wrapper').length > 0) {
  // $('body').css({'overflow': 'hidden'});
  setTimeout(function () {
    $('.preloader-container').remove();
    // $('body').css({'overflow': 'auto'});
  }, 6000)
}

// задаёт Каледоскопу высоту и ширину
if ($('.kalideo').length > 0) {
  function scaleKalideo() {
    if ($(window).width() > 1200) {
      $('.kalideo').css('transform', function (i, value) {
        var scaleWidth = +(((($(window).width() - 1200) / 1200) + 1).toFixed(2));
        var scaleHeight = +(((($(window).height() - 693) / 693) + 1.01).toFixed(2));
        return 'scale(' + scaleWidth + ',' + scaleHeight + ')';
      });
    }
    if ($(window).width() > 1100 && $(window).width() < 1200) {
      $('.kalideo').css('transform', function (i, value) {
        var scaleHeight = +(1.1 - (((693 - $(window).height()) / 693).toFixed(2)));
        return 'scale(' + 1 + ',' + scaleHeight + ')';
      });
    }
  }

  $(document).ready(function () {
    scaleKalideo();
  });

  $(window).on('resize', function () {
    scaleKalideo();
  });
}

// Удаление каледоскопа и вставка картинки
if ($(window).width() < 1100) {
  $('.hexagon').remove();
  $('.kalideo').addClass('kalideo--background');
} else {
  $('.kalideo').removeClass('kalideo--background');
}

// скролл вниз от 1го экрана к 2ому
if ($(window).width() > 951) {
  if ($(window).scrollTop() === 0) {
    var firstScroll = true;
  }

  $(window).on('scroll', function () {
    if (firstScroll === true) {
      $('html, body').animate({
        scrollTop: $('.kalideo-wrapper').outerHeight()
      }, 400);
      firstScroll = false;
    }
    if ($(window).scrollTop() === 0) {
      firstScroll = true;
    }
  });
}

// показ меню по переходу от 1 экрана к 2ому
if ($('.kalideo-wrapper').length > 0) {
  if ($(window).width() > 1100) {
    $('.kalideo-wrapper').waypoint({
      handler: function (direction) {
        $('.nav-main').css({'display': 'none'});
        $('.nav-subtop').removeClass('subtop--open');
        $('.nav-btn__menu').removeClass('nav-btn__menu--active');
      },
      offset: -10
    });
    $('.main-wrapper').waypoint({
      handler: function (direction) {
        $('.nav-main').css({'display': 'flex'});
      },
      offset: 10
    });
  }
}

// Фонарик
if ($(window).width() > 1230) {
  function showFlashlight() {
    $('.lustre__focus').mousemove(function (e) {
      var X = e.pageX - $('.sidebar').width() - 40;
      var Y = e.pageY - $('.kalideo-wrapper').height();
      $('.lustre__focus-bg').css('background', 'radial-gradient(circle at ' + X + 'px ' + Y + 'px, transparent, rgba(30,30,30,0.8) 10%)')
    });
  }
  showFlashlight();
}

// анимация текста на 2ом экране и показ слайдера
if ($('.main-wrapper').length > 0) {
  if ($(window).width() > 950) {
    $('.main-wrapper').waypoint({
      handler: function (direction) {
        $('.collection__show').addClass('collection__show--animate');
        $('.main-wrapper').addClass('line--animate');
        $('.lustre-slider').css({'opacity': '1'});
      },
      offset: 10
    });
    $('.kalideo-wrapper').waypoint({
      handler: function (direction) {
        $('.collection__show').removeClass('collection__show--animate');
        $('.main-wrapper').removeClass('line--animate');
        $('.lustre-slider').css({'opacity': '0'});
        setTimeout(function () {
          $('.lustre-slider').find('.slick-center').find('.lustre-slides__3d-bar-line').addClass('lustre-slides__3d-bar-line--active');
        }, 1000);
      },
      offset: -10
    });
  } else {}
}

// sidebar-slider 2 экран, Вертикальный
if ($('.sidebar-slider').length > 0) {
  $('.sidebar-slider').slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    focusOnSelect: true,
    draggable: false,
    speed: 800,
    arrows: false
  });
}

// анимация при перелистывании слайдера, Вертикальный
$('.sidebar-slider').on('beforeChange', function (e, _ref, curr, next) {
  var c = _ref.slideCount;
  var max = c - 1;
  var step = (next > curr && (curr || next !== max)) || (curr === max && !next) ? 1 : -1;
  var index = step + +$('.slick-current', this).data('slick-index');
  var slidesSelector = [0, c, -c].map(function (n) {
    return "[data-slick-index=\"".concat(index + n, "\"]");
  }).join(', ');

  $('.collection__descr', this).addClass('collection--hide');
  $('.collection__link', this).addClass('collection--hide');
  $('.collection__text', this).addClass('collection-small__text');
  $('.collection__header', this).addClass('collection-small__header');
  $('.collection__header--line', this).addClass('visually-hidden');
  $('.collection__fake', this).removeClass('visually-hidden');
  $(slidesSelector, this).find('.collection__text').removeClass('collection-small__text');
  $(slidesSelector, this).find('.collection__header').removeClass('collection-small__header');
  $(slidesSelector, this).find('.collection__descr').removeClass('collection--hide');
  $(slidesSelector, this).find('.collection__link').removeClass('collection--hide');
  $(slidesSelector, this).find('.collection__header--line').removeClass('visually-hidden');
  $(slidesSelector, this).find('.collection__fake').addClass('visually-hidden');
});

// Изменение заголовка в слайдере , меньше 950px
if ($(window).width() < 950) {
  $('.sidebar-slider').on('afterChange', function () {
    var text = $('.sidebar-slider .slick-current.slick-active .js-text b').text();
    $('.collection-header-mobile p').text(text);
  });
}

// ***** 01 слайдер *****

// slick slider на главной 2 экран, Горизонтальный
if ($('.lustre-slider-one').length > 0) {
  $('.lustre-slider-one').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('.lustre-slider__arrow-left-one'),
    nextArrow: $('.lustre-slider__arrow-right-one'),
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '0px',
    infinite: true,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
}

// переключение коллекций 02
$('.collection-02').on('click', function () {
  $('.lustre-slider-01').hide();
  $('.lustre-slider-02').show();

  $('.lustre').addClass('lustre-collection-02-bg');

  // ***** 02 слайдер ******
  $('.lustre-slider-two').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('.lustre-slider__arrow-left-two'),
    nextArrow: $('.lustre-slider__arrow-right-two'),
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '0px',
    infinite: true,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
  setTimeout(function () {
    $('.lustre-slider').find('.slick-center').find('.lustre-slides__3d-bar-line').addClass('lustre-slides__3d-bar-line--active');
  }, 1000);
});

// переключение коллекций 03
$('.collection-03').on('click', function () {
  $('.lustre-slider-02').hide();
  $('.lustre-slider-03').show();

  $('.lustre').removeClass('lustre-collection-02-bg');
  $('.lustre').addClass('lustre-collection-03-bg');

  // ***** 03 слайдер ******
  $('.lustre-slider-three').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('.lustre-slider__arrow-left-three'),
    nextArrow: $('.lustre-slider__arrow-right-three'),
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '0px',
    infinite: true,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
  setTimeout(function () {
    $('.lustre-slider').find('.slick-center').find('.lustre-slides__3d-bar-line').addClass('lustre-slides__3d-bar-line--active');
  }, 1000);
});

// переключение коллекций 04
$('.collection-01').on('click', function () {
  $('.lustre-slider-03').hide();
  $('.lustre-slider-01').show();

  $('.lustre').removeClass('lustre-collection-02-bg');
  $('.lustre').removeClass('lustre-collection-03-bg');

  $('.lustre-slider-one').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('.lustre-slider__arrow-left-one'),
    nextArrow: $('.lustre-slider__arrow-right-one'),
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '0px',
    infinite: true,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
});


// заполнение загрузки 3D модели
$('.lustre-slider').on('afterChange', function (e, _ref, curr, next) {
  setTimeout(function () {
    var slidesSelector = $('.slick-center');
    $('.lustre-slides__3d-bar-line').removeClass('lustre-slides__3d-bar-line--active');
    $(slidesSelector, this).find('.lustre-slides__3d-bar-line').addClass('lustre-slides__3d-bar-line--active');
  }, 200);
});


// Переход на экран "В интерьере"
$('.lustre__btn-in').on('click', function (e) {
  e.stopPropagation();
  $('.sidebar').addClass('sidebar--hide');
  $('.lustre').addClass('lustre--show');
  $('.lustre-sliders-container').addClass('lustre-sliders-container--hide');
  $('.lustre__in-interior').addClass('lustre__in-interior--show');
  $('.lustre__focus').off();
  $('.lustre__focus-bg').css({'background':'none'});
});

// Переход на экран "В интерьере" в 2ой коллекции
$('.lustre__btn-in.lustre__btn-in--show-02').on('click', function (e) {
  e.stopPropagation();
  $('.lustre').addClass('lustre--show-02');
  $('.sidebar').addClass('sidebar--hide');
  $('.lustre-sliders-container').addClass('lustre-sliders-container--hide');
  $('.lustre__in-interior').addClass('lustre__in-interior--show');
  $('.lustre__focus').off();
  $('.lustre__focus-bg').css({'background':'none'});
});

// Уход
$('.in-interior-btn').on('click', function (e) {
  $('.lustre').removeClass('lustre--show-02');
  $('.sidebar').removeClass('sidebar--hide');
  $('.lustre').removeClass('lustre--show');
  $('.lustre-sliders-container').removeClass('lustre-sliders-container--hide');
  $('.lustre__in-interior').removeClass('lustre__in-interior--show');
  $('.lustre__focus-bg').css({'background':'radial-gradient(circle at -200px -200px, transparent, rgba(30,30,30,0.8) 10%)'});
  showFlashlight();
});

// Отмена события focusOnSelect, чтобы на клике по 1му слайду не ломалось перелистывание слайдов.
$('.lustre-slides__main').on('click', function (e) {
  e.stopPropagation();
});
//
$('.collection__link').on('click', function (e) {
  e.stopPropagation();
});

//

// Grid на главной
if ($('.grid-index').length > 0) {
  $('.grid-index').masonry({
    itemSelector: '.grid-index__item',
    columnWidth: '.grid-index__sizer',
    percentPosition: true
  });
}

// design slider на главной в секции design
if ($('.design-slider').length > 0) {
  $('.design-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('.design__arrow-left'),
    nextArrow: $('.design__arrow-right'),
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          prevArrow: $('.design__arrow-mob-left'),
          nextArrow: $('.design__arrow-mob-right'),
        }
      }
    ]
  });
}

// открывает меню
$('.nav-btn__menu').on('click', function () {
  $('.nav-subtop').toggleClass('subtop--open');

  if ($('.nav-subtop').hasClass('subtop--open')) {
    $(this).addClass('nav-btn__menu--active');
    $('.news-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      // autoplay: true,
      autoplaySpeed: 2000,
      appendDots: $('.news-slider__dots-wrapper')
    });
  } else {
    $(this).removeClass('nav-btn__menu--active');
    $('.news-slider.slick-slider').slick('unslick');
  }
});


// изменяет картинки по скроллу
// $(window).bind('mousewheel', function(event) {
//   if (event.originalEvent.wheelDelta >= 0) {
//     $('.triangle__img').css({'background-image':'url(../img/yosemite.jpg)'});
//   }
//   else {
//     $('.triangle__img').css({'background-image':'url(../img/kalideo.png)'});
//   }
// });

// отключение свертывания вверх среднего и нижнего меню
// скрывает меню по скроллу вниз
if ($('.products-grid-index').length > 0) {
  (function ($) {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.products-grid-index').offset().top;

    $(window).on('scroll load', function () {
      var minimalHeight = 160;
      if (document.scrollingElement.scrollTop > minimalHeight) {
        $('body').addClass("scrolled");
      } else if (document.scrollingElement.scrollTop <= minimalHeight) {
        $('body').removeClass("scrolled");
      }
    });

    $(window).scroll(function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 0);

    function hasScrolled() {
      var st = $(this).scrollTop();
      if (Math.abs(lastScrollTop - st) <= delta)
        return;
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('.nav-main').addClass('js-nav-main-out');
        $('.nav-styles').addClass('js-nav-styles-out');
        $('.nav-types').addClass('js-nav-types-out');
        $('.nav-subtop').addClass('js-nav-subtop-out');
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $('.nav-main').removeClass('js-nav-main-out');
          $('.nav-styles').removeClass('js-nav-styles-out');
          $('.nav-types').removeClass('js-nav-types-out');
          $('.nav-subtop').removeClass('js-nav-subtop-out');
        }
      }
      lastScrollTop = st;
    }
  })($);
}


// прилипающее меню nav-styles и nav-types
$(document).ready(function () {
  if ($('.nav-styles-index').length > 0) {
    (function ($) {
      if ($(window).width() > 1000) {
        var navStyles = new Waypoint.Sticky({
          element: $('.nav-styles-index')[0],
          offset: 90
        });
        var navTypes = new Waypoint.Sticky({
          element: $('.nav-types-index')[0],
          offset: 140
        });
      }
    })($);
  }
});

// убирает верхнюю, среднюю и нажнюю навигацию с нижних экранов
$(document).ready(function () {
  if ($('.info').length > 0) {
    if ($(window).width() > 950) {
      $('.info').waypoint({
        handler: function (direction) {
          if (direction === 'down') {
            $('.nav-main').css({'display': 'none'});
            $('.nav-styles-index').css({'display': 'none'});
            $('.nav-types-index').css({'display': 'none'});
          } else {
            $('.nav-main').css({'display': 'flex'});
            $('.nav-styles-index').css({'display': 'flex'});
            $('.nav-types-index').css({'display': 'flex'});
          }
        },
        offset: 180
      });
    }
  }
});


// Прячет блок про Куки
$(document).ready(function () {
  $('.confidence__btn-agree').on('click', function () {
    $('.confidence').hide();
  });
});

// Показывает Поиск Search и запускает форму
$(document).ready(function () {
  $('.nav-btn__search').on('click', function (e) {
    if ($('.nav__search').hasClass('active')) {
      $(this).removeClass('nav-btn__search--active');
      $('.nav__search').removeClass('active');
    } else {
      e.preventDefault();
      $(this).addClass('nav-btn__search--active');
      $('.nav__search').addClass('active');
      $('.nav__search-input').focus();
    }
  });
});

// Custom Select
if ($('.nav-styles__select').length > 0) {
  if ($('.nav-styles__select').length > 0) {
    $('.nav-styles__select').niceSelect();
  }
}


// // -------------------- Каталог ---------------------------- //

$(document).ready(function () {
  if ($(window).width() < 700) {
    $('.item-big-list-container').insertBefore($('.products-grid-catalog'));
  }

  // каталог открытие item-big
  if ($(window).width() > 1500) {
    $('.grid-catalog__item').on('click', function () {

      // открытие быстрого просмотра другого продукта если уже открыт другой
      if ($('.products-grid-catalog').hasClass('products-grid-catalog--offset')) {
        $('.item-big').addClass('item-big-hide');
        setTimeout(hide, 300); // задержка дисплей none
        $('.item-big--other').removeClass('item-big-hide');
        $('.item-big--other').css({'display': 'block'});
        $('.item-big__slider--other').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          prevArrow: $('.item-big__arrow-left'),
          nextArrow: $('.item-big__arrow-right'),
          dots: true,
          appendDots: $('.item-big__dots-wrapper--other')
        });
      }

      // открытие быстрого просмотра продукта если все закрыты
      $('.products-grid-catalog').addClass('products-grid-catalog--offset');

      $('.item-big').removeClass('item-big-hide');
      $('.item-big').css({'display': 'block'});
      // slider на странице каталога в блоке item-big
      $('.item-big__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.item-big__arrow-left'),
        nextArrow: $('.item-big__arrow-right'),
        dots: true,
        appendDots: $('.item-big__dots-wrapper')
      });
    });
  } else if ($(window).width() > 1000) {
    $('.grid-catalog__item').on('click', function () {
      $('.products-grid-catalog').addClass('products-grid-catalog--offset');

      $('.item-big').removeClass('item-big-hide');
      $('.item-big').css({'display': 'block'});

      $('.grid-catalog__item--width').addClass('grid-catalog__item--four-col');
      // slider на странице каталога в блоке item-big
      $('.item-big__slider.slick-slider').slick('unslick');
      $('.item-big__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.item-big__arrow-left'),
        nextArrow: $('.item-big__arrow-right'),
        dots: true,
        appendDots: $('.item-big__dots-wrapper')
      });
    });
  } else if ($(window).width() > 800) {
    $('.grid-catalog__item').on('click', function () {
      $('.products-grid-catalog').addClass('products-grid-catalog--offset');

      $('.item-big').removeClass('item-big-hide');
      $('.item-big').css({'display': 'block'});

      $('.grid-catalog__item--width').addClass('grid-catalog__item--two-col');
      // slider на странице каталога в блоке item-big
      $('.item-big__slider.slick-slider').slick('unslick');
      $('.item-big__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.item-big__arrow-left'),
        nextArrow: $('.item-big__arrow-right'),
        dots: true,
        appendDots: $('.item-big__dots-wrapper')
      });
    });
  } else if ($(window).width() > 700) {
    $('.grid-catalog__item').on('click', function () {
      $('.products-grid-catalog').addClass('products-grid-catalog--offset');

      $('.item-big').removeClass('item-big-hide');
      $('.item-big').css({'display': 'block'});

      $('.grid-catalog__item--width').addClass('grid-catalog__item--one-col');
      // slider на странице каталога в блоке item-big
      $('.item-big__slider.slick-slider').slick('unslick');
      $('.item-big__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.item-big__arrow-left'),
        nextArrow: $('.item-big__arrow-right'),
        dots: true,
        appendDots: $('.item-big__dots-wrapper')
      });
    });
  } else if ($(window).width() > 300) {
    $('.grid-catalog__item').on('click', function () {
      // $('.products-grid-catalog').addClass('products-grid-catalog--offset');

      $('.item-big').removeClass('item-big-hide');
      $('.item-big').css({'display': 'block'});

      // $('.grid-catalog__item--width').addClass('grid-catalog__item--one-col');
      // slider на странице каталога в блоке item-big
      $('.item-big__slider.slick-slider').slick('unslick');
      $('.item-big__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.item-big__arrow-left'),
        nextArrow: $('.item-big__arrow-right'),
        dots: true,
        appendDots: $('.item-big__dots-wrapper')
      });
    });
  }


// каталог закрытие item-big
function hide() { // задержка дисплей none
  $('.item-big').css({'display': 'none'});
}

$('.item-big__close-btn').on('click', function () {
  $('.products-grid-catalog').removeClass('products-grid-catalog--offset');

  $('.item-big').addClass('item-big-hide');
  setTimeout(hide, 300); // задержка дисплей none
  $('.item-big--other').addClass('item-big-hide');
  setTimeout(hide, 300); // задержка дисплей none
  $('.grid-catalog__item--width').removeClass('grid-catalog__item--four-col');
  $('.grid-catalog__item--width').removeClass('grid-catalog__item--two-col');
  $('.grid-catalog__item--width').removeClass('grid-catalog__item--one-col');
});

// открытие меню фильтров
$(".nav-types__filter-btn").on("click", function (e) {
  e.preventDefault(),
    $('.catalog-filter__link').each(function () {
      $(this).removeClass('catalog-filter__link--active');
    });
  $('.catalog-filter__text').show();
  $('.catalog-filter__item--sort').hide();
  $('.nav-types__filter-btn').toggleClass('nav-types__filter-btn--open');
  $(".catalog-filter").fadeToggle(200);
  $('.catalog-filter-price').hide();
  $('.catalog-filter-material').hide();
});

// открытие меню фильтров Материалов
$('.catalog-filter__link--material').on('click', function () {
  $('.catalog-filter__link').each(function () {
    $(this).removeClass('catalog-filter__link--active');
  });
  $('.catalog-filter__link--material').addClass('catalog-filter__link--active');
  $('.catalog-filter-price').hide();
  $('.catalog-filter-material').fadeToggle(200);
});

// Подсветка активного линка в фильтре Материалов
$('.catalog-filter-material__link').on('click', function () {
  $('.catalog-filter-material__link').each(function () {
    // $(this).removeClass('catalog-filter-material__link--active');
  });
  $(this).toggleClass('catalog-filter-material__link--active');
});

// открытие меню фильтра Цен
$('.catalog-filter__link--retail-price').on('click', function () {
  $('.catalog-filter__text').hide();
  $('.catalog-filter__item--sort').show();
  $('.catalog-filter__link').each(function () {
    $(this).removeClass('catalog-filter__link--active');
  });
  $('.catalog-filter__link--retail-price').addClass('catalog-filter__link--active');
  $('.catalog-filter-material').hide();
  $('.catalog-filter-price').fadeToggle(200);
});

});

// слайдер цен range slider
if ($('.products-grid-catalog').length > 0) {
  var verticalSlider = document.getElementById('catalog-filter-price-slider');
  noUiSlider.create(verticalSlider, {
    start: [0, 150000],
    orientation: 'vertical',
    tooltips: true,
    format: wNumb({
      thousand: ' ',
      decimals: 0
    }),
    range: {
      'min': 0,
      'max': 150000
    }
  });
}

// отступ фильтра от верха
function offsetTopFilter () {
  $('.products-grid__filter-container').css('top', function (i, value) {
    var offset = $('.nav-catalog').outerHeight() + $('.nav-styles-catalog').outerHeight() + $('.nav-types-catalog').outerHeight() - 1;
    return offset;
  });
}
// отступ Item Big от верха
function offsetTopItemBig () {
  $('.item-big').css('top', function (i, value) {
    var offset = $('.nav-catalog').outerHeight() + $('.nav-styles-catalog').outerHeight() + $('.nav-types-catalog').outerHeight() - 1;
    return offset;
  });
}
// высота фильтра рассчитывается
function heightFilterContainer () {
 $('.catalog-filter-container').css('height', function (i, value) {
   var height = $('.nav-catalog').outerHeight() + $('.nav-styles-catalog').outerHeight() + $('.nav-types-catalog').outerHeight() + $('.catalog-filter__btn').outerHeight() - 1;
   return 'calc(100vh - ' + height + 'px)';
 });
}
// высота фильтра цен рассчитывается
function heightFilterPrice () {
  $('.catalog-filter-price').css('height', function (i, value) {
    var height = $('.nav-catalog').outerHeight() + $('.nav-styles-catalog').outerHeight() + $('.nav-types-catalog').outerHeight() - 1;
    return 'calc(100vh - ' + height + 'px)';
  });
}
// высота фильтра материалов рассчитывается
function heightFilterMaterial () {
  $('.catalog-filter-material').css('height', function (i, value) {
    var height = $('.nav-catalog').outerHeight() + $('.nav-styles-catalog').outerHeight() + $('.nav-types-catalog').outerHeight() - 1;
    return 'calc(100vh - ' + height + 'px)';
  });
}

$(document).ready(function () {
  offsetTopFilter();
  offsetTopItemBig();
  heightFilterContainer();
  heightFilterPrice();
  heightFilterMaterial();
});
$(window).on('resize', function () {
  offsetTopFilter();
  offsetTopItemBig();
  heightFilterContainer();
  heightFilterPrice();
  heightFilterMaterial();
});

// скрывает меню по скроллу вниз в КАТАЛОГЕ  и на странице Продукта
if ($('.products-grid-catalog, .product-page').length > 0) {
  (function ($) {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = 100;

    $(window).on('scroll load', function () {
      var minimalHeight = 160;
      if (document.scrollingElement.scrollTop > minimalHeight) {
        $('body').addClass("scrolled");
      } else if (document.scrollingElement.scrollTop <= minimalHeight) {
        $('body').removeClass("scrolled");
      }
    });

    $(window).scroll(function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 0);

    function hasScrolled() {
      var st = $(this).scrollTop();
      if (Math.abs(lastScrollTop - st) <= delta)
        return;
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('.nav-catalog').addClass('js-nav-main-out');
        $('.nav-styles-catalog').addClass('js-nav-styles-out');
        $('.nav-types-catalog').addClass('js-nav-types-out');
        $('.nav-subtop-catalog .nav-subtop').addClass('js-nav-subtop-out');

        $('.products-grid__filter-container').addClass('products-grid__filter-container-top-offset');
        $('.catalog-filter').addClass('catalog-filter-top-offset');
        $('.catalog-filter-container').addClass('catalog-filter-container-top-offset');
        $('.catalog-filter-price').addClass('catalog-filter-top-offset');
        $('.catalog-filter-material').addClass('catalog-filter-top-offset');
        if ($(window).width() > 700) {
          $('.item-big').addClass('item-big-top-offset');
          $('.item-big--other').addClass('item-big-top-offset');
        }
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $('.nav-catalog').removeClass('js-nav-main-out');
          $('.nav-styles-catalog').removeClass('js-nav-styles-out');
          $('.nav-types-catalog').removeClass('js-nav-types-out');
          $('.nav-subtop-catalog .nav-subtop').removeClass('js-nav-subtop-out');

          $('.products-grid__filter-container').removeClass('products-grid__filter-container-top-offset');
          $('.catalog-filter').removeClass('catalog-filter-top-offset');
          $('.catalog-filter-container').removeClass('catalog-filter-container-top-offset');
          $('.catalog-filter-price').removeClass('catalog-filter-top-offset');
          $('.catalog-filter-material').removeClass('catalog-filter-top-offset');

          if ($(window).width() > 700) {
            $('.item-big').removeClass('item-big-top-offset');
            $('.item-big--other').removeClass('item-big-top-offset');

          }
        }
      }
      lastScrollTop = st;
    }
  })($);
}

// упирание в футер быстрого просмотра товара
$(window).on('scroll', function () {
  if ($(window).scrollTop() >= $('body').outerHeight() - $(window).height() - $('.footer').outerHeight()) {
    $('.grid-catalog__item-big').addClass('reached-bottom');
  } else {
    $('.grid-catalog__item-big').removeClass('reached-bottom');
  }
});

// // -------------------- Продукт ---------------------------- //

$(document).ready(function () {

  $('.product-page__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: $('.info-img__arrow-left'),
    nextArrow: $('.info-img__arrow-right'),
    dots: true
  });


  // Модальное окно Купить в 1 клик
  // Открытие
  $('.product-info__btn-buy').on('click', function () {
    $('.product-page-container').addClass('blackout');
    $('.footer').addClass('blackout');
    $('.buy-one-click').fadeToggle();
  });

  // Добавление в корзину
  $('.product-info__btn-add-basket').on('click', function () {
    $('.product-info__btn-add-basket').hide();
    $('.product-info__status').css({'display': 'flex'});
  });

  // Сердечко после нажатие остаётся желтым
  $('.info-img__btn-like .icon-heart').on('click', function () {
    $(this).toggleClass('info-img__btn-like--active');
  });

});

// увеличение картинки по наведению
$(document).ready(function(){
  $('.info-img__img-zoom-js').zoom();
});

// Табы в блоке с таблицой (тех хар-ки)
// Подсветка кнопки таба
$("ul.details__list").on("click", "li:not(.active)", function() {
  $(this)
    .addClass("active")
    .siblings()
    .removeClass("active")
    .closest("div.details")
    .find("div.details__tab")
    .removeClass("active")
    .eq($(this).index())
    .addClass("active");
});


// // -------------------- Контакты  ---------------------------- //

$(document).ready(function() {
  setTimeout(function () {
      $('.iframe-lazy-load').each(function () {
      var thisSrc = $(this).attr('data-src');
      $(this).attr('src', thisSrc);
    });
  }, 1500);
});

// // --------------------  ---------------------------- //

// скрывает меню по скроллу вниз / на страницах после product
if ($('.js-menu-top-roll-up').length > 0) {
  (function ($) {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.nav').offset().top;

    $(window).on('scroll load', function () {
      var minimalHeight = 160;
      if (document.scrollingElement.scrollTop > minimalHeight) {
        $('body').addClass("scrolled");
      } else if (document.scrollingElement.scrollTop <= minimalHeight) {
        $('body').removeClass("scrolled");
      }
    });

    $(window).scroll(function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 0);

    function hasScrolled() {
      var st = $(this).scrollTop();
      if (Math.abs(lastScrollTop - st) <= delta)
        return;
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('.nav-hide').addClass('js-nav-main-out');
        $('.nav-subtop').addClass('js-nav-subtop-out');
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $('.nav-hide').removeClass('js-nav-main-out');
          $('.nav-subtop').removeClass('js-nav-subtop-out');
        }
      }
      lastScrollTop = st;
    }
  })($);
}


// // -------------------- Отзывы -------------------------- //

// Общая оценка - Рейтинг
  $(document).ready(function () {
    if ($(window).width() > 1230) {
      $(function () {
        $(".reviews__rating-input").knob({
          'min': 0,
          'max': 5,
          angleOffset: 90,
          readOnly: true,
          thickness: .23,
          width: 280,
          height: 280,
          fgColor: '#F6C418',
          inputColor: '#ffffff',
          font: 'Montserrat',
          fontWeight: 500,
          bgColor: '#212121',
          'draw': function () {
            $(this.i).css('font-size', '90px');
          }
        });
      });
    } else if ($(window).width() > 400) {
      $(function () {
        $(".reviews__rating-input").knob({
          'min': 0,
          'max': 5,
          angleOffset: 90,
          readOnly: true,
          thickness: .23,
          width: 200,
          height: 200,
          fgColor: '#F6C418',
          inputColor: '#ffffff',
          font: 'Montserrat',
          fontWeight: 500,
          bgColor: '#212121',
          'draw': function () {
            $(this.i).css('font-size', '60px');
          }
        });
      });
    } else if ($(window).width() < 400) {
      $(function () {
        $(".reviews__rating-input").knob({
          'min': 0,
          'max': 5,
          angleOffset: 90,
          readOnly: true,
          thickness: .23,
          width: 150,
          height: 150,
          fgColor: '#F6C418',
          inputColor: '#ffffff',
          font: 'Montserrat',
          fontWeight: 500,
          bgColor: '#212121',
          'draw': function () {
            $(this.i).css('font-size', '40px');
          }
        });
      });
    }
  });

// Рейтинг каждого отзыва
  $('.review-rating-select').barrating({
    theme: 'css-stars',
    initialRating: 5,
    readonly: true
  });

// Оставить рейтинг
  $('#leave-feedback__rating').barrating({
    theme: 'css-stars',
    allowEmpty: true,
    onSelect: function (value, text, event) {
      if (typeof (event) !== 'undefined') {
        $(event.target).parents('.br-wrapper').find('select').valid();
      }
    }
  });

// Модальное окно Оставить отзыв
// Открытие
  $('.reviews__btn-add').on('click', function () {
    $('.add_blackout').addClass('blackout');
    $('.footer').addClass('blackout');
    $('.leave-feedback-modal').slideToggle();
  });

// Открытие Фильтра на кол-во Звёзд
  $('.reviews-left__filter-text--rate').on('click', function (e) {
    e.preventDefault();
    $('.reviews-center').show();
  });
// закрытие
  $('.reviews-center__link-rating').on('click', function (e) {
    e.preventDefault();
    $('.reviews-center').hide();
    $('.reviews-center__link-rating').each(function () {
      $(this).removeClass('reviews-center__link-rating--active');
    });
    $(this).addClass('reviews-center__link-rating--active');
  });


// валидация отзыва
$(document).ready(function () {
  $(".feedback-form").each(function () {
    $(this).validate({
      validateDelegate: function () {
      },
      onsubmit: true,
      errorElement: "div",
      errorPlacement: function (error, element) {

        error.addClass('error-message');

        if ($(element).hasClass('feedback-select')) {
          error.appendTo($(element).parent());
        } else {
          error.insertAfter(element);
        }
      },
      highlight: function (element, errorClass, validClass) {
        $(element).addClass("has-error").parent().addClass("has-error");
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass("has-error").parent().removeClass("has-error");
      },
      ignore: [":disabled, .no-validate"]
    });

    $(this).on('submit', function (e) {
      e.preventDefault();

      if ($(this).valid()) {
        //
      } else {
        return false;
      }
    });
  });
});

// растяжение textarea
$('textarea[data-autoresize]').autosize();


// // -------------------- Профайл Физ. Лицо ---------------------------- //

// добавление ещё одного адреса
$('.js-form__add-address').on('click', function (e) {
  e.preventDefault();
  var address = $('.js-form-block-address').clone();
  $('.js-form-block-address-container').append(address);
  $('.form__input-address-js').last().val('');
  $('.js-form__add-address:first').hide();
  $('.js-form__del-address:first').hide();
  $('.js-form__add-address').hide();
  $('.js-form__del-address').last().show();

  // удаление ещё одного адреса
  $('.js-form__del-address').on('click', function (e) {
    e.preventDefault();
    $('.js-form__del-address').last().remove();
    $('.js-form-block-address').last().remove();
    $('.js-form__add-address:first').show();
  });
});

// маска телефона
$('.mask__input-tel').inputmask({
  mask: "+7 (999) 999-99-99",
  keepStatic: true,
  clearIncomplete: true,
  autoUnmask: false,
  removeMaskOnSubmit: false,
  showMaskOnHover: false
});

// валидация формы
$.extend($.validator.messages, {
  required: "* - обязательное поле",
  email: "Указан неправильный E-mail адрес",
  number: "Введите правильное число",
  digits: "Сюда можно ввоить только цифры",
  equalTo: "Пожалуйста, введите одинаковые пароли",
  maxlength: jQuery.validator.format("Максимальное количество знаков - {0}"),
  minlength: jQuery.validator.format("Минимальное количество знаков - {0}"),
  require_from_group: "Заполните одно из этих полей"
});

$.validator.methods.email = function (value, element) {
  return this.optional(element) || /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/.test(value);
};

$.validator.methods.number = function (value, element) {
  return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
};

$(document).ready(function () {

  $(".validate-form").each(function () {
    $(this).validate({
      validateDelegate: function () {
      },
      onsubmit: true,
      errorElement: "div",
      rules: {
        reg_email: {
          require_from_group: [1, ".reg-email-phone"]
        },
        reg_tel: {
          require_from_group: [1, ".reg-email-phone"]
        }
      },
      errorPlacement: function (error, element) {

        error.addClass('error-message');

        if ($(element).hasClass('feedback-select')) {
          error.appendTo($(element).parent());
        } else {
          error.insertAfter(element);
        }
      },
      highlight: function (element, errorClass, validClass) {
        $(element).addClass("has-error").parent().addClass("has-error");
        $(element).removeClass("valid").parent().removeClass("valid");
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass("has-error").parent().removeClass("has-error");
        $(element).addClass("valid").parent().addClass("valid");
      },
      ignore: [":disabled, .no-validate"]
    });

    setTimeout(function () {
      $(this).find('.num-input').each(function () {
        $(this).rules('add', {
          required: true,
          number: true
        });
      });

      $(this).find('[type="email"]').each(function () {
        $(this).rules('add', {
          required: true,
          email: true
        });
      });
    }, 0);

    $(this).on('submit', function (e) {
      e.preventDefault();

      if ($(this).valid()) {
        //
      } else {
        return false;
      }
    });
  });

  $(document).off('keypress keyup blur', '.only-digits').on('keypress keyup blur', '.only-digits', function(event) {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));

    if ((event.which < 48 || event.which > 57)) {
      event.preventDefault();
    }
  });

  $('input, textarea').each(function(e) {
    if ($(this).val() != '') {
      $(this).addClass('not-empty').parent().addClass('not-empty');
    } else {
      $(this).removeClass('not-empty').parent().removeClass('not-empty');
    }
  });

  $(document).off('change focusout keydown keypress input', 'input, textarea').on('change focusout keydown keypress input', 'input, textarea', function(e) {
    if ($(this).val() != '') {
      $(this).addClass('not-empty').parent().addClass('not-empty');
    } else {
      $(this).removeClass('not-empty').parent().removeClass('not-empty');
    }
  });

  $(document).off('focusin', 'input, textarea').on('focusin', 'input, textarea', function(e) {
    $(this).parent().addClass('focused');
  });

  $(document).off('focusout', 'input, textarea').on('focusout', 'input, textarea', function(e) {
    $(this).parent().removeClass('focused');
  });
});

// // -------------------- Лояльность ---------------------------- //


// Копирование ссылки по клику по иконке копировать.
$('.loyalty-content__link').on('click', function copytext() {
  var $tmp = $("<textarea>");
  $("body").append($tmp);
  $tmp.val($('.loyalty-content__link').text()).select();
  document.execCommand("copy");
  $tmp.remove();
  $('.loyalty-content-link__tooltip').fadeIn();
  setTimeout(function () {
    $('.loyalty-content-link__tooltip').fadeOut();
  }, 1000)
});

// // -------------------- Корзина  ---------------------------- //

// скрывает меню по скроллу вниз  на странице Корзина
if ($(window).width() > 1390) {
  if ($('.basket-page').length > 0) {
    (function ($) {
      var didScroll;
      var lastScrollTop = 0;
      var delta = 5;
      var navbarHeight = $('.nav').offset().top;

      $(window).on('scroll load', function () {
        var minimalHeight = 160;
        if (document.scrollingElement.scrollTop > minimalHeight) {
          $('body').addClass("scrolled");
        } else if (document.scrollingElement.scrollTop <= minimalHeight) {
          $('body').removeClass("scrolled");
        }
        if ($(window).scrollTop() === 0) {
          $('.basket__sidebar').removeClass('basket-sidebar-top-offset-nav');
        }
      });

      $(window).scroll(function (event) {
        didScroll = true;
      });

      setInterval(function () {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 0);

      function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
          return;
        if (st > lastScrollTop && st > navbarHeight) {
          // Scroll Down
          $('.basket__sidebar').addClass('basket-sidebar-top-offset');
          $('.basket__sidebar').removeClass('basket-sidebar-top-offset-nav');
        } else {
          // Scroll Up
          if (st + $(window).height() < $(document).height()) {
            $('.basket__sidebar').removeClass('basket-sidebar-top-offset');
            $('.basket__sidebar').addClass('basket-sidebar-top-offset-nav');
          }
        }
        lastScrollTop = st;
      }
    })($);
  }
}

// // -------------------- Оформление заказа  ---------------------------- //

// скрывает меню по скроллу вниз  на странице Оформление заказа
if ($(window).width() > 1200) {
  if ($('.approval__sidebar').length > 0) {
    (function ($) {
      var didScroll;
      var lastScrollTop = 0;
      var delta = 5;
      var navbarHeight = $('.nav').offset().top;

      $(window).on('scroll load', function () {
        var minimalHeight = 160;
        if (document.scrollingElement.scrollTop > minimalHeight) {
          $('body').addClass("scrolled");
        } else if (document.scrollingElement.scrollTop <= minimalHeight) {
          $('body').removeClass("scrolled");
        }

        if ($(window).scrollTop() === 0) {
          $('.approval__sidebar').removeClass('basket-sidebar-top-offset-nav');
        }
      });

      $(window).scroll(function (event) {
        didScroll = true;
      });

      setInterval(function () {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 0);

      function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
          return;
        if (st > lastScrollTop && st > navbarHeight) {
          // Scroll Down
          $('.approval__sidebar').addClass('basket-sidebar-top-offset');
          $('.approval__sidebar').removeClass('basket-sidebar-top-offset-nav');
        } else {
          // Scroll Up
          if (st + $(window).height() < $(document).height()) {
            $('.approval__sidebar').removeClass('basket-sidebar-top-offset');
            $('.approval__sidebar').addClass('basket-sidebar-top-offset-nav');
          }
        }
        lastScrollTop = st;
      }
    })($);
  }
}

// // -------------------- Мои заказы  ---------------------------- //

  // Скрытие и показ товаров в таблице по клику Свернуть
  $('.orders-table__collapse').on('click', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass('hidden');
    $(this).parent().toggleClass('active');
  });
  // по клику и ещё Х товара
  $('.orders-table__more').on('click', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass('hidden');
    $(this).parent().toggleClass('active');
  });


// // -------------------- Модальные окна общие  ---------------------------- //


// Закрытие модальных окон по клику по Крестику
if ($('.modal').length > 0) {
  $('.modal__btn-close').on('click', function () {
    $('.nav-btn__login').removeClass('nav-btn__login--active');
    $('.add_blackout').removeClass('blackout');
    $('.footer').removeClass('blackout');
    $('.modal').hide();
  });

  // Закрытие модального окна по клику вне окна
  $(document).mouseup(function (e) {
    var modal = $(".modal");
    // определяем клик по модалке или нет, а также по его дочерних элементах, что размещены внутри
    if (!modal.is(e.target) && modal.has(e.target).length === 0) {
      $('.nav-btn__login').removeClass('nav-btn__login--active');
      $('.add_blackout').removeClass('blackout');
      $('.footer').removeClass('blackout');
      $('.modal').hide();
    }

    // Закрывает модальное окно по ESC
    $(this).keydown(function (evt) {
      if (evt.which == 27) {
        $('.nav-btn__login').removeClass('nav-btn__login--active');
        $('.add_blackout').removeClass('blackout');
        $('.footer').removeClass('blackout');
        $('.modal').hide();
      }
    });
  });
}


// Модальные ОКНА ВСЕ
// Открытие
$('.nav-btn__login').on('click', function () {
  $('.modal-links').fadeToggle();
});

// Модальное окно вход
// Открытие
$('.login').on('click', function () {
  $('.modal-links').hide();
  // $(this).addClass('nav-btn__login--active');
  $('.log-in-modal').fadeToggle();
  $('.add_blackout').addClass('blackout');
  $('.footer').addClass('blackout');
});

// Показ скрытие пароля
$('.modal__input-btn-show-pass').on('click', function (e) {
  e.preventDefault();
  if ($('.modal__input-password').prop('type') == 'text') {
    $('.modal__input-password').prop('type', 'password')
  } else {
    $('.modal__input-password').prop('type', 'text')
  }
});

// Изменение картинки показа и скрытия пароля
$('.modal__input-btn-show-pass').on('click', function () {
  $('.modal__input-btn-show-pass').toggleClass('modal__input-btn-show-pass--hide');
});


// Модальное окно Регистрация
// Открытие
$('.register').on('click', function (e) {
  e.preventDefault();
  $('.modal-links').hide();
  $('.register-modal').fadeToggle();
  $('.add_blackout').addClass('blackout');
  $('.footer').addClass('blackout');
});

$('.clients__link-juridical').on('click', function (e) {
  e.preventDefault();
  $('.clients__link-physical').removeClass('active');
  $(this).addClass('active');
  $('.modal__input-company-name').show();
  $('.modal__input-inn').show();
});

$('.clients__link-physical').on('click', function (e) {
  e.preventDefault();
  $('.clients__link-juridical').removeClass('active');
  $(this).addClass('active');
  $('.modal__input-company-name').hide();
  $('.modal__input-inn').hide();
});


// Модальное окно Выслать код
// Открытие
$('.register-confirm').on('click', function (e) {
  e.preventDefault();
  $('.modal-links').hide();
  $('.register-confirm-modal').fadeToggle();
  $('.add_blackout').addClass('blackout');
  $('.footer').addClass('blackout');
});


// Модальное окно Забыли Пароль
// Открытие
$('.forgot-password').on('click', function (e) {
  e.preventDefault();
  $('.modal-links').hide();
  $('.forgot-password-modal').fadeToggle();
  $('.add_blackout').addClass('blackout');
  $('.footer').addClass('blackout');
});

// Модальное окно Изменить Пароль
// Открытие
$('.change-password').on('click', function (e) {
  e.preventDefault();
  $('.modal-links').hide();
  $('.change-password-modal').fadeToggle();
  $('.add_blackout').addClass('blackout');
  $('.footer').addClass('blackout');
});


// Модальное окно Успешная отправка отзывы
// Открытие
$('.leave-feedback__btn-send').on('click', function (e) {
  e.preventDefault();
  $('.leave-feedback-modal').hide();
  $('.feedback-success-modal').fadeToggle();
  $('.add_blackout').addClass('blackout');
  $('.footer').addClass('blackout');
});

// --------------------------------------------------------------------------------------------------------------\\

