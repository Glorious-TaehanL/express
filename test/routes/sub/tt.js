var router = require('express').Router();


router.use(로그인했니); //해당라우터 전체에

function 로그인했니(){
    console.log("로그인체크하러왔는데요?");
}

router.get('/tt', (req, res) => {
    res.send('tt GET request to the homepage')
});


  module.exports = router;