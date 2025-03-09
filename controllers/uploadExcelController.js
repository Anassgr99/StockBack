// controllers/uploadExcelController.js
import ExcelJS from "exceljs";
import { createProductWithStores } from "../models/uploadExcelModel.js";

/**
 * Controller to handle Excel file upload.
 * Reads the uploaded file using ExcelJS, converts it to JSON,
 * and inserts each row into the products table.
 */
export const uploadExcel = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the Excel file from buffer
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    const worksheet = workbook.worksheets[0]; // Get the first sheet
    const jsonData = [];

    // Extract data row by row
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      jsonData.push({
        name: row.getCell(1).value,
        slug: row.getCell(2).value,
        code: row.getCell(3).value,
        quantity: row.getCell(4).value,
        buying_price: row.getCell(5).value,
        selling_price: row.getCell(6).value,
        quantity_alert: row.getCell(7).value,
        tax: row.getCell(8).value,
        tax_type: row.getCell(9).value,
        notes: row.getCell(10).value,
        product_image: row.getCell(11).value,
        category_id: row.getCell(12).value,
        unit_id: row.getCell(13).value,
      });
    });

    if (!jsonData.length) {
      return res.status(400).json({ error: "Excel file is empty or improperly formatted." });
    }

    // Insert data into the database
    await Promise.all(jsonData.map((row) => createProductWithStores(row)));

    res.json({ message: "Excel file processed and data inserted successfully." });
  } catch (error) {
    console.error("Error processing Excel file:", error);
    res.status(500).json({ error: "Error processing Excel file." });
  }
};

