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
exports.userServices = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    return result;
});
const singleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: { id },
        select: {
            email: true,
            avatar: true,
            name: true,
        },
    });
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({ where: { id } });
    if (payload.email) {
        const matchByEmail = yield prisma_1.default.user.findFirst({
            where: { email: payload.email },
        });
        if (matchByEmail) {
            throw new CustomError_1.default(400, "This email address is already used!");
        }
    }
    const user = yield prisma_1.default.user.update({
        where: { id },
        data: payload,
    });
    return user;
});
//only admin can update role
const updateRole = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
});
exports.userServices = {
    getUser,
    singleUser,
    updateUser,
    updateRole,
};
