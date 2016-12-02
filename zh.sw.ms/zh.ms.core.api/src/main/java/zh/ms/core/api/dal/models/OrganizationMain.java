package zh.ms.core.api.dal.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import java.util.Set;

import javax.persistence.CascadeType;

/**
 * @author 陈志杭
 * @qq 279397942@qq.com
 * @createdDate 2016年11月7日
 * @description
 */
@Entity
@Table(name = "organization_main")
public class OrganizationMain {
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	@Column(length = 36, nullable = false, unique = true)
	String id;
	@Column(length = 256, nullable = true)
	String name;
	@Column(length = 36, nullable = true)
	String parentId;
	/**
	 * 父组织
	 */
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	OrganizationMain parent;
	/**
	 * 子组织
	 */
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	Set<OrganizationMain> childrens;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public OrganizationMain getParent() {
		return parent;
	}

	public void setParent(OrganizationMain parent) {
		this.parent = parent;
	}

	public Set<OrganizationMain> getChildrens() {
		return childrens;
	}

	public void setChildrens(Set<OrganizationMain> childrens) {
		this.childrens = childrens;
	}
}
