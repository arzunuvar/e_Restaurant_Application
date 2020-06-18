using Microsoft.EntityFrameworkCore.Migrations;

namespace eRestaurant.Model.Migrations
{
    public partial class type_changed_lat_long : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Longitude",
                table: "Locations",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<double>(
                name: "Lattitude",
                table: "Locations",
                nullable: false,
                oldClrType: typeof(decimal));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "Locations",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<decimal>(
                name: "Lattitude",
                table: "Locations",
                nullable: false,
                oldClrType: typeof(double));
        }
    }
}
