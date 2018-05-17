var app = new Vue({
    el: '#app',
    data: {
        index:'1',
        iframeUrl: "default.html",
        uniqueOpened: true,
        menuArr: [
            {
                type:'学习文具',
                value:'LearningStationery'
            },
            {
                type:'生活用品',
                value:'dailyUse'
            },
            {
                type:'书籍',
                value:'book'
            },
            {
                type:'零食饮料',
                value:'SnackDrink'
            },
            {
                type:'电子用品',
                value:'Electronic'
            },
            {
                type:'体育用品',
                value:'Sports'
            },
            {
                type:'其他用品',
                value:'other'
            },

        ],
        bedroomArr:[

        ],

        ruleForm: {
            name: '',
            type: '',
            desc: '',
            seller:'',
            bedroom:'',
            b_no:'',
        },

        rules: {
            name: [
                { required: true, message: '请输入物品名称', trigger: 'blur' },
            ],
            type: [
                { required: true, message: '请选择物品类型', trigger: 'change' }
            ],
            desc: [
                { required: true, message: '请填写物品描述', trigger: 'blur' }
            ],
            seller:[
                { required: true, message: '请输入卖家名字', trigger: 'blur' }
            ],
            bedroom:[
                { required: true, message: '请选择宿舍楼', trigger: 'change' }
            ],
            b_no:[
                { required: true, message: '请输入寝室号', trigger: 'blur' }
            ]

        },

        userInfo:{
            name:'',
            postName:'',
        },
        userInfoDialogVisible:false,
        editPasswordModel:{
            password:null,
            checkPassword:null,
        },
        editPasswordDialogVisible:false,
        editPasswordRules:{

            password: [
                {required: true, message: '请输入密码'},
                { min: 1, message: '密码至少1位', trigger: 'blur' }
            ],
            checkPassword: [
                {required: true, message: '请再次输入密码'},
                { min: 1, message: '密码至少1位', trigger: 'blur' },
                {validator: function (rule, value, callback) {

                    if ($('#password').val() != value) {
                            callback(new Error("2次输入的密码不一致"));
                        } else {
                            callback();
                        }
                    }, trigger: 'blur'
                },
            ],
        }
    },
    methods: {
        menuSelect: function (value) {
            this.iframeUrl = value+'.html';
            window.frames[0].location.reload();
        },
        // getBaseData: function () {
        //     // that = this;
        //     // common.getBaseData();
        //     // common.getUserInfo({},function (data) {
        //     //     if(data && data.isSuccess){
        //     //         that.userInfo = data.result;
        //     //         common.setCurrentUserInfo(JSON.stringify(data.result));
        //     //         that.getPageMenu(data.result.userId);
        //     //     }
        //     // });
        // },
        getPageMenu:function (userId) {
            var data={userId:userId};
            var that = this
            common.networkRequest(config.getMenuUrlParam,{}
                ,"post",function(data){
                    common.loggerOut("获取菜单。。。");
                    if(data && data.isSuccess){
                        console.log(data)
                        if (!data.result) {
                            that.$notify({
                                title: '提示',
                                message: '您好，该用户无权限访问销售绩效管理平台，请联系管理员!!',
                                duration: 0,
                                type: 'error'
                            })
                        } else {
                            if (data.result.id == '-1') {
                                var arr = that.setMenu(data.result.children)
                            }
                            else {
                                var arr = that.setMenu([data.result])
                            }
                            that.menuArr = arr
                        }
                    }else{
                        layer.alert(data.msg);
                    }
                });
        },
        logout:function(){

            common.networkRequest(config.logoutSysUrlParam,JSON.stringify({userId:common.getCurrentUserInfo().userId})
                ,"post",function(data){
                if(data && data.isSuccess){
                    layer.alert('退出成功');
                    common.clearToken();
                    common.pageRouter("login.html");
                }else{
                    layer.alert(data.msg);
                }
            });

        },
        editPassword:function () {
            this.editPasswordDialogVisible = true;
        },
        editPasswordSubmit:function (formName) {
            var that = this;
            this.$refs[formName].validate(function(valid){
                if (valid) {

                    console.log("提交成功")


                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        showUserInfo:function(){
            that.userInfoDialogVisible = true;
        },
        /**
         * 设置菜单
         * @param data
         */
        // setMenu: function (list) {
        //     var arr = []
        //     for (var i = 0,leng = list.length;i < leng; i++) {
        //         var obj = {}
        //         if (list[i].isParent && list[i].children.length>0) { // 是父节点
        //            obj.menu = list[i].name
        //            obj.items = this.setMenu(list[i].children)
        //            arr.push(obj)
        //         } else if (!list[i].isParent && list[i].parentId != '-1'){ // 子节点
        //             obj.name = list[i].nodeData.name
        //             obj.url = list[i].nodeData.defaultUrl
        //             arr.push(obj)
        //         }
        //     }
        //     return arr
        // }

        select: function (value) {
            console.log(value);
        },
        sell:function () {
            this.editPasswordDialogVisible=true;

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
            return false;
        }
        });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
    watch: {},
    components: {},
    // mounted: function () {
    //     this.getBase Data();
    // }
});

