import expess from "express";
import userSession from "../middleware/user_session";
import { streamVideo, getAllCourses, getCourse } from "../controller/video";
const router = expess.Router();

router.get('/video/:id', streamVideo);
router.get('/courses/:id',  getCourse);
router.get('/courses', getAllCourses);
router.get('/favorites', userSession, );
router.get('/later', userSession, );


// router.post('/courses', userSession, );
// router.post('/favorites', userSession, );
// router.post('/later', userSession, )

export default router;
