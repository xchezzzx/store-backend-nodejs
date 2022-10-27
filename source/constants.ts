export class SqlParameters {
    public static Id: string = "id";
}

export class Queries {
    // auth
    public static GetUserByLogin: string = "SELECT id, password, role_id FROM employee WHERE login = ?";

    // stores
    public static Stores: string = "SELECT * FROM store WHERE status_id = ?" ;
    public static StoreById: string = `SELECT * FROM store WHERE id = ? AND status_id = ?`;
    public static UpdateStoreById: string = "UPDATE store SET name = ?, phone = ?, address = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    public static AddStore: string = "INSERT store ([name], phone, [address], create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    public static DeleteStoreById: string = "UPDATE store SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";

    // users
    public static GetUserById: string = `SELECT * FROM employee WHERE id = ? AND status_id = ?`;
    public static GetUserByStoreId: string = `SELECT * FROM employee WHERE store_id = ? AND status_id = ?`;
    //=========== you are here
    public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id";


    public static UpdateUserById: string = "UPDATE employee SET first_name = ?, last_name = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    public static AddUser: string = "INSERT employee (first_name, last_name, login, password, role_id, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    public static DeleteUserById: string = "UPDATE employee SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";

}

export class StoredProcedures {
    // employee CRUD
    public static GetEmployeeByIdSP = "sp_get_employee_by_id";
    public static GetEmployeesByStoreIdSP = "sp_get_employees_by_store_id";
    public static UpdateEmployeeByIdSP = "sp_update_employee_by_id";
    public static CreateEmployeeSP = "sp_create_employee";
    public static DeleteEmployeeByIdSP = "sp_delete_employee_by_id";

    // product CRUD
    public static GetProductById = "sp_get_product_by_id";
    public static GetAllProductsByStoreId = "sp_get_product_by_store_id";
    public static UpdateProductById = "sp_update_product_by_id";
    public static AddProduct = "sp_add_product";
    public static DeleteProductById = "sp_delete_product_by_id";
    public static DeleteProductLocationById = "sp_delete_product_location_by_id";
}

export const DB_CONNECTION_STRING: string = "server=.;Database=storedb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export const NON_EXISTING_ID: number = -1;
export const TEMP_USER_ID: number = 1;
export const TOKEN_SECRET: string = "19c471f0-6092-4877-b329-e3ed38340545";