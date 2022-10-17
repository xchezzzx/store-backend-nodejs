"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_SECRET = exports.TEMP_USER_ID = exports.NON_EXISTING_ID = exports.DB_CONNECTION_STRING = exports.Queries = exports.SqlParameters = void 0;
class SqlParameters {
}
exports.SqlParameters = SqlParameters;
SqlParameters.Id = "id";
class Queries {
}
exports.Queries = Queries;
Queries.WhiteBoardTypes = "SELECT * FROM whiteboard_types WHERE status_id = ?";
Queries.SelectIdentity = "SELECT SCOPE_IDENTITY() AS id";
Queries.WhiteBoardTypesById = `SELECT * FROM whiteboard_types WHERE id = ? AND status_id = ?`;
Queries.WhiteBoardTypesByTitle = "SELECT * FROM whiteboard_types WHERE white_board_type LIKE ?";
Queries.UpdateWhiteBoardById = "UPDATE whiteboard_types SET white_board_type = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
Queries.AddWhiteBoardType = "INSERT whiteboard_types (white_board_type, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?)";
Queries.DeleteWhiteBoardTypeById = "UPDATE whiteboard_types SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";
// auth
Queries.GetUserByLogin = "SELECT id, password, role_id FROM [user] WHERE login = ?";
Queries.UpdateUserById = "UPDATE [user] SET first_name = ?, last_name = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
Queries.AddUser = "INSERT [user] (first_name, last_name, login, password, role_id, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
Queries.DeleteUserById = "UPDATE [user] SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";
exports.DB_CONNECTION_STRING = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
exports.NON_EXISTING_ID = -1;
exports.TEMP_USER_ID = 1;
exports.TOKEN_SECRET = "042297c1-7124-4371-b4dd-bf19e512d2bf";
