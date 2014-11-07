var path = require('path');
var debug = true;

var config = {
    // debug 为 true 时，用于本地调试
    debug: debug,

    mini_assets: !debug, // 是否启用静态文件的合并压缩，详见视图中的Loader

    name: 'dzhia', // 社区名字
    description: 'dzhai', // 社区的描述
    keywords: 'dzhai',

    // 添加到 html head 中的信息
    site_headers: [
        '<meta name="author" content="EDP@TAOBAO" />'
    ],
    site_logo: '/public/images/cnodejs_light.svg', // default is `name`
    site_icon: '/public/images/cnode_icon_32.png', // 默认没有 favicon, 这里填写网址

    // cdn host，如 http://cnodejs.qiniudn.com
    site_static_host: '', // 静态文件存储域名
    // 社区的域名
    host: 'localhost',

    // mongodb 配置
    db: 'mongodb://127.0.0.1/dzhai',
    db_name: 'dzhai',


    session_secret: 'dzhai_secret', // 务必修改
    auth_cookie_name: 'dzhai',
    cookie_maxAge: 900000,
    // 程序运行的端口
    port: 3000,

    // 邮箱配置
    mail_opts: {
        host: 'smtp.126.com',
        port: 25,
        auth: {
            user: 'club@126.com',
            pass: 'club'
        }
    },

    //7牛的access信息，用于文件上传
    //qn_access: {
    //    accesskey: 'your access key',
    //    secretkey: 'your secret key',
    //    bucket: 'your bucket name',
    //    domain: 'http://{bucket}.qiniudn.com'
   // },

    //文件上传配置
    //注：如果填写 qn_access，则会上传到 7牛，以下配置无效
    upload: {
        path: path.join(__dirname, 'public/upload/'),
        url: '/public/upload/'
    }
};

module.exports = config;
