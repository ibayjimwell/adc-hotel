import { Database } from "../database/drizzle.js";
import {
  Invoices,
  Stays,
  Rooms,
  RoomTypes,
  StayServices,
  Services,
  Payments,
} from "../models/index.js";
import { eq, sum } from "drizzle-orm";


// Generate Invoice for a Stay
export const generateInvoice = async (req, res, next) => {
  try {
    const { stayId } = req.params;

    // Check stay
    const [stay] = await Database
      .select()
      .from(Stays)
      .where(eq(Stays.id, stayId))
      .limit(1);

    // Not found handler
    if (!stay) {
      return res.status(404).json({
        success: false,
        type: "W-Stay Not Found",
        message: "Stay does not exist.",
      });
    }

    // Prevent duplicate invoice
    const existingInvoice = await Database
      .select({ id: Invoices.id })
      .from(Invoices)
      .where(eq(Invoices.stayId, stayId))
      .limit(1);

    if (existingInvoice.length > 0) {
      return res.status(409).json({
        success: false,
        type: "W-Invoice Exists",
        message: "Invoice already generated for this stay.",
      });
    }

    // Room charge
    const [room] = await Database
      .select({
        price: RoomTypes.basePrice,
      })
      .from(Stays)
      .innerJoin(Rooms, eq(Stays.roomId, Rooms.id))
      .innerJoin(RoomTypes, eq(Rooms.roomTypeId, RoomTypes.id))
      .where(eq(Stays.id, stayId));

    // Service charges
    const serviceTotalResult = await Database
      .select({
        total: sum(Services.price),
      })
      .from(StayServices)
      .innerJoin(Services, eq(StayServices.serviceId, Services.id))
      .where(eq(StayServices.stayId, stayId));

    const serviceTotal = Number(serviceTotalResult[0]?.total || 0);
    const roomPrice = Number(room.price);

    const totalAmount = roomPrice + serviceTotal;

    // Create invoice
    const [invoice] = await Database
      .insert(Invoices)
      .values({
        stayId,
        totalAmount,
        status: "unpaid",
      })
      .returning();

    // Returning invoice
    return res.status(201).json({
      success: true,
      message: "Invoice generated successfully.",
      data: invoice,
    });
  } catch (error) {
        return next(new Error(error.message));
  }
};


// Get Invoice by Stay
export const getInvoiceByStay = async (req, res, next) => {
  try {
    const { stayId } = req.params;

    const [invoice] = await Database
      .select()
      .from(Invoices)
      .where(eq(Invoices.stayId, stayId))
      .limit(1);

    // Not found handler
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    // Returning invoice
    return res.json(invoice);
  } catch (error) {
        return next(new Error(error.message));
  }
};
