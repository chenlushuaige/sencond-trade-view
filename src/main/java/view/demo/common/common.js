(function (global) {
    var logType = {info: 'info', error: 'error', debug: 'debug'};
    //分公司负责人、销售副总、市场主管、市场人员
    var positionArr = {fgsfzr:'fgsfzr',xsfz:'xsfz',sczg:'sczg',scry:'scry'};

    var common = global.common = {
        logType,
        positionArr,
        networkRequest: networkRequest,

    };



    /***
     * 所有的网络请求
     * @param url   请求url
     * @param data  请求数据
     * @param type 请求类型
     * @param callback 请求回调
     */
    function networkRequest(url, data, type, callback, contentType) {


        var requestUrl = "http://localhost:11000/core-consumer/index"

        $.ajax({
            url: requestUrl,
            data: data,
            type: type,
            dataType: "json",
            contentType: contentType || "application/json",
            success: function (data) {
                common.loggerOut(" 请求url===" + url + "  return==" + data);
                callback & callback(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                callback & callback(XMLHttpRequest, textStatus, errorThrown);
                //servierErr(XMLHttpRequest);
            }
        })
    }












}(window))
