INSERT INTO campuses (slug, name, address_line, sort_order, is_active) VALUES
  ('hai-phong', 'Princeton Academy Hai Phong', 'No. 6, Trieu Viet Vuong, Ecopark, Tan Hung Ward, Hai Phong', 10, TRUE),
  ('da-nang', 'Princeton Academy Da Nang', '88 Bac Son, Hoa An, Cam Le, Da Nang', 20, TRUE),
  ('geniuscamp-linh-dam', 'Princeton Academy GeniusCamp Linh Dam', 'BT5-TT4A, Southwest Linh Dam Urban Area, Hanoi', 30, TRUE),
  ('hung-yen', 'Princeton Academy Hung Yen', 'Nguyen Binh Street, Lac Hong Phuc Urban Area, Hung Yen', 40, TRUE),
  ('premier-phu-my-hung', 'Princeton Academy Premier - Phu My Hung', '33 Street 16, Nam Vien Quarter, Tan Phu Ward, District 7, Ho Chi Minh City', 50, TRUE),
  ('prince-academy-da-nang', 'Prince Academy - Princeton Academy', '45-47 Le Quy Don, Hai Chau, Da Nang', 60, TRUE),
  ('little-house-lai-vu', 'Princeton Little House Lai Vu', 'Stall 19-20, Lai Vu market & service area, Lai Khe, Hai Phong', 70, TRUE)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  address_line = VALUES(address_line),
  sort_order = VALUES(sort_order),
  is_active = TRUE;
