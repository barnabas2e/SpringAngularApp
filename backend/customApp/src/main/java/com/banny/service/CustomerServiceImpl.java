package com.banny.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.banny.dao.CustomerDao;
import com.banny.model.Customer;

@Transactional
@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerDao customerdao;
	
	@Override
	public boolean saveCustomer(Customer customer) {
		
		return customerdao.saveCustomer(customer);
	}

	@Override
	public List<Customer> findCustomers() {
		
		return customerdao.findCustomers();
	}

	@Override
	public boolean deleteCustomer(Customer customer) {
		
		return customerdao.deleteCustomer(customer);
	}

	@Override
	public List<Customer> retrieveCustomer(Customer customer) {
		
		return customerdao.retrieveCustomer(customer);
	}

	@Override
	public boolean updateCustomer(Customer customer) {
		
		return customerdao.updateCustomer(customer);
	}

}
