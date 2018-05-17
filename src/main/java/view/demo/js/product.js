var v=new Vue({
    el:'#default',
    data: {
        images:[
            {
                loc:'../images/shoes.jpg',
                type:'shoes'
            },
            {
                loc:'../images/book.jpg',
                type:'book'
            },
            {
                loc:'../images/timg.jpg',
                type:'timg'
            },
            {
                loc:'../images/food.jpg',
                type:'food'
            }
        ]
    },
    methods: {

    },
    mounted:{
        getType: function () {
            debugger 
            console.log(this.$route.query.id)
        }
    }
})