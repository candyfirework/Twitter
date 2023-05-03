import express from 'express';
import http from 'http';
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
const router = express.Router();
const validateTweet = [
    body('text')
        .trim()
        .isLength({min:4})
        .withMessage('text는 최소 4자 이상 입력하세요!'),
    validate
]
const app = express()
app.use(express.json())

router.get('/', tweetController.getTweets)
// GET
// /tweets/:id (id로 데이터 찾기)
router.get('/:id', tweetController.getTweets)
//text가 4자 이하인 경우 에러 처리!(POST, PUT에 대해)
//POST (tweets에 데이터 추가)
//id:Date.now().toString()
router.post('/', validateTweet, tweetController.createTweet)
//PUT(text만 수정)
// id를 찾아 body에 수정된 text를 넘김
router.put('/:id', validateTweet, tweetController.updateTweet)
//DELETE
// 삭제할 id를 찾아 데이터 삭제
router.delete('/:id', tweetController.deleteTweet)
export default router;