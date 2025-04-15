import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

interface Location {
  type: "Point";
  coordinates: [number, number]; // [lng, lat]
}

export interface ICaptain extends Document {
  _id: mongoose.Types.ObjectId;
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  socketId: string;
  status: string;
  vehicle: {
    color: string;
    plate: string;
    capacity: number;
    vehicleType: "car" | "bike" | "auto";
  };
  location: Location;
  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

const captainSchema = new mongoose.Schema<ICaptain>({
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: { type: String, required: true },
    plate: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1 },
    vehicleType: {
      type: String,
      enum: ["car", "bike", "auto"],
      required: true,
    },
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      default: [0, 0], // [lng, lat]
    },
  },
});

captainSchema.index({ location: "2dsphere" });

captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.JWT_SECRET || "");
  return token;
};

captainSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const Captain = mongoose.model<ICaptain>("Captain", captainSchema);
