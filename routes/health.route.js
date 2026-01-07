import { timestamp } from "drizzle-orm/gel-core";
import { Router } from "express";

const HealthRouter = Router();

HealthRouter.get("/", (req, res) => {
    res.json({
        success: true,
        status: "Ok",
        timestamp: new Date().toISOString()
    });
});

export default HealthRouter;