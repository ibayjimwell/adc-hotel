import { Database } from "../database/drizzle.js";
import { StayServices, Stays, Services } from "../models/index.js";
import { eq, and } from "drizzle-orm";

// Add Service to Stay
export const addServiceToStay = async (req, res, next) => {
  try {
    const { stayId } = req.params;
    const { serviceId, quantity = 1 } = req.body;

    // Required validation
    if (!serviceId) {
      return res.status(400).json({
        success: false,
        type: "W-Missing Required",
        message: "Service ID is required.",
      });
    }

    // Check active stay
    const [stay] = await Database
      .select({ id: Stays.id })
      .from(Stays)
      .where(and(eq(Stays.id, stayId), eq(Stays.status, "active")))
      .limit(1);

    // Not found handler
    if (!stay) {
      return res.status(409).json({
        success: false,
        type: "W-Stay Not Active",
        message: "Stay not found or not active.",
      });
    }

    // Check service exists
    const [service] = await Database
      .select({ id: Services.id })
      .from(Services)
      .where(eq(Services.id, serviceId))
      .limit(1);

    // Not found handler
    if (!service) {
      return res.status(404).json({
        success: false,
        type: "W-Service Not Found",
        message: "Service not found create the service.",
      });
    }

    // Add service to stay
    const [stayService] = await Database
      .insert(StayServices)
      .values({
        stayId,
        serviceId,
        quantity,
      })
      .returning();
    
    // Returning the created stay service
    return res.status(201).json({
      success: true,
      message: "Service added to stay.",
      data: stayService,
    });

  } catch (error) {
    return next(new Error(error.message));
  }
};

// List Services for a Stay
export const getStayServices = async (req, res, next) => {
  try {
    const { stayId } = req.params;

    // Query for listing services for stay
    const services = await Database
      .select()
      .from(StayServices)
      .where(eq(StayServices.stayId, stayId));

    res.json(services);
  } catch (error) {
        return next(new Error(error.message));
  }
};
