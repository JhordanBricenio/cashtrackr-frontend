import rateLimit from "express-rate-limit";

export const limiter= rateLimit({
    windowMs:60*1000,
    max:5,
    message:{"error":"Has alcanzado el límite de intentos, por favor intenta más tarde"}
}); 