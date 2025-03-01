export enum safeBikeRoutes {
    WELCOME = "/",
    CREATE_PASSENGER = "/passenger/create",
    CREATE_BIKER = "/biker/create",
    LOGIN = "/auth/login",
    CREATE_PACKAGE = "/packages",
    UPDATE_PACKAGE_STATUS = "/packages/:id/status",
    GET_PACKAGE = "/packages/:id",
    GET_RIDER_PACKAGES = "/packages/rider",
    GET_MY_PACKAGES = "/packages/my",
    GET_PASSENGER_PACKAGES = "/packages/passenger",
  GET_AVAILABLE_PACKAGES = "/packages/available"
}

export enum UserType {
    PASSENGER = "passenger",
    RIDER = "rider",
    ADMIN = "admin"
  }