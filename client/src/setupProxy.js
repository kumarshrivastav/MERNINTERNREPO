import {createProxyMiddleware} from "http-proxy-middleware"
export default function(app){
    app.use('/api',createProxyMiddleware({
        target:'https://s3.amazonaws.com',changeOrigin:true,pathRewrite:{
            '^/api':''
        }
    }))
}