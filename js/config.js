// Cấu hình thông tin cá nhân hóa cho Website 20/10 (Chủ đề: Yêu Xa)
// Dành riêng cho ngày Phụ Nữ Việt Nam 20/10

const CONFIG = {
  // Thông tin cơ bản
  receiverName: "Em Yêu", // Tên hiển thị chính
  nickname: "Công Chúa Nhỏ", // Biệt danh thân mật
  senderName: "Người thương nơi xa của em", // Tên hoặc xưng hô của bạn
  
  // Ngày bắt đầu yêu nhau (24/09/2025)
  loveStartDate: "2025-09-24T00:00:00",

  // Tiêu đề banner & lời chúc mở đầu cho tình yêu xa
  heroTitle: "Happy Vietnamese Women's Day",
  heroSubtitle: "Dù cách xa bao nhiêu cây số, từng nhịp đập nơi trái tim anh vẫn luôn hướng về em. Chúc người con gái anh thương một ngày 20/10 ngập tràn nụ cười và hạnh phúc!",

  // Thông điệp yêu xa đặc biệt
  longDistanceMessage: {
    badge: "✈️ Dù xa xôi cách trở, hai trái tim vẫn chung một nhịp đập",
    quote: "Khoảng cách địa lý chỉ là thử thách để chứng minh tình yêu của hai đứa mình to lớn và kiên định đến nhường nào."
  },
  
  // Bức thư tình 20/10 (Sẽ hiển thị dạng máy đánh chữ khi mở phong bì)
  letter: {
    title: "Gửi người con gái anh yêu nhất nơi phương xa ✨",
    date: "Ngày 20 tháng 10 năm 2026",
    content: [
      "Hôm nay là 20/10 — ngày dành riêng để tôn vinh những người phụ nữ tuyệt vời, và đối với anh, em chính là người phụ nữ xinh đẹp, dịu dàng và quan trọng nhất trên thế giới này.",
      "Yêu xa chưa bao giờ là dễ dàng, nhất là vào những ngày lễ như hôm nay, khi xung quanh ai cũng có đôi có cặp. Anh rất muốn được ở ngay bên cạnh em lúc này, tự tay trao em bó hoa tươi thắm, dắt tay em dạo phố và ôm em thật chặt vào lòng.",
      "Cảm ơn em vì đã luôn thấu hiểu, kiên định và tin tưởng anh dù chúng mình không thể ngày nào cũng gặp mặt. Cảm ơn những cuộc gọi thâu đêm, những nụ cười rạng rỡ qua màn hình điện thoại đã luôn là nguồn động lực lớn lao nhất giúp anh vượt qua mọi áp lực cuộc sống.",
      "Anh đang nỗ lực từng ngày để sớm rút ngắn khoảng cách giữa hai đứa, để những mùa 20/10 về sau, anh sẽ luôn là người ở cạnh bên nắm lấy tay em. Chúc công chúa nhỏ của anh một ngày 20/10 thật bình yên và hạnh phúc. Yêu thương và nhớ em rất nhiều! ❤️"
    ]
  },

  // 6 Điều tuyệt vời ở em & tình yêu xa của chúng mình
  reasons: [
    { icon: "📱", title: "Nụ cười qua màn hình", desc: "Mỗi lần Facetime nhìn thấy em cười, bao nhiêu mệt mỏi và khoảng cách như tan biến." },
    { icon: "🤝", title: "Sự thấu hiểu & tin tưởng", desc: "Em luôn là điểm tựa tinh thần vững chắc, cùng anh kiên định vượt qua mọi thử thách địa lý." },
    { icon: "🌙", title: "Những cuộc gọi thâu đêm", desc: "Cùng nhau kể đủ thứ chuyện trên đời, nghe tiếng thở đều của em đến khi say giấc." },
    { icon: "✈️", title: "Cảm giác đếm ngược", desc: "Háo hức đếm từng ngày đến chuyến bay/chuyến xe tiếp theo để được chạy đến ôm em." },
    { icon: "🎁", title: "Sự quan tâm âm thầm", desc: "Những món quà bất ngờ, những lời dặn dò ăn uống giữ gìn sức khỏe dù ở hai nơi." },
    { icon: "💖", title: "Vì em là duy nhất", desc: "Khoảng cách địa lý không làm tình cảm phai nhạt, mà chỉ làm anh yêu và trân trọng em nhiều hơn." }
  ],

  // Album kỷ niệm ngọt ngào
  memories: [
    {
      title: "Ngày chính thức hẹn hò",
      date: "24/09/2025",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      caption: "Khoảnh khắc hai đứa chính thức bên nhau, đánh dấu khởi đầu của một tình yêu kiên định."
    },
    {
      title: "Chuyến bay/chuyến xe gặp em",
      date: "Khoảnh khắc đoàn tụ",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      caption: "Vượt hàng trăm cây số chỉ để được nhìn thấy em cười và nắm lấy bàn tay nhỏ bé."
    },
    {
      title: "Hẹn hò bên nhau trọn vẹn",
      date: "Từng giây phút quý giá",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
      caption: "Yêu xa dạy anh biết trân trọng từng khoảnh khắc được ngồi đối diện ngắm nhìn em."
    },
    {
      title: "Lời hứa ngày sum họp",
      date: "Tương lai gần bên em",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      caption: "Sẽ sớm thôi, hai đứa mình sẽ không còn phải nhìn nhau qua màn hình điện thoại nữa."
    }
  ],

  // Hộp quà 20/10 bí mật: Phiếu quà tặng tình yêu xa (Long Distance Vouchers)
  vouchers: [
    { 
      id: 1, 
      title: "Phiếu Về Thăm Em Bất Ngờ ✈️", 
      desc: "Anh sẽ bí mật đặt vé xuất hiện trước cửa nhà em kèm một cái ôm thật chặt!", 
      code: "LOVE-FLY-TO-YOU" 
    },
    { 
      id: 2, 
      title: "Phiếu Facetime Xuyên Màn Đêm 📱", 
      desc: "Tâm sự thâu đêm, ngắm em ngủ đến khi nào điện thoại sập nguồn thì thôi.", 
      code: "LOVE-FACETIME-247" 
    },
    { 
      id: 3, 
      title: "Phiếu Ship Mọi Món Em Thèm 🍲", 
      desc: "Dù ở xa, chỉ cần em nói thèm món gì là anh đặt ship giao tận tay công chúa ngay.", 
      code: "LOVE-FOOD-DELIVERY" 
    },
    { 
      id: 4, 
      title: "Phiếu Đổi 1.000 Cái Ôm Bù 🤗", 
      desc: "Có giá trị đổi không giới hạn ngay trong lần gặp mặt tới để bù lại những ngày xa cách.", 
      code: "LOVE-1000-HUGS" 
    }
  ],

  // Nhạc nền (Giai điệu piano lãng mạn tích hợp sẵn)
  audio: {
    autoPlay: false,
    title: "Giai điệu lãng mạn dành cho em",
    customAudioUrl: ""
  },

  // Cấu hình thông báo khi người yêu chọn quà
  // Khi bạn gái nhấn "Đổi thưởng", thông báo sẽ tự động gửi về Email của bạn qua Formspree
  notification: {
    enabled: true,
    formspreeEndpoint: "" // Dán link Formspree của bạn (VD: https://formspree.io/f/xovjkeqq)
  }
};
