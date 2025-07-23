// mockData.js
export const visitors = [
  {
    id: 'v1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '123-456-7890',
    unreadCount: 2,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    chats: [
      { id: 1, sender: 'customer', text: 'Hi', timestamp: '1:01 PM' },
      { id: 2, sender: 'user', text: 'Hello!', timestamp: '1:02 PM' },
    ],
    lastChats: ['Is there an update?', 'Refund status?', 'Thank you!', 'Track order?', 'Change address?'],
  },
  {
    id: 'v2',
    name: 'Raju Ranjan',
    email: 'raju@example.com',
    phone: '124-455-7890',
    unreadCount: 1,
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    chats: [
      { id: 1, sender: 'customer', text: 'Hi', timestamp: '1:01 PM' },
      { id: 2, sender: 'user', text: 'Hello!', timestamp: '1:02 PM' },
    ],
    lastChats: ['Update?', 'Refund?', 'Thanks.', 'Tracking?', 'Address change?'],
  },
  {
    id: 'v3',
    name: 'Anita Roy',
    email: 'anita@example.com',
    phone: '345-666-7890',
    unreadCount: 0,
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    chats: [],
    lastChats: ['Order help?', 'Billing?', 'Need response!', 'Shipment?', 'ETA?'],
  },
  {
    id: 'v4',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '234-789-1234',
    unreadCount: 3,
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    chats: [],
    lastChats: ['Is there an update?', 'Refund status?', 'Thank you!', 'Track order?', 'Change address?'],
  },
  {
    id: 'v5',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '987-654-3210',
    unreadCount: 0,
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    chats: [],
    lastChats: ['Is there an update?', 'Refund status?', 'Thank you!', 'Track order?', 'Change address?'],
  },
  {
    id: 'v6',
    name: 'Shreya Maddhesiya',
    email: 'shreya@example.com',
    phone: '345-666-7890',
    unreadCount: 0,
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    chats: [],
    lastChats: ['Order help?', 'Billing?', 'Need response!', 'Shipment?', 'ETA?'],
  },
];

export const sampleMessages = [
  {
    text: 'Hello, I need help with my order.',
    sender: 'visitor',
    timestamp: '10:01 AM',
  },
  {
    text: 'Sure, I’d be happy to help!',
    sender: 'user',
    timestamp: '10:02 AM',
  },
];
