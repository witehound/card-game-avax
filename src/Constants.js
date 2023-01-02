export const initialAlert = {
  status: false,
  type: "info",
  message: "",
};
export const errorAlert = {
  status: true,
  type: "failure",
  message: "Somthing went wrong!",
};

export const battleGroundAlert = (name) => ({
  status: true,
  type: "info",
  message: `${name} Is Battle Ready`,
});

export const madeMove = (n) => ({
  status: true,
  type: "info",
  message: `Initiating ${n === 1 ? "Attck" : "Defense"}`,
});
