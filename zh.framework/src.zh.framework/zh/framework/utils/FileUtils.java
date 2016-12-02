package zh.framework.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class FileUtils {

	public static boolean IsExists(String pFileFullPath) {
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
