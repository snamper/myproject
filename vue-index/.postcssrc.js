// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    plugins: [
        require('postcss-easy-import')({
            extensions: ['pcss', 'css']
        }),
        require('postcss-theme-variables')({
            vars: {
                'red': '#f62a66',
                'gray': '#374955',
                'blue': '#6900ff',
                'active-color': '#ff0000'
            },
            prefix: '$'
        }),
        require('precss')(),
        require('postcss-calc')(),
        require('autoprefixer')({
            browsers:['last 5 versions']
        })
    ]
}
