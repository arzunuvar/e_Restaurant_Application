using Microsoft.EntityFrameworkCore.Migrations;

namespace eRestaurant.Model.Migrations
{
    public partial class name_changes_id_to_guid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Orders",
                newName: "UserGuid");

            migrationBuilder.RenameColumn(
                name: "RestaurantId",
                table: "Orders",
                newName: "RestaurantGuid");

            migrationBuilder.RenameColumn(
                name: "MenuId",
                table: "Orders",
                newName: "MenuGuid");

            migrationBuilder.RenameColumn(
                name: "RestaurantId",
                table: "Menus",
                newName: "RestaurantGuid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserGuid",
                table: "Orders",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "RestaurantGuid",
                table: "Orders",
                newName: "RestaurantId");

            migrationBuilder.RenameColumn(
                name: "MenuGuid",
                table: "Orders",
                newName: "MenuId");

            migrationBuilder.RenameColumn(
                name: "RestaurantGuid",
                table: "Menus",
                newName: "RestaurantId");
        }
    }
}
