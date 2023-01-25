const mongoose = require('mongoose')
const Photo = require('../models/Photo.model')

const photos = [
    {
        url: "https://www.hogarmania.com/archivos/202208/mascotas-shiba-inu-xl-1280x720x80xX.jpg",
        comments: []
    },
    {
        url: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2021/11/shiba-inu-2534373.jpg?tf=3840x",
        comments: []
    },
    {
        url: "https://s.yimg.com/ny/api/res/1.2/L6WhrydFxHfu1lKx9wVwXA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM1MA--/https://media.zenfs.com/es/benzinga_espana_844/75c8aa0beca2d47d9ab50c550f8b68a9",
        comments: []
    },
    {
        url: "https://s.yimg.com/ny/api/res/1.2/b.HC.xyFmHmxQCn0dmMxKg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM1Mg--/https://media.zenfs.com/en/investorplace_417/bd6c221b08cdc41462cb823d55a95eb0",
        comments: []
    },
    {
        url: "https://livecoins.com.br/wp-content/uploads/2021/10/Shiba-Inu.jpg",
        comments: []
    },
    {
        url: "https://diariobitcoin.b-cdn.net/wp-content/uploads/2021/10/shiba-inu-unsplash-min-1.jpg",
        comments: []
    },
    {
        url: "https://s10.s3c.es/imag/_v0/770x420/b/9/1/490x_shiba-inu-alamy.jpg",
        comments: []
    },
]

require('../db')

Photo
    .insertMany(photos)
    .then(photos => console.log("Las fotos del SEED =====>", photos))
    .catch(e => console.log(e))
    .finally(() => mongoose.connection.close())