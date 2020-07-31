package com.banny.dao;

import java.util.List;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;  
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.banny.model.Customer;

//@Transactional
@Repository
public class CustomerDaoImpl implements CustomerDao {

	private SessionFactory sessionFactory;
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	@Override
	public boolean saveCustomer(Customer customer) {
		
		boolean status = false;		
		try {
			sessionFactory.getCurrentSession().save(customer);
			status = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return status;
	}

	@Override
	public List<Customer> findCustomers() {
		
		Session currentSession = sessionFactory.getCurrentSession();
		Query<Customer> query = currentSession.createQuery("from Customer", Customer.class);
		List<Customer> customerList = query.getResultList();
		return customerList;
	}

	@Override
	public boolean deleteCustomer(Customer customer) {
		
		boolean status = false;
		try {
			sessionFactory.getCurrentSession().delete(customer);
			status = true;
		} catch (Exception e) {
			e.printStackTrace();
		}		
		return status;
	}

	@Override
	public List<Customer> retrieveCustomer(Customer customer) {
		
		Session currentSession = sessionFactory.getCurrentSession();
		Query<Customer> query = currentSession.createQuery("from Customer where id=:id", Customer.class);
		query.setParameter("id", customer.getId());
		List<Customer> customerList = query.getResultList();
		return customerList;
	}

	@Override
	public boolean updateCustomer(Customer customer) {
		
		boolean status = false;
		try {
			sessionFactory.getCurrentSession().update(customer);
			status = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return status;
	}

}
