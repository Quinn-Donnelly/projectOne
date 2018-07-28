-- Make things easy and drop constraints so that the order of this file isn't as dependant
-- Constraints
alter table employees drop constraint employees_FK_managerID;
alter table employees drop constraint employees_FK_addressID;
alter table requests drop constraint requests_FK_requesterID;

-- Tables
drop table addresses;
drop table employees;
drop table requests;

-- Sequences
drop sequence employee_id;
drop sequence address_id;
drop sequence request_id;