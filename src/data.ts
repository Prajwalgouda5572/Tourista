import { Place, Hotel } from './types';

const getMapLink = (name: string, city: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${city}`)}`;

export const TOURIST_DATA: Record<'Bengaluru' | 'Chennai', Place[]> = {
  'Bengaluru': [
    {
      id: 'b1',
      name: 'Lalbagh Botanical Garden',
      category: 'Nature',
      description: 'A 240-acre garden with a famous glass house and diverse plant species.',
      lat: 12.9507,
      lng: 77.5848,
      estimated_visit_duration: 2,
      fun_fact: 'It houses a 3,000-million-year-old rock, one of the oldest in the world.',
      why_visit: 'It is a tranquil escape offering a glimpse into the city\'s heritage and biodiversity.',
      map_url: getMapLink('Lalbagh Botanical Garden', 'Bengaluru'),
      best_time: 'Morning'
    },
    {
      id: 'b2',
      name: 'Bangalore Palace',
      category: 'Historical',
      description: 'A Tudor-style palace known for its beautiful architecture and wood carvings.',
      lat: 12.9988,
      lng: 77.5921,
      estimated_visit_duration: 2.5,
      fun_fact: 'The palace was inspired by Windsor Castle in England.',
      why_visit: 'Experience royal grandeur and the fascinating intersection of European and Indian designs.',
      map_url: getMapLink('Bangalore Palace', 'Bengaluru'),
      best_time: 'Afternoon'
    },
    {
      id: 'b3',
      name: 'Cubbon Park',
      category: 'Nature',
      description: 'The lung of the city, a peaceful green space in the heart of the tech hub.',
      lat: 12.9779,
      lng: 77.5952,
      estimated_visit_duration: 1.5,
      fun_fact: 'It was originally spread over 100 acres but is now approximately 300 acres.',
      why_visit: 'It\'s the best place to witness the "Garden City" vibe amidst high-rise surroundings.',
      map_url: getMapLink('Cubbon Park', 'Bengaluru'),
      best_time: 'Morning'
    },
    {
      id: 'b4',
      name: 'Bull Temple',
      category: 'Spiritual',
      description: 'A 16th-century temple dedicated to Nandi, the sacred bull.',
      lat: 12.9413,
      lng: 77.5683,
      estimated_visit_duration: 1,
      fun_fact: 'The idol of Nandi is carved out of a single granite rock.',
      why_visit: 'Observe unique Dravidian architecture and deep-rooted local religious traditions.',
      map_url: getMapLink('Bull Temple', 'Bengaluru'),
      best_time: 'Morning'
    },
    {
      id: 'b5',
      name: 'VV Puram Food Street',
      category: 'Food',
      description: 'A legendary street known for diverse authentic local street food.',
      lat: 12.9515,
      lng: 77.5778,
      estimated_visit_duration: 2,
      fun_fact: 'It is especially famous for the annual "Avarebele" (Bean) festival.',
      why_visit: 'A heaven for foodies to taste authentic Kannadiga street flavors in one place.',
      map_url: getMapLink('VV Puram Food Street', 'Bengaluru'),
      best_time: 'Evening'
    },
    {
      id: 'b6',
      name: 'Iskcon Temple',
      category: 'Spiritual',
      description: 'One of the largest Iskcon temples in the world, beautifully maintained.',
      lat: 13.0102,
      lng: 77.5513,
      estimated_visit_duration: 1.5,
      fun_fact: 'It features a gold-plated kalash and grand multimedia theaters.',
      why_visit: 'Known for its spiritual serenity, modern amenities, and architectural precision.',
      map_url: getMapLink('Iskcon Temple', 'Bengaluru'),
      best_time: 'Evening'
    },
    {
      id: 'b7',
      name: 'Tipu Sultan\'s Summer Palace',
      category: 'Historical',
      description: 'An elegant teakwood palace that served as the summer residence of the Sultan.',
      lat: 12.9593,
      lng: 77.5738,
      estimated_visit_duration: 1,
      fun_fact: 'The entire structure is built of teakwood except for the stone base.',
      why_visit: 'To see the beautiful Indo-Islamic architecture and historic frescoes.',
      map_url: getMapLink('Tipu Sultan Summer Palace', 'Bengaluru'),
      best_time: 'Afternoon'
    },
    {
      id: 'b8',
      name: 'Brigade Road',
      category: 'Food',
      description: 'A bustling commercial street with numerous restaurants, bars, and cafes.',
      lat: 12.9738,
      lng: 77.6074,
      estimated_visit_duration: 2,
      fun_fact: 'It is one of the most illuminated streets in India during New Year celebrations.',
      why_visit: 'Perfect for experiencing the vibrant cosmopolitan and nightlife energy of Bengaluru.',
      map_url: getMapLink('Brigade Road', 'Bengaluru'),
      best_time: 'Evening'
    },
    {
      id: 'b9',
      name: 'Bannerghatta National Park',
      category: 'Nature',
      description: 'Offers a safari experience and houses a biological park and butterfly park.',
      lat: 12.7667,
      lng: 77.5758,
      estimated_visit_duration: 4,
      fun_fact: 'It contains one of the first butterfly parks in India.',
      why_visit: 'Essential for nature lovers and families seeking a wild safari experience near the city.',
      map_url: getMapLink('Bannerghatta National Park', 'Bengaluru'),
      best_time: 'Morning'
    },
    {
      id: 'b10',
      name: 'Commercial Street',
      category: 'Food',
      description: 'Vibrant market area famous for shopping and quick local eats.',
      lat: 12.9822,
      lng: 77.6083,
      estimated_visit_duration: 2,
      fun_fact: 'It was once part of the British Cantonment and retains some colonial charm.',
      why_visit: 'The pulse of the city\'s high-energy shopping and eclectic street food culture.',
      map_url: getMapLink('Commercial Street', 'Bengaluru'),
      best_time: 'Afternoon'
    },
    {
      id: 'b11',
      name: 'Vidhana Soudha',
      category: 'Historical',
      description: 'The seat of the state legislature of Karnataka, a magnificent neo-Dravidian building.',
      lat: 12.9796,
      lng: 77.5906,
      estimated_visit_duration: 1,
      fun_fact: 'It is the largest legislative building in India.',
      why_visit: 'To witness the architectural marvel and the "Government of Work is God" inscription.',
      map_url: getMapLink('Vidhana Soudha', 'Bengaluru'),
      best_time: 'Evening'
    },
    {
      id: 'b12',
      name: 'Basavanagudi Gandhi Bazaar',
      category: 'Food',
      description: 'One of the oldest and most traditional market areas in Bengaluru.',
      lat: 12.9461,
      lng: 77.5714,
      estimated_visit_duration: 1.5,
      fun_fact: 'It is famous for the Vidyarthi Bhavan restaurant, which has been serving dosas since 1943.',
      why_visit: 'To experience the old-world charm and authentic local breakfast culture.',
      map_url: getMapLink('Gandhi Bazaar', 'Bengaluru'),
      best_time: 'Morning'
    },
    {
      id: 'b13',
      name: 'UB City',
      category: 'Food',
      description: 'Bengaluru\'s first luxury mall, known for high-end dining and shops.',
      lat: 12.9719,
      lng: 77.5959,
      estimated_visit_duration: 2,
      fun_fact: 'It consists of four towers, the tallest being the Canary Tower.',
      why_visit: 'To see the modern, sophisticated side of the city and enjoy premium dining.',
      map_url: getMapLink('UB City', 'Bengaluru'),
      best_time: 'Evening'
    },
    {
      id: 'b14',
      name: 'National Gallery of Modern Art',
      category: 'Historical',
      description: 'An art gallery housed in a restored heritage mansion with beautiful gardens.',
      lat: 12.9902,
      lng: 77.5895,
      estimated_visit_duration: 2,
      fun_fact: 'The building was originally a residence belonging to the Raja of Mysore.',
      why_visit: 'A peaceful haven for art enthusiasts featuring Indian modernism and contemporary works.',
      map_url: getMapLink('NGMA', 'Bengaluru'),
      best_time: 'Afternoon'
    },
    {
      id: 'b15',
      name: 'Sankey Tank',
      category: 'Nature',
      description: 'A man-made lake in western Bengaluru, popular for walking and bird watching.',
      lat: 13.0076,
      lng: 77.5750,
      estimated_visit_duration: 1,
      fun_fact: 'It was built in 1882 to meet the water needs of the city.',
      why_visit: 'Great for a relaxed walk and to see locals enjoying the outdoors.',
      map_url: getMapLink('Sankey Tank', 'Bengaluru'),
      best_time: 'Morning'
    }
  ],
  'Chennai': [
    {
      id: 'c1',
      name: 'Marina Beach',
      category: 'Nature',
      description: 'The longest natural urban beach in India, perfect for a walk.',
      lat: 13.0475,
      lng: 80.2824,
      estimated_visit_duration: 2,
      fun_fact: 'It is the second-longest natural urban beach in the entire world.',
      why_visit: 'A must-visit for the iconic Chennai seaside atmosphere and local snacks like sundal.',
      map_url: getMapLink('Marina Beach', 'Chennai'),
      best_time: 'Evening'
    },
    {
      id: 'c2',
      name: 'Kapaleeshwarar Temple',
      category: 'Spiritual',
      description: 'A fine example of Dravidian architecture dedicated to Lord Shiva.',
      lat: 13.0336,
      lng: 80.2694,
      estimated_visit_duration: 1.5,
      fun_fact: 'The temple was originally located near the shore but was rebuilt inland by the Vijayanagar kings.',
      why_visit: 'For its stunning colorful gopuram and the vibrant cultural life of Mylapore.',
      map_url: getMapLink('Kapaleeshwarar Temple', 'Chennai'),
      best_time: 'Morning'
    },
    {
      id: 'c3',
      name: 'Fort St. George',
      category: 'Historical',
      description: 'The first English fortress in India, housing a museum and church.',
      lat: 13.0795,
      lng: 80.2875,
      estimated_visit_duration: 2,
      fun_fact: 'St. Mary\'s Church here is the oldest Anglican church in Asia.',
      why_visit: 'To understand the colonial roots of modern-day Chennai through its vast artifacts.',
      map_url: getMapLink('Fort St George', 'Chennai'),
      best_time: 'Morning'
    },
    {
      id: 'c4',
      name: 'Elliott\'s Beach',
      category: 'Nature',
      description: 'A popular, cleaner beach in Besant Nagar known for its relaxed vibe.',
      lat: 12.9996,
      lng: 80.2721,
      estimated_visit_duration: 1.5,
      fun_fact: 'It is named after Edward Elliot, a former Governor of Madras.',
      why_visit: 'Offers a more serene and youthful vibe compared to the crowded Marina Beach.',
      map_url: getMapLink('Elliotts Beach', 'Chennai'),
      best_time: 'Evening'
    },
    {
      id: 'c5',
      name: 'Santhome Cathedral',
      category: 'Spiritual',
      description: 'A stunning Gothic-style church built over the tomb of St. Thomas.',
      lat: 13.0334,
      lng: 80.2777,
      estimated_visit_duration: 1,
      fun_fact: 'One of the only three churches in the world built over the tomb of an Apostle of Jesus.',
      why_visit: 'For its breathtaking white Gothic architecture and peaceful spiritual significance.',
      map_url: getMapLink('Santhome Cathedral', 'Chennai'),
      best_time: 'Morning'
    },
    {
      id: 'c6',
      name: 'Government Museum',
      category: 'Historical',
      description: 'One of the oldest museums in India with a massive collection of bronzes.',
      lat: 13.0694,
      lng: 80.2589,
      estimated_visit_duration: 3,
      fun_fact: 'It contains the world\'s largest collection of South Indian bronze idols.',
      why_visit: 'An absolute treasure trove for history and art enthusiasts.',
      map_url: getMapLink('Government Museum', 'Chennai'),
      best_time: 'Afternoon'
    },
    {
      id: 'c7',
      name: 'Mylapore Food Walk',
      category: 'Food',
      description: 'Explore traditional South Indian snacks like Bhajis and Rose Milk.',
      lat: 13.0350,
      lng: 80.2670,
      estimated_visit_duration: 2,
      fun_fact: 'The neighborhood is over 2,000 years old, mentioned in ancient Mediterranean texts.',
      why_visit: 'The ultimate culinary journey through Chennai\'s traditional vegetarian heritage.',
      map_url: getMapLink('Mylapore', 'Chennai'),
      best_time: 'Evening'
    },
    {
      id: 'c8',
      name: 'Guindy National Park',
      category: 'Nature',
      description: 'Small protected area within the city housing spotted deer and birds.',
      lat: 13.0031,
      lng: 80.2223,
      estimated_visit_duration: 2,
      fun_fact: 'It is the eighth-smallest national park in India, located entirely within city limits.',
      why_visit: 'A rare opportunity to see wildlife in the center of a metropolitan city.',
      map_url: getMapLink('Guindy National Park', 'Chennai'),
      best_time: 'Morning'
    },
    {
      id: 'c9',
      name: 'T Nagar Shopping District',
      category: 'Food',
      description: 'Heavily crowded hub for traditional food and clothing shopping.',
      lat: 13.0405,
      lng: 80.2337,
      estimated_visit_duration: 2.5,
      fun_fact: 'It is considered the largest shopping district in India by revenue.',
      why_visit: 'To experience the high-octane energy of Chennai\'s silk saree and jewelry legacy.',
      map_url: getMapLink('T Nagar', 'Chennai'),
      best_time: 'Afternoon'
    },
    {
      id: 'c10',
      name: 'DakshinaChitra',
      category: 'Historical',
      description: 'Living history museum dedicated to South Indian heritage.',
      lat: 12.8228,
      lng: 80.2417,
      estimated_visit_duration: 3,
      fun_fact: 'It features 18 authentic historical houses transported and rebuilt on site.',
      why_visit: 'Best place to experience the diverse crafts and traditions of all four South Indian states.',
      map_url: getMapLink('DakshinaChitra', 'Chennai'),
      best_time: 'Afternoon'
    },
    {
      id: 'c11',
      name: 'Valluvar Kottam',
      category: 'Historical',
      description: 'A monument dedicated to the classical Tamil poet and philosopher Thiruvalluvar.',
      lat: 13.0531,
      lng: 80.2417,
      estimated_visit_duration: 1,
      fun_fact: 'The main hall is designed as a chariot and contains all 1330 verses of the Thirukkural.',
      why_visit: 'To see the grand architectural tribute to Tamil literature and philosophy.',
      map_url: getMapLink('Valluvar Kottam', 'Chennai'),
      best_time: 'Morning'
    },
    {
      id: 'c12',
      name: 'Arignar Anna Zoological Park',
      category: 'Nature',
      description: 'Vast zoo with a safari experience and specialized animal enclosures.',
      lat: 12.8792,
      lng: 80.0817,
      estimated_visit_duration: 4,
      fun_fact: 'It was the first public zoo in India, established in 1855.',
      why_visit: 'One of the best modern zoos in South Asia for wildlife education and observation.',
      map_url: getMapLink('Chennai Zoo', 'Chennai'),
      best_time: 'Morning'
    },
    {
      id: 'c13',
      name: 'Spencer Plaza',
      category: 'Historical',
      description: 'One of the oldest modern shopping malls in India, built during the British Raj.',
      lat: 13.0645,
      lng: 80.2605,
      estimated_visit_duration: 2,
      fun_fact: 'The original department store was built in 1863.',
      why_visit: 'To see a blend of colonial history and modern retail culture.',
      map_url: getMapLink('Spencer Plaza', 'Chennai'),
      best_time: 'Afternoon'
    },
    {
      id: 'c14',
      name: 'Kalakshetra Foundation',
      category: 'Historical',
      description: 'Center for the preservation of traditional Indian art forms, especially Bharatanatyam.',
      lat: 12.9912,
      lng: 80.2687,
      estimated_visit_duration: 2,
      fun_fact: 'It was founded in 1936 by Rukmini Devi Arundale to revive classical dance.',
      why_visit: 'To witness the traditional gurukul style of learning and beautiful ethnic architecture.',
      map_url: getMapLink('Kalakshetra', 'Chennai'),
      best_time: 'Morning'
    },
    {
      id: 'c15',
      name: 'Theosophical Society Garden',
      category: 'Nature',
      description: 'A vast, peaceful headquarters with exotic trees and multiple religious shrines.',
      lat: 13.0055,
      lng: 80.2660,
      estimated_visit_duration: 1.5,
      fun_fact: 'It houses a giant Banyan tree that is over 450 years old.',
      why_visit: 'A spiritual and botanical sanctuary away from the city\'s traffic noise.',
      map_url: getMapLink('Theosophical Society', 'Chennai'),
      best_time: 'Morning'
    }
  ]
};

export const HOTEL_DATA: Record<'Bengaluru' | 'Chennai', Hotel[]> = {
  'Bengaluru': [
    {
      id: 'h-b1',
      name: 'JW Marriott Hotel',
      price_range: 'Premium',
      estimated_price: '₹12,000 - ₹18,000',
      rating: 4.8,
      description: 'Luxurious hotel located near Cubbon Park with world-class amenities.',
      why_suggested: 'Top-tier luxury and central proximity to heritage sites like the Palace.'
    },
    {
      id: 'h-b2',
      name: 'Bloom Hotel - Indiranagar',
      price_range: 'Medium',
      estimated_price: '₹4,500 - ₹6,000',
      rating: 4.3,
      description: 'Trendy and clean boutique hotel in the heart of Indiranagar.',
      why_suggested: 'Exceptional value in the city\'s most vibrant food and nightlife hub.'
    },
    {
      id: 'h-b3',
      name: 'St Marks Hotel',
      price_range: 'Medium',
      estimated_price: '₹5,500 - ₹7,500',
      rating: 4.5,
      description: 'Quiet, premium boutique hotel with a focus on personalized service.',
      why_suggested: 'Perfect mid-range choice for families wanting peace near the city center.'
    },
    {
      id: 'h-b4',
      name: 'Zostel Bengaluru',
      price_range: 'Low',
      estimated_price: '₹800 - ₹1,500',
      rating: 4.2,
      description: 'Vivacious backpacker hostel in Indiranagar with great community vibes.',
      why_suggested: 'The ultimate low-budget choice for solo travelers and students.'
    },
    {
      id: 'h-b5',
      name: 'Hotel Empire International',
      price_range: 'Low',
      estimated_price: '₹1,200 - ₹2,500',
      rating: 3.9,
      description: 'Reliable and clean budget stay known for its late-night food.',
      why_suggested: 'Best Value for groups on a strict budget near Central Business District.'
    },
    {
      id: 'h-b6',
      name: 'The Ritz-Carlton',
      price_range: 'Premium',
      estimated_price: '₹14,000 - ₹20,000',
      rating: 4.7,
      description: 'Iconic luxury hotel in central Bengaluru with exceptional fine dining.',
      why_suggested: 'Ultra-luxury experience for those seeking world-class hospitality.'
    },
    {
      id: 'h-b7',
      name: 'Ibis Bengaluru City Centre',
      price_range: 'Medium',
      estimated_price: '₹3,500 - ₹5,000',
      rating: 4.1,
      description: 'Functional and modern hotel located right across from Kanteerava Stadium.',
      why_suggested: 'Reliable business-grade stay for travelers who prefer consistent brand standards.'
    }
  ],
  'Chennai': [
    {
      id: 'h-c1',
      name: 'The Leela Palace',
      price_range: 'Premium',
      estimated_price: '₹15,000 - ₹22,000',
      rating: 4.9,
      description: 'Opulent seafront palace hotel offering breathtaking views of the Bay of Bengal.',
      why_suggested: 'Unmatched luxury with direct views of the coastline.'
    },
    {
      id: 'h-c2',
      name: 'Grand Chennai by GRT Hotels',
      price_range: 'Medium',
      estimated_price: '₹5,000 - ₹7,000',
      rating: 4.4,
      description: 'Upscale business hotel in T. Nagar with themed restaurants.',
      why_suggested: 'Centered in the cultural heart with great access to shopping.'
    },
    {
      id: 'h-c3',
      name: 'Ginger Hotel - OMR',
      price_range: 'Low',
      estimated_price: '₹2,500 - ₹3,500',
      rating: 4.0,
      description: 'Smart, efficient budget stay catering to business and solo travelers.',
      why_suggested: 'Reliable and safe choice for budget-conscious business visitors.'
    },
    {
      id: 'h-c4',
      name: 'Red Lollipop Hostel',
      price_range: 'Low',
      estimated_price: '₹700 - ₹1,200',
      rating: 4.1,
      description: 'Centrally located backpackers hostel in Mandaveli.',
      why_suggested: 'Cheapest safe stay for solo explorers near the Marina Beach.'
    },
    {
      id: 'h-c5',
      name: 'FabHotel Metro Manor',
      price_range: 'Low',
      estimated_price: '₹1,500 - ₹2,200',
      rating: 3.8,
      description: 'Functional budget hotel near Chennai Central Railway Station.',
      why_suggested: 'Best for transit travelers on a tight budget.'
    },
    {
      id: 'h-c6',
      name: 'ITC Grand Chola',
      price_range: 'Premium',
      estimated_price: '₹13,000 - ₹19,000',
      rating: 4.8,
      description: 'A monument-like luxury hotel inspired by Chola architecture.',
      why_suggested: 'Perfect for heritage lovers who don\'t want to compromise on modern luxury.'
    },
    {
      id: 'h-c7',
      name: 'The Raintree, St. Mary\'s Road',
      price_range: 'Medium',
      estimated_price: '₹6,000 - ₹8,500',
      rating: 4.5,
      description: 'Eco-friendly boutique hotel in Alwarpet with rooftop dining.',
      why_suggested: 'Chic and sustainable option in one of Chennai\'s posh neighborhoods.'
    }
  ]
};
