$(function(){

    let param = {}
    function setParams(){
        param.siteHeight = $('body').height(),
        param.headerHeight = $('.header').height(),
        param.backgroundHeight = param.siteHeight - param.headerHeight,
        param.sidebarLeftHeight = $('.sidebar--left').height();
    }
    
    function setHeight(){
        if (param.sidebarLeftHeight > param.backgroundHeight){
            $('.header__background').css('height', param.sidebarLeftHeight)
        } else{
            $('.header__background').css('height', param.backgroundHeight)
        }
    }
    
    setParams()
    setHeight()

    $('.header__search-btn').on('click', function(){
        $(this).addClass('header__search-btn--white')
        $('.header__search').removeClass('header__search--input-hidden')
        $('.header__search-input').focus()
    })

    $('.header__search-input').on('blur', function(){
        $('.header__search-btn').removeClass('header__search-btn--white')
        $('.header__search').addClass('header__search--input-hidden')
    })

    let checkDropdown = {}
    checkDropdown.value = 0

    $('.sidebar__list-item').on('mouseenter', function(){
        checkDropdown.value = 1
    })

    $('.sidebar__list-item').on('mouseleave', function(){
        checkDropdown.value = 0
    })

    $('.menu__horizontal').hide()
    $('.sidebar__list-item').on('click', function(){
        $(this).siblings().children('.menu__horizontal').hide(300)
        $($(this).siblings()).removeClass('sidebar__list-item--active');
        $(this).toggleClass('sidebar__list-item--active')
        $(this).children('.menu__horizontal').toggle(300)
        setTimeout(function(){
            setParams()
            setHeight()
        }, 350);
    })

    $('.header__inner-sections').on('click', function(){
        if ($('.sidebar').hasClass('sidebar--active')){
            $('.sidebar--left').removeClass('sidebar--active')
            $('.header__background').removeClass('header__background--active')
            $('.sidebar__inner').removeClass('animate__slideInLeft')
            setTimeout(function(){
                setParams()
                setHeight()
            }, 350);
        } else{
            $('.sidebar--left').addClass('sidebar--active')
            $('.header__background').addClass('header__background--active')
            $('.sidebar__inner').addClass('animate__slideInLeft')
            $('.sidebar__checker').focus()
            $('.account__modal').removeClass('account__modal--active')
            setTimeout(function(){
                setParams()
                setHeight()
            }, 350);
        }
    })

    $('.sidebar__checker').on('blur', function(){
        if ($('.header__inner-sections').is(':hover')){
            $('.sidebar__checker').focus()
        } else if (checkDropdown.value === 1){
            $('.sidebar__checker').focus()
        } else{
            $('.sidebar--left').removeClass('sidebar--active')
            $('.header__background').removeClass('header__background--active')
            $('.sidebar__inner').removeClass('animate__slideInLeft')
            $('.sidebar__list-item').siblings().children('.menu__horizontal').hide(300)
            $($('.sidebar__list-item').siblings()).removeClass('sidebar__list-item--active');
            setTimeout(function(){
                setParams()
                setHeight()
            }, 350);
        }
    })

    $('.header__inner-sign').on('click', function(){
        $('.account').show()
        $('.account').addClass('account--logged')
        $(this).hide()
        $('.header__inner-get').hide()
    })

    $('.account__header').on('click', function(){
        if ($(".account__modal").hasClass("account__modal--active")){
            $('.account__header').removeClass('account__header--hover')
            $('.account__modal').removeClass('account__modal--active')
        } else{
            $('.account__header').addClass('account__header--hover')
            $('.account__modal').addClass('account__modal--active')
            $('.account__modal-checker').focus()
        }
    })

    $('.account__modal-checker').on('blur', function(){
        if ($('.account__header').is(':hover')){
            $('.account__modal-checker').focus()
        } else{
            $('.account__header').removeClass('account__header--hover')
            $('.account__modal').removeClass('account__modal--active')
        }
    })

    $('.account__modal-leave').on('click', function(){
        $('.account').hide()
        $('.account').removeClass('account--logged')
        $('.header__inner-sign').show()
        $('.header__inner-get').show()
    })

});