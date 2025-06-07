export const products = [
  [
    {
      id: "b01",
      size: '8"X8"X8"',
      title: "Corrugated box",
      desc: "32ECT single wall",
      priceTable: { tier1: 2, tier2: 1.7, tier3: 1.6, tier4: 1.5 },
      image: "/images/8inchcube.png",
    },
    {
      id: "b02",
      size: '12"X12"X12"',
      title: "Corrugated box",
      desc: "32ECT single wall",
      priceTable: { tier1: 2, tier2: 1.7, tier3: 1.6, tier4: 1.5 },
      image: "/images/12inchcube.png",
    },
    {
      id: "b03",
      size: "16*13*13",
      title: "1.5 Cube corrugated box",
      desc: "32ECT single wall",
      priceTable: { tier1: 2, tier2: 1.7, tier3: 1.6, tier4: 1.5 },
      image: "/images/1.5cube.png",
    },
    {
      id: "b04",
      size: "18*15*12.5",
      title: "2 Cube corrugated box",
      desc: "32ECT single wall",
      priceTable: { tier1: 2, tier2: 1.7, tier3: 1.6, tier4: 1.5 },
      image: "/images/2cube.png",
    },
    {
      id: "b05",
      size: "18*18*16",
      title: "3 Cube corrugated box",
      desc: "32ECT single wall",
      priceTable: { tier1: 2, tier2: 1.7, tier3: 1.6, tier4: 1.5 },
      image: "/images/3cube.png",
    },
    {
      id: "b06",
      size: "18*18*21",
      title: "4 Cube corrugated box",
      desc: "32ECT single wall",
      priceTable: { tier1: 2, tier2: 1.7, tier3: 1.6, tier4: 1.5 },
      image: "/images/4cube.png",
    },
    {
      id: "b07",
      size: "24*21*48",
      title: "Wardrobe box with metal bar",
      desc: "32ECT single wall",
      priceTable: { tier1: 2, tier2: 1.7, tier3: 1.6, tier4: 1.5 },
      image: "/images/wardrobe.png",
    },
  ],

  [
    {
      id: "m01",
      title: "Moving Blankets",
      desc: "Polyster non-woven",
      size: '72"L X 80"W',
      priceTable: { tier1: 20, tier2: 16, tier3: 13, tier4: 10 },
      image: "/images/moving_blankets.png",
      features: [
        "Soft & Comfortable",
        "Durable & Sturdy",
        "Double Stitched Binding",
      ],
    },
  ],
  [
    {
      id: "s01",
      title: "Stretch wrap / Pallet wrap",
      desc: "14inch, 80gauge",
      size: "450m",
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      image: "/images/shrink_wrap.png",
      features: ["Heavy-duty", "Self-Adhering", "Multi-Purpose"],
    },
  ],

  [
    {
      id: "g01",
      title: "Nitrile 5 mil gloves",
      desc: "Powder & Latex Free",
      size: "small",
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      image: "/images/gloves.png",
      features: ["Thick Disposable Gloves", "Enhanced Grip", "Versatile Use"],
    },
    {
      id: "g02",
      title: "Nitrile 6 mil gloves",
      desc: "",
      size: "small",
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      image: "/images/gloves.png",
      features: ["Thick Disposable Gloves", "Enhanced Grip", "Versatile Use"],
    },
    {
      id: "g03",
      title: "Nitrile 6 mil gloves",
      desc: "",
      size: "medium",
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      features: ["Thick Disposable Gloves", "Enhanced Grip", "Versatile Use"],
      image: "/images/gloves.png",
    },
  ],

  [
    {
      id: "ct01",
      title: "Acrylic Clear Tape",
      desc: "1.88inch wide, 2.5mil",
      size: "100m",
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      features: ["Ultra Strong", "High Transparency", "Easy To Use"],
      image: "/images/clear-tape.png",
    },
  ],
  [
    {
      id: "gt01",
      title: "Painter's Green Tape",
      desc: "Masking tape, 1.88inch Wide",
      size: "50m",
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      features: [
        "Multi-Surface Use",
        "Leaves no residue",
        "High Temperature Resistant",
      ],
      image: "/images/green-tape.png",
    },
  ],
  [
    {
      id: "rt01",
      title: "Red tuck tape",
      desc: "Epoxy Resin Construction Sheathing Tape",
      size: "50m",
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      features: ["Super Adhesive", "Very Sticky", "Permanent Bond"],
      image: "/images/red.png",
    },
  ],

  [
    {
      id: "gb01",
      title: "Black garbage bags",
      desc: "Multi-purpose Trash Can Liners",
      size: '35"L X 50"W',
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      image: "/images/blackbag.png",
      features: ["3 mil thick", "Super Strong", "Unscented"],
    },
    {
      id: "gb02",
      title: "Clear garbage bags",
      desc: "Perfect for disposal of paper or office waste",
      size: '35"L X 50"W',
      features: ["Sturdy", "Convenient", "Multi-Purpose"],
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      image: "/images/clearbag.png",
    },
  ],
  [
    {
      id: "c01",
      title: "Coveralls",
      desc: "Waterproof",
      size: "xl",
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      features: ["One-Piece", "Hood Attached", "Lightweight & Soft"],
      image: "/images/coveralls.png",
    },
    {
      id: "c01",
      title: "Coveralls",
      desc: "Dustproof",
      size: "xl",
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      image: "/images/coveralls.png",
      features: ["One-Piece", "Hood Attached", "Lightweight & Soft"],
    },
  ],
  [
    {
      id: "f01",
      desc: "117 pieces - Beige Color",
      title: "Felt pads",
      size: "Round, Rectangular, Square",
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      image: "/images/felt_pads.png",
      features: ["Diversity of sizes", "Tenacious Adhesive", "Easy to put"],
    },
  ],
  [
    {
      id: "n01",
      desc: "High quality recycled newsprint paper",
      title: "Packing paper",
      size: '36" X 24"',
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      image: "/images/packing-paper.png",
    },
    {
      id: "n02",
      desc: "High quality recycled newsprint paper",
      title: "Packing paper",
      size: "18",
      priceTable: { tier1: 15, tier2: 16, tier3: 12, tier4: 10 },
      image: "/images/packing-paper.png",
      image2: "images/paper2.png",
    },
  ],
];

export const categories = [
  {
    title: "Corrugated boxes",
    subtitle: "Strong. Reliable. Built to protect your goods",
    unit: "box",
  },
  {
    title: "Moving Blankets",
    subtitle: "Strong. Reliable. Built to protect your goods",
    unit: "pc",
  },
  {
    title: "Stretch Wrap",
    subtitle: "Clear wrap, multiple uses",
    unit: "roll",
  },
  {
    title: "Gloves",
    subtitle: "Tear resistant and durable Nitrile gloves",
    unit: "box(100pc)",
  },
  {
    title: "Clear/Packaging Tape",
    subtitle: "Acrylic Clear Packaging Tape",
    unit: "roll",
  },
  {
    title: "Green Painter's Tape",
    subtitle: "The Best-in-class masking tape",
    unit: "roll",
  },
  {
    title: "Red Tuck Tape",
    subtitle: "Epoxy resin tuck tape",
    unit: "roll",
  },
  {
    title: "Garbage bags Black/Clear",
    subtitle: "Strong. Heavy duty bags",
    unit: "box(100pc)",
  },
  {
    title: "Coveralls",
    subtitle: "Tear proof and water proof is what you need",
    unit: "pc",
  },
  {
    title: "Felt pads",
    subtitle: "Adhesive and good quality pads",
    unit: "pack(117pc)",
  },
  {
    title: "Newsprint Packing Paper",
    subtitle: "High quality packing paper to protect your goods",
    unit: "(100 sheets)",
  },
];

export const reviewList = [
  // --- Shrink Wrap ---
  {
    customerName: "Melissa Tran",
    location: "Toronto, Ontario",
    category: "Shrink Wrap",
    date: "January 2025",
    review:
      "Excellent quality shrink wrap! Held everything tightly during our move and didn’t tear. Will buy again from Packwiz.",
  },
  {
    customerName: "Sanjay Singh",
    location: "Windsor, Ontario",
    category: "Stretch wrap / Pallet wrap",
    date: "February 2025",
    review:
      "I’ve used shrink wraps from other stores but this one is top-notch. Great stretch and strength.",
  },
  {
    customerName: "Cassandra Bell",
    location: "Kingston, Ontario",
    category: "Stretch wrap / Pallet wrap",
    date: "March 2025",
    review:
      "Fast delivery and reliable product. Shrink wrap was thick and easy to use. Thanks Prabh!",
  },
  {
    customerName: "Anthony Wong",
    location: "Ajax, Ontario",
    category: "Stretch wrap / Pallet wrap",
    date: "April 2025",
    review:
      "Affordable and does the job well. Shrink wrap arrived quickly and was exactly as described.",
  },

  // --- Moving Blankets ---
  {
    customerName: "Jasmine Patel",
    location: "Mississauga, Ontario",
    category: "Moving Blankets",
    date: "March 2025",
    review:
      "The moving blankets were heavy-duty and protected our furniture perfectly. Great value!",
  },
  {
    customerName: "Liam Chen",
    location: "Barrie, Ontario",
    category: "Moving Blankets",
    date: "February 2025",
    review:
      "Thick and cushioned. No scratches during the move. Highly recommend for movers!",
  },
  {
    customerName: "Sarah MacDonald",
    location: "Thunder Bay, Ontario",
    category: "Moving Blankets",
    date: "January 2025",
    review:
      "Packwiz really delivers on quality. These blankets are sturdy and reusable.",
  },
  {
    customerName: "Noah Roy",
    location: "Guelph, Ontario",
    category: "Moving Blankets",
    date: "April 2025",
    review:
      "Very pleased with these moving blankets. Helped avoid dents and chips. Good size too.",
  },

  // --- Gloves ---
  {
    customerName: "Olivia Green",
    location: "Ottawa, Ontario",
    category: "Gloves",
    date: "February 2025",
    review:
      "Bought these for packing and unloading — super grippy and comfortable!",
  },
  {
    customerName: "Jacob Brown",
    location: "Milton, Ontario",
    category: "Gloves",
    date: "March 2025",
    review:
      "The gloves are durable and didn’t tear once. Great for heavy lifting!",
  },
  {
    customerName: "Isabelle Grant",
    location: "Brampton, Ontario",
    category: "Gloves",
    date: "April 2025",
    review:
      "Got them with my moving kit. Fit well and offer great hand protection.",
  },
  {
    customerName: "Ethan Clarke",
    location: "Cambridge, Ontario",
    category: "Gloves",
    date: "January 2025",
    review:
      "Nice quality gloves, helped a lot during our warehouse move. Affordable too.",
  },

  // --- Masking Tape ---
  {
    customerName: "Sophia Morgan",
    location: "Vaughan, Ontario",
    category: "Painter's Green Tape",
    date: "February 2025",
    review:
      "Sticky and clean-removing tape. Worked wonders on our boxes and walls.",
  },
  {
    customerName: "William James",
    location: "Pickering, Ontario",
    category: "Painter's Green Tape",
    date: "March 2025",
    review: "One of the best masking tapes I've used. Doesn’t leave residue.",
  },
  {
    customerName: "Grace Mitchell",
    location: "Markham, Ontario",
    category: "Painter's Green Tape",
    date: "April 2025",
    review: "Held perfectly during our move. No issues at all, very reliable.",
  },
  {
    customerName: "Lucas Hall",
    location: "Sudbury, Ontario",
    category: "Painter's Green Tape",
    date: "January 2025",
    review: "Good price and does what it should. Packwiz never disappoints!",
  },

  // --- Corrugated Boxes ---
  {
    customerName: "Chloe Adams",
    location: "London, Ontario",
    category: "Corrugated Boxes",
    date: "March 2025",
    review:
      "I ordered the 1.5 cube boxes — sturdy and easy to assemble. Great quality!",
  },
  {
    customerName: "Benjamin Scott",
    location: "Whitby, Ontario",
    category: "Corrugated Boxes",
    date: "February 2025",
    review:
      "Wardrobe boxes were a lifesaver. Fit all my clothes and made moving a breeze.",
  },
  {
    customerName: "Charlotte Baker",
    location: "Peterborough, Ontario",
    category: "Corrugated Boxes",
    date: "April 2025",
    review:
      "Ordered 1 cube and 2 cube boxes — they held up really well during the move.",
  },
  {
    customerName: "Daniel Wilson",
    location: "Niagara Falls, Ontario",
    category: "Corrugated Boxes",
    date: "January 2025",
    review:
      "Good prices and strong boxes. I used the wardrobe ones and they’re excellent.",
  },

  // --- Garbage Bags ---
  {
    customerName: "Ella Foster",
    location: "Waterloo, Ontario",
    category: "Garbage Bags",
    date: "April 2025",
    review:
      "Black and clear garbage bags are strong and don’t tear. Perfect for moving out!",
  },
  {
    customerName: "Matthew Price",
    location: "North Bay, Ontario",
    category: "Garbage Bags",
    date: "February 2025",
    review:
      "These garbage bags are thicker than the ones in stores. Will order again.",
  },
  {
    customerName: "Avery Russell",
    location: "Oshawa, Ontario",
    category: "Garbage Bags",
    date: "March 2025",
    review:
      "Used both black and clear ones for organizing items. Great strength and size.",
  },
  {
    customerName: "Henry Stewart",
    location: "Welland, Ontario",
    category: "Garbage Bags",
    date: "January 2025",
    review: "Super tough bags. Didn’t leak or rip, and the price is amazing.",
  },

  // --- Coveralls ---
  {
    customerName: "Zoe Hamilton",
    location: "Orangeville, Ontario",
    category: "Coveralls",
    date: "March 2025",
    review:
      "Waterproof coveralls worked great in the snow. Light and breathable too.",
  },
  {
    customerName: "Mason Kennedy",
    location: "Belleville, Ontario",
    category: "Coveralls",
    date: "February 2025",
    review:
      "Dustproof coveralls are excellent for attic work. Will recommend to friends.",
  },
  {
    customerName: "Scarlett Brooks",
    location: "Sarnia, Ontario",
    category: "Coveralls",
    date: "April 2025",
    review:
      "Used the waterproof coveralls for painting — kept everything off my clothes.",
  },
  {
    customerName: "Logan Reynolds",
    location: "Cornwall, Ontario",
    category: "Coveralls",
    date: "January 2025",
    review:
      "Great quality and the size was accurate. Protected me well during renovations.",
  },

  // --- Felt Pads ---
  {
    customerName: "Mila Perry",
    location: "Oakville, Ontario",
    category: "Felt Pads",
    date: "February 2025",
    review:
      "Padded all my furniture legs with these. No scratches at all. Great product.",
  },
  {
    customerName: "Carter Nichols",
    location: "St. Catharines, Ontario",
    category: "Felt Pads",
    date: "March 2025",
    review:
      "Affordable and stick well. Used them on chairs, tables, and even décor.",
  },
  {
    customerName: "Layla Bryant",
    location: "Stratford, Ontario",
    category: "Felt Pads",
    date: "April 2025",
    review:
      "Best felt pads I’ve bought. Super easy to apply and protect hardwood floors.",
  },
  {
    customerName: "Owen Fisher",
    location: "Burlington, Ontario",
    category: "Felt Pads",
    date: "January 2025",
    review:
      "Packwiz products are always reliable. These felt pads are no exception!",
  },

  // --- Tapes ---
  {
    customerName: "Aria Lawson",
    location: "Georgetown, Ontario",
    category: "Red Tuck Tape",
    date: "March 2025",
    review:
      "Tuck tape was strong and had great adhesion. Perfect for sealing vapor barriers.",
  },
  {
    customerName: "Aubrey Maxwell",
    location: "Chatham, Ontario",
    category: "Clear/Packaging Tape",
    date: "April 2025",
    review:
      "Clear tape worked really well for sealing boxes. Strong and reliable!",
  },
  {
    customerName: "Leo Barrett",
    location: "Orillia, Ontario",
    category: "Red Tuck Tape",
    date: "January 2025",
    review:
      "Red tuck tape is industrial strength. Happy with how well it performs.",
  },
  {
    customerName: "Emily Kerr",
    location: "Kingston, Ontario",
    category: "Newsprint Packing Paper",
    date: "March 2025",
    review:
      "Great for wrapping dishes and glassware during our move. No ink smudges, unlike newspapers. Very satisfied!",
  },
  {
    customerName: "Tyler McLeod",
    location: "Brantford, Ontario",
    category: "Newsprint Packing Paper",
    date: "February 2025",
    review:
      "Used these to protect our kitchen items. Super clean, tear-resistant, and affordable. Highly recommend Packwiz!",
  },
  {
    customerName: "Natalie Rowe",
    location: "Niagara Falls, Ontario",
    category: "Newsprint Packing Paper",
    date: "January 2025",
    review:
      "This newsprint paper made packing our fragile stuff way easier. It’s thick enough to cushion, and easy to fold.",
  },
  {
    customerName: "Ryan Dubois",
    location: "Owen Sound, Ontario",
    category: "Newsprint Packing Paper",
    date: "April 2025",
    review:
      "Fast delivery and great value for the bundle. Wrapped everything from plates to vases. No breakage at all.",
  },
];
