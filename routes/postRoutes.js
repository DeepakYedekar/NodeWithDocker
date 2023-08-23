const express=require('express');

const {getAllPost,getOnePost,updatePost,deletePost,createPost}=require('../controllers/postController');
const protect=require('../middleware/authMiddleware');
const router=express.Router();

router.get('/',protect,getAllPost);
router.post('/',protect,createPost);
router.get('/:id',protect,getOnePost);
router.patch('/:id',protect,updatePost);
router.delete('/:id',protect,deletePost);

module.exports=router;
