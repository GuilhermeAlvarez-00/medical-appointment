import { Router } from "express";
import { userRouter } from "./user.routes";
import { specialityRouter } from "./speciality.routes";
import { doctorRouter } from "./doctor.routes";
import { doctorInfoRouter } from "./doctor-info.routes";
import { patientRouter } from "./patient.routes";
import { doctorScheduleRouter } from "./doctor-schedules.routes";

const router = Router();

router.use(userRouter);
router.use(specialityRouter);
router.use(doctorRouter);
router.use(doctorInfoRouter);
router.use(patientRouter);
router.use(doctorScheduleRouter);

export { router as routes };

