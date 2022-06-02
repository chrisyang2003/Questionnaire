var express = require("express");

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    logging: false,
    dialect: 'sqlite',
    storage: './database.sqlite',
});

XianIDTable = sequelize.define('XianIDTable', {
    name: {
        type: DataTypes.STRING
    },
    images: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

XiangIDTable = sequelize.define('XiangIDTable', {
    name: {
        type: DataTypes.STRING
    },
    images: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})


xianQuestion = sequelize.define('xianQuestion', {
    locid: {
        type: DataTypes.INTEGER
    },

    person: {
        type: DataTypes.INTEGER
    },

    grade: {
        type: DataTypes.INTEGER
    },

}, {
    timestamps: false
    // 这是其他模型参数
});

xiangQuestion = sequelize.define('xiangQuestion', {
    locid: {
        type: DataTypes.INTEGER
    },

    person: {
        type: DataTypes.INTEGER
    },

    grade: {
        type: DataTypes.INTEGER
    },

}, {
    timestamps: false
    // 这是其他模型参数
});



var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")
    console.log('[+]', req.url)
    next()
})

app.use(express.static('vue/dist'));

var bodyParser = require('body-parser');
app.use(bodyParser());

var { expressjwt: exjwt } = require("express-jwt");
const jwt = require('jsonwebtoken')
const key = 'secret12345'

function signToken(user) {
    return jwt.sign({
        user: user
    }, key, { expiresIn: '1day' })
}

app.use(exjwt({
    secret: key,  // 签名的密钥 或 PublicKey
    algorithms: ["HS256"]
}).unless({
    path: [
        '/user/login',
        '/admin/login',
        '/admin/info',
        '/admin/statis',
        '/common/init'
    ]  // 指定路径不经过 Token 解析
}))


app.post('/admin/login', function (req, res) {
    const { username, password } = req.body
    if (username == 'admin' && password == '123456') {
        res.json({
            code: 200,
            msg: "登陆成功",
            data: {
                token: signToken('admin')
            }
        })
        return
    }
    res.json({
        code: 401,
        msg: "登陆失败"
    })
});

app.get('/admin/info', function (req, res) {
    res.json({
        code: 200,
        msg: "登陆失败",
        data: {
            roles: ['admin'],
            introduction: 'I am a super administrator',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: 'Super Admin'
        }
    })
});

app.get('/admin/logout', function (req, res) {
    res.json({
        code: 200,
    })
});

app.get('/admin/statis', async (req, res) => {
    const xianid = await XianIDTable.findAll()
    const xiangid = await XiangIDTable.findAll()

    async function compute(l, type) {
        for (let i of l) {
            const id = i.id

            let r = type == 'xian' ? await xianQuestion.findAll({
                where: {
                    locid: id
                }
            }) : await xiangQuestion.findAll({
                where: {
                    locid: id
                }
            })

            let total = 0
            let average = 0
            let highest = 0
            let lowest = 25
            r.forEach(ele => {
                total += ele.grade
                if (ele.grade > highest) {
                    highest = ele.grade
                }
                if (ele.grade < lowest) {
                    lowest = ele.grade
                }
                console.log(ele.grade);

            });
            if (r.length) {
                average = total / r.length
            }

            if (total == 0) lowest = 0;

            i.dataValues.total = total
            i.dataValues.average = average
            i.dataValues.highest = highest
            i.dataValues.lowest = lowest
        }
        return l
    }

    const xian = await compute(xianid, 'xian')
    const xiang = await compute(xiangid, 'xiang')

    res.json({
        code: 200,
        msg: "登陆失败",
        data: {
            xian: xian,
            xiang: xiang
        }
    })
});

app.get('/common/init', async (req, res) => {
    let init = {
        code: 1,
        msg: "",
        data: {
            swiper: [
                {
                    image: "http://chrisyy.top:5000/assets/addons/booking/img/swiper1.jpg",
                    title: "旅游度假好去处",
                    path: "/pages/my/my"
                },
                {
                    image: "http://chrisyy.top:5000/assets/addons/booking/img/swiper2.jpg",
                    title: "欢迎您的到来！",
                    path: "/pages/my/my"
                }
            ],
            notice: [
                {
                    title: "欢迎来到珙县",
                    path: "/pages/my/my"
                }
            ],

            tpl_ids: [],
            navbar: {
                titleColor: "#fff",
                bgColor: {
                    background: "#374486"
                },
                backIconColor: "#fff",
                backTextStyle: {
                    color: "#fff"
                },
                titleSize: "35",
                isshow: true
            },
            theme: {
                color: "#ffffff",
                bgColor: "#374486",
                ladder: 10,
                number: 9,
                border: 5
            },
            tabbar: {
                color: "#999",
                selectColor: "#000",
                bgColor: "#ffffff",
                height: "100",
                borderTop: true,
                iconSize: "40",
                midButton: false,
                midButtonSize: "60",
                list: [
                    {
                        image: "http://chrisyy.top:5000/assets/addons/booking/img/tabbar/home.png",
                        selectedImage: "http://chrisyy.top:5000/assets/addons/booking/img/tabbar/home-hl.png",
                        text: "首页",
                        path: "/pages/index/index",
                        midButton: false,
                        count: 0,
                        isDot: false,
                        badgeColor: "#ffffff",
                        badgeBgColor: "#374486"
                    },
                    {
                        image: "http://chrisyy.top:5000/assets/addons/booking/img/tabbar/my.png",
                        selectedImage: "http://chrisyy.top:5000/assets/addons/booking/img/tabbar/my-hl.png",
                        text: "我的",
                        path: "/pages/my/my",
                        midButton: false,
                        count: 0,
                        isDot: false,
                        badgeColor: "#ffffff",
                        badgeBgColor: "#374486"
                    }
                ],
                isshow: true
            }
        }
    }

    res.json(init)
})

app.get('/user/index', (req, res) => {
    const user = req.auth.user
    res.json({
        code: 200,
        data: {
            token: "",
            user: {
                avatar: "http://chrisyy.top:5000/uploads/20220405/0af8bc83d3a810dae33ba7ad6a3fb135.jpeg",
                bio: "个人简介",
                nickname: user,
                msg: "登录成功",
            }
        }
    })
})

app.get('/user/login', function (req, res) {
    const mobile = req.query.mobile
    const captcha = req.query.captcha

    if (captcha == '1234') {
        res.json({
            code: 200,
            msg: '登陆成功',
            data: {
                token: signToken(mobile)
            }
        })
        return
    }
    res.json({
        code: 403,
        msg: '登陆失败'
    })
});

app.get('/submit', async (req, res) => {
    const user = req.auth.user
    const type = req.query.type
    const locid = req.query.id
    const sum = req.query.sum


    if (type == 'xiang') {
        let r = await xiangQuestion.create({
            locid: locid,
            person: user,
            grade: sum
        })
    } else {
        await xianQuestion.create({
            locid: locid,
            person: user,
            grade: sum
        })
    }


    res.json({
        code: 200,
        msg: "提交成功"
    })
});

app.get('/loc/getxian', async (req, res, next) => {
    try {
        const user = req.auth.user
        let xiangAll = await XianIDTable.findAll()
        let userlist = []
        for (let i of xiangAll) {
            let check = await xianQuestion.findAll({
                where: {
                    locid: i.id,
                    person: user
                }
            })
            if (!check.length) {
                userlist.push(i)
            }
        }
        res.json(userlist)
    } catch (error) {
        next(err)
    }

});

app.get('/loc/getxiang', async (req, res) => {
    try {
        const user = req.auth.user
        let xiangAll = await XiangIDTable.findAll()
        let userlist = []
        for (let i of xiangAll) {
            let check = await xiangQuestion.findAll({
                where: {
                    locid: i.id,
                    person: user
                }
            })
            if (!check.length) {
                userlist.push(i)
            }
        }
        res.json(userlist)
    } catch (error) {
        next(error)
    }
});

app.post('/user/feedback', async (req, res) => {
    const content = req.body
    console.log(content)

    res.json({
        code: 200,
        msg: "提交成功"
    })
})

app.get('/admin/init', async (req, res) => {
    const xian = await XianIDTable.findAll()
    const xiang = await XiangIDTable.findAll()

    for (let i of xian) {
        const res = await xianQuestion.findAll({
            where: {
                locid: i.id
            }
        })

        console.log(res)
    }




    res.json(xian)
});

app.use(function (err, req, res, next) {
    console.log(err)
    res.json({
        code: 401,
        msg: "未登录"
    })
});

app.listen(3000, async function () {
    // 初始化数据库
    const lib = require('./lib')
    await sequelize.sync({ force: true })
    for (let i of lib.xian) {
        await XianIDTable.create({ name: i, images: "https://pic.baike.soso.com/ugc/baikepic2/0/20220421115439-2009402200_png_635_399_744161.jpg/800" })
    }
    for (let i of lib.xiang) {
        await XiangIDTable.create({ name: i, images: "https://pic.baike.soso.com/ugc/baikepic2/0/20220421115439-2009402200_png_635_399_744161.jpg/800" })
    }
    console.log('start server...')
});