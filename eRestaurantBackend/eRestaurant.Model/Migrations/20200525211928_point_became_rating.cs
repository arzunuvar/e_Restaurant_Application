using Microsoft.EntityFrameworkCore.Migrations;

namespace eRestaurant.Model.Migrations
{
    public partial class point_became_rating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Point",
                table: "Comments",
                newName: "Rating");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Comments",
                newName: "Point");
        }
    }
}
