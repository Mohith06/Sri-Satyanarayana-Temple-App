export type EducationVerse = {
  sanskrit: string;
  transliteration: string;
  meaning: string;
};

export type EducationEntry = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  overview: string;
  verses: EducationVerse[];
};

export const EDUCATION_CATEGORIES: EducationEntry[] = [
  {
    id: "daily-prayers",
    title: "Daily Prayers",
    subtitle: "Morning & evening aarthi slokas",
    icon: "sunny",
    color: "#E8833A",
    overview:
      "These essential daily prayers are recited during the morning and evening aarthi ceremonies at the temple. Performing or listening to these prayers with devotion brings peace, prosperity, and divine blessings.",
    verses: [
      {
        sanskrit:
          "शुभं करोति कल्याणम् आरोग्यं धनसंपदाम्।\nशत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तु ते॥",
        transliteration:
          "Shubham karoti kalyāṇam ārogyam dhana-sampadām\nShatru-buddhi-vināshāya dīpa-jyotir-namo'stu te",
        meaning:
          "O lamp, I bow to you who brings auspiciousness, good health, and wealth; who destroys the intellect of enemies. I offer salutations to your divine light.",
      },
      {
        sanskrit:
          "कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम्॥",
        transliteration:
          "Karāgre vasate Lakṣhmīḥ kara-madhye Sarasvatī\nKara-mūle tu Govindaḥ prabhāte kara-darshanam",
        meaning:
          "At the tip of the hand resides Lakshmi (goddess of wealth), in the middle resides Saraswati (goddess of learning), and at the base resides Govinda (Lord Vishnu). Therefore one should behold one's hands in the morning.",
      },
      {
        sanskrit:
          "समुद्रवसने देवि पर्वतस्तनमण्डले।\nविष्णुपत्नि नमस्तुभ्यं पादस्पर्शं क्षमस्व मे॥",
        transliteration:
          "Samudra-vasane devi parvata-stana-maṇḍale\nViṣhṇu-patni namas-tubhyam pāda-sparśham kṣhamasva me",
        meaning:
          "O Mother Earth, who wears the oceans as garments and mountains as breasts, O consort of Lord Vishnu, I bow to you. Please forgive me for touching you with my feet.",
      },
      {
        sanskrit:
          "आकाशात् पतितं तोयं यथा गच्छति सागरम्।\nसर्वदेवनमस्कारः केशवं प्रतिगच्छति॥",
        transliteration:
          "Ākāshāt patitam toyam yathā gachati sāgaram\nSarva-deva-namaskāraḥ Keshavam prati-gachati",
        meaning:
          "Just as rain fallen from the sky ultimately reaches the ocean, all prayers offered to any deity ultimately reach Lord Keshava (Vishnu).",
      },
    ],
  },
  {
    id: "satyanarayana-katha",
    title: "Satyanarayana Katha",
    subtitle: "Significance and key verses",
    icon: "flame",
    color: "#D4AF37",
    overview:
      "Sri Satyanarayana Puja and Katha (narrative) is one of the most popular and widely performed Hindu religious rituals. It is dedicated to Lord Satyanarayana, a form of Lord Vishnu representing truth (Satya) and the lord of the universe (Narayana). The puja is performed on auspicious occasions — full moon days, festivals, marriages, new home purchases, graduations, and other milestones.",
    verses: [
      {
        sanskrit:
          "सत्यं ज्ञानमनन्तं ब्रह्म।\nआनन्दरूपममृतं यद्विभाति॥",
        transliteration:
          "Satyam jñānam anantam Brahma\nĀnanda-rūpam amṛtam yad-vibhāti",
        meaning:
          "Brahman (the Supreme) is Truth, Knowledge, and Infinity. It shines forth as bliss, immortality, and existence.",
      },
      {
        sanskrit:
          "श्रीसत्यनारायण देव की जय।\nसत्यं शिवं सुन्दरम् सदा जय॥",
        transliteration:
          "Shrī Satyanārāyaṇa deva kī jaya\nSatyam Shivam Sundaram sadā jaya",
        meaning:
          "Victory to Lord Sri Satyanarayana! Always victorious is Truth, Auspiciousness, and Beauty.",
      },
      {
        sanskrit:
          "नारायणं नमस्कृत्य नरं चैव नरोत्तमम्।\nदेवीं सरस्वतीं व्यासं ततो जयमुदीरयेत्॥",
        transliteration:
          "Nārāyaṇam namaskṛtya naram chaiva narottamam\nDevīm Sarasvatīm Vyāsam tato jayam udīrayet",
        meaning:
          "Having bowed to Lord Narayana, and to the great sage Nara, to Goddess Saraswati, and to Sage Vyasa — then one should begin the recitation of scripture.",
      },
    ],
  },
  {
    id: "hanuman-chalisa",
    title: "Hanuman Chalisa",
    subtitle: "40 verses of devotion to Lord Hanuman",
    icon: "star",
    color: "#E8833A",
    overview:
      "The Hanuman Chalisa is a devotional hymn composed by the 16th century poet-saint Tulsidas in praise of Lord Hanuman. 'Chalisa' means forty in Hindi, and the prayer consists of forty verses. It is one of the most widely recited prayers in the Hindu tradition and is believed to bestow courage, strength, and protection to the devotee. Recited at the temple every Tuesday at 7:30 PM.",
    verses: [
      {
        sanskrit:
          "श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥",
        transliteration:
          "Shrī guru charan saroja raja, nija manu mukuru sudhāri\nBaranaum Raghubar bimala jasu, jo dāyaku phala cāri",
        meaning:
          "With the dust of the Guru's lotus feet, I cleanse the mirror of my mind. I recite the pure glory of Shri Ram, the best of Raghus, which bestows the four fruits of life (dharma, artha, kama, moksha).",
      },
      {
        sanskrit:
          "जय हनुमान ज्ञान गुन सागर।\nजय कपीस तिहुँ लोक उजागर॥",
        transliteration:
          "Jaya Hanumāna jñāna guṇa sāgara\nJaya Kapīsha tihuṁ loka ujāgara",
        meaning:
          "Victory to Hanuman, the ocean of wisdom and virtue! Victory to the Lord of monkeys who illuminates all three worlds!",
      },
      {
        sanskrit:
          "राम दूत अतुलित बल धामा।\nअञ्जनि पुत्र पवनसुत नामा॥",
        transliteration:
          "Rāma dūta atulit bala dhāmā\nAñjani putra Pavanasuta nāmā",
        meaning:
          "You are the messenger of Rama and the abode of incomparable strength. You are known as the son of Anjana and the son of Vayu (wind god).",
      },
      {
        sanskrit:
          "महावीर विक्रम बजरंगी।\nकुमति निवार सुमति के संगी॥",
        transliteration:
          "Mahāvīra vikrama Bajaraṅgī\nKumati nivāra sumati ke saṅgī",
        meaning:
          "O Great Hero of valor, with a body strong as thunderbolt! You remove evil thoughts and are the companion of the virtuous.",
      },
      {
        sanskrit:
          "भूत पिशाच निकट नहिं आवै।\nमहावीर जब नाम सुनावै॥",
        transliteration:
          "Bhūta pishācha nikaṭ nahiṁ āvai\nMahāvīra jaba nāma sunāvai",
        meaning:
          "Evil spirits and ghosts do not come near when the name of the Great Hero Hanuman is uttered.",
      },
      {
        sanskrit:
          "नासै रोग हरै सब पीरा।\nजपत निरंतर हनुमत बीरा॥",
        transliteration:
          "Nāsai roga harai saba pīrā\nJapata nirantara Hanumata bīrā",
        meaning:
          "All diseases are destroyed and all pain is removed by continuously chanting the name of the brave Hanuman.",
      },
      {
        sanskrit:
          "जो यह पढ़ै हनुमान चालीसा।\nहोय सिद्धि साखी गौरीसा॥",
        transliteration:
          "Jo yaha paṛhai Hanumāna Chālīsā\nHoya siddhi sākhī Gaurīsā",
        meaning:
          "Whoever reads this Hanuman Chalisa attains perfection. Lord Shiva himself is the witness to this.",
      },
    ],
  },
  {
    id: "vishnu-sahasranamam",
    title: "Vishnu Sahasranamam",
    subtitle: "The thousand names of Lord Vishnu",
    icon: "infinite",
    color: "#2D7D46",
    overview:
      "Vishnu Sahasranamam is a sacred text from the Mahabharata (Anushasana Parva) and is a list of 1,000 names of Lord Vishnu. Each name encapsulates a divine attribute of the Supreme Being. The recitation of these names is believed to purify the mind and bring liberation. Recited at the temple every Wednesday at 7:30 PM.",
    verses: [
      {
        sanskrit:
          "विश्वं विष्णुर्वषट्कारो भूतभव्यभवत्प्रभुः।\nभूतकृत् भूतभृत् भावो भूतात्मा भूतभावनः॥",
        transliteration:
          "Vishvam Vishṇur-vashaṭkāro bhūta-bhavya-bhavat-prabhuḥ\nBhūtakṛt bhūtabhṛt bhāvo bhūtātmā bhūtabhāvanaḥ",
        meaning:
          "He who is the universe itself (Vishvam), He who pervades everything (Vishnu), He who is the Lord of past, present and future, He who creates beings, sustains them, and is their very soul.",
      },
      {
        sanskrit:
          "शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम्।\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्॥",
        transliteration:
          "Shāntākāram bhujaga-shayanam padma-nābham suresham\nVishvādhāram gagana-sadṛsham megha-varṇam shubhāṅgam",
        meaning:
          "He who has a serene form, who rests on the serpent (Adi Shesha), whose navel is a lotus, who is Lord of the gods, who is the support of the universe, who is like the sky (all-pervasive), who has the color of clouds, and who has auspicious limbs.",
      },
      {
        sanskrit:
          "ॐ नमो भगवते वासुदेवाय।",
        transliteration:
          "Om namo bhagavate Vāsudevāya",
        meaning:
          "I bow to Lord Vasudeva (Krishna/Vishnu), the Supreme Being. This is the twelve-syllable Dvadasha Mantra, one of the most powerful mantras dedicated to Lord Vishnu.",
      },
    ],
  },
  {
    id: "lalitha-sahasranamam",
    title: "Lalitha Sahasranamam",
    subtitle: "The thousand names of Goddess Lalitha",
    icon: "heart",
    color: "#C2185B",
    overview:
      "Lalitha Sahasranamam is a sacred text found in the Brahmanda Purana and lists the 1,000 names of Goddess Lalitha Tripura Sundari, the Divine Mother. Each name is a mantra in itself and describes a different aspect of the Supreme Goddess. Reciting these names is believed to grant beauty, prosperity, wisdom, and liberation. Recited at the temple every Friday at 7:30 PM.",
    verses: [
      {
        sanskrit:
          "ॐ ऐं ह्रीं श्रीं श्रीमात्रे नमः।",
        transliteration:
          "Om Aim Hrīm Shrīm Shrī-mātre namaḥ",
        meaning:
          "I bow to the auspicious Divine Mother (Lalitha). 'Aim' represents Saraswati (knowledge), 'Hrim' represents Lakshmi (wealth), and 'Shrim' represents the power of creation.",
      },
      {
        sanskrit:
          "श्री माता श्री महाराज्ञी श्रीमत्सिंहासनेश्वरी।\nचिदग्निकुण्डसम्भूता देवकार्यसमुद्यता॥",
        transliteration:
          "Shrī māta Shrī mahārājñī Shrīmat-siṁhāsaneshvarī\nCidagni-kuṇḍa-sambhūtā deva-kārya-samudyatā",
        meaning:
          "She is the auspicious Mother, the great queen, the mistress of the auspicious throne. She was born from the fire of consciousness and is always ready to fulfill the tasks of the gods.",
      },
      {
        sanskrit:
          "या देवी सर्वभूतेषु मातृरूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
        transliteration:
          "Yā devī sarva-bhūteṣhu mātṛ-rūpeṇa sansthitā\nNamas-tasyai namas-tasyai namas-tasyai namo namaḥ",
        meaning:
          "To that Goddess who resides in all beings in the form of the Mother — I bow, I bow, I bow again and again.",
      },
    ],
  },
  {
    id: "festival-significance",
    title: "Festival Significance",
    subtitle: "Meaning behind major Hindu festivals",
    icon: "sparkles",
    color: "#7B6CF6",
    overview:
      "Hindu festivals mark the cycles of nature, honor the divine, and bring the community together in celebration and worship. Each festival carries deep spiritual significance rooted in ancient scriptures and traditions. Here is the meaning behind the major festivals celebrated at Sri Satyanarayana Temple.",
    verses: [
      {
        sanskrit: "दीपावली",
        transliteration: "Dīpāvalī — Festival of Lights",
        meaning:
          "Diwali marks the return of Lord Rama to Ayodhya after defeating Ravana. It symbolizes the victory of light over darkness, knowledge over ignorance, and good over evil. Lakshmi Puja is performed to invite wealth and prosperity. Celebrated in October or November (Kartik Amavasya).",
      },
      {
        sanskrit: "नवरात्रि",
        transliteration: "Navarātri — Nine Nights of the Divine Mother",
        meaning:
          "Navaratri honors the nine forms of Goddess Durga over nine nights. It celebrates the victory of Goddess Durga over the demon Mahishasura, symbolizing the triumph of the divine feminine energy over evil. The tenth day, Vijayadashami (Dussehra), marks Rama's victory over Ravana.",
      },
      {
        sanskrit: "श्रीकृष्ण जन्माष्टमी",
        transliteration: "Shrī Kṛishṇa Janmāṣhṭamī — Birth of Lord Krishna",
        meaning:
          "Janmashtami celebrates the birth of Lord Krishna, the eighth avatar of Vishnu, born to destroy the tyrant Kamsa and restore dharma. It falls on the eighth day (Ashtami) of the dark fortnight in the month of Bhadrapada (August–September).",
      },
      {
        sanskrit: "गणेश चतुर्थी",
        transliteration: "Gaṇesha Chaturthi — Festival of Lord Ganesha",
        meaning:
          "This ten-day festival celebrates the birth of Lord Ganesha, the remover of obstacles and the god of beginnings. It begins on the fourth day (Chaturthi) of the bright fortnight in Bhadrapada. Clay idols are installed, worshipped, and then immersed in water.",
      },
      {
        sanskrit: "मकर संक्रान्ति",
        transliteration: "Makara Saṁkrānti — Harvest Festival",
        meaning:
          "Celebrated in January, Makar Sankranti marks the sun's entry into Capricorn and the end of winter solstice. It is a harvest festival celebrating the bounty of the earth, gratitude to the sun, and the onset of longer days. Known as Pongal in Tamil culture.",
      },
      {
        sanskrit: "शिवरात्रि",
        transliteration: "Mahā Shivārātri — The Great Night of Shiva",
        meaning:
          "Maha Shivaratri falls on the 14th night of the dark fortnight in Phalguna (February–March). It is the night Lord Shiva performed the Tandava cosmic dance and when the Shivalingam first appeared. Devotees fast, keep vigil, and offer bilva leaves, milk, and water to the Shivalingam.",
      },
      {
        sanskrit: "राम नवमी",
        transliteration: "Rāma Navamī — Birth of Lord Rama",
        meaning:
          "Rama Navami celebrates the birth of Lord Rama, the seventh avatar of Vishnu, born to King Dasharatha of Ayodhya. It falls on the ninth day (Navami) of Chaitra month (March–April). It marks the beginning of the Treta Yuga and Lord Rama's mission to destroy evil.",
      },
    ],
  },
];
