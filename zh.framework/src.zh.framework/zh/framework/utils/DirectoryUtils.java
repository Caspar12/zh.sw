package zh.framework.utils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class DirectoryUtils {
	public static List<String> getSubDirectories(String pPath) {
		File dir = new File(pPath);
		List<String> result = new ArrayList<String>();
		if (!dir.isDirectory()) {
			return new ArrayList<String>(0);
		}
		for(File tDir:dir.listFiles()){
			if(tDir.isDirectory()){
				result.add(tDir.getPath());
			}
		}
		return result;
	}
}
