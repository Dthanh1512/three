$(document).ready(function() {
    /* Set width */
    function setWidth(a,b) {
        let wContent = $('.container').width() / 2;
        let wSlider = $('.container').innerWidth() / 2 + $('.container').offset().left;
        let Content = a.css('width', wContent);
        let Slider = b.css('width', wSlider);
    }

    let ctFeature = $('.features .content');
    let slideFeature = $('.features .slider-feature');
    let ctAbout = $('.about__item .text');
    let slideAbout = $('.about__item .images');
    let ctContact =  $('.contact__item .text');
    let slideContact = $('.contact__item .images');
 
    setWidth(ctFeature,slideFeature);
    setWidth(ctAbout,slideAbout);
    setWidth(ctContact,slideContact);

    if($('.slider-feature').length) {
        let $slider = $('.features .slider-feature');
        
        $slider.on('init', function(event, slick, currentSlide){
            $('.features .content .ct:first-child').addClass('active');
        });

        $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            let $content = $('.features .content');
            $content.children('.ct').fadeOut(250).removeClass('active');
            setTimeout(function(){
                $content.find('.ct-'+ nextSlide).fadeIn(0).addClass('active');
            },300);
        });

        $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            useTransform: true,
            arrows: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
        })

        let prev = $('.control .prev');
        let next = $('.control .next');
        prev.click(function(){
            $('.slider-feature .slick-prev').trigger('click');
        });
        next.click(function(){
            $('.slider-feature .slick-next').trigger('click');
        })        
    }
    /* team */
    if($('.teams').length) {
        let $teams = $('.teams .team-wrap .list');
        $teams.flickity({
            cellAlign: 'left',
            contain: true,
            freeScroll: true,
            prevNextButtons: false,
            pageDots: false,
            imagesLoaded: true,
            lazyLoad: 2,
        })
        
        $('.teams .control .prev').on('click', function() {
            $teams.flickity('previous');
        })
    
        $('.teams .control .next').on('click', function() {
            $teams.flickity('next');
        })
    }

    $(window).on('resize',function() {
        setWidth(ctFeature,slideFeature);
        setWidth(ctAbout,slideAbout);
        setWidth(ctContact,slideContact);
    })

    /* Add background header when sroll */
    let header = $('header');
    let heightHeader = header.outerHeight();
    function changeBgHeader() {
        let postionScroll = window.pageYOffset;
        let banner = $('.banner');
        let heightBanner = banner.outerHeight();
    
        if(postionScroll > heightBanner - heightHeader) {
            header.addClass('active');
        }
        else {
            header.removeClass('active');
        }
    }

    /* Menu */
    let menus = $('header .menu li a');
    let sections = [];

    function removeActiveMenu() {
        menus.each(function(index){
            $(this).removeClass('active');
        })
    }

    menus.each(function(index) {
        let className = $(this).attr('href').replace('#', '');
        let section = $('.' + className);
        sections.push(section);
        $(this).on('click', function(e){
            e.preventDefault();
            window.scrollTo({
                top: section.offset().top - heightHeader + 1,
            });
            removeActiveMenu();
            $(this).addClass('active');
        })
    })

    function ActiveMenu() {
        let postionScroll = $(window).scrollTop();
        $.each(sections ,function(index, value) {
            if(postionScroll > value.offset().top - heightHeader && postionScroll < value.offset().top + value.outerHeight()) {
                removeActiveMenu();
                menus.eq(index).addClass('active');
            }
            else {
                menus.eq(index).removeClass('active');
            }
        })
    }

    /* Back to top */
    //let backtotop = document.querySelector('.backtotop'); 
    let totop = $('.totop');

    function showBackToTop() {
        let postionScroll = $(window).scrollTop();
        let positionFeature = $('.features').offset().top;

        if(postionScroll > positionFeature - heightHeader) {
            totop.addClass('active');
        }
        else {
            totop.removeClass('active');
        }
    }

    function BackTopTop() {
        window.scrollTo({
            top: 0
        })
    }

    //backtotop.addEventListener('click', BackTopTop);
    totop.on('click', BackTopTop);

    let nav = $('.nav');
    let btnmenu = $('header .btnmenu');

    btnmenu.on('click', function() {
        nav.toggleClass('active');
        $(this).toggleClass('clicked');
    })

    $(window).on('scroll', function() {
        changeBgHeader();
        showBackToTop();
        ActiveMenu();
    })
})