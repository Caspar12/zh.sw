package zh.framework.util;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2017/1/19
 * @description
 */
public class ExcelUtils {
    /**
     * 保存为excel文件
     *
     * @param filePath 文件位置
     * @param pData    保存内容
     * @throws IOException 无法保存文件
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
     * 读取excel文件内容,读取数据内容的行起始位置,默认从1开始,读取数据内容的列起始位置,从0 开始
     *
     * @param filePath
     * @return
     * @throws IOException 无法读取文件
     */
    public static List<Map<String, String>> read(String filePath) throws IOException {
        return read(filePath, 1, 0);
    }

    /**
     * 读取excel文件内容,读取数据内容的行起始位置,默认从1开始,读取数据内容的列起始位置,从0 开始
     *
     * @param inputStream 文件流
     * @return
     * @throws IOException 无法读取文件
     */
    public static List<Map<String, String>> read(InputStream inputStream) throws IOException {
        return read(inputStream, 1, 0);
    }

    /**
     * 读取excel文件内容
     *
     * @param filePath          excel文件位置
     * @param dataFirstRowIndex 读取数据内容的行起始位置,从0 开始
     * @param dataFirstColIndex 读取数据内容的列起始位置,从0 开始
     * @return excel文件数据内容
     * @throws IOException 无法读取文件
     */
    public static List<Map<String, String>> read(String filePath, int dataFirstRowIndex, int dataFirstColIndex)
            throws IOException {
        FileInputStream fileInputStream = new FileInputStream(filePath);
        return read(fileInputStream, dataFirstRowIndex, dataFirstColIndex);
    }

    /**
     * 读取excel文件内容
     *
     * @param inputStream       excel文件流
     * @param dataFirstRowIndex 读取数据内容的行起始位置,从0 开始
     * @param dataFirstColIndex 读取数据内容的列起始位置,从0 开始
     * @return excel文件数据内容
     * @throws IOException 无法读取文件
     */
    public static List<Map<String, String>> read(InputStream inputStream, int dataFirstRowIndex, int dataFirstColIndex)
            throws IOException {

        HSSFWorkbook xlsWorkbook = new HSSFWorkbook(inputStream);
        HSSFSheet sheet = xlsWorkbook.getSheetAt(0);

        return readFromSheet(sheet, dataFirstRowIndex, dataFirstColIndex);

    }

    /**
     * 读取excel文件内容,读取数据内容的行起始位置,从0 开始,读取数据内容的列起始位置,从0 开始
     *
     * @param inputStream excel文件流
     * @return excel文件数据内容
     * @throws IOException 无法读取文件
     */
    public static List<Map<String, String>> readFromSheet(InputStream inputStream, String sheetName)
            throws IOException {
        HSSFWorkbook xlsWorkbook = new HSSFWorkbook(inputStream);
        HSSFSheet sheet = xlsWorkbook.getSheet(sheetName);
        return readFromSheet(sheet, 1, 0);
    }

    /**
     * 读取excel文件内容
     *
     * @param inputStream       excel文件流
     * @param dataFirstRowIndex 读取数据内容的行起始位置,从0 开始
     * @param dataFirstColIndex 读取数据内容的列起始位置,从0 开始
     * @return excel文件数据内容
     * @throws IOException 无法读取文件
     */
    public static List<Map<String, String>> readFromSheet(InputStream inputStream, String sheetName, int dataFirstRowIndex, int dataFirstColIndex)
            throws IOException {
        HSSFWorkbook xlsWorkbook = new HSSFWorkbook(inputStream);
        HSSFSheet sheet = xlsWorkbook.getSheet(sheetName);
        return readFromSheet(sheet, dataFirstRowIndex, dataFirstColIndex);
    }

    /**
     * 从sheet中读取数据内容
     *
     * @param sheet             HSSFSheet
     * @param dataFirstRowIndex 读取数据内容的行起始位置,从0 开始
     * @param dataFirstColIndex 读取数据内容的列起始位置,从0 开始
     * @return
     * @throws IOException
     */
    private static List<Map<String, String>> readFromSheet(HSSFSheet sheet, int dataFirstRowIndex, int dataFirstColIndex)
            throws IOException {
        if (dataFirstRowIndex < 0) {
            dataFirstRowIndex = 1;
        }
        if (dataFirstColIndex < 0) {
            dataFirstColIndex = 0;
        }
        HSSFRow headRow = sheet.getRow(dataFirstRowIndex);
        Map<Integer, String> keyToIndex = new HashMap<>();
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
