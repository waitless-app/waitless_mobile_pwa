import instance from "./instance";

const ApiService = {
  query(resource, params) {
    return instance.get(resource, params).catch((error) => {
      throw new Error(`[WL] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return instance.get(`${resource}/${slug}`).catch((error) => {
      throw new Error(`[WL] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return instance.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return instance.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return instance.put(`${resource}`, params);
  },

  delete(resource) {
    return instance.delete(resource).catch((error) => {
      throw new Error(`[WL] ApiService ${error}`);
    });
  },
};

export default ApiService;

export const PremisesService = {
  query(params) {
    return ApiService.query("premises/premises/", { params });
  },
  get(slug) {
    return ApiService.get("premises/premises/", `${slug}`);
  },
};

export const MenuService = {
  query(slug, params) {
    return ApiService.query(`premises/premises/${slug}/menu/`, { params });
  },
  get(slug) {
    return ApiService.get("premises/premises", `${slug}/menu/`);
  },
};

export const UserService = {
  get() {
    return ApiService.get("user/me");
  },
};
