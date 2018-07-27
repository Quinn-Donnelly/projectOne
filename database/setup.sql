--====================================== Table Creation =============================================
-- creates the emplyee table constraints of feilds are here as well foreign key
-- constraints are below for dev purposes
create table employees (
    employee_id number(10) primary key,
    first_name varchar2(200) not null,
    last_name varchar2(200) not null,
    email varchar2(200) unique not null check (
        regexp_like(email, '[[:alnum:]]+@[[:alnum:]]+\.[[:alnum:]]')
    ),
    password varchar2(200) not null,
    manager_id number(10),
    address_id number(10)
);

-- Creates the address table to store various addresses for the database
-- Potentailly use ISO codes for the country and state / provedence
create table addresses (
    address_id number(10) primary key,
    country varchar2(200) not null,
    state varchar2(10),
    zipcode number(10) not null,
    street varchar2 (200) not null,
    apartment_numebr number(10)
);

--================================ Foreign Key Constraints =============================================
-- Manager ID's should reference their emplyee data
alter table employees add constraint employees_FK_managerID foreign key (manager_id) references employees (employee_id);
-- Address ID's should reference the address entry
alter table employees add constraint employees_FK_addressID foreign key (address_id) references addresses (address_id) on delete cascade;

--=========================================== Sequences ================================================

-- generates primary key for employees
create sequence employee_id 
    start with 1
    increment by 1
    nocycle;
    
-- generates primary key for addresses
create sequence address_id 
    start with 1
    increment by 1
    nocycle;