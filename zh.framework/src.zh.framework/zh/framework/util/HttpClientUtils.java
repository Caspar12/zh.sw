package zh.framework.util;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

public class HttpClientUtils {

	public static String getHtmlContent(String pUrl) throws ClientProtocolException, IOException {
		String result = null;
		HttpClient httpclient = HttpClientBuilder.create().build();
		HttpGet httpgets = new HttpGet(pUrl);
		HttpResponse response = httpclient.execute(httpgets);
		HttpEntity entity = response.getEntity();
		if (entity != null) {
			String content = EntityUtils.toString(entity);

			result = content;

			httpgets.abort();
		}

		return result;
	}

	public static void download(String pUrl, String saveFilePath) throws ClientProtocolException, IOException {
		HttpClient httpclient = HttpClientBuilder.create().build();
		HttpGet httpgets = new HttpGet(pUrl);
		HttpResponse response = httpclient.execute(httpgets);
		HttpEntity entity = response.getEntity();
		if (entity != null) {
			InputStream inputStream = entity.getContent();
			FileOutputStream fileOutputStream = new FileOutputStream(saveFilePath);

			byte b[] = new byte[1024];
			int j = 0;
			while ((j = inputStream.read(b)) != -1) {
				fileOutputStream.write(b, 0, j);
			}
			fileOutputStream.flush();
			fileOutputStream.close();
		}
	}
}
