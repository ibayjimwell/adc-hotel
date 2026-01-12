import { Database } from "../database/drizzle.js";
import { Services } from "../models/index.js";
import { eq } from "drizzle-orm";

// Create Service
export const createService = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    // Required validation
    if (!name || price == null) {
      return res.status(400).json({
        success: false,
        type: "W-Missing Required",
        message: "Service name and price are required.",
      });
    }

    // Create service
    const [service] = await Database
      .insert(Services)
      .values({ name, price })
      .returning();

    // Returning message
    return res.status(201).json({
      success: true,
      message: "Service created successfully.",
      data: service,
    });

  } catch (error) {
    return next(new Error(error.message));
  }
};

// List Services
export const getServices = async (req, res, next) => {
  try {
    const services = await Database.select().from(Services);
    res.json(services);
  } catch (error) {
        return next(new Error(error.message));
  }
};

// Update Service
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query to update the service
    const [service] = await Database
      .update(Services)
      .set(req.body)
      .where(eq(Services.id, id))
      .returning();

    // Not found handler
    if (!service) {
      return res.status(404).json({
        success: false,
        type: "W-Not Found",
        message: "Service not found.",
      });
    }

    // Returning message
    return res.json({
      success: true,
      message: "Service updated successfully.",
      data: service,
    });

  } catch (error) {
        return next(new Error(error.message));
  }
};
