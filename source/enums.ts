export enum Status {
    Active = 1,
    NotActive = 2
}

export enum Role {
    Administrator = 1,
    Operator = 2,
    RegularUser = 3
}

export enum Gender {
    Female = 0,
    Male = 1
}

export enum AppError {
    General = "General",
    ConnectionError = "ConnectionError",
    QueryError = "QueryError",
    NoData = "NoData",
    NonNumericInput = "NonNumeric",
    InputParametrsNotSupplied = "NoParameter",
    DeletionConflict = "DeletionConflict"
}
