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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripServices = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const paginationHelpers_1 = require("../../utils/paginationHelpers");
const trip_constant_1 = require("./trip.constant");
const createTrip = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.trip.create({
        data: Object.assign(Object.assign({}, payload), { userId: user.id }),
    });
    return result;
});
//get all trip
const getAllTrips = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = query, filterData = __rest(query, ["searchTerm"]);
    const queryResult = [];
    if (searchTerm) {
        queryResult.push({
            OR: trip_constant_1.searchAbleKey.map((value) => ({
                [value]: {
                    contains: query.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        queryResult.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereCondition = { AND: queryResult };
    const result = yield prisma_1.default.trip.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.trip.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.tripServices = {
    createTrip,
    getAllTrips,
};
