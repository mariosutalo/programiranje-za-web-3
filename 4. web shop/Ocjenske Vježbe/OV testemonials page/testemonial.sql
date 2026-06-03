use webshop;
DROP TABLE IF EXISTS testemonial;
CREATE TABLE testemonial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO testemonial (title, excerpt, content, author) VALUES
('Highly Recommended', 'This product completely changed our workflow for the better.', 'Before using this service, our team struggled with organization. Now, everything is streamlined and our productivity has skyrocketed. I cannot recommend it enough!', 'Jane Doe'),
('Fantastic Support', 'The customer service team is incredibly fast and helpful.', 'Whenever we have run into a minor issue, the support team has been there immediately. They are polite, knowledgeable, and always fix the problem within minutes.', 'John Smith'),
('So Intuitive and Easy', 'We saved hours of training time because of the simple UI.', 'Usually, adopting new software means weeks of training and headaches. This platform is so intuitive that our entire team was up and running on day one.', 'Alice Johnson'),
('Worth Every Penny', 'An incredible return on investment within the first month.', 'I was hesitant about the pricing at first, but it has paid for itself tenfold. The analytics features alone have helped us increase our revenue significantly.', 'Robert Brown'),
('Always Reliable', 'We have experienced zero downtime in over a year of use.', 'Reliability is our number one priority, and this service delivers. It is fast, secure, and gives us complete peace of mind so we can focus on our business.', 'Emily Davis');