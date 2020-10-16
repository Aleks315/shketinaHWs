$(document).ready(function() {
  //Функции отключения и включения скролла
  function scrollOff() {
    $('html,body').css('overflow', 'hidden');
  }

  function scrollOn() {
    $('html,body').css('overflow', 'visible');
  }



  //Pop-UP:
  //"маска" телефона
  $('.popup__item_tel').inputmask({"mask": "(999) 999-9999"}); //specifying options

  //Список переменных
  const btnPopupOpen = $('.popup-open'),
    popupContainer = $('.popup-container'),
    popupForm = $('.popup__form'),
    btnSend = $('.popup__btn'),
    popupBanner = $('.popup__banner-sended'),
    btnPopupOK = $('.popup__banner_btn');

  //Открыть всплывающее окно
  btnPopupOpen.on('click', function() {
   popupContainer.show();
   scrollOff();
  });

  //Закрыть всплывающее окно по клику на "серую" область
  popupContainer.on('click', function(event) {
    if (event.target == this) {
       $(this).hide();
     }
     scrollOn();
  });

  //Закрыть форму и вывести сообщение об отправке
  btnSend.on('click', function(event) {
    if (event.target == this) {
      popupForm.hide();
      popupBanner.show();
    }
  });

  //по клику на кнопку "Ок" скрывается баннер
  btnPopupOK.on('click', function(event) {
    if (event.target == this) {
      popupContainer.hide();
    }
  });



  //БУРГЕР-МЕНЮ:
  //Список переменных
  const btnBurger = $('.header__menu_btn-burger'),
    menu = $('.header__menu'),
    btnCloseMenu = $('.header__menu_btn-close'),
    btnMenuItem = $('.header__menu_item');

  //Открыть всплывающее меню
  btnBurger.on('click', function() {
    menu.addClass('menu-open');
    btnCloseMenu.addClass('menu-open');
    btnBurger.addClass('hidden');
    scrollOff();
  });

  //Закрыть всплывающее меню
  btnCloseMenu.on('click', function() {
    menu.removeClass('menu-open');
    btnBurger.removeClass('hidden');
    scrollOn();
  });
  //Закрыть всп.меню при клике на пункт меню
  btnMenuItem.on('click', function() {
    menu.removeClass('menu-open');
    btnBurger.removeClass('hidden');
    scrollOn();
  });
  //Плавный скролл до блока по клику на пункт меню
  $(document).on("click", ".scroll-link", function(e) {
    e.preventDefault();
    var id  = $(this).attr('href');
    var top = $(id).offset().top;
    $('body, html').animate({scrollTop: top}, 500);
  });



  //ГАЛЕРЕЯ:
  var mySwiper = new Swiper('.swiper-container', {
    //Зацикленный скролл
    loop: true,

    //Стрелки навигации
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    //Кол-во слайдов в окне и расстояние между ними
    slidesPerView: 3,
    spaceBetween: 30,

    //Адаптив
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      481: {
        slidesPerView: 2,
        spaceBetween: 5
      },
      769: {
        slidesPerView: 2,
        spaceBetween: 0
      },
      1251: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });


  $('form').each(function () {
		$(this).validate({
  		submitHandler(form) {
  			let th = $(form);

  			$.ajax({
    			type: 'POST',
    			url: 'mail.php',
    			data: th.serialize(),
    			// eslint-disable-next-line func-names
    		}).done(() => {
					th.trigger('reset');
  		  });
        // console.log("yep");
  		  return false;
  		}
	  });
	});
});
