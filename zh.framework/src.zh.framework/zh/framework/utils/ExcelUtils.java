package zh.framework.utils;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.Cell;

public class ExcelUtils {
	/**
	 * 保存为excel文件
	 * 
	 * @param filePath
	 *            文件位置
	 * @param pData
	 *            保存内容
	 * @throws IOException
	 *             无法保存文件
	 */
	public static void save(String filePath, List<Map<String, String>> pData) throws IOException {

		@SuppressWarnings("resource")
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet();
		FileUtils.createNewFileIsNotExists(filePath);
		HSSFRow headRow = sheet.createRow(0);
		if (pData.size() != 0) {
			for (String keyString : pData.get(0).keySet()) {

				HSSFCell cell = headRow.createCell(headRow.getLastCellNum() == -1 ? 0 : headRow.getLastCellNum());
				cell.setCellValue(keyString);

			}

			for (Map<String, String> entry : pData) {
				HSSFRow row = sheet.createRow(sheet.getLastRowNum() + 1);
				for (String valueString : entry.values()) {
					HSSFCell cell = row.createCell(row.getLastCellNum() == -1 ? 0 : row.getLastCellNum());
					cell.setCellValue(valueString);
				}
			}
		}
		FileOutputStream fOut = new FileOutputStream(filePath);
		workbook.write(fOut);
		fOut.flush();
		fOut.close();
	}

	/**
	 * 读取excel文件内容
	 * 
	 * @param filePath
	 * @param dataFirstRowIndex
	 *            读取数据内容的行起始位置,默认从1开始
	 * @param dataFirstColIndex
	 *            读取数据内容的列起始位置,从0 开始
	 * @return
	 * @throws IOException
	 *             无法读取文件
	 */
	public static List<Map<String, String>> read(String filePath) throws IOException {
		return read(filePath, 1, 0);
	}

	/**
	 * 读取excel文件内容
	 * 
	 * @param filePath
	 *            excel文件位置
	 * @param dataFirstRowIndex
	 *            读取数据内容的行起始位置,从0 开始
	 * @param dataFirstColIndex
	 *            读取数据内容的列起始位置,从0 开始
	 * @return excel文件数据内容
	 * @throws IOException
	 *             无法读取文件
	 */
	public static List<Map<String, String>> read(String filePath, int dataFirstRowIndex, int dataFirstColIndex)
			throws IOException {
		if (dataFirstRowIndex < 0) {
			dataFirstRowIndex = 1;
		}
		if (dataFirstColIndex < 0) {
			dataFirstColIndex = 0;
		}
		FileInputStream fileInputStream = new FileInputStream(filePath);
		@SuppressWarnings("resource")
		HSSFWorkbook xlsWorkbook = new HSSFWorkbook(fileInputStream);
		HSSFSheet sheet = xlsWorkbook.getSheetAt(0);
		HSSFRow headRow = sheet.getRow(0);
		Map<Integer, String> keyToIndex = new HashMap<Integer, String>();
		List<Map<String, String>> result = new ArrayList<Map<String, String>>(sheet.getLastRowNum());
		for (int i = dataFirstRowIndex; i < sheet.getLastRowNum(); i++) {
			HashMap<String, String> col = new HashMap<String, String>();

			for (int j = dataFirstColIndex; j < headRow.getLastCellNum(); j++) {
				HSSFCell cell = headRow.getCell(j);
				keyToIndex.put(cell.getColumnIndex(), cell.getStringCellValue());
			}

			HSSFRow row = sheet.getRow(i);
			Iterator<Cell> cellIterator = row.cellIterator();

			while (cellIterator.hasNext()) {
				Cell cell = cellIterator.next();
				col.put(keyToIndex.get(cell.getColumnIndex()), cell.getStringCellValue());
			}
			result.add(col);
		}
		return result;
	}
}
