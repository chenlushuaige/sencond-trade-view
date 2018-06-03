var app = new Vue({
    el: '#app',
    data: {
        index:'1',
        iframeUrl: "product.html",
        uniqueOpened: true,
        menuArr: [
            {
                type:'学习文具',
                value:'0'
            },
            {
                type:'生活用品',
                value:'1'
            },
            {
                type:'书籍',
                value:'2'
            },
            {
                type:'零食饮料',
                value:'3'
            },
            {
                type:'电子用品',
                value:'4'
            },
            {
                type:'体育用品',
                value:'5'
            },
            {
                type:'其他用品',
                value:'6'
            },

        ],
        bedroomArr:[
            {
                name: '四舍',
                value: 'no4'
            }
        ],

        productList:[],
        condition:{
            type:'',
            name:''
        },
        action:'搜索 商品/类型',
        ruleForm: {
            pName: '',
            type: '',
            description: '',
            uId:'',
            bedroom:'',
            bNo:'',
            image:'',
            num:'',
            price:''
        },

        rules: {
            pName: [
                { required: true, message: '请输入物品名称', trigger: 'blur' },
            ],
            type: [
                { required: true, message: '请选择物品类型', trigger: 'change' }
            ],
            description: [
                { required: true, message: '请填写物品描述', trigger: 'blur' }
            ],
            uId:[
                { required: true, message: '请输入卖家名字', trigger: 'blur' }
            ],
            bedroom:[
                { required: true, message: '请选择宿舍楼', trigger: 'change' }
            ],
            bNo:[
                { required: true, message: '请输入寝室号', trigger: 'blur' }
            ],
            price:[
                { type:'number',required: true, message: '请输入单价数字', trigger: 'blur' }
            ],
            num:[
                { type:'number',required: true, message: '请输入数量数字', trigger: 'blur' }
            ]

        },
        fileList2: [],
        userInfo:{
            uId:'',
            password:'',
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
            this.iframeUrl = 'product.html';
            window.frames[0].location.reload();
        },
        getBaseData: function () {
            var that = this;
            var url="http;//localhost:11005/platform/user"
            var data=that.userInfo;
            common.networkRequest(url,JSON.stringify(data),'post',function (data) {
                if(data && data.isSuccess){
                    that.userInfo = data.result;
                    common.setCurrentUserInfo(JSON.stringify(data.result));
                    that.getPageMenu(data.result.userId);
                }
            });
        },
        getPageMenu:function (userId) {
            var data={userId:userId};
            var that = this;
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



        search:function () {
            var that=this;
            var url="http://localhost:11005/platform/index";
            that.condition.name=that.condition.type;
            common.networkRequest(url,JSON.stringify(that.condition),'post',function (data) {
                if(data.isSuccess){
                    console.log(data);
                }
            })
        },

        submitForm: function(formName) {
            var url="http://localhost:11005/platform/addProduct";
            var data=this.ruleForm;debugger
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   common.networkRequest(url,JSON.stringify(data),'post',function (data) {
                       if(data.isSuccess){
                           console.log(data);
                       }
                   })
                } else {
                    console.log('error submit!!');
            return false;
        }
        });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        getUserInfo: function () {
            this.userInfo.uId=window.localStorage.uId;
            this.userInfo.password=window.localStorage.password;
        },
        order: function () {
            this.action="搜索 订单号";
            this.iframeUrl="order.html";
        }
    },
    watch: {},
    components: {},
    mounted: function () {
        //this.getBaseData();
        this.getUserInfo();
    }
});

