$(document).ready(function() {
  var owl = $("#owl-about");
  owl.owlCarousel({
    navigation : true,
    items : 1,
    autoplay:true,
    autoplayTimeout:5000,
    autoplaySpeed:1600,
    dots:false, 
    loop:true,
    nav:false,
    responsiveClass:true,
    responsive:{
        760:{
            items:1,
            center:true,
            nav:false,
        },
    }

    
    
    // animateOut: 'fadeOut',
    //    animateIn: 'fadeIn',

      
  });
})


"use strict"

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('BeAModel');
    const successModal = document.querySelector('.modalbox.success');
    const successText = document.querySelector('.modalbox.success p');
    const errorModal = document.querySelector('.modalbox.error');
    const errorText = document.querySelector('.modalbox.error p');
    const btn = document.querySelectorAll('.redo.btn');

    if (!form) return null;
    form.addEventListener('submit', formSend);
    btn[0].addEventListener('click', () => {closeModal()});
    btn[1].addEventListener('click', () => {closeModal()});
    async function formSend(e) {
        e.preventDefault();
        const { error, el } = formValidate(form);

        const formData = new FormData(form);
        formData.append('image1', formImage1.files[0]);
        formData.append('image2', formImage2.files[0]);
        formData.append('image3', formImage3.files[0]);

        if(error === 0) {
          form.classList.add('_sending');
          const response = await fetch('mail.php', {
              method: 'POST',
              body: formData
          });
          if (response.ok) {
            formPreview1.innerHTML = '';
            formPreview2.innerHTML = '';
            formPreview3.innerHTML = '';
            form.reset();
            // show modal window
            const result = await response.json();
            successModal.style.display = 'block';
            successText.innerHTML = result.message;
          } else {
            errorModal.style.display = 'block';
            errorText.innerHTML = 'Что-то пошло не так....';
            // show modal window error
          }
          form.classList.remove('_sending');
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function formValidate(form) {
        let error = 0;
        let el = null;
        let formReq = document.querySelectorAll('._req');

        for(let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')) {
                if(emailTest(input)) {
                    formAddError(input);
                    if(!el) el = input;
                    error++;
                }
            } else {
                if(input.value === '') {
                    formAddError(input);
                    if(!el) el = input;
                    error++;
                }
            }
        }
        return { error, el };
    }

    function formAddError(input) {
        const span = input.nextSibling.nextSibling;
        input.nextSibling.nextSibling.classList.add('error');
        span.style.display = 'block';
    }
    function formRemoveError(input) {
        const span = input.nextSibling.nextSibling;
        span.classList.remove('error');
        span.style.display = 'none';
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    const formImage1 = document.getElementById('upload1');
    const formImage2 = document.getElementById('upload2');
    const formImage3 = document.getElementById('upload3');

    const formPreview1 = document.querySelector('.formPreview1');
    const formPreview2 = document.querySelector('.formPreview2');
    const formPreview3 = document.querySelector('.formPreview3');

    formImage1.addEventListener('change', () => {
        uploadFile(formImage1.files[0], formImage1, formPreview1);
    });
    formImage2.addEventListener('change', () => {
        uploadFile(formImage2.files[0], formImage2, formPreview2);
    });
    formImage3.addEventListener('change', () => {
        uploadFile(formImage3.files[0], formImage3, formPreview3);
    });

    formPreview1.parentElement.addEventListener('click', () => {
        formImage1.click();
    });
    formPreview2.parentElement.addEventListener('click', () => {
        formImage2.click();
    });
    formPreview3.parentElement.addEventListener('click', () => {
        formImage3.click();
    });

    function uploadFile(file, form, preview) {

        if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            errorModal.style.display = block;
            errorText.innerHTML = 'Разрешены только изображения.';
            form.value = '';
            return;
        }

        if(file.size > 3 * 1024 * 1024) {
            errorModal.style.display = block;
            errorText.innerHTML = 'Файл должен быть менее 3 МБ.';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgName = form.nextSibling.nextSibling.nextSibling.nextSibling;
            preview.parentElement.classList.add('is-loaded')
            imgName.classList.replace('placeholder', 'upload-success');
            imgName.innerHTML = file.name;

            const width = preview.width;
            const height = preview.height;
            preview.src = e.target.result;
            preview.width = width + 'px';
            preview.style.width = width + 'px';
        }
        reader.onerror = function(e) {
            errorModal.style.display = block;
            errorText.innerHTML = 'Ошибка загрузки';
        };
        reader.readAsDataURL(file);
    }

    function closeModal() {
        successModal.style.display = 'none';
        errorModal.style.display = 'none';
    }
});
$(window).scroll(function(){
  if ($(this).scrollTop() > 120) {
      $('.header').addClass('fixed');
  } else {
      $('.header').removeClass('fixed');
  }
});
ScrollOut({
  targets: '.photo', 
  once: true,
  onShown: function(el) {
debugger;     if (!el.src) { 
        el.src = el.dataset.src;
     }
  }
})
$('.container-photo').magnificPopup({
  delegate: 'a', // child items selector, by clicking on it popup will open
  type: 'image',
  gallery:{enabled:true}
  // other options

});

$(document).ready(function() {
  var owl = $("#owl-demo");
  owl.owlCarousel({
    navigation : false,
    items : 2,
    dots:false,
    nav:true,
    loop:false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    navText: ['<span class="fas fa-chevron-left fa-2x"></span>','<span class="fas fa-chevron-right fa-2x"></span>'],

       
  });
  owl.on('mousewheel', '.owl-stage', function (e) {
    var speed = 1500;
    if (e.deltaY>0 || e.originalEvent.deltaY>0) {
        owl.trigger('next.owl', [speed]);
        owl.trigger('next.owl',[speed]);
    } else { 
        owl.trigger('prev.owl',[speed]);
        owl.trigger('prev.owl',[speed]);
    }
    e.preventDefault();
});
  
});




    
$(".js-modal-btn").modalVideo();
$(document).ready(function(){
  $('.accordion-list > li > .answer').hide();
    
  $('.accordion-list > li').click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active").find(".answer").slideUp();
    } else {
      $(".accordion-list > li.active .answer").slideUp();
      $(".accordion-list > li.active").removeClass("active");
      $(this).addClass("active").find(".answer").slideDown();
    }
    return false;
  });
  
});
$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items:1,
    loop:true,
    margin:600,
    autoplay:true,
    autoplayTimeout:5000,
    autoplaySpeed:1600,
    center: true,
    slideTransition: "ease-in-out"  
  });
});

//# sourceMappingURL=main.js.map
