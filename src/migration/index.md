===================
=== Table pois ===
poi_id: uuid PK
status: integer

country: string;
zipCode: string;
city: string;
street: string;
houseNumber: string;

public_holydays_open: boolean;
monday_is_open: boolean;
monday_open_time: string; //24h format
monday_close_time: boolean; // 24h format
... same for the rest of the days

updated_date: datetime
created_date: datetime
is_active: boolean

===================
=== Table pumps ===
pump_id: uuid PK
poi_id: FK
name: string

updated_date: datetime
created_date: datetime
is_active: boolean

==========================
=== Table fuel_products ==
fuel_product_id: string PK
poi_id: FK
pump_id: FK
name: string
type:string

updated_date: datetime
created_date: datetime
is_active: boolean

========================
=== Table fuel_prices ===
poi_id: FK
pump_id: FK
fuel_product_id: FK
currency: string
price: number

PK(poi_id, pump_id, fuel_product_id, currency)

==========================
=== Change logs tables ===
Every table would have a respective change_log table for to keep every possible mutation that would happen
