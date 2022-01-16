import ApiService from "./api.service";

export const OrderStatuses = {
  COMPLETED: "COMPLETED",
  ACCEPTED: "ACCEPTED",
  IN_PROGRESS: "IN_PROGRESS",
  READY: "READY",
  REQUESTED: "REQUESTED",
};

export const OrderService = {
  query() {
    return ApiService.query("order/");
  },
  get(slug) {
    return ApiService.get("order", `${slug}`);
  },
};
