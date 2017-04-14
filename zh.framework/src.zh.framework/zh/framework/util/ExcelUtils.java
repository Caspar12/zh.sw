package zh.framework.util;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.util.NumberToTextConverter;
import zh.framework.model.excel.Book;
import zh.framework.model.excel.Sheet;

import java.io.*;
import java.text.SimpleDateFormat;
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
        saveSheet(sheet, pData);
        FileOutputStream fOut = new FileOutputStream(filePath);
        workbook.write(fOut);
        fOut.flush();
        fOut.close();
    }

    /**
     * 把数据内容写入sheet,第一行为头部行也为key
     *
     * @param sheet HSSFSheet
     * @param pData 数据内容,第一行为头部行也为key
     * @return
     */
    public static HSSFSheet saveSheet(HSSFSheet sheet, List<Map<String, String>> pData) {
        HSSFRow headRow = sheet.createRow(0);
        if (pData.size() != 0) {
            for (String keyString : pData.get(0).keySet()) {
                HSSFCell cell = headRow.createCell(headRow.getLastCellNum() == -1 ? 0 : headRow.getLastCellNum());
                cell.setCellValue(keyString);
            }

            for (Map<String, String> entry : pData) {
                HSSFRow row = sheet.createRow(sheet.getPhysicalNumberOfRows());
                for (String valueString : entry.values()) {
                    HSSFCell cell = row.createCell(row.getLastCellNum() == -1 ? 0 : row.getLastCellNum());
                    cell.setCellValue(valueString);
                }
            }
        }
        return sheet;
    }

    /**
     * 把数据写入输出流,文件流或网络流等
     *
     * @param outputStream 输出流
     * @param book         excel对应数据
     * @throws IOException 输出流,无法写入
     */
    public static void save(OutputStream outputStream, Book book) throws IOException {
        HSSFWorkbook workbook = new HSSFWorkbook();
        if (book.getSheets() == null) {
            book.setSheets(new ArrayList<>());
        }

        for (Sheet sheet : book.getSheets()) {
            HSSFSheet hssfSheet = workbook.createSheet(sheet.getName());
            saveSheet(hssfSheet, sheet.getData());
        }
        workbook.write(outputStream);
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
        HSSFRow headRow = sheet.getRow(0);
        Map<Integer, String> keyToIndex = new HashMap<>();
        List<Map<String, String>> result = new ArrayList<Map<String, String>>(sheet.getPhysicalNumberOfRows());
        for (int i = dataFirstRowIndex; i < sheet.getPhysicalNumberOfRows(); i++) {
            Map<String, String> col = new LinkedHashMap<String, String>();

            for (int j = dataFirstColIndex; j < headRow.getLastCellNum(); j++) {
                HSSFCell cell = headRow.getCell(j);
                String cellValue = cell.toString();
                if (cellValue != null) {
                    keyToIndex.put(cell.getColumnIndex(), cellValue);
                }
            }

            HSSFRow row = sheet.getRow(i);
            Iterator<Cell> cellIterator = row.cellIterator();

            while (cellIterator.hasNext()) {
                HSSFCell cell = (HSSFCell) cellIterator.next();
                String key = keyToIndex.get(cell.getColumnIndex());
                if (key != null) {
                    String value = null;
                    switch (cell.getCellTypeEnum()) {
                        case BLANK:
                            value = "";
                            break;
                        case BOOLEAN:
                            value = cell.getBooleanCellValue() ? "TRUE" : "FALSE";
                            break;
                        case ERROR:
                            value = "";
                            break;
                        case FORMULA:
                            value = cell.getCellFormula();
                            break;
                        case NUMERIC:
                            //TODO apply the dataformat for this cell
                            if (HSSFDateUtil.isCellDateFormatted(cell)) {
                                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                                value = sdf.format(cell.getDateCellValue());
                            } else {
                                value = NumberToTextConverter.toText(cell.getNumericCellValue());
                            }
                            break;
                        case STRING:
                            value = cell.getStringCellValue();
                            break;
                        default:
                            value = "Unknown Cell Type: " + cell.getCellTypeEnum();
                    }
                    col.put(key, value);
                }
            }
            result.add(col);
        }
        return result;
    }
}
