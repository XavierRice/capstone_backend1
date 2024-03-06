\c impactify_app

INSERT INTO users (first_name, last_name, user_name, email, events_created, favorite_events, favorite_news, donations_made, password_hash, user_keywords)
VALUES
  ('John', 'Doe', 'johndoe', 'johnnydoe@gmail.com', 5, 10, 8, 3, 'password123', '{"activism", "politics", "social justice"}'),
  ('Jane', 'Smith', 'janesmith', 'janiesmithhh@gmail.com', 3, 7, 5, 2, 'password456', '{"community", "equality", "environment"}'),
  ('Alice', 'Johnson', 'alicej', 'allicee@gmail.com', 8, 12, 15, 5, 'password789', '{"human rights", "climate change", "volunteer"}');

-- events should have some related keywords
INSERT INTO events (user_id, event_title, event_date, event_time, lat, lng, event_location, event_details, event_photo, is_virtual, donation_id, mobilize_id, rsvp)
VALUES
(1, 'Climate Change Awareness Rally', '2023-04-22', '12:00:00', 40.7128, -74.0060, 'Central Park, New York', 'Join us for a rally to raise awareness about climate change and its impact on our planet.', 'https://example.com/event_photo1.jpg', false, 1, 12345, true),
(2, 'Community Cleanup Day', '2023-05-15', '09:00:00', 40.6782, -73.9442, 'Brooklyn Bridge Park, Brooklyn', 'Help keep our community clean by participating in our annual cleanup day.', 'https://example.com/event_photo2.jpg', false, 2, 67890, true),
(3, 'Voter Registration Drive', '2023-06-30', '10:00:00', 40.7306, -73.9352, 'Union Square, New York', 'Join us to register voters and promote civic engagement in our community.', 'https://example.com/event_photo3.jpg', true, 3, 24680, true);


INSERT INTO donations (user_id, event_id, donation_amount, currency_code, donation_keyword, donation_description)
VALUES
(1, 1, 3, 'USD', 'Climate Change', 'Support efforts to combat climate change and promote sustainability.'),
(2, 2, 50, 'EUR', 'Racial Equality', 'Contribute to initiatives working towards achieving racial equality and social justice.'),
(3, 3, 100, 'USD', 'Affordable Housing', 'Help fund programs aimed at providing affordable housing for low-income families.');



INSERT INTO news (user_id, news_title, donation_id, news_content, news_url, news_image, keywords)
VALUES
(1, 'Gaza has become a ''death zone'', warns UN health chief', 101, '“Gaza has become a death zone,” Tedros Adhanom Ghebreyesus, WHO Director-General told correspondents at a press briefing in Geneva.

Much of the territory has been destroyed. More than 29,000 people are dead; many more are missing, presumed dead; and many, many more are injured.

Across the war-ravaged Gaza Strip, severe malnutrition has shot up dramatically since the start of the war on 7 October, from under one per cent of the population, to over 15 per cent in some areas.

“This figure will rise the longer the war goes on and supplies [are] interrupted,” Tedros said, expressing deep concern that agencies such as the World Food Programme (WFP) are unable to access the north. WFP suspended its aid deliveries there due to lack of security for both humanitarian personnel and those seeking assistance.

Medical charity attacked The war has taken a severe toll on aid workers, with hundreds reported killed. A Médecins Sans Frontières (MSF) shelter was shelled Tuesday night (local time), injuring staff and killing members of their family. UN Emergency Relief Coordinator, Martin Griffiths, said he was appalled by the attack, adding that he stood with them in their grief.

“Humanitarians are putting their lives on the line. Like all civilians, they must be protected,” he added, in a post on X, formerly Twitter. ‘What world do we live in’ WHO chief Tedros reiterated the grave risks for humanitarians and the need to ensure they are protected. “What type of world do we live when people cannot get food and water, and when people who cannot even walk are unable to receive care?”, he lamented. “What type of world do we live in when health workers are at risk of being bombed as they carry out their life saving work [and] hospitals must close because there is no more power or medicines to help save patients?” Tweet URL He underscored the need for an immediate ceasefire.', 'https://news.un.org/en/story/2024/02/1146792', 'https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production%20Library/21-02-2024_WHO_Gaza.jpg/image1170x530cropped.jpg', '["Palestine", "war", "global issue", "humanitarian"]'),

(2, 'Ukraine: 2024 starts with ''loss, pain, and anguish'' amid intense Russian strikes', 102, 'In a statement on Tuesday, UN Humanitarian Coordinator Denise Brown strongly condemned the assaults targeting mostly cities.

“For the people of Ukraine, the new year started with loss, pain, and anguish. For the third day in a row, vast aerial assaults by the Russian Federation have caused death – including several children - and destruction of homes”, Ms. Brown stated.

She emphasized that the situation is particularly alarming as many parts of the capital, Kyiv, have been left without electricity or water, which is particularly dangerous as temperatures are forecast to drop to -20 degrees Celsius later this week.

Violation of humanitarian law Ms. Brown on Tuesday once again reminded the Russian Federation that ‘indiscriminate attacks against civilians and civilian infrastructure are strictly forbidden under international humanitarian law’.', 'https://news.un.org/en/story/2024/01/1145232', 'https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Collections/Embargoed/29-12-2023-Ukraine-Odesa2.jpg/image770x420cropped.jpg', '["Ukraine", "war", "global issue", "humanitarian"]'),

(3, 'The Climate Impact of War', 103, 'Israel-Palestine War The escalating conflict in Palestine has now put the spotlight on emissions and environmental damages resulting from war.

Thanks to the press and social media, the damage is more evident now than ever, as people from around the world witness, in real-time, the wide-scale destruction caused by modern-day warfare.

Like all others, this war directly consumed large amounts of fossil fuel, leading to excessive carbon emissions and environmental pollutants.

An earlier report from the Euro-Med Human Rights Monitor says around 25,000 tonnes of munitions were dropped on Gaza in the first few weeks of the war. The carbon emissions from this would be equivalent to the annual energy use of approximately 2,300 homes or the annual greenhouse gas emissions from about 4,600 passenger vehicles.

Indirect pollution from the war includes the carbon emissions that will be released during the rebuilding of Gaza. Producing concrete leaves a large carbon footprint, and it was estimated that 5.8 million tonnes of carbon emissions would be released from the production of construction materials and the construction activities itself.

Prior to the outbreak of war, Gaza had one of the world’s highest densities of solar rooftop installations. However, the current war has destroyed these solar systems, with 17 of the 29 largest rooftop solar installations either completely destroyed or displaying significant external damage.

This sets back the region’s climate change efforts and its environmental governance. At COP 28, where Palestine held', 'https://www.theguardian.com/commentisfree/2024/jan/09/emission-from-war-military-gaza-ukraine-climate-change', 'https://i.guim.co.uk/img/media/0c734ee173e5a443cbc5540508956516f6e7a69b/0_199_3000_1800/master/3000.jpg?width=620&dpr=2&s=none', '["Climate", "war", "global issue", "humanitarian"]');
