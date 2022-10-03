import { Router } from 'express';

const IndexRouter = Router();

IndexRouter.get('/', (req, res)=>{
    // res.json({
    //     msg:'Hellow World'
    // });
    
});

export { IndexRouter };