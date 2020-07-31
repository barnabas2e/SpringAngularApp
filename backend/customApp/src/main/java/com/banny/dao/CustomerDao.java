package com.banny.dao;

import java.util.List;

import com.banny.model.Customer;

public interface CustomerDao {

	public boolean saveCustomer(Customer customer);
	public List<Customer> findCustomers();
	public boolean deleteCustomer(Customer customer);
	
	/**
	 * This method will retrieve a customer by ID
	 * 
	 * @return
	 */
	public List<Customer> retrieveCustomer(Customer customer);
	public boolean updateCustomer(Customer customer);
	
}
