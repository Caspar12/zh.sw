package zh.framework.models;

public class KeyValuePair<Key, Value> {
	Value value;
	Key key;

	public Value getValue() {
		return value;
	}

	public void setValue(Value value) {
		this.value = value;
	}

	public Key getKey() {
		return key;
	}

	public void setKey(Key key) {
		this.key = key;
	}

}
