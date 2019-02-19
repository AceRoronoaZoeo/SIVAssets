//静态资源
layui.use(['element', 'laytpl'], function() {
    // ['element', 'laytpl']
    var $ = layui.jquery; //引入Jq  1.8
    var element = layui.element; //获取Element
    element.render();
    var active = {
        //在这里给active绑定几项事件，后面可通过active调用这些事件
        tabAdd: function(url, id, name) {
            //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
            //关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分
            element.tabAdd('demo', {
                title: name,
                content: '<iframe data-frameid="' + id + '" src="' + url + '" class="layadmin-iframe"></iframe>',
                id: id //规定好的id
            })
        },
        tabChange: function(id) {
            //切换到指定Tab项
            element.tabChange('demo', id); //根据传入的id传入到指定的tab项
        },
        tabDelete: function(id) {
            element.tabDelete("demo", id); //删除
        },
        tabDeleteAll: function(ids) { //删除所有
            $.each(ids, function(i, item) {
                element.tabDelete("demo", item); //ids是一个数组，里面存放了多个id，调用tabDelete方法分别删除
            })
        }
    };
    //当点击有site-demo-active属性的标签时，即左侧菜单栏中内容 ，触发点击事件
    $('.site-demo-active').on('click', function() {
        var dataid = $(this);
        if ($(".layui-tab-title li").length <= 5) {
            //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
            if ($(".layui-tab-title li[lay-id]").length <= 0) {
                //如果比零小，则直接打开新的tab项
                active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"), dataid.attr("data-title"));
            } else {
                //否则判断该tab项是否以及存在

                var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
                $.each($(".layui-tab-title li[lay-id]"), function() {
                    //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                    if ($(this).attr("lay-id") == dataid.attr("data-id")) {
                        isData = true;
                    }
                })
                if (isData == false) {
                    //标志为false 新增一个tab项
                    active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"), dataid.attr("data-title"));
                }
            }
            //最后不管是否新增tab，最后都转到要打开的选项页面上
            active.tabChange(dataid.attr("data-id"));
            $('#tabTitleHome').find('i').remove();
        } else {
            alert('超出打开页面上限');
        }
        $(this).find('img').attr('src', 'image/leftnav/indexx.png');
    });
});

//配置类资源
var $hou = {
    //初始化logo和公司名称
    initConfig: function(obj) {
        console.log(obj);
        let logo = '';
        let company_name = '';
        let headimg = '';
        let personName = '';
        let hidelogo = true;
        let hideCompanyName = true;
        console.log('/////////'+obj.HideLogo);
        if (obj.Logo!=''&&obj.Logo!=undefined) {logo = obj.Logo;}
        if (obj.CompanyName!=''&&obj.CompanyName!=undefined) {company_name = obj.CompanyName;}
        if (obj.HeadImg!=''&&obj.HeadImg!=undefined) {headimg = obj.HeadImg;}
        if (obj.PersonName!=''&&obj.PersonName!=undefined) {person=obj.PersonName;}
        if (obj.HideLogo!=''&&obj.HideLogo!=undefined) {hidelogo = obj.HideLogo;}
        if (obj.HideCompanyName!=''&&obj.HideCompanyName!=undefined) {hideCompanyName = obj.HideCompanyName;}
        $('#logo_img').attr('src', logo);
        $('#company_name').html(company_name);
        $('#headimg').attr('src', headimg);
        $('#myname').html(personName);
        $hou.hideShow(hidelogo,'logo_img');
        $hou.hideShow(hideCompanyName,'company_name');

    },
    hideShow:function(tf,id){
        console.log(tf+id)
        if (!tf) {
            $('#'+id).hide();
        }else{
            $('#'+id).show();
        }
    },
    //设置头像图片
    setHeadImg: function(headimg) {
        $('#headimg').attr('src', headimg);
    },
    //设置我的名字
    setMyName: function(name) {
        $('#myname').html(name);
    },
    //隐藏logo   
    hideLogo: function() {
        $('#logo_img').hide();
    },
    //隐藏公司名称
    hideCompanyName: function() {
        $('#company_name').hide();
    },
    //隐藏个人中心按钮
    hideMyDataBtn: function() {
        $('#myDataBtn').hide();
    },
    //设置导航栏
    setAsideNav: function(data) {
        layui.use('laytpl', function() {
            var laytpl = layui.laytpl;
            if (data!='') {
                var getTpl = $('#tpl-nav').html();
                laytpl(getTpl).render(data, function(html) {
                    $('#nav_list').html(html);
                });
            } else {
                console.log(JSON.stringify(data.message));
            }
        });
    },
    //设置默认首页信息
    setDefaultHome: function(url, id, title) {
        let sli = '<li lay-id="' + id + '" class="layui-this" id="tabTitleHome">' + title + '</li>';
        let framecuont = '<div class="layui-tab-item layui-show"><iframe data-frameid="' + id + '" src="' + url + '" class="layadmin-iframe" id="tabFrameHome"></iframe></div>';
        $('#tabTitleCont').html(sli);
        $('#tabFrameCont').html(framecuont)
    },
    //子页面打开选项卡
    ChildrenOpenTab: function(cid, curl, ctitle) {
        //静态资源
        layui.use(['element', 'laytpl'], function() {
            // ['element', 'laytpl']
            var $ = layui.jquery; //引入Jq  1.8
            var element = layui.element; //获取Element
            element.render();
            var active = {
                //在这里给active绑定几项事件，后面可通过active调用这些事件
                tabAdd: function(url, id, name) {
                    //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
                    //关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分
                    element.tabAdd('demo', {
                        title: name,
                        content: '<iframe data-frameid="' + id + '" src="' + url + '" class="layadmin-iframe"></iframe>',
                        id: id //规定好的id
                    })
                },
                tabChange: function(id) {
                    //切换到指定Tab项
                    element.tabChange('demo', id); //根据传入的id传入到指定的tab项
                },
                tabDelete: function(id) {
                    element.tabDelete("demo", id); //删除
                },
                tabDeleteAll: function(ids) { //删除所有
                    $.each(ids, function(i, item) {
                        element.tabDelete("demo", item); //ids是一个数组，里面存放了多个id，调用tabDelete方法分别删除
                    })
                }
            };
            //当点击有site-demo-active属性的标签时，即左侧菜单栏中内容 ，触发点击事件
            if ($(".layui-tab-title li").length <= 5) {
                //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
                if ($(".layui-tab-title li[lay-id]").length <= 0) {
                    //如果比零小，则直接打开新的tab项
                    active.tabAdd(curl, cid, ctitle);
                } else {
                    //否则判断该tab项是否以及存在

                    var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
                    $.each($(".layui-tab-title li[lay-id]"), function() {
                        //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                        if ($(this).attr("lay-id") == cid) {
                            isData = true;
                        }
                    })
                    if (isData == false) {
                        //标志为false 新增一个tab项
                        active.tabAdd(curl, cid, ctitle);
                    }
                }
                //最后不管是否新增tab，最后都转到要打开的选项页面上
                active.tabChange(cid);
                $('#tabTitleHome').find('i').remove();
            } else {
                alert('超出打开页面上限');
            }
        });
    },
    //获取URL的参数
    getUrlParam:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },
    setLocalStorage:function(key,val){
        if (!localStorage) {
            return '浏览器不支持LocalStorage';
        }else{
            localStorage.setItem(key,val);
        }
    },
    getLocalStorage:function(key){
        if (!localStorage) {
            return '浏览器不支持LocalStorage';
        }else{
            return localStorage.getItems(key);
        }
    },
};