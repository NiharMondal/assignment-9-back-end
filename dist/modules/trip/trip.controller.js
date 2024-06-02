"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripController = void 0;
const handleAsync_1 = require("../../lib/handleAsync");
const trip_services_1 = require("./trip.services");
const sendResponse_1 = require("../../lib/sendResponse");
const pick_1 = __importDefault(require("../../utils/pick"));
const trip_constant_1 = require("./trip.constant");
const createTrip = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield trip_services_1.tripServices.createTrip(req.body, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Trip created successfully",
        data: result,
    });
}));
//get all trip
const getAllTrips = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, trip_constant_1.tripFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield trip_services_1.tripServices.getAllTrips(filters, options);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Trips retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
}));
exports.tripController = {
    createTrip,
    getAllTrips,
};
