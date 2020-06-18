using Microsoft.EntityFrameworkCore.Migrations;

namespace eRestaurant.Model.Migrations
{
    public partial class name_changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CompanyId",
                table: "Menus",
                newName: "RestaurantId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RestaurantId",
                table: "Menus",
                newName: "CompanyId");
        }
    }
}
