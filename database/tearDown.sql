-- Make things easy and drop constraints so that the order of this file isn't as dependant
-- Constraints
alter table employees drop constraint employees_FK_managerID;
alter table requests drop constraint requests_FK_requesterID;
alter table requests drop constraint requests_FK_resolverID;

-- Tables
drop table addresses;
drop table employees;
drop table requests;

-- Sequences
drop sequence employee_id;
drop sequence address_id;
drop sequence request_id;

-- Stored Procedures
drop procedure add_employee;
drop procedure add_request;
drop procedure resolve_request;