using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class seedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Img", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Description 1", "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQPgYa4fNqmKd8VdtzELhQy6t3vBPnK-Sx_2XEPKmUvOr1BWt5gY7TyWYdUQAfM61pwuyD3Wnp_A82XrMmtBoNnG1mh=s2560", "Product 1", 10.99m },
                    { 2, "Description 2", "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQPgYa4fNqmKd8VdtzELhQy6t3vBPnK-Sx_2XEPKmUvOr1BWt5gY7TyWYdUQAfM61pwuyD3Wnp_A82XrMmtBoNnG1mh=s2560", "Product 2", 19.99m },
                    { 3, "Description 3", "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQPgYa4fNqmKd8VdtzELhQy6t3vBPnK-Sx_2XEPKmUvOr1BWt5gY7TyWYdUQAfM61pwuyD3Wnp_A82XrMmtBoNnG1mh=s2560", "Product 3", 25.99m },
                    { 4, "Description 4", "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQPgYa4fNqmKd8VdtzELhQy6t3vBPnK-Sx_2XEPKmUvOr1BWt5gY7TyWYdUQAfM61pwuyD3Wnp_A82XrMmtBoNnG1mh=s2560", "Product 4", 14.99m },
                    { 5, "Description 5", "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQPgYa4fNqmKd8VdtzELhQy6t3vBPnK-Sx_2XEPKmUvOr1BWt5gY7TyWYdUQAfM61pwuyD3Wnp_A82XrMmtBoNnG1mh=s2560", "Product 5", 30.99m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
