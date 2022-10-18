export class SqlParameters {
    public static Id: string = "id";
}

export class Queries {
    public static WhiteBoardTypes: string = "SELECT * FROM whiteboard_types WHERE status_id = ?" ;
    public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id";

    public static WhiteBoardTypesById: string = `SELECT * FROM whiteboard_types WHERE id = ? AND status_id = ?`;
    public static WhiteBoardTypesByTitle: string = "SELECT * FROM whiteboard_types WHERE white_board_type LIKE ?";
    public static UpdateWhiteBoardById: string = "UPDATE whiteboard_types SET white_board_type = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    public static AddWhiteBoardType: string = "INSERT whiteboard_types (white_board_type, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?)";
    public static DeleteWhiteBoardTypeById: string = "UPDATE whiteboard_types SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";

    // auth
    public static GetUserByLogin: string = "SELECT id, password, role_id FROM [user] WHERE login = ?";

    public static UpdateUserById: string = "UPDATE [user] SET first_name = ?, last_name = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    public static AddUser: string = "INSERT [user] (first_name, last_name, login, password, role_id, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    public static DeleteUserById: string = "UPDATE [user] SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";

}

export const DB_CONNECTION_STRING: string = "server=.;Database=storedb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export const NON_EXISTING_ID: number = -1;
export const TEMP_USER_ID: number = 1;
export const TOKEN_SECRET: string = "19c471f0-6092-4877-b329-e3ed38340545";