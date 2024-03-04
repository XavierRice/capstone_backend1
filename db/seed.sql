\c impactify_app

INSERT INTO users (first_name, last_name, user_name, email, events_created, favorite_events, favorite_news, donations_made, password_hash, user_keywords)
VALUES
  ('John', 'Doe', 'johndoe', 'johnnydoe@gmail.com', 5, 10, 8, 3, 'password123', '{"activism", "politics", "social justice"}'),
  ('Jane', 'Smith', 'janesmith', 'janiesmithhh@gmail.com', 3, 7, 5, 2, 'password456', '{"community", "equality", "environment"}'),
  ('Alice', 'Johnson', 'alicej', 'allicee@gmail.com', 8, 12, 15, 5, 'password789', '{"human rights", "climate change", "volunteer"}');

INSERT INTO events (user_id, event_title, event_date, event_time, lat, lng, event_location, event_details, event_photo, is_virtual, donation_id, mobilize_id, rsvp)
VALUES
(1, 'Climate Change Awareness Rally', '2023-04-22', '12:00:00', 40.7128, -74.0060, 'Central Park, New York', 'Join us for a rally to raise awareness about climate change and its impact on our planet.', 'https://example.com/event_photo1.jpg', false, 1, 12345, true),
(2, 'Community Cleanup Day', '2023-05-15', '09:00:00', 40.6782, -73.9442, 'Brooklyn Bridge Park, Brooklyn', 'Help keep our community clean by participating in our annual cleanup day.', 'https://example.com/event_photo2.jpg', false, 2, 67890, true),
(3, 'Voter Registration Drive', '2023-06-30', '10:00:00', 40.7306, -73.9352, 'Union Square, New York', 'Join us to register voters and promote civic engagement in our community.', 'https://example.com/event_photo3.jpg', true, 3, 24680, true);


INSERT INTO news (user_id, news_title, donation_id, news_content, news_url, news_image)
VALUES
(1, 'Protest Against Climate Change Policies', 101, 'Thousands of activists gathered in downtown to protest against government inaction on climate change.', 'https://example.com/article1', 'climate_protest.jpg'),
(2, 'Campaign Launch for Racial Equality', 102, 'Civil rights organizations announce a new campaign aimed at achieving racial equality and social justice.', 'https://example.com/article2', 'racial_equality.jpg'),
(3, 'Legislation Proposal for Affordable Housing', 103, 'Lawmakers introduce a new bill aimed at addressing the housing affordability crisis.', 'https://example.com/article3', 'affordable_housing.jpg');

INSERT INTO donations (user_id, event_id, donation_amount, currency_code, donation_keyword, donation_description)
VALUES
(1, 1, 3, 'USD', 'Climate Change', 'Support efforts to combat climate change and promote sustainability.'),
(2, 2, 50, 'EUR', 'Racial Equality', 'Contribute to initiatives working towards achieving racial equality and social justice.'),
(3, 3, 100, 'USD', 'Affordable Housing', 'Help fund programs aimed at providing affordable housing for low-income families.');
