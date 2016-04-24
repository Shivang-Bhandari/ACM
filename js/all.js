(function($){
    "use strict"; // Start of use strict
    
    
    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */
    
    $(window).load(function(){
        
        // Page loader
        $(".page-loader b").delay(0).fadeOut();
        $(".page-loader").delay(200).fadeOut("slow");
    
        init_scroll_navigate();
        
        $(window).trigger("scroll");
        $(window).trigger("resize");
        
        if (window.location.hash){
            
            var hash_offset = $(window.location.hash).offset().top;
            $("html, body").animate({
                scrollTop: hash_offset
            });
        }
        
    });
    
    $(document).ready(function(){
        
        $(window).trigger("resize");
            
        init_nbc_menu();
        init_classic_menu();
        init_lightbox();
        init_parallax();
        init_shortcodes();
        init_tooltips();
        init_counters();
        init_team();
        initPageSliders();
        initWorkFilter();
        init_services();
        init_google_map();
        
    });
    
    $(window).resize(function(){
        
        init_hipster_screen();
        init_nbc_menu_resize();
        init_classic_menu_resize();
        js_height_init();
        service_height_init();
        
    });
    
    
    /* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }
    
    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    }
    else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    }
    else {
        safariTest = false;
    }
    
    // Detect touch devices    
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }
    
    
    /* ---------------------------------------------
     Sections helpers
     --------------------------------------------- */
    
    // Sections backgrounds
    
    var pageSection = $(".home-section, .page-section, .small-section, .split-section");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    
    // Function for block height 100%
    function height_line(height_object, height_donor){
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }
    
    // Function equal height
    !function(a){
        a.fn.equalHeights = function(){
            var b = 0, c = a(this);
            return c.each(function(){
                var c = a(this).innerHeight();
                c > b && (b = c)
            }), c.css("height", b)
        }, a("[data-equal]").each(function(){
            var b = a(this), c = b.data("equal");
            b.find(c).equalHeights()
        })
    }(jQuery);
    
    
    // Progress bars
    var progressBar = $(".progress-bar");
    progressBar.each(function(indx){
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
    });
    
    var pageSection = $(".home-section, .page-section, .small-section, .split-section");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    
    
    /* --------------------------------------------
     Header "Hipster Style"
     --------------------------------------------- */
    var hsCont = $(".hs-cont");
    var hsWrap = $(".hs-wrap");
    var hsLine2 = $(".js-hs-line-2");
    var hsLine2Mar;
    
     function init_hipster_screen(){
        hsLine2Mar = (hsCont.width() - hsWrap.width()) / 2;
        
        hsLine2.css({
            marginLeft: -hsLine2Mar,
            marginRight: -hsLine2Mar
        });
        
    }
    
    
    
    /* ---------------------------------------------
     Nav panel compact
     --------------------------------------------- */
    
    function init_nbc_menu_resize(){
       $(".nbc-menu-wrap").css("max-height", $(window).height() - $(".nav-bar-compact").height() - 20 + "px"); 
    }

    var nbc_menu_button = $(".nbc-menu-button");
    var nbc_menu_wrap = $(".nbc-menu-wrap");
    
    function init_nbc_menu(){
    
        nbc_menu_button.click(function(){
        
            if ($(this).hasClass("js-active")) {
            
                $(this).removeClass("js-active");
                $(".nav-bar-compact").removeClass("js-opened");
                
                setTimeout(function(){
                    nbc_menu_wrap.hide();
                }, 200);
                
                
            }
            else {
            
                $(this).addClass("js-active");
                nbc_menu_wrap.show();
                
                setTimeout(function(){
                    $(".nav-bar-compact").addClass("js-opened");
                }, 50);
                
            }
            
        });
        
        nbc_menu_wrap.find("a:not(.nbc-has-sub)").click(function(){
            
            if (nbc_menu_button.hasClass("js-active")) {
            
                nbc_menu_button.removeClass("js-active");
                $(".nav-bar-compact").removeClass("js-opened");
                
            }
        });
        
        // Sub menu
        
        var nbcHasSub = $(".nbc-has-sub");
        var nbcThisLi;
        
        nbcHasSub.click(function(){
        
            nbcThisLi = $(this).parent("li:first");
            if (nbcThisLi.hasClass("js-opened")) {
                nbcThisLi.find(".nbc-sub:first").slideUp(function(){
                    nbcThisLi.removeClass("js-opened");
                    nbcThisLi.find(".nbc-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                });
            }
            else {
                $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                nbcThisLi.addClass("js-opened");
                nbcThisLi.find(".nbc-sub:first").slideDown();
            }
            
            return false;
            
        });
        
        // BG after scroll
        
        $(window).scroll(function(){
        
            if ($(window).scrollTop() >= 100) {
                $(".nav-bar-compact").addClass("js-nbc-bg");
            }
            else {
                $(".nav-bar-compact").removeClass("js-nbc-bg");
            }
            
        }); 
        
    }
    
    
    /* ---------------------------------------------
     Nav panel classic
     --------------------------------------------- */
    
    var mobile_nav = $(".mobile-nav");
    var desktop_nav = $(".desktop-nav");
    
    function init_classic_menu_resize(){
        
        // Mobile menu max height
        $(".mobile-on .desktop-nav > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");
        
        // Mobile menu style toggle
        if ($(window).width() < 1024) {
            $(".main-nav").addClass("mobile-on");
        }
        else 
            if ($(window).width() >= 1024) {
                $(".main-nav").removeClass("mobile-on");
                desktop_nav.show();
            }
    }
    
    function init_classic_menu(){
    
        height_line($(".nav-logo-wrap .logo"), $(".main-nav"));
        
        // Navbar sticky
        
        $(".js-stick").sticky({
            topSpacing: 0
        });
        
        
        height_line($(".inner-nav > ul > li > a"), $(".main-nav"));
        height_line(mobile_nav, $(".main-nav"));
        
        mobile_nav.css({
            "width": $(".main-nav").height() + "px"
        });
        
        
        // Mobile menu toggle
        
        mobile_nav.click(function(){
        
            if (desktop_nav.hasClass("js-opened")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                $(this).removeClass("active");
            }
            else {
                desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                $(this).addClass("active");
            }
            
        });
        
        desktop_nav.find("a:not(.mn-has-sub)").click(function(){
            if (mobile_nav.hasClass("active")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                mobile_nav.removeClass("active");
            }
        });
        
        
        // Sub menu
        
        
        var mnHasSub = $(".mn-has-sub");
        var mnThisLi;
        
        $(".mobile-on .mn-has-sub").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down");
        
        mnHasSub.click(function(){
        
            if ($(".main-nav").hasClass("mobile-on")) {
                mnThisLi = $(this).parent("li:first");
                if (mnThisLi.hasClass("js-opened")) {
                    mnThisLi.find(".mn-sub:first").slideUp(function(){
                        mnThisLi.removeClass("js-opened");
                        mnThisLi.find(".mn-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                    });
                }
                else {
                    $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                    mnThisLi.addClass("js-opened");
                    mnThisLi.find(".mn-sub:first").slideDown();
                }
                
                return false;
            }
            else {
                return false;
            }
            
        });
        
        mnThisLi = mnHasSub.parent("li");
        mnThisLi.hover(function(){
        
            if (!($(".main-nav").hasClass("mobile-on"))) {
            
                $(this).find(".mn-sub:first").stop(true, true).fadeIn("fast");
            }
            
        }, function(){
        
            if (!($(".main-nav").hasClass("mobile-on"))) {
            
                $(this).find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
            }
            
        });
        
    }
    
    
    
    /* ---------------------------------------------
     Scroll navigation
     --------------------------------------------- */
    
    function init_scroll_navigate(){
        
        $(".local-scroll").localScroll({
            target: "body",
            duration: 1500,
            easing: "easeInOutExpo"
        });
        
        var sections = $(".home-section, .split-section, .page-section");
        var menu_links = $(".scroll-nav li a, .nbc-menu-links a");
        
        $(window).scroll(function(){
        
            sections.filter(":in-viewport:first").each(function(){
                var active_section = $(this);
                var active_link = $('.scroll-nav li a[href="#' + active_section.attr("id") + '"]');
                menu_links.removeClass("active");
                active_link.addClass("active");
                $('.nbc-menu-links a[href="#' + active_section.attr("id") + '"]').addClass("active");
            });
            
        });
        
    }
    
    
    
    /* ---------------------------------------------
     Lightboxes
     --------------------------------------------- */
    
    function init_lightbox(){
    
        // Works Item Lightbox				
        $(".work-lightbox-link").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        
        // Works Item Lightbox	
        $(".lightbox-gallery-1").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        
        // Other Custom Lightbox
        $(".lightbox-gallery-2").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        $(".lightbox-gallery-3").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        $(".lightbox").magnificPopup();
        
    }
    
    
    
    /* -------------------------------------------
     Parallax
     --------------------------------------------- */
    
    function init_parallax(){
    
        // Parallax        
        if (($(window).width() >= 1024) && (mobileTest == false)) {
            $(".parallax-1").parallax("50%", 0.1);
            $(".parallax-2").parallax("50%", 0.2);
            $(".parallax-3").parallax("50%", 0.3);
            $(".parallax-4").parallax("50%", 0.4);
            $(".parallax-5").parallax("50%", 0.5);
            $(".parallax-6").parallax("50%", 0.6);
            $(".parallax-7").parallax("50%", 0.7);
            $(".parallax-8").parallax("50%", 0.5);
            $(".parallax-9").parallax("50%", 0.5);
            $(".parallax-10").parallax("50%", 0.5);
            $(".parallax-11").parallax("50%", 0.05);
        }
        
    }
    
    
    
    /* ---------------------------------------------
     Shortcodes
     --------------------------------------------- */
    // Tabs minimal	
    function init_shortcodes(){
    
        var tpl_tab_height;
        $(".tpl-minimal-tabs > li > a").click(function(){
        
            if (!($(this).parent("li").hasClass("active"))) {
                tpl_tab_height = $(".tpl-minimal-tabs-cont > .tab-pane").filter($(this).attr("href")).height();
                $(".tpl-minimal-tabs-cont").animate({
                    height: tpl_tab_height
                }, function(){
                    $(".tpl-minimal-tabs-cont").css("height", "auto");
                });
                
            }
            
        });
        
        // Accordion
        var allPanels = $(".accordion > dd").hide();
        allPanels.first().slideDown("easeOutExpo");
        $(".accordion > dt > a").first().addClass("active");
        
        $(".accordion > dt > a").click(function(){
        
            var current = $(this).parent().next("dd");
            $(".accordion > dt > a").removeClass("active");
            $(this).addClass("active");
            allPanels.not(current).slideUp("easeInExpo");
            $(this).parent().next().slideDown("easeOutExpo");
            
            return false;
            
        });
        
        // Toggle
        var allToggles = $(".toggle > dd").hide();
        
        $(".toggle > dt > a").click(function(){
        
            if ($(this).hasClass("active")) {
            
                $(this).parent().next().slideUp("easeOutExpo");
                $(this).removeClass("active");
                
            }
            else {
                var current = $(this).parent().next("dd");
                $(this).addClass("active");
                $(this).parent().next().slideDown("easeOutExpo");
            }
            
            return false;
        });
        
        // Responsive video
        $(".video, .resp-media, .blog-media").fitVids();
               
    }
    
    
    
    /* ---------------------------------------------
     Tooltips (bootstrap plugin activated)
     --------------------------------------------- */
    
    function init_tooltips(){
    
        $(".tooltip-bot, .tooltip-bot a, .nav-social-links a").tooltip({
            placement: "bottom"
        });
        
        $(".tooltip-top, .tooltip-top a").tooltip({
            placement: "top"
        });
        
    }
    
    
    
    /* ---------------------------------------------
     Some facts section
     --------------------------------------------- */
    
     function init_counters(){
        $(".count-number").appear(function(){
            var count = $(this);
            count.countTo({
                from: 0,
                to: count.html(),
                speed: 1300,
                refreshInterval: 60,
            });
            
        });
    }
    
    
    
    
    /* ---------------------------------------------
     Team
     --------------------------------------------- */   
     
    function init_team(){
    
        // Hover        
        $(".team-item").click(function(){
            if ($("html").hasClass("mobile")) {
                $(this).toggleClass("js-active");
            }
        });
        
    }
    
    
})(jQuery); // End of use strict


/* ---------------------------------------------
     Sliders
   --------------------------------------------- */
function initPageSliders(){
    (function($){
        "use strict";
        
        // Fullwidth slider
        $(".fullwidth-slider").owlCarousel({
            //transitionStyle: "backSlide",
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        
        // Fullwidth gallery
        $(".fullwidth-gallery").owlCarousel({
            transitionStyle: "fade",
            autoPlay: 5000,
            slideSpeed: 700,
            singleItem: true,
            autoHeight: true,
            navigation: false,
            pagination: false
        });
        
        // Item carousel
        $(".item-carousel").owlCarousel({
            autoPlay: 5000,
            //stopOnHover: true,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 1],
            navigation: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        
        // Item carousel
        $(".small-item-carousel").owlCarousel({
            autoPlay: 2500,
            stopOnHover: true,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 2],
            pagination: false,
            navigation: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        
        // Single carousel
        $(".single-carousel").owlCarousel({
            //transitionStyle: "backSlide",
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        
        // Content Slider
        $(".content-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Photo slider
        $(".photo-slider").owlCarousel({
            //transitionStyle: "backSlide",
            slideSpeed: 350,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });        
        
        if ($(".owl-carousel").lenth) {
            var owl = $(".owl-carousel").data('owlCarousel');
            owl.reinit();
        }

    })(jQuery);
};

    
    


/* ---------------------------------------------
 Portfolio section
 --------------------------------------------- */

// Projects filtering
var fselector = 0;
var work_grid = $("#work-grid");

function initWorkFilter(){
    (function($){
     "use strict";
     
     work_grid.imagesLoaded(function(){
            work_grid.isotope({
                itemSelector: '.mix',
                layoutMode: 'fitRows',
                filter: fselector
            });
        });
        
        $(".filter").click(function(){
            $(".filter").removeClass("active");
            $(this).addClass("active");
            fselector = $(this).attr('data-filter');
            
            work_grid.isotope({
                itemSelector: '.mix',
                layoutMode: 'fitRows',
                filter: fselector
            });
            return false;
        });
        
    })(jQuery);
}

     
// Project slider
function initWorkSlider(){
    (function($){
        "use strict";
        
        $(".work-full-slider").owlCarousel({
            slideSpeed : 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        
        
        if ($(".owl-carousel").lenth) {
            var owl = $(".owl-carousel").data('owlCarousel');
            owl.reinit();
        }
        
        $(".work-full-media").fitVids();
        
    })(jQuery);
}

// Project Ajax Expander
$(window).load(function(){

    (function($){
        "use strict";
        
        // Works slider
        initWorkSlider();
        
        // Init ajax links classes
        $(".work-ajax-link").parent().addClass("work-item-ajax");
        
    })(jQuery);
    
    // Works item end
    function works_end(){
        (function($){
            "use strict";
            if (!($(".work-opened").parent().prevAll(".work-item-ajax").length)) {
                $(".work-prev").css("visibility", "hidden");
            }
            else {
                $(".work-prev").css("visibility", "visible");
            }
            if (!($(".work-opened").parent().nextAll(".work-item-ajax").length)) {
                $(".work-next").css("visibility", "hidden");
            }
            else {
                $(".work-next").css("visibility", "visible");
            }
        })(jQuery);
    }
    
    // Hash change function
    function hash_change(url){
        (function($){
            "use strict";
            var hash_url = "#/" + url.replace(" .work-wrapper", "");
            window.location.hash = hash_url;
            
        })(jQuery);
    }
    
    
    // Open work
    (function($){
        "use strict";
        window.work_before_scroll = 0;
        $(".work-ajax-link").click(function(){
            work_before_scroll = $(window).scrollTop();
            $(this).addClass("work-opened");
            
            
            $(".body-masked").show().addClass("mask-speed").delay(10).addClass("animated fadeIn");
            
            setTimeout(function(){
                $(".body-masked").removeClass("animated fadeIn").addClass("animated fadeOut");
            }, 1000);
            
            setTimeout(function(){
                $(".body-masked").hide().removeClass("mask-speed animated fadeOut");
            }, 1300);
            
            setTimeout(function(){
                $(".page").hide();
                $(".work-full").show();
            }, 300);
            
            setTimeout(function(){
                if (work_before_scroll != 0) {
                    $("html, body").animate({
                        scrollTop: 0
                    }, "fast", "easeOutExpo");
                }
            }, 550);
            
            var work_url = $(this).attr("href") + ' ' + '.work-wrapper';
            
            $(".work-full-load").load(work_url, function(){
                initWorkSlider();
                $(".work-loader").delay(200).fadeOut(500);
            });
            works_end();
            hash_change(work_url);
            
            return false;
        });
        
    })(jQuery);
    
    // All works (close work)
    
    function close_work(){
    
        $(".body-masked").show().addClass("mask-speed").delay(10).addClass("animated fadeIn");
        
        setTimeout(function(){
            $(".body-masked").removeClass("animated fadeIn").addClass("animated fadeOut");
        }, 1050);
        
        setTimeout(function(){
            $(".body-masked").hide().removeClass("mask-speed animated fadeOut");
        }, 1300);
        
        setTimeout(function(){
            $(".work-full").hide();
            $(".page").show();
            initPageSliders();  
            work_grid.isotope({
                itemSelector: '.mix',
                layoutMode: 'fitRows',
                filter: fselector
            });          
        }, 300);
        
        
        
        setTimeout(function(){
            $(".work-full-load").empty();
            $("html, body").animate({
                scrollTop: work_before_scroll + "px"
            }, "slow", "easeOutExpo");
        }, 350);
        
        work_opened = $(".work-opened");
        work_opened.removeClass("work-opened");
        
        setTimeout(function(){
            service_height_init();
            js_height_init();
        }, 350);
    }
    
    (function($){
        "use strict";
        $(".work-all").click(function(){
            close_work();
            //Hash change
            window.location.hash = "";
            return false;
        });
    })(jQuery);
    
    
    
    // Prev work
    function prev_work(){
    
        $(".work-loader").fadeIn("fast");
        
        var work_prev_url = $(".work-opened").parent().prevAll(".work-item-ajax:first").find(".work-ajax-link").attr("href") +
        ' ' +
        '.work-wrapper';
        setTimeout(function(){
            $(".work-full-load").empty().load(work_prev_url, function(){
                initWorkSlider();
                $(".work-loader").delay(200).fadeOut("fast");
            });
        }, 500);
        var work_opened = $(".work-opened").parent().prevAll(".work-item-ajax:first").find(".work-ajax-link");
        $(".work-ajax-link").removeClass("work-opened");
        work_opened.addClass("work-opened");
        
        // If left end of the links   
        works_end();
        
        // Hash cahnge
        hash_change(work_prev_url);
        
    }
    
    (function($){
        "use strict";
        $(".work-prev").click(function(){
            prev_work();
        });
    })(jQuery);
    
    // Next work
    function next_work(){
    
        $(".work-loader").fadeIn("fast");
        
        var work_next_url = $(".work-opened").parent().nextAll(".work-item-ajax:first").find(".work-ajax-link").attr("href") +
        ' ' +
        '.work-wrapper';
        setTimeout(function(){
            $(".work-full-load").empty().load(work_next_url, function(){
                initWorkSlider();
                $(".work-loader").delay(200).fadeOut("fast");
            });
        }, 500);
        var work_opened = $(".work-opened").parent().nextAll(".work-item-ajax:first").find(".work-ajax-link");
        $(".work-ajax-link").removeClass("work-opened");
        work_opened.addClass("work-opened");
        
        // If right end of the links
        works_end();
        
        // Hash cahnge
        hash_change(work_next_url);
        
    }
    
    (function($){
        "use strict";
        $(".work-next").click(function(){
            next_work();
        });
    })(jQuery);
    
    // Hash change event
    
    (function($){
        "use strict";
        $(window).hashchange(function(){
            if ((location.hash.search("/works") == -1) && ($(".work-full").is(":visible"))) {
                close_work();
                //Hash change
                window.location.hash = "";
            }
            else {
                var hash_new = location.hash;
                var work_url = hash_new.replace("#/", "") + ' ' + '.work-wrapper';
                
                
                if ((hash_new.replace("#/", "") != $(".work-opened").attr("href")) && ($(".work-full").is(":visible"))) {
                
                    $(".work-loader").fadeIn("fast");
                    
                    setTimeout(function(){
                        $(".work-full-load").empty().load(work_url, function(){
                            initWorkSlider();
                            $(".work-loader").delay(200).fadeOut(500);
                        });
                    }, 200);
                    
                    
                    if (work_before_scroll != 0) {
                        $("html, body").animate({
                            scrollTop: 0
                        }, "slow", "easeOutExpo");
                    }
                    
                    var work_opened = $(".work-ajax-link[href = '" + work_url.replace(" .work-wrapper", "") + "']");
                    $(".work-ajax-link").removeClass("work-opened");
                    work_opened.addClass("work-opened");
                    works_end();
                }
                
                if ((hash_new.replace("#/", "") != $(".work-opened").attr("href")) && ($(".work-full").is(":hidden")) && (location.hash.search("/works") != -1)) {
                
                    $(".page").hide();
                    setTimeout(function(){
                        $(".work-full").fadeIn(500);
                    }, 50);
                    
                    setTimeout(function(){
                        $(".work-full-load").empty().load(work_url, function(){
                            initWorkSlider();
                            $(".work-loader").delay(200).fadeOut(500);
                            
                            if (work_before_scroll != 0) {
                                $("html, body").animate({
                                    scrollTop: 0
                                }, "fast", "easeOutExpo");
                            }
                        });
                    }, 650);
                    
                    var work_opened = $(".work-ajax-link[href = '" + work_url.replace(" .work-wrapper", "") + "']");
                    $(".work-ajax-link").removeClass("work-opened");
                    work_opened.addClass("work-opened");
                    works_end();
                }
                
            }
        });
        $(window).trigger('hashchange');
    })(jQuery);
});


/* ---------------------------------------------
 Height 100%
 --------------------------------------------- */
function js_height_init(){
    (function($){
        $(".js-height-full").height($(window).height());
        $(".js-height-parent").each(function(){
            $(this).height($(this).parent().first().height());
        });
    })(jQuery);
}



/* ---------------------------------------------
 Services section
 --------------------------------------------- */
    
var service_item = $(".service-item");
var service_descr = service_item.find(".service-descr");
var service_descr_top;

function init_services(){
    (function($){
    
        $(".service-item").each(function(){
            $(this).find(".service-descr").prepend($(this).find(".service-intro").html());
        });
        
        // Hover        
        service_item.click(function(){
            if ($("html").hasClass("mobile")) {
                if ($(this).hasClass("js-active")) {
                    $(this).removeClass("js-active");
                }
                else {
                    $(this).addClass("js-active");
                }
            }
        });
        
    })(jQuery);
}

function service_height_init(){
    (function($){
    
        var service_max_height = 0;
        if ($(window).width() >= 767) {
            service_item.each(function(index){
                $(this).css("height", "auto");
                if ($(this).height() > service_max_height) {
                    service_max_height = $(this).height();
                }
            });
            
            if (service_max_height > service_item.width() * 0.9) {
                service_item.height(service_max_height);
            }
            else {
                service_item.height(service_item.width() * 0.9);
            }
        }
        
        var service_descr_offset;
        var service_intro_offset;
        service_descr.each(function(){
            service_descr_offset = $(this).height() / 2;
            service_intro_offset = $(this).parent(".si-inner").find(".service-intro").height() / 2;
            $(this).parent(".si-inner").find(".service-intro").css("top", service_descr_offset + "px");
            $(this).parent(".si-inner").find(".service-descr").css("top", -service_intro_offset + "px");
            
        });
        
        // Split sections	
        $(".ssh-table, .split-section-content").css("height", "auto");
        if ($(window).width() > 992) {
            $(".ssh-table, .split-section-content").equalHeights();
        }
        
    })(jQuery);
}
   
    
    
/* ---------------------------------------------
 Google map
 --------------------------------------------- */

var gmMapDiv = $("#map-canvas");

function init_google_map(){
    (function($){
    
        // Open/Close map        
        $("#see-map").click(function(){
            $(this).toggleClass("js-active");
            
            if ($("html").hasClass("mobile")) {
                gmMapDiv.hide();
                gmMapDiv.gmap3({
                    action: "destroy"
                }).empty().remove();
            }
            else {
                gmMapDiv.slideUp(function(){
                    gmMapDiv.gmap3({
                        action: "destroy"
                    }).empty().remove();
                })
            }
            
            gmMapDiv.slideToggle(400, function(){
            
                if ($("#see-map").hasClass("js-active")) {
                    $(".google-map").append(gmMapDiv);
                    init_map();
                }
                
            });
            
            setTimeout(function(){
                $("html, body").animate({
                    scrollTop: $("#see-map").offset().top
                }, "slow", "easeInBack");
            }, 100);
            
            
            return false;
        });
    })(jQuery);
}


function init_map(){
    (function($){
        if (gmMapDiv.length) {
        
            var gmCenterAddress = gmMapDiv.attr("data-address");
            var gmMarkerAddress = gmMapDiv.attr("data-address");
            var gmColor = gmMapDiv.attr("data-color");
            
            
            gmMapDiv.gmap3({
                action: "init",
                marker: {
                    address: gmMarkerAddress,
                    options: {
                        icon: "images/map-marker.png"
                    }
                },
                map: {
                    options: {
                        styles: [{
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 17
                            }]
                        }, {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 20
                            }]
                        }, {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 17
                            }]
                        }, {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 29
                            }, {
                                "weight": 0.2
                            }]
                        }, {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 18
                            }]
                        }, {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 16
                            }]
                        }, {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 21
                            }]
                        }, {
                            "elementType": "labels.text.stroke",
                            "stylers": [{
                                "visibility": "on"
                            }, {
                                "color": gmColor
                            }, {
                                "lightness": 16
                            }]
                        }, {
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "saturation": 36
                            }, {
                                "color": gmColor
                            }, {
                                "lightness": 40
                            }]
                        }, {
                            "elementType": "labels.icon",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        }, {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 19
                            }]
                        }, {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 20
                            }]
                        }, {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 17
                            }, {
                                "weight": 1.2
                            }]
                        }, ],
                        zoom: 14,
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.SMALL
                        },
                        mapTypeControl: false,
                        scaleControl: false,
                        scrollwheel: false,
                        streetViewControl: false,
                        draggable: true
                    }
                }
            });
        }
    })(jQuery);
}
