import { Response } from "express";
import { IApiResponse } from "../types/responseTypes";

export const formatResponse = <T>(
    res: Response,
    payload: T,
    status = 200
): void => {
    const response: IApiResponse<T> = {
        payload,
        _links: null,
        _warning: null,
        _attributes: null,
        _generated: new Date().toISOString(),
    };

    res.status(status).json(response);
};

export const formatErrorResponse = (
    res: Response,
    error: string | string[],
    status = 500
): void => {
    res.status(status).json({
        _errors: Array.isArray(error) ? error : [error],
    });
};

interface PaginatedResponse<T> {
    data: T;
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

export const formatPaginatedResponse = <T>(
    data: T,
    totalItems: number,
    currentPage: number,
    totalPages: number
): PaginatedResponse<T> => {
    return {
        data,
        totalItems,
        totalPages,
        currentPage,
    };
};
