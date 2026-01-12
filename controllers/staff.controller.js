import { Database } from "../database/drizzle.js";
import { Staff } from "../models/index.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";


// Create a new staff member
export const createStaff = async (req, res, next) => {
  try {
    const { name, role, email, password } = req.body;

    // Required handler
    if (!name || !role || !email || !password) {
      return res.status(400).json({
        success: false,
        type: "W-Missing Required",
        message: "Name, Role, Email, and Password are required.",
      });
    }

    // Check if email already exists
    const existing = await Database.select({ id: Staff.id })
      .from(Staff)
      .where(eq(Staff.email, email))
      .limit(1);

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        type: "W-Email Exists",
        message: "Email is already registered.",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert staff
    const [staff] = await Database.insert(Staff)
      .values({ name, role, email, passwordHash })
      .returning();

    // Returning the created staff
    res.status(201).json({
      success: true,
      message: "Staff created successfully.",
      data: staff,
    });
  } catch (error) {
        return next(new Error(error.message));
  }
};

// List all staff
export const getStaff = async (req, res, next) => {
  try {
    const staffList = await Database.select().from(Staff);
    res.json(staffList);
  } catch (error) {
        return next(new Error(error.message));
  }
};

// Update staff info
export const updateStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role, email } = req.body;

    // Query for updating staff
    const [staff] = await Database.update(Staff)
      .set({ name, role, email })
      .where(eq(Staff.id, id))
      .returning();

    // Returning the updated staff
    res.json({
      success: true,
      message: "Staff updated successfully.",
      data: staff,
    });
  } catch (error) {
        return next(new Error(error.message));
  }
};

// Delete staff (soft-delete recommended)
export const deleteStaff = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Deleting staff
    await Database.delete(Staff)
      .where(eq(Staff.id, id));

    // Returning message
    res.json({
      success: true,
      message: "Staff deleted successfully.",
    });
  } catch (error) {
     return next(new Error(error.message));
  }
};

// Change password
export const changePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const [staff] = await Database.select().from(Staff).where(eq(Staff.id, id));

    // Not found handler
    if (!staff) {
      return res.status(404).json({
        success: false,
        type: "W-Not Found",
        message: "Staff not found.",
      });
    }

    // Checking if passwords are match
    const isMatch = await bcrypt.compare(currentPassword, staff.passwordHash);

    if (!isMatch) {
      return res.status(403).json({
        success: false,
        type: "W-Wrong Password",
        message: "Current password is incorrect.",
      });
    }

    // Hash the password 
    const passwordHash = await bcrypt.hash(newPassword, 10);

    await Database.update(Staff)
      .set({ passwordHash })
      .where(eq(Staff.id, id));

    res.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
        return next(new Error(error));
  }
};

// Login staff
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [staff] = await Database.select().from(Staff).where(eq(Staff.email, email));

    // Not found handler
    if (!staff) {
      return res.status(404).json({
        success: false,
        type: "W-Not Found",
        message: "Staff not found.",
      });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, staff.passwordHash);

    if (!isMatch) {
      return res.status(403).json({
        success: false,
        type: "W-Wrong Password",
        message: "Incorrect password.",
      });
    }

    // Returning the staff
    res.json({
      success: true,
      message: "Login successful.",
      data: {
        id: staff.id,
        name: staff.name,
        role: staff.role,
        email: staff.email,
      },
    });
  } catch (error) {
    return new next(new Error(error.message));
  }
};
