import ApiService from "./api.service";

export const OrderStatuses = {
  COMPLETED: "COMPLETED",
  REQUESTED: "REQUESTED",
};

export const OrderService = {
  query() {
    return ApiService.query("order/");
  },
};
