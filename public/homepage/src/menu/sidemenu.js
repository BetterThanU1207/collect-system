var bodyWidth;

$(document).ready(function () {
    bodyWidth = $(document.body).width();

    var mainWidth = bodyWidth - $(".logo").width() - $(".header-menu").width();

    $(".header-tabs").css("width", mainWidth);
})


var SideMenu = function (element, options) {

    this.element = $(element);
    this.options = $.extend(true, {}, this.options, options);
    this.init();

}

SideMenu.prototype = {
    options: {
        data: null,
        activeIndex: null,
        collapse: null
    },

    init: function () {
        var me = this,
            opt = me.options,
            el = me.element;

        el.addClass('sidemenu');

        var sb = [];

        me._createBtn(sb);
        me._createItems(sb);

        me._createTips();
        el.html(sb.join(''));

        //尺寸调整更新header-tabs
        var windowTimer = 0;
        $(window).resize(function () {
            clearTimeout(windowTimer);
            windowTimer = setTimeout(function () {

                var mainWidth = $(document.body).width() - $(".logo").width() - $(".header-menu").width();

                $(".header-tabs").css("width", mainWidth);

                //分放大和缩小(有没有统一的方案) 放大时将dropdown的内容渐渐放到header中
                if ($(document.body).width() > bodyWidth && me.dropdown != null) {


                    var dropItems = me.dropdown.find("li");

                    for (var i = 0, l = dropItems.length; i < l; i++) {
                        var _tab = $(dropItems[i]);

                        $($(".dropdown-menu li")[0]).remove();

                        _tab.appendTo(htabs);
                        if (1 < _tab.offset().top || _tab.offset().left + _tab.width() > htabs.offset().left + htabs.width() - 55) {

                            _tab.prependTo(me.dropdown);
                            break;
                        }
                        if (me.dropdown.find(".htabs-menu").length < 1) {
                            me.tabsMenu.remove();
                            me.tabsMenu = null;
                            createMenu = false;

                        }
                    }
                    bodyWidth = $(document.body).width();

                }
                //缩小时循环 header中的item 放到dropdown中  
                else if ($(document.body).width() < bodyWidth) {

                    var headerItems = $(".header-tabs>ul>li");

                    for (var i = headerItems.length - 1; i >= 0; i--) {

                        var _tab = $($(".header-tabs>ul>li")[i])

                        if (1 < _tab.offset().top || _tab.offset().left + _tab.width() > htabs.offset().left + htabs.width() - 55) {

                            $($(".header-tabs>ul>li")[i]).remove();

                            createMenu = true;

                            if (!me.tabsMenu) {
                                me.tabsMenu = $('<div class="tabs-menu"></div>');
                                $('<li><i class="fa fa-bars"></i><li>').appendTo(me.tabsMenu);
                                me.dropdown = $('<ul class="dropdown-menu"></ul>').appendTo(me.tabsMenu);
                                me.tabsMenu.appendTo(htabs);

                            }
                            _tab.prependTo(me.dropdown);
                        }

                    }
                }
                bodyWidth = $(document.body).width();



            }, 400);
        });


        //hover事件  tooltip
        $(document.body).on("mouseenter", ".menu-collapse .sidemenu-item", function (e) {

            var item = me.getItemByEvent(e);
            var jq = $(e.currentTarget);
            var offTop = (jq.offset().top);
            me.menuTooltip.css("top", offTop);
            $(".menu-tooltip .tooltip-inner").text(item.text);
            me.menuTooltip.show(0);

        })
        $(document.body).on("mouseleave", ".menu-collapse .sidemenu-item", function (e) {
            me.menuTooltip.hide();

        })
        $(document.body).on("click", ".tabs-menu", function (e) {

            $(this).toggleClass("open");

        })
        //头部tabs关闭事件
        $(document.body).on("click", ".dropdown-menu  .close.fa", function (e) {
            e.stopPropagation();//阻止事件冒泡即可
            //怎么阻止掉tabs-item的事件
            $(this).parents("li").remove();

            if (me.dropdown.find(".htabs-menu").length < 1) {
                me.tabsMenu.remove();
                me.tabsMenu = null;
                createMenu = false;

            }
            $(".main").html('<iframe id="mainframe" src="page/index.html" frameborder="0" name="main" style="width:100%;height:100%;padding:0" border="0"></iframe>')

        })
        //header-tabs item点击事件
        $(document.body).on("click", ".header-tabs .tabs-item", function (event) {

            var item = me.getItemByEvent1(event);

            if (item && item.url != null) {
                $(".main").html('<iframe id="mainframe" src="' + item.url + '" frameborder="0" name="main" style="width:100%;height:100%;padding:0" border="0"></iframe>')
            } else if (item && item.url == null) {
                $(".main").html(item.text)
            }
            else {
                $(".main").html('<iframe id="mainframe" src="/homepage/page/page.html" frameborder="0" name="main" style="width:100%;height:100%;padding:0" border="0"></iframe>')

            }
        })

        //头部tabs-dropdown关闭事件
        $(document.body).on("click", ".header-tabs>ul>li>div>.close.fa", function (e) {
            e.stopPropagation(); //阻止事件冒泡即可
            $(this).parents("li").remove();

            if (me.dropdown && me.dropdown.find(".htabs-menu").length > 0) {
                var _tab = $(me.dropdown.find(".htabs-menu")[0]);
                $(me.dropdown.find(".htabs-menu")[0]).remove();
                _tab.appendTo(htabs);

                //下拉元素的宽度放不进剩余空间 放回去
                if (1 < _tab.offset().top || _tab.offset().left + _tab.width() > htabs.offset().left + htabs.width() - 55) {
                    _tab.prependTo(me.dropdown);
                }
                if (me.dropdown.find(".htabs-menu").length < 1) {
                    me.tabsMenu.remove();
                    me.tabsMenu = null;
                    createMenu = false;

                }


            }
            $(".main").html('<iframe id="mainframe" src="page/index.html" frameborder="0" name="main" style="width:100%;height:100%;padding:0" border="0"></iframe>')

        })


        var firstList = $(".sidemenu>ul>li>.sidemenu-item");
        var secondList = $(".sidemenu>ul>li>ul>li>.sidemenu-item");

        var htabs = $(".header-tabs ul");
        createMenu = false;

        //菜单折叠事件
        el.on('click', '.menu-btn', function (e) {
            el.toggleClass('menu-collapse');
            $(document.body).toggleClass("collapse");

            var mainWidth = bodyWidth - $(".logo").width() - $(".header-menu").width();

            $(".header-tabs").css("width", mainWidth);

            if (el.hasClass("menu-collapse") && me.dropdown != null) {
                var dropItems = me.dropdown.find("li");

                for (var i = 0, l = dropItems.length; i < l; i++) {
                    var _tab = $(dropItems[i]);

                    $($(".dropdown-menu li")[0]).remove();

                    _tab.appendTo(htabs);
                    if (1 < _tab.offset().top || _tab.offset().left + _tab.width() > htabs.offset().left + htabs.width() - 55) {

                        _tab.prependTo(me.dropdown);
                        break;
                    }
                    if (me.dropdown.find(".htabs-menu").length < 1) {
                        me.tabsMenu.remove();
                        me.tabsMenu = null;
                        createMenu = false;

                    }
                }
            }
            else {

                var headerItems = $(".header-tabs>ul>li");

                for (var i = headerItems.length - 1; i >= 0; i--) {

                    var _tab = $($(".header-tabs>ul>li")[i])

                    if (1 < _tab.offset().top || _tab.offset().left + _tab.width() > htabs.offset().left + htabs.width() - 55) {

                        $($(".header-tabs>ul>li")[i]).remove();

                        createMenu = true;

                        if (!me.tabsMenu) {
                            me.tabsMenu = $('<div class="tabs-menu"></div>');
                            $('<li><i class="fa fa-bars"></i><li>').appendTo(me.tabsMenu);
                            me.dropdown = $('<ul class="dropdown-menu"></ul>').appendTo(me.tabsMenu);
                            me.tabsMenu.appendTo(htabs);

                        }
                        _tab.prependTo(me.dropdown);
                    }

                }
            }

        });


        //点击菜单 创建header-tabs事件
        el.on('click', '.sidemenu-item', function (event) {
            var firstIndex = firstList.index($(this));
            var secondIndex = secondList.index($(this))
            var item = me.getItemByEvent(event);
            if (item && item.children) {
                if (firstIndex > -1) {
                    me._collapse(firstList, firstIndex);
                }
                else if (secondIndex > -1) {
                    me._collapse(secondList, secondIndex);;
                }
            }
            else {

                if ($("#" + item.id).length > 0) {
                }
                else {
                    if (item.iconCls) {
                        var tab = $('<li  class="htabs-menu"><div id=' + item.id + ' class="tabs-item"><i class="' + item.iconCls + ' "></i>' + item.text + '<i class="close fa fa-close"></i></div></li>');
                    }
                    else {
                        var tab = $('<li  class="htabs-menu" ><div id=' + item.id + ' class="tabs-item">' + item.text + '<i class="close fa fa-close"></i></div></li>');
                    }

                    if (!createMenu) {
                        tab.appendTo(htabs);
                    }
                    //不便使用offse().top的直接对比
                    if (1 < tab.offset().top || tab.offset().left + tab.width() > htabs.offset().left + htabs.width() - 55 || createMenu) {
                        createMenu = true;
                        if (!me.tabsMenu) {
                            me.tabsMenu = $('<div class="tabs-menu"></div>');
                            $('<li><i class="fa fa-bars"></i><li>').appendTo(me.tabsMenu);
                            me.dropdown = $('<ul class="dropdown-menu"></ul>').appendTo(me.tabsMenu);
                            me.tabsMenu.appendTo(htabs);

                        }
                        tab.appendTo(me.dropdown);

                    }
                }
                //开始页面跳转

                if (item.url != null) {
                    $(".main").html('<iframe id="mainframe" src="' + item.url + '" frameborder="0" name="main" style="width:100%;height:100%;padding:0" border="0"></iframe>')
                } else {
                    $(".main").html(item.text)
                }
            }



        });

    },

    getItemByEvent: function (event) {
        var el = $(event.target).closest('.sidemenu-item');
        var id = el.attr("itemid");
        return this.getItemById(id);
    },
    getItemByEvent1: function (event) {
        var el = $(event.target).closest('.tabs-item');
        var id = el.attr("id");
        return this.getItemById(id);
    },

    getItemById: function (id) {
        var me = this,
            idMap = me._idMap;

        if (!idMap) {
            idMap = me._idMap = {};
            function each(items) {
                for (var i = 0, l = items.length; i < l; i++) {
                    var item = items[i];
                    if (item.children) each(item.children);
                    idMap[item.id] = item;
                }
            }
            each(me.options.data);
        }

        return me._idMap[id];
    },

    _collapse: function (list, index) {
        var me = this,
            el = me.element,
            opts = me.options;
        if ($(list[index]).hasClass("open")) {
            $(list[index]).removeClass("open");
            return;
        }
        for (var i = 0; i < list.length; i++) {
            $(list[i]).removeClass("open");
        }
        $(list[index]).addClass("open");

    },
    _createTips: function () {

        this.menuTooltip = $('<div class="tooltip menu-tooltip"><div class="tooltip-arrow" style="top: 50%;"></div><div class="tooltip-inner"></div></div>').appendTo(document.body);

    },
    _createBtn: function (sb) {
        sb[sb.length] = '<div class="menu-btn">';
        sb[sb.length] = '<i class = "fa fa-fw fa-dedent" ></i>';
        sb[sb.length] = '</div>';
    },
    _createItems: function (sb) {
        var me = this,
            el = me.element,
            opts = me.options,
            data = opts.data;

        me._createItem(sb, data, 0)

    },

    _createItem: function (sb, items, level) {

        var me = this,
            opts = me.options,
            activeIndex = opts.activeIndex;

        sb[sb.length] = '<ul>';
        for (var i = 0, l = items.length; i < l; i++) {
            var item = items[i];
            if (item.children) {
                sb[sb.length] = '<li class="meun-had">';
            }
            else {
                sb[sb.length] = '<li>';
            }

            if (i == (activeIndex - 1) && level == 0) {
                sb[sb.length] = '<a itemid="' + item.id + '" class="sidemenu-item open">';
            }
            else {
                sb[sb.length] = '<a itemid="' + item.id + '" class="sidemenu-item">';
            }


            sb[sb.length] = '<span class="sidemenu-icon fa ' + item.iconCls + '"></span>';
            sb[sb.length] = '<span class="sidemenu-text">' + item.text + '</span>';
            if (item.children) {
                sb[sb.length] = '<span class="fa sidemenu-arrow">';
                sb[sb.length] = '</span>';
            }
            sb[sb.length] = '</a>';
            if (item.children) {
                level++;
                me._createItem(sb, item.children, level);
                level--;
            }

            sb[sb.length] = '</li>';
        }

        sb[sb.length] = '</ul>';

    }

}



$.fn.sidemenu = function (options) {

    var isSTR = typeof options == "string",
        args, ret;

    if (isSTR) {
        args = $.makeArray(arguments)
        args.splice(0, 1);
    }

    var name = "sidemenu",
        type = SideMenu;

    var jq = this.each(function () {
        var ui = $.data(this, name);

        if (!ui) {
            ui = new type(this, options);
            $.data(this, name, ui);
        }
        if (isSTR) {
            ret = ui[options].apply(ui, args);
        }
    });

    return isSTR ? ret : jq;
};


