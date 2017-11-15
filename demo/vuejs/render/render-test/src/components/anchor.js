export default {
    props: {
        level: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            default: true,
        }
    },
    render: function (createElement) {
        console.log(this.$slots.default);
        return createElement(
            'h' + this.level,
            [
                createElement(
                    'a',
                    {   
                        class: {
                            
                        },
                        domProps: {
                            href: '#' + this.title
                        }
                        
                    },
                    this.$slots.default
                )
            ]
        )
    }
}