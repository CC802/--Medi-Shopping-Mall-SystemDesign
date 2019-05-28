const goodsdata = require('./MeidiHot15.json');
const newgoodsdata = require('./MeidiNew.json');
module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:3000/api/',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            },
                before(app) {
                    app.get('/localApi/hotData', function (req, res) {
                        res.json(goodsdata);
                        })   
                    app.get('/localApi/newData', function (req, res) {
                            res.json(newgoodsdata);
                        })
                    
                }
                
        
        }
    }
}