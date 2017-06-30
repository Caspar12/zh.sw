package zh.framework.util;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class FileUtils {


	public static boolean isExists(String pFileFullPath) {
		File file = new File(pFileFullPath);
		return file.exists();
	}

	public static void createNewFileIsNotExists(String filePath) throws IOException {
		File file = new File(filePath);
		if (!file.exists()) {
			File parentDict = new File(file.getParent());
			if (!parentDict.exists()) {
				parentDict.mkdirs();
			}

			file.createNewFile();

		}
	}

	public static List<File> getSubFiles(String pDirectoryString) {

		File file = new File(pDirectoryString);

		File[] files = file.listFiles();

		List<File> resultList = new ArrayList<File>();
		for (File file2 : files) {
			resultList.add(file2);
		}
		return resultList;
	}

	public static List<File> searchFiles(String pDirectoryPath, String pRegex, Integer pFlags) {
		File dir = new File(pDirectoryPath);
		List<File> results = new ArrayList<>();

		if (dir.isDirectory()) {
			File[] subFiles = dir.listFiles();
			List<File> subDirs = new ArrayList<>();
			for (File file : subFiles) {
				if (file.isDirectory()) {
					subDirs.add(file);
				} else {
					if (isSearchFile(file.getAbsolutePath(), pRegex, pFlags)) {
						results.add(file);
					}
				}
			}

			for (File file : subDirs) {
				results.addAll(searchFiles(file.getAbsolutePath(), pRegex, pFlags));
			}

		} else {
			if (isSearchFile(dir.getAbsolutePath(), pRegex, pFlags)) {
				results.add(dir);
			}
		}
		return results;
	}

	static boolean isSearchFile(String pFilePath, String pRegex, Integer pFlags) {
		return Pattern.compile(pRegex, pFlags).matcher(pFilePath).matches();
	}

	public static List<String> readAllLines(String pFilePath) {
		String fileName = pFilePath;
		File file = new File(fileName);
		BufferedReader reader = null;
		List<String> result = new ArrayList<>();
		try {
			reader = new BufferedReader(new FileReader(file));
			String tempString = null;

			while ((tempString = reader.readLine()) != null) {
				result.add(tempString);

			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e1) {
				}
			}
		}
		return result;
	}
	/**
	 * 移除字符串中的BOM前缀
	 *
	 * @param _sLine 需要处理的字符串
	 * @return 移除BOM后的字符串.
	 */
	private static String removeBomHeaderIfExists(String _sLine) {
		if (_sLine == null) {
			return null;
		}
		String line = _sLine;
		if (line.length() > 0) {
			char ch = line.charAt(0);
			// 使用while是因为用一些工具看到过某些文件前几个字节都是0xfffe.
			// 0xfeff,0xfffe是字节序的不同处理.JVM中,一般是0xfeff
			while ((ch == 0xfeff || ch == 0xfffe)) {
				line = line.substring(1);
				if (line.length() == 0) {
					break;
				}
				ch = line.charAt(0);
			}
		}
		return line;
	}
	/**
	 * 基本文件操作
	 */
	public static String FILE_READING_ENCODING = "UTF-8";
	public static String FILE_WRITING_ENCODING = "UTF-8";

	public static String readFile(String _sFileName, String _sEncoding) throws Exception {
		StringBuffer buffContent = null;
		String sLine;

		FileInputStream fis = null;
		BufferedReader buffReader = null;
		if (_sEncoding == null || "".equals(_sEncoding)) {
			_sEncoding = FILE_READING_ENCODING;
		}

		try {
			fis = new FileInputStream(_sFileName);
			buffReader = new BufferedReader(new InputStreamReader(fis,
					_sEncoding));
			boolean zFirstLine = "UTF-8".equalsIgnoreCase(_sEncoding);
			while ((sLine = buffReader.readLine()) != null) {
				if (buffContent == null) {
					buffContent = new StringBuffer();
				} else {
					buffContent.append("\n");
				}
				if (zFirstLine) {
					sLine = removeBomHeaderIfExists(sLine);
					zFirstLine = false;
				}
				buffContent.append(sLine);
			}// end while
			return (buffContent == null ? "" : buffContent.toString());
		} catch (FileNotFoundException ex) {
			throw new Exception("要读取的文件没有找到!", ex);
		} catch (IOException ex) {
			throw new Exception("读取文件时错误!", ex);
		} finally {
			// 增加异常时资源的释放
			try {
				if (buffReader != null)
					buffReader.close();
				if (fis != null)
					fis.close();
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
	}
	public static String readLine(String pFilePath) {
		String fileName = pFilePath;
		File file = new File(fileName);
		BufferedReader reader = null;

		try {
			reader = new BufferedReader(new FileReader(file));
			String tempString = null;
			while ((tempString = reader.readLine()) != null) {
				return tempString;
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e1) {
				}
			}
		}
		return null;
	}

	public static void write(String filePath, String content) throws IOException {
		File file = new File(filePath);

		FileWriter fw;
		try {
			FileUtils.createNewFileIsNotExists(filePath);
			fw = new FileWriter(file);
			fw.write(content);
			fw.close();
		} catch (IOException e) {
			throw e;
		} finally {
			fw = null;
			file = null;
		}

	}
}
