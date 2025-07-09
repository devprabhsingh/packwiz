const reviewList = [
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

export default reviewList;
