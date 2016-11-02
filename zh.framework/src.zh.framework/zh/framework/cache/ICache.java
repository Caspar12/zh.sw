package zh.framework.cache;

public interface ICache {
	/**
	 * Return Key is pKey T Value
	 * @param pKey
	 * @return T
	 */
	public <T> T get(String pKey);
	/**
	 * Set key is pKey to cache
	 * @param pKey
	 * @param pObj
	 */
	public <T> void put(String pKey,T pObj);
}
