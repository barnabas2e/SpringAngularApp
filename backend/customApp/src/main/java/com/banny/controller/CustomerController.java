package com.banny.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banny.model.Customer;
import com.banny.service.CustomerService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping(value= "/api")
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	
	@PostMapping("save-customer")
	public boolean saveCustomer(@RequestBody Customer pCustomer) {
		
		return customerService.saveCustomer(pCustomer);		
	}
	
	@GetMapping("customers-list")
	public List<Customer> findAllCustomers() {
		
		return customerService.findCustomers();		
	}
	
	@DeleteMapping("delete-customer/{id}")
	public boolean deleteCustomer(@PathVariable("id") int id, Customer pCustomer) {
		
		pCustomer.setId(id);
		return customerService.deleteCustomer(pCustomer);
	}
	
	@GetMapping("customer/{id}")
	public List<Customer> retrieveAllCustomerById(@PathVariable("id") int id, Customer pCustomer) {
		
		pCustomer.setId(id);
		return customerService.retrieveCustomer(pCustomer);		
	}
	
	//TODO : change update to put mapping annotation
	@PostMapping("update-customer/{id}")
	public boolean updateCustomer(@RequestBody Customer pCustomer, @PathVariable("id") int id) {
		
		pCustomer.setId(id);
		return customerService.updateCustomer(pCustomer);
	}
}
