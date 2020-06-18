using Microsoft.EntityFrameworkCore.Migrations;

namespace eRestaurant.Model.Migrations
{
    public partial class restauratn_id_added_into_orders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RestaurantId",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RestaurantId",
                table: "Orders");
        }
    }
}
