import express, { Request, Response } from "express";
import LeaderShip from "../schema/leaderShipSchema";
import { Rollbar } from "../helpers/Rollbar";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const result = await getAttendanceByUserId(userId.toString());
      return res.status(200).json({ response: result });
    }
    if (!userId) {
      const result = await getAllAttendance();
      return res.status(200).json({ response: result });
    }
  } catch (error) {
    Rollbar.error(error as unknown as Error, req);
    res.status(500).json({ message: (error as unknown as Error).message });
  }
});

const getAttendanceByUserId = async (userId: string) => {
  var result = await LeaderShip.findOne({
    microsoftUserId: userId,
  });
  return result;
};

const getAllAttendance = async () => {
  var result = await LeaderShip.find();
  return result;
};

export { router as leaderShipRouter };
