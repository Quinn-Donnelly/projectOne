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
    address_id number(10) unique
);

-- Creates the address table to store various addresses for the database
-- Potentailly use ISO codes for the country and state / provedence
create table addresses (
    address_id number(10) primary key,
    country varchar2(200) not null,
    state varchar2(200),
    zipcode number(10) not null,
    street varchar2 (200) not null,
    apartment_number number(10)
);

create table requests(
    request_id number(10) primary key,
    requester_id number(10) not null,
    resolver_id number(10),
    date_of_request timestamp not null,
    date_of_resolution timestamp,
    status varchar2(200) not null,
    title varchar2(200) not null,
    description varchar2(200),
    resolution_note varchar2(200),
    amount binary_float not null
);

--================================ Foreign Key Constraints =============================================
-- Manager ID's should reference their emplyee data
alter table employees add constraint employees_FK_managerID foreign key (manager_id) references employees (employee_id);
-- Address ID's should reference the address entry
alter table addresses add constraint addresses_FK_addressID foreign key (address_id) references employees (address_id) ON DELETE CASCADE;
-- Requester ID should reference the employee that made the request
alter table requests add constraint requests_FK_requesterID foreign key (requester_id) references employees (employee_id) ON DELETE CASCADE;
-- Resolver ID should reference the employee that closes the ticket if the ticket has been resolved
alter table requests add constraint requests_FK_resolverID foreign key (resolver_id) references employees (employee_id);

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

create sequence request_id
    start with 1
    increment by 1
    nocycle;

--======================================= Stored Procedures ============================================

create or replace procedure add_employee(first_name varchar2, last_name varchar2, email varchar2, password varchar2, manager_id number, country varchar2, state varchar2, zipcode number, street varchar2, apartment_number number, new_employee_id out number, new_address_id out number) as
begin
    insert into employees values (employee_id.nextval, first_name, last_name, email, password, manager_id, address_id.nextval);
    insert into addresses values(address_id.currval, country, state, zipcode, street, apartment_number);
    new_employee_id := employee_id.currval;
    new_address_id := address_id.currval;
end;
/

create or replace procedure add_request(requester number, title varchar2, description varchar2, amount binary_float, new_id out number, time_of_request out timestamp) as
    time timestamp;
begin
    time := CURRENT_TIMESTAMP;
    insert into requests values (request_id.nextval, requester, null, time, null, 'NEW', title, description, null, amount);
    new_id := request_id.currval;
    time_of_request := time;
end;
/

create or replace procedure resolve_request(request number, resolver number, is_approved number, note varchar2) as
begin
    if is_approved > 0 then
        update requests set resolver_id = resolver, status = 'APPROVED', resolution_note = note, date_of_resolution = CURRENT_TIMESTAMP where request_id = request;
    else
        update requests set resolver_id = resolver, status = 'DENIED', resolution_note = note, date_of_resolution = CURRENT_TIMESTAMP where request_id = request;
    end if;
end;
/

create or replace procedure get_owned_requests(employee number, requests out SYS_REFCURSOR) as
    manager_id_for_requester number(10);
begin
    select manager_id into manager_id_for_requester from employees where employee_id = employee;

    if manager_id_for_requester = 0 or manager_id_for_requester is null then
        open requests for 
        select 
            request_id,
            requester_id,
            resolver_id,
            date_of_request, 
            date_of_resolution,
            status,
            title,
            description,
            amount,
            resolution_note,
            manager.first_name as resolver_first_name,
            manager.last_name as resolver_last_name,
            employee.first_name as requester_first_name,
            employee.last_name as requester_last_name
        from (
        requests 
        left join employees manager on requests.resolver_id = manager.employee_id)
        left join employees employee on requests.requester_id = employee.employee_id;
    else
        open requests for 
        select 
            request_id,
            requester_id,
            resolver_id,
            date_of_request, 
            date_of_resolution,
            status,
            title,
            description,
            amount,
            resolution_note,
            manager.first_name as resolver_first_name,
            manager.last_name as resolver_last_name,
            employee.first_name as requester_first_name,
            employee.last_name as requester_last_name
        from (
        requests 
        left join employees manager on requests.resolver_id = manager.employee_id)
        left join employees employee on requests.requester_id = employee.employee_id
        where requester_id = employee;
    end if;
end;
/
