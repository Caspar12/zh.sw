package zh.framework.cache.impl;

import java.util.HashMap;
import java.util.Map;

import zh.framework.cache.ICache;

public class MemoryCache implements ICache {

	private static Map<String, Object> _Cache;

	public MemoryCache() {
		_Cache = new HashMap<String, Object>();
	}

	@Override
	@SuppressWarnings("unchecked")
	public <T> T get(String pKey) {
		Object o = _Cache.get(pKey);
		T r = (T) o;
		return r;
	}

	@Override
	public <T> void put(String pKey, T pObj) {
		_Cache.put(pKey, pObj);
	}
}
