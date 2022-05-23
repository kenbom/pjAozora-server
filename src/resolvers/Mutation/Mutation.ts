import { authResolvers } from "./auth";
import { shiwakeRosolvers } from "./shiwake";

export const Mutation = {
    ...authResolvers,
    ...shiwakeRosolvers,
};
