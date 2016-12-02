package zh.framework;

import javassist.CannotCompileException;
import javassist.NotFoundException;
import junit.framework.Assert;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;
import zh.framework.utils.ReflectUtils;

/**
 * Unit test for simple App.
 */
public class AppTest extends TestCase {
	/**
	 * Create the test case
	 *
	 * @param testName
	 *            name of the test case
	 */
	public AppTest(String testName) {
		super(testName);
	}

	/**
	 * @return the suite of tests being tested
	 */
	public static Test suite() {
		return new TestSuite(AppTest.class);
	}

	/**
	 * Rigourous Test :-)
	 */
	@SuppressWarnings("deprecation")
	@org.junit.Test
	public void testApp() {

		String[] kStrings = new String[] {};
		int i = 1;
		try {
			kStrings = ReflectUtils.getMethodParameterNames(ReflectUtils.class, "test", new Object[] { i });
			kStrings = ReflectUtils.getMethodParameterNames(ReflectUtils.class, "test", new Object[] { 1 });
		} catch (NotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (CannotCompileException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Assert.assertTrue(kStrings.length > 0);
	}
}
