new Vue({
    el:'#product',
    data: {
        products:[
            {
                loc:'../images/shoes.jpg',
                type:'shoes',
                name:'鞋子'
            },
            {
                loc:'../images/book.jpg',
                type:'book',
                name:'书'
            },
            {
                loc:'../images/timg.jpg',
                type:'timg',
                name:'电子产品'
            },
            {
                loc:'../images/food.jpg',
                type:'food',
                name:'零食'
            }
        ]
    },
    methods: {

    },
    // mounted:{
    //     // getType: function () {
    //     //     console.log(this.$route.query.id)
    //     // }
    // }
})