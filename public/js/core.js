function GetApi(murl, data, func) {
    $.ajax({
        url: murl,
        type: "post",
        data: data,
        dataType: "json",
        success: function(res) {
            func(res);
        },
        error: function(err) {
            func(err);
        }
    });
}

function GetNav(func) {
    var resdata = {
        data:[
            {
                navImg:'image/leftnav/index.png',
                navTitle:'首页',
                navtype:0,
<<<<<<< HEAD
                pages:'tessthtml.html',
=======
                pages:'zichanGuanli/zichanRuku.html',
>>>>>>> 93774cd370d146d424dec7b881f03bb85b5f83fa
                id:0
            },
            {   
                navImg:'image/leftnav/assets.png',
                navTitle:'资产管理',
                navtype:1,
                navChaild:[
<<<<<<< HEAD
                    {navName:'资产入库',pages:'tessthtml.html',type:1,id:1},
                    {navName:'出库领用',pages:'tessthtml.html',type:1,id:2}, 
                    {navName:'资产转移',pages:'tessthtml.html',type:1,id:3},
                    {navName:'资产退库',pages:'tessthtml.html',type:1,id:4},
                    {navName:'资产维修',pages:'tessthtml.html',type:1,id:5},
                    {navName:'资产报废',pages:'tessthtml.html',type:1,id:5},
                    {navName:'资产盘点',pages:'tessthtml.html',type:1,id:5},
                    {navName:'分析报表',pages:'tessthtml.html',type:1,id:5},
                    {navName:'操作记录',pages:'tessthtml.html',type:1,id:5},
=======
                    {navName:'资产入库',pages:'zichanGuanli/zichanRuku.html',type:1,id:1},
                    {navName:'出库领用',pages:'tessthtml.html',type:1,id:2}, 
                    {navName:'资产转移',pages:'tessthtml.html',type:1,id:3},
                    {navName:'资产退库',pages:'tessthtml.html',type:1,id:4},
                    {navName:'资产维修',pages:'tessthtml.html',type:1,id:6},
                    {navName:'资产报废',pages:'tessthtml.html',type:1,id:7},
                    {navName:'资产盘点',pages:'tessthtml.html',type:1,id:8},
                    {navName:'分析报表',pages:'tessthtml.html',type:1,id:9},
                    {navName:'操作记录',pages:'tessthtml.html',type:1,id:10},
>>>>>>> 93774cd370d146d424dec7b881f03bb85b5f83fa
                    
                ]
            },
            {
                navImg:'image/leftnav/expend.png',
                navTitle:'耗材管理',
                navtype:2,
                navChaild:[
                    {navName:'物料分类',pages:'tessthtml.html',type:1,id:7},
                    {navName:'物料档案',pages:'tessthtml.html',type:1,id:8}, 
                    {navName:'仓库档案',pages:'tessthtml.html',type:1,id:9},
                    {navName:'入库单',pages:'tessthtml.html',type:1,id:10},
                    {navName:'出库单',pages:'tessthtml.html',type:1,id:10},
                    {navName:'即时库存查询',pages:'tessthtml.html',type:1,id:10},
                    {navName:'耗材领用查询',pages:'tessthtml.html',type:1,id:10},
                ]
            },
            {
                navImg:'image/leftnav/system.png',
                navTitle:'系统管理',
                navtype:3,
                navChaild:[
                    {navName:'角色管理',pages:'tessthtml.html',type:1,id:11},
                    {navName:'管理员设置',pages:'tessthtml.html',type:1,id:12},
                ]
            },
            {
                navImg:'image/leftnav/appreciation.png',
                navTitle:'增值服务',
                navtype:4,
                navChaild:[
                    {navName:'我的订单',pages:'tessthtml.html',type:1,id:15},
                    {navName:'标签流水',pages:'tessthtml.html',type:1,id:16}, 
                    {navName:'打印标签服务',pages:'tessthtml.html',type:1,id:17},
                ]
            },
        ],
    };
    func(resdata);
}