package zh.framework.validtion;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年10月28日
 * 
 */
public interface IValidChain {
	/**
	 * sdfkljasl;df
	 * @param min
	 * @param max
	 * @return
	 */
	public <T extends Number> IValidChain range(T min, T max);
}
