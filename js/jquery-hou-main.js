(function() {
    class $Hou {
        //初始化构造
        constructor() {
            //默认ajax参数
            this._ajaxPara = {
                domain:'',
                url: '/',
                data: '',
                type: "post",
                async: true,
                dataType: "json",
                xhrFields: {  //携带cookie信息
                    withCredentials: true
                },
                crossDomain: true,
                cache: true,
                contentType: 'application/x-www-form-urlencoded',
                processData: true,
                headers:{},
                timeout:0,
                username:'',
                password:'',
                global:true,
            };
        }
        //**********************************************************************对外接口
        //发起post请求
        postApi(obj,result){
            this._ajaxPara.type = 'post';
            this._ajaxPara.contentType = 'application/x-www-form-urlencoded';
            this._ajaxPara.processData = true;

            $.extend(this._ajaxPara,obj);

            (typeof(result)!='function')? this.doRequest(''):this.doRequest(result);
        }
        //发起文件传输
        upFile(obj,result){
            this._ajaxPara.type = 'post'; //文件传输默认post
            this._ajaxPara.contentType = false;
            this._ajaxPara.processData = false;

            $.extend(this._ajaxPara,obj);
            let formdata = new FormData();
            $.each(obj.data, function(index, val) {
                formdata.append(index,val);
            });
            this.obj.data = formdata;

            (typeof(result)!='function')? this.doFileRequest(''):this.doFileRequest(result);
        }
        //发起get请求
        getApi(obj,result){
            this._ajaxPara.type = 'get',
            this._ajaxPara.contentType = 'application/x-www-form-urlencoded';
            this._ajaxPara.processData = true;

            $.extend(this._ajaxPara,obj);

            (typeof(result)!='function')? this.doRequest(''):this.doRequest(result);
        }
        //移除空数据 objct-操作的对象
        removeNullDataObj(objct, result){
            var newsObj = {};
            $.each(objct, function(index, val) {
                if (val != '' && val != null) { //筛选空和null
                    var goObj = JSON.parse($hou.reSetObjStr(index, val));
                    $.extend(newsObj, goObj);
                }
            });
            if (typeof(result) == 'function') {
                result(newsObj);
            }
            return newsObj;
        }
        //替换数据对象的空值 obj-替换对象 string-替换的值
        replaceObjNUllData(objct, string, result) {
            var newsObj = {};
            $.each(objct, function(index, val) {
                var jsonstr = '';
                if ((val == '' || val == null)&&typeof(val)!='number') {
                    jsonstr = '{"' + index + '":"' + string + '"}';
                } else {
                    jsonstr = $hou.reSetObjStr(index, val);
                }
                var goObj = JSON.parse(jsonstr);
                $.extend(newsObj, goObj);
            });
            if (typeof(result) == 'function') {
                result(newsObj);
            }
            return newsObj;
        }
        //Reverse null data 逆转字符串为空
        reverseNullData(objct, string, result) {
            var newsObj = {};
            $.each(objct, function(index, val) {
                var jsonstr = '';
                var nulldata = '';
                if (val == string) {
                    jsonstr = '{"' + index + '":"' + nulldata + '"}';
                } else {
                    jsonstr = $hou.reSetObjStr(index, val);
                }
                var goObj = JSON.parse(jsonstr);
                $.extend(newsObj, goObj);
            });
            if (typeof(result) == 'function') {
                result(newsObj);
            }
            return newsObj;
        }
        //去除Map的方法值
        outMapData(object, result) {
            var newsObj = {};
            $.each(object, function(index, val) {
                if (typeof(val) != 'function') {
                    var goObj = JSON.parse($hou.reSetObjStr(index, val));
                    $.extend(newsObj, goObj);
                }
            });
            if (typeof(result) == "function") {
                result(newsObj);
            }
            return newsObj;
        }
        //获取当前时间
        getNowDate(){
            let now = new Date();
            let year = now.getFullYear(), 
                month = now.getMonth() + 1,
                day = now.getDate(),
                hh = now.getHours(), 
                mm = now.getMinutes();
            //年
            let clock = year + "-";
            //月
            (month < 10)?clock += "0":'';
            clock += month + "-";
            //日
            (day < 10)?clock += "0":'';
            clock += day + " ";
            //时
            (hh < 10)?clock += "0":'';
            clock += hh + ":";
            //分
            (mm < 10)?clock += "0":'';
            clock += mm;

            return (clock);
        }

        //时间戳转换时间
        changeTimestamp(cuo){
            var now = new Date(cuo);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();                                                         
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        }

        //数组拆分size为每个数组的大小
        sliceArray(array, size) {
            var result = [];
            for (var x = 0; x < Math.ceil(array.length / size); x++) {
                var start = x * size;
                var end = start + size;
                result.push(array.slice(start, end));
            }
            return result;
        }

        //图片文件转换文件流路径工具
        getFileUrl(file){
            var url = null;
            // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已  
            if (window.createObjectURL != undefined) { // basic  
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)  
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome  
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }

        //获取文件
        getFile(btnObj,result){
            $(btnObj).click(function(event) {
                $(this).append('<input type="file" multiple name="file" accept="image/*" id="hou_selectFile" style="display: none;" />');
                $('#hou_selectFile').click();
                $('#hou_selectFile').one("change",function(){
                    result($('#hou_selectFile')[0].files[0]);
                    $('#hou_selectFile').remove();
                });
            });
        }

        //获取URL的参数(解决乱码问题)
        getUrlParam(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        }
        //***********************************************************************工具
        //提交请求
        doRequest(result) {
            $.ajax({
                url: this.domain+url,
                data: this._ajaxPara.data,
                type: this._ajaxPara.type,
                async: this._ajaxPara.async,
                dataType: this._ajaxPara.dataType,
                xhrFields: this._ajaxPara.xhrFields,
                crossDomain: this._ajaxPara.crossDomain,
                cache: this._ajaxPara.cache,
                contentType: this._ajaxPara.contentType,
                processData: this._ajaxPara.processData,
                headers:this._ajaxPara.headers,
                timeout:this._ajaxPara.timeout,
                username:this._ajaxPara.username,
                password:this._ajaxPara.password,
                global:this._ajaxPara.global,
                success: function(res) {
                    (typeof(result) == 'function') ? result('success', res): '';
                },
                error: function(err) {
                    (typeof(result) == 'function') ? result('error', err): '';
                }
            });
        }
        //根据参数生成对象字符串 用于给JSON.parse转换
        reSetObjStr(key,val){
            var res_newStr = '';
            if (typeof(val) != 'string') { //非字符串重组

                if (typeof(val)=='object') { //数组类型重组

                    res_newStr = '{"' + key + '":' + JSON.stringify(val) + '}';

                } else { //number和布尔类型重组

                    res_newStr = '{"' + key + '":' + val + '}';
                }

            } else {
                //字符串
                res_newStr = '{"' + key + '":"' + val + '"}';
            }
            return res_newStr;
        }
        //*****************************************************************文档
        getMethods(){
            this.methods = {
                postApi:{
                    name:'函数名：postApi(obj,result)',
                    explain:'解释：发起请求默认为post类型',
                    parameters:'参数：obj-AJAX配置参数对象(基本只要配置url和data即可),result-回调函数,回调参数-(state,res)',  
                    result:'回调：请求成功state返回success,失败state返回error,res-请求回来的值',
                    return:'返回：无返回值',  
                },
                upFile:{
                    name:'函数名：upFile(obj,result)',
                    explain:'解释：用于上传文件请求,发起请求默认为post类型',
                    parameters:'参数：obj-AJAX配置参数对象(基本只要配置url和data即可,data:{key:val,file:files}),result-回调函数,回调参数(state,res)',  
                    result:'请求成功state返回success,失败state返回error,res-请求回来的值',
                    return:'返回：无返回值', 
                },
                getApi:{
                    name:'函数名：getApi(obj,result)',
                    explain:'解释：发起请求默认为get类型',
                    parameters:'参数：obj-AJAX配置参数对象(基本只要配置url和data即可),result-回调函数,回调参数(state,res)',  
                    result:'回调：请求成功state返回success,失败state返回error,res为请求回来的值',
                    return:'返回：无返回值',  
                },
                removeNullDataObj:{
                    name:'函数名：removeNullDataObj(obj,result)',
                    explain:'解释：移除对象中为空的元素,只针对第一级对象,对象内的objct不在业务范围内',
                    parameters:'参数：obj-目标对象,result-回调函数,回调参数(res),res为处理后的对象',  
                    result:'回调：res为处理后的object值',
                    return:'返回：返回一个处理后的objcet',  
                },
                replaceObjNUllData:{
                    name:'函数名：replaceObjNUllData(obj,string,result)',
                    explain:'解释：替换对象中的空和null值,只针对第一级对象,对象内的objct不在业务范围内',
                    parameters:'参数：obj-目标对象,string-把目标对象的空元素替换成string的值,result为回调函数,回调参数(res),res为处理后的对象',  
                    result:'回调：res为处理后的object值',
                    return:'返回：返回一个处理后的objcet',  
                },
                reverseNullData:{
                    name:'函数名：reverseNullData(objct, string, result)',
                    explain:'解释：替换对象中指定的值为空,只针对第一级对象,对象内的objct不在业务范围内',
                    parameters:'参数：obj-目标对象,string-替换成空的目标值,result为回调函数,回调参数(res),res为处理后的对象',
                    result:'回调：res为处理后的object值',
                    return:'返回：返回一个处理后的objcet',
                },
                outMapData:{
                    name:'函数名：outMapData(object, result)',
                    explain:'解释：去除对象中的值为function()的元素,只针对第一级对象,对象内的objct不在业务范围内',
                    parameters:'参数：obj-目标对象,result为回调函数,回调参数(res),res为处理后的对象',
                    result:'回调：res为处理后的object值',
                    return:'返回：返回一个处理后的objcet', 
                },
                getNowDate:{
                    name:'函数名：getNowDate()',
                    explain:'解释：获取当前时间',
                    parameters:'参数：null',
                    result:'回调：null',
                    return:'返回：返回一个String类型的当前时间',
                },
            };

            return this.methods;
        }
    }
    window.$Hou = $Hou;
})();