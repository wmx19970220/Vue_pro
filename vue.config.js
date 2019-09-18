module.exports = {
    devServer: {
        proxy: {
            '/v1/pois': {
                target: 'http://elm.cangdu.org',
                changeOrigin: true
            }
        }
    }
}