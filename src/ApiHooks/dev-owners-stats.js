import axiosInstance from "../services/axiosInstance";

// GET /api/dev-owners-stats
export const getOwnersStatsAPI = async () => {
  const res = await axiosInstance.get("/api/dev-owners-stats");
  return res.data.data; // return only the data object
};

// PATCH /api/dev-owners-stats
export const updateOwnersStatsAPI = async (data) => {
  const res = await axiosInstance.patch("/api/dev-owners-stats", data);
  return res.data.data;
};

// POST /api/dev-owners-stats/track
export const trackOwnersStatusAPI = async (status) => {
  const res = await axiosInstance.post("/api/dev-owners-stats/track", { status });
  return res.data.data;
};

// (optional) reset
export const resetOwnersStatsAPI = async () => {
  const res = await axiosInstance.post("/api/dev-owners-stats/reset", {});
  return res.data.data;
};
