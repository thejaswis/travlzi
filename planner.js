(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const STORE_KEY = "travlzi.trip.v1";
  const today = new Date();
  const iso = date => { const d=new Date(date); return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10); };
  const addDays = (date,days) => { const d=new Date(date+"T12:00:00"); d.setDate(d.getDate()+days); return iso(d); };
  const dictionaries = {
    en: {home:"Home",essentials:"Travel essentials",language:"Language",talkToTravlzi:"Talk to Travlzi ↗",plannerEyebrow:"YOUR TRIP, YOUR WAY",introTitle:"Make room for",introEm:"the good stuff.",introSub:"Build a flexible itinerary, move things around, and see your trip take shape on the map.",setupEyebrow:"FIRST, THE BIG PICTURE",tripDetails:"Your trip details",destination:"Where are you going?",startingFrom:"Starting from",startDate:"Start date",endDate:"End date",travellers:"Travellers",travelStyle:"Travel style",budgetPerson:"Budget per person",buildItinerary:"Build my itinerary",formNote:"Your plan is saved in this browser. No account needed. Export it to share with your travel group.",itinerary:"YOUR ITINERARY",addActivity:"＋ Add activity",exportTrip:"↓ Export trip",print:"Print",tripDuration:"Trip duration",plannedActivities:"Planned activities",budgetPersonShort:"Budget per person",travelPace:"Travel pace",moveThings:"MOVE THINGS AROUND",dayByDay:"Your day-by-day plan",dragHint:"↕ Drag cards to reorder",activityLibraryEyebrow:"DON'T MISS A GOOD IDEA",activityLibrary:"Available activities",libraryFor:"Explore ideas for",libraryNote:". Removing an activity from your plan won't remove it from this library.",daysUnit:"days",travellersUnit:"travellers",from:"from",balancedStyle:"A bit of everything",relaxedStyle:"Slow & relaxed",adventureStyle:"Adventure",cultureStyle:"Culture & food",familyStyle:"Family friendly",budgetStyle:"Budget conscious",searchActivities:"Search activities",searchPlaceholder:"Search places, food, nature…",addToWhichDay:"Add to day",filterCategory:"Category",allCategories:"All categories",attraction:"Attractions",food:"Food",nature:"Nature",culture:"Culture",stay:"Stay",transport:"Transport",freeTime:"Free time",maybeLater:"MAYBE LATER",ideasToFit:"Ideas to fit in",ideasNote:"Keep interesting places here until you decide where they belong.",keepItReal:"KEEP IT REAL",budgetSnapshot:"Budget snapshot",currency:"Currency",groupBudget:"Total budget for everyone",plannedSpend:"Planned activity spend",plannedPerPerson:"Planned per person",leftPerPerson:"Left per person",dailyAllowance:"Daily allowance",budgetNote:"Activity costs are estimates per person. Add or edit activity costs to update this snapshot.",seeBigPicture:"SEE THE BIG PICTURE",tripMap:"Trip map",plannedStop:"Planned stop",savedIdea:"Saved idea",needInspiration:"Need a little inspiration?",inspirationNote:"Try a slower day, add a local food stop, or leave space for an unexpected detour.",suggestTweak:"Suggest a tweak ↗",humanTouchEyebrow:"A LITTLE HELP GOES A LONG WAY",humanTouch:"Want a human touch?",humanTouchNote:"Travlzi can help turn your draft into a trip with thoughtful details.",makeItYours:"MAKE IT YOURS",activityName:"Activity or place name",shortNote:"Short note",day:"Day",time:"Time",category:"Category",estimatedCost:"Estimated cost per person",locationOptional:"Location (optional, for map)",keepAsIdea:"Keep as an idea",addToItinerary:"Add to itinerary",stop:"stop",stops:"stops",places:"places",added:"Added",addToDay:"Add to day",noActivities:"No activities match these filters.",activitySpend:"Activity spend",foodSpend:"Food",transportSpend:"Transport",staySpend:"Stay",experienceSpend:"Experiences",edit:"Edit",remove:"Remove",actualExpensesEyebrow:"REAL-WORLD SPENDING",actualExpensesTitle:"Track actual expenses",actualExpensesNote:"Log what your group actually pays. These amounts are separate from itinerary estimates.",expenseDescription:"What did you pay for?",expenseDescriptionPlaceholder:"e.g. Airport taxi",expenseCategory:"Category",expenseAmount:"Amount paid for everyone",expenseDate:"Date",addExpense:"＋ Add expense",actualSpendGroup:"Actual spend (group)",actualSpendPerPerson:"Actual per person",actualBudgetLeft:"Budget left (group)",noExpenses:"No expenses recorded yet.",removeExpense:"Remove expense",expensesCurrencyNote:"Enter the total paid for the group in the selected currency."},
    hi: {home:"होम",essentials:"यात्रा की ज़रूरी चीज़ें",language:"भाषा",talkToTravlzi:"Travlzi से बात करें ↗",plannerEyebrow:"आपकी यात्रा, आपका अंदाज़",introTitle:"जगह बनाएं",introEm:"खास पलों के लिए।",introSub:"अपनी यात्रा योजना बनाएं, गतिविधियाँ बदलें और उन्हें नक्शे पर देखें।",setupEyebrow:"पहले यात्रा की जानकारी",tripDetails:"यात्रा का विवरण",destination:"कहाँ जाना है?",startingFrom:"कहाँ से शुरू करेंगे",startDate:"शुरुआत की तारीख",endDate:"अंतिम तारीख",travellers:"यात्री",travelStyle:"यात्रा का अंदाज़",budgetPerson:"प्रति व्यक्ति बजट",buildItinerary:"यात्रा योजना बनाएं",formNote:"आपकी योजना इस ब्राउज़र में सेव होती है। इसे डाउनलोड करके साझा करें।",itinerary:"आपकी यात्रा योजना",addActivity:"＋ गतिविधि जोड़ें",exportTrip:"↓ यात्रा निर्यात करें",print:"प्रिंट",tripDuration:"यात्रा की अवधि",plannedActivities:"नियोजित गतिविधियाँ",budgetPersonShort:"प्रति व्यक्ति बजट",travelPace:"यात्रा की गति",moveThings:"बदलकर देखें",dayByDay:"दिन के अनुसार योजना",dragHint:"↕ गतिविधियों को खींचकर क्रम बदलें",activityLibraryEyebrow:"और विकल्प खोजें",activityLibrary:"उपलब्ध गतिविधियाँ",libraryFor:"इनके लिए विकल्प देखें",libraryNote:". योजना से हटाने पर भी यह गतिविधि यहाँ उपलब्ध रहेगी।",daysUnit:"दिन",travellersUnit:"यात्री",from:"से",balancedStyle:"सब कुछ थोड़ा-थोड़ा",relaxedStyle:"आरामदायक",adventureStyle:"रोमांच",cultureStyle:"संस्कृति और भोजन",familyStyle:"परिवार के साथ",budgetStyle:"कम बजट",searchActivities:"गतिविधियाँ खोजें",searchPlaceholder:"स्थान, भोजन, प्रकृति खोजें…",addToWhichDay:"किस दिन जोड़ें",filterCategory:"श्रेणी",allCategories:"सभी श्रेणियाँ",attraction:"देखने की जगहें",food:"भोजन",nature:"प्रकृति",culture:"संस्कृति",stay:"ठहरना",transport:"यातायात",freeTime:"खाली समय",maybeLater:"बाद के लिए",ideasToFit:"बाद में शामिल करें",ideasNote:"जिन जगहों का फैसला नहीं हुआ, उन्हें यहाँ रखें।",keepItReal:"बजट पर नज़र",budgetSnapshot:"बजट का सार",currency:"मुद्रा",groupBudget:"सभी यात्रियों का कुल बजट",plannedSpend:"गतिविधियों का अनुमानित खर्च",plannedPerPerson:"प्रति व्यक्ति अनुमानित खर्च",leftPerPerson:"प्रति व्यक्ति शेष",dailyAllowance:"दैनिक उपलब्ध बजट",budgetNote:"गतिविधियों का खर्च प्रति व्यक्ति अनुमान है। खर्च बदलने पर यह सार अपने आप बदलेगा।",seeBigPicture:"नक्शे पर देखें",tripMap:"यात्रा का नक्शा",plannedStop:"योजना में शामिल",savedIdea:"सहेजा गया विचार",needInspiration:"कुछ नए विचार चाहिए?",inspirationNote:"आराम का समय रखें, स्थानीय भोजन आज़माएँ और अचानक मिलने वाले अनुभवों के लिए जगह छोड़ें।",suggestTweak:"एक सुझाव दें ↗",humanTouchEyebrow:"थोड़ी व्यक्तिगत मदद",humanTouch:"व्यक्तिगत मदद चाहिए?",humanTouchNote:"Travlzi आपकी योजना को खास अनुभवों वाली यात्रा में बदलने में मदद कर सकता है।",makeItYours:"अपनी पसंद से बदलें",activityName:"गतिविधि या जगह का नाम",shortNote:"छोटा विवरण",day:"दिन",time:"समय",category:"श्रेणी",estimatedCost:"प्रति व्यक्ति अनुमानित खर्च",locationOptional:"स्थान (नक्शे के लिए वैकल्पिक)",keepAsIdea:"विचार के रूप में रखें",addToItinerary:"योजना में जोड़ें",stop:"जगह",stops:"जगहें",places:"जगहें",added:"जोड़ा गया",addToDay:"दिन में जोड़ें",noActivities:"इन फ़िल्टर में कोई गतिविधि नहीं मिली।",activitySpend:"गतिविधियों का खर्च",foodSpend:"भोजन",transportSpend:"यातायात",staySpend:"ठहरना",experienceSpend:"अनुभव",edit:"बदलें",remove:"हटाएँ"},
    kn: {home:"ಮುಖಪುಟ",essentials:"ಪ್ರಯಾಣದ ಅಗತ್ಯ ವಸ್ತುಗಳು",language:"ಭಾಷೆ",talkToTravlzi:"Travlzi ಜೊತೆ ಮಾತನಾಡಿ ↗",plannerEyebrow:"ನಿಮ್ಮ ಪ್ರವಾಸ, ನಿಮ್ಮ ಶೈಲಿ",introTitle:"ಸ್ಥಳ ಬಿಡಿ",introEm:"ಸುಂದರ ಕ್ಷಣಗಳಿಗೆ.",introSub:"ನಿಮ್ಮ ಪ್ರವಾಸ ಯೋಜಿಸಿ, ಚಟುವಟಿಕೆಗಳನ್ನು ಬದಲಿಸಿ, ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ.",setupEyebrow:"ಮೊದಲು ಪ್ರವಾಸದ ವಿವರಗಳು",tripDetails:"ಪ್ರವಾಸದ ವಿವರಗಳು",destination:"ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತೀರಿ?",startingFrom:"ಪ್ರಾರಂಭಿಸುವ ಸ್ಥಳ",startDate:"ಪ್ರಾರಂಭ ದಿನಾಂಕ",endDate:"ಅಂತಿಮ ದಿನಾಂಕ",travellers:"ಪ್ರಯಾಣಿಕರು",travelStyle:"ಪ್ರವಾಸದ ಶೈಲಿ",budgetPerson:"ಪ್ರತಿ ವ್ಯಕ್ತಿಯ ಬಜೆಟ್",buildItinerary:"ನನ್ನ ಪ್ರವಾಸ ಯೋಜಿಸಿ",formNote:"ನಿಮ್ಮ ಯೋಜನೆ ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಉಳಿಯುತ್ತದೆ. ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಹಂಚಿಕೊಳ್ಳಬಹುದು.",itinerary:"ನಿಮ್ಮ ಪ್ರವಾಸ ಯೋಜನೆ",addActivity:"＋ ಚಟುವಟಿಕೆ ಸೇರಿಸಿ",exportTrip:"↓ ಪ್ರವಾಸ ರಫ್ತು",print:"ಮುದ್ರಿಸಿ",tripDuration:"ಪ್ರವಾಸದ ಅವಧಿ",plannedActivities:"ಯೋಜಿತ ಚಟುವಟಿಕೆಗಳು",budgetPersonShort:"ಪ್ರತಿ ವ್ಯಕ್ತಿಯ ಬಜೆಟ್",travelPace:"ಪ್ರವಾಸದ ವೇಗ",moveThings:"ಬದಲಿಸಿ ನೋಡಿ",dayByDay:"ದಿನವಾರು ಯೋಜನೆ",dragHint:"↕ ಎಳೆದು ಕ್ರಮ ಬದಲಿಸಿ",activityLibraryEyebrow:"ಇನ್ನಷ್ಟು ಆಯ್ಕೆಗಳು",activityLibrary:"ಲಭ್ಯವಿರುವ ಚಟುವಟಿಕೆಗಳು",libraryFor:"ಇದಕ್ಕಾಗಿ ಆಯ್ಕೆಗಳನ್ನು ನೋಡಿ",libraryNote:". ಯೋಜನೆಯಿಂದ ತೆಗೆದರೂ ಇದು ಇಲ್ಲಿ ಲಭ್ಯವಿರುತ್ತದೆ.",daysUnit:"ದಿನಗಳು",travellersUnit:"ಪ್ರಯಾಣಿಕರು",from:"ಇಂದ",balancedStyle:"ಎಲ್ಲದರ ಸ್ವಲ್ಪ",relaxedStyle:"ನಿಧಾನ ಮತ್ತು ಆರಾಮ",adventureStyle:"ಸಾಹಸ",cultureStyle:"ಸಂಸ್ಕೃತಿ ಮತ್ತು ಆಹಾರ",familyStyle:"ಕುಟುಂಬ ಸ್ನೇಹಿ",budgetStyle:"ಕಡಿಮೆ ವೆಚ್ಚ",searchActivities:"ಚಟುವಟಿಕೆ ಹುಡುಕಿ",searchPlaceholder:"ಸ್ಥಳ, ಆಹಾರ, ಪ್ರಕೃತಿ ಹುಡುಕಿ…",addToWhichDay:"ಯಾವ ದಿನ ಸೇರಿಸಬೇಕು",filterCategory:"ವರ್ಗ",allCategories:"ಎಲ್ಲಾ ವರ್ಗಗಳು",attraction:"ನೋಡುವ ಸ್ಥಳಗಳು",food:"ಆಹಾರ",nature:"ಪ್ರಕೃತಿ",culture:"ಸಂಸ್ಕೃತಿ",stay:"ವಸತಿ",transport:"ಸಾರಿಗೆ",freeTime:"ವಿರಾಮ ಸಮಯ",maybeLater:"ನಂತರಕ್ಕೆ",ideasToFit:"ನಂತರ ಸೇರಿಸುವ ವಿಚಾರಗಳು",ideasNote:"ಇನ್ನೂ ನಿರ್ಧರಿಸದ ಸ್ಥಳಗಳನ್ನು ಇಲ್ಲಿ ಇಡಿ.",keepItReal:"ಬಜೆಟ್ ಗಮನಿಸಿ",budgetSnapshot:"ಬಜೆಟ್ ವಿವರ",currency:"ಕರೆನ್ಸಿ",groupBudget:"ಎಲ್ಲರ ಒಟ್ಟು ಬಜೆಟ್",plannedSpend:"ಚಟುವಟಿಕೆಗಳ ಅಂದಾಜು ವೆಚ್ಚ",plannedPerPerson:"ಪ್ರತಿ ವ್ಯಕ್ತಿಯ ಅಂದಾಜು ವೆಚ್ಚ",leftPerPerson:"ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ ಉಳಿದ ಮೊತ್ತ",dailyAllowance:"ದೈನಂದಿನ ಉಳಿಕೆ",budgetNote:"ಚಟುವಟಿಕೆಗಳ ವೆಚ್ಚ ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ ಅಂದಾಜು. ವೆಚ್ಚ ಬದಲಿಸಿದಾಗ ಈ ವಿವರ ತಾನೇ ಬದಲಾಗುತ್ತದೆ.",seeBigPicture:"ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ",tripMap:"ಪ್ರವಾಸದ ನಕ್ಷೆ",plannedStop:"ಯೋಜಿತ ಸ್ಥಳ",savedIdea:"ಉಳಿಸಿದ ಆಲೋಚನೆ",needInspiration:"ಹೊಸ ಆಲೋಚನೆ ಬೇಕೇ?",inspirationNote:"ಸ್ವಲ್ಪ ವಿಶ್ರಾಂತಿ, ಸ್ಥಳೀಯ ಆಹಾರ ಮತ್ತು ಅನಿರೀಕ್ಷಿತ ಅನುಭವಗಳಿಗೆ ಸಮಯ ಬಿಡಿ.",suggestTweak:"ಸಲಹೆ ನೀಡಿ ↗",humanTouchEyebrow:"ವೈಯಕ್ತಿಕ ಸಹಾಯ",humanTouch:"ವೈಯಕ್ತಿಕ ನೆರವು ಬೇಕೇ?",humanTouchNote:"ನಿಮ್ಮ ಕರಡು ಯೋಜನೆಯನ್ನು ವಿಶೇಷ ಪ್ರವಾಸವನ್ನಾಗಿ ಮಾಡಲು Travlzi ಸಹಾಯ ಮಾಡುತ್ತದೆ.",makeItYours:"ನಿಮ್ಮ ಇಷ್ಟಕ್ಕೆ ಬದಲಿಸಿ",activityName:"ಚಟುವಟಿಕೆ ಅಥವಾ ಸ್ಥಳದ ಹೆಸರು",shortNote:"ಸಣ್ಣ ಟಿಪ್ಪಣಿ",day:"ದಿನ",time:"ಸಮಯ",category:"ವರ್ಗ",estimatedCost:"ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ ಅಂದಾಜು ವೆಚ್ಚ",locationOptional:"ಸ್ಥಳ (ನಕ್ಷೆಗೆ ಐಚ್ಛಿಕ)",keepAsIdea:"ಆಲೋಚನೆಯಾಗಿ ಉಳಿಸಿ",addToItinerary:"ಯೋಜನೆಗೆ ಸೇರಿಸಿ",stop:"ಸ್ಥಳ",stops:"ಸ್ಥಳಗಳು",places:"ಸ್ಥಳಗಳು",added:"ಸೇರಿಸಲಾಗಿದೆ",addToDay:"ದಿನಕ್ಕೆ ಸೇರಿಸಿ",noActivities:"ಈ ಆಯ್ಕೆಗಳಿಗೆ ಚಟುವಟಿಕೆಗಳಿಲ್ಲ.",activitySpend:"ಚಟುವಟಿಕೆ ವೆಚ್ಚ",foodSpend:"ಆಹಾರ",transportSpend:"ಸಾರಿಗೆ",staySpend:"ವಸತಿ",experienceSpend:"ಅನುಭವಗಳು",edit:"ತಿದ್ದು",remove:"ತೆಗೆದುಹಾಕಿ"},
    ta: {home:"முகப்பு",essentials:"பயண அத்தியாவசியங்கள்",language:"மொழி",talkToTravlzi:"Travlzi-யுடன் பேசுங்கள் ↗",plannerEyebrow:"உங்கள் பயணம், உங்கள் விருப்பம்",introTitle:"இடம் ஒதுக்குங்கள்",introEm:"நல்ல அனுபவங்களுக்கு.",introSub:"பயணத் திட்டத்தை உருவாக்கி, செயல்பாடுகளை மாற்றி, வரைபடத்தில் பாருங்கள்.",setupEyebrow:"முதலில் பயண விவரங்கள்",tripDetails:"பயண விவரங்கள்",destination:"எங்கு செல்கிறீர்கள்?",startingFrom:"புறப்படும் இடம்",startDate:"தொடக்க தேதி",endDate:"முடிவு தேதி",travellers:"பயணிகள்",travelStyle:"பயண வகை",budgetPerson:"ஒருவருக்கான பட்ஜெட்",buildItinerary:"என் பயணத் திட்டத்தை உருவாக்கு",formNote:"உங்கள் திட்டம் இந்த உலாவியில் சேமிக்கப்படும். பதிவிறக்கம் செய்து பகிரலாம்.",itinerary:"உங்கள் பயணத் திட்டம்",addActivity:"＋ செயல்பாட்டைச் சேர்",exportTrip:"↓ பயணத்தை ஏற்றுமதி செய்",print:"அச்சிடு",tripDuration:"பயண காலம்",plannedActivities:"திட்டமிட்ட செயல்பாடுகள்",budgetPersonShort:"ஒருவருக்கான பட்ஜெட்",travelPace:"பயண வேகம்",moveThings:"மாற்றிப் பாருங்கள்",dayByDay:"நாள் வாரியான திட்டம்",dragHint:"↕ இழுத்து வரிசையை மாற்றுங்கள்",activityLibraryEyebrow:"மேலும் யோசனைகள்",activityLibrary:"கிடைக்கும் செயல்பாடுகள்",libraryFor:"இதற்கான யோசனைகள்",libraryNote:". திட்டத்திலிருந்து நீக்கினாலும் இங்கே கிடைக்கும்.",daysUnit:"நாட்கள்",travellersUnit:"பயணிகள்",from:"இருந்து",balancedStyle:"கொஞ்சம் எல்லாம்",relaxedStyle:"மெதுவான ஓய்வு",adventureStyle:"சாகசம்",cultureStyle:"கலாசாரம் மற்றும் உணவு",familyStyle:"குடும்பத்திற்கு ஏற்றது",budgetStyle:"குறைந்த செலவு",searchActivities:"செயல்பாடுகளைத் தேடு",searchPlaceholder:"இடங்கள், உணவு, இயற்கை தேடு…",addToWhichDay:"எந்த நாளில் சேர்க்க?",filterCategory:"வகை",allCategories:"அனைத்து வகைகள்",attraction:"பார்க்க வேண்டிய இடங்கள்",food:"உணவு",nature:"இயற்கை",culture:"கலாசாரம்",stay:"தங்குமிடம்",transport:"போக்குவரத்து",freeTime:"ஓய்வு நேரம்",maybeLater:"பிறகு பார்க்க",ideasToFit:"பிறகு சேர்க்கும் யோசனைகள்",ideasNote:"இன்னும் முடிவு செய்யாத இடங்களை இங்கே வைத்துக்கொள்ளுங்கள்.",keepItReal:"பட்ஜெட்டை கவனியுங்கள்",budgetSnapshot:"பட்ஜெட் விவரம்",currency:"நாணயம்",groupBudget:"அனைவருக்குமான மொத்த பட்ஜெட்",plannedSpend:"திட்டமிட்ட செயல்பாட்டு செலவு",plannedPerPerson:"ஒருவருக்கான திட்டமிட்ட செலவு",leftPerPerson:"ஒருவருக்கு மீதம்",dailyAllowance:"தினசரி மீதம்",budgetNote:"செயல்பாட்டு செலவுகள் ஒருவருக்கான மதிப்பீடுகள். செலவை மாற்றினால் இந்த விவரம் தானாக மாறும்.",seeBigPicture:"வரைபடத்தில் பாருங்கள்",tripMap:"பயண வரைபடம்",plannedStop:"திட்டமிட்ட இடம்",savedIdea:"சேமித்த யோசனை",needInspiration:"புதிய யோசனை வேண்டுமா?",inspirationNote:"ஓய்வு நேரம், உள்ளூர் உணவு, எதிர்பாராத அனுபவங்களுக்கு இடம் விடுங்கள்.",suggestTweak:"ஒரு யோசனை கூறு ↗",humanTouchEyebrow:"தனிப்பட்ட உதவி",humanTouch:"தனிப்பட்ட உதவி வேண்டுமா?",humanTouchNote:"உங்கள் திட்டத்தை சிறப்பான பயணமாக மாற்ற Travlzi உதவும்.",makeItYours:"உங்கள் விருப்பப்படி மாற்றுங்கள்",activityName:"செயல்பாடு அல்லது இடத்தின் பெயர்",shortNote:"சிறு குறிப்பு",day:"நாள்",time:"நேரம்",category:"வகை",estimatedCost:"ஒருவருக்கான மதிப்பிடப்பட்ட செலவு",locationOptional:"இடம் (வரைபடத்திற்கான விருப்பம்)",keepAsIdea:"யோசனையாக சேமி",addToItinerary:"திட்டத்தில் சேர்",stop:"இடம்",stops:"இடங்கள்",places:"இடங்கள்",added:"சேர்க்கப்பட்டது",addToDay:"நாளில் சேர்",noActivities:"இந்த வடிகட்டியில் செயல்பாடுகள் இல்லை.",activitySpend:"செயல்பாட்டு செலவு",foodSpend:"உணவு",transportSpend:"போக்குவரத்து",staySpend:"தங்குமிடம்",experienceSpend:"அனுபவங்கள்",edit:"திருத்து",remove:"நீக்கு"},
    te: {home:"హోమ్",essentials:"ప్రయాణ అవసరాలు",language:"భాష",talkToTravlzi:"Travlziతో మాట్లాడండి ↗",plannerEyebrow:"మీ ప్రయాణం, మీ ఇష్టం",introTitle:"కొంత సమయం ఉంచండి",introEm:"మంచి అనుభవాల కోసం.",introSub:"ప్రయాణ ప్రణాళిక రూపొందించండి, కార్యక్రమాలను మార్చండి, మ్యాప్‌లో చూడండి.",setupEyebrow:"ముందుగా ప్రయాణ వివరాలు",tripDetails:"ప్రయాణ వివరాలు",destination:"ఎక్కడికి వెళ్తున్నారు?",startingFrom:"ప్రారంభ స్థలం",startDate:"ప్రారంభ తేదీ",endDate:"ముగింపు తేదీ",travellers:"ప్రయాణికులు",travelStyle:"ప్రయాణ శైలి",budgetPerson:"ఒక్కొక్కరి బడ్జెట్",buildItinerary:"నా ప్రయాణ ప్రణాళిక రూపొందించు",formNote:"మీ ప్రణాళిక ఈ బ్రౌజర్‌లో సేవ్ అవుతుంది. డౌన్‌లోడ్ చేసి పంచుకోవచ్చు.",itinerary:"మీ ప్రయాణ ప్రణాళిక",addActivity:"＋ కార్యక్రమం చేర్చు",exportTrip:"↓ ప్రయాణాన్ని ఎగుమతి",print:"ప్రింట్",tripDuration:"ప్రయాణ వ్యవధి",plannedActivities:"ప్రణాళిక చేసిన కార్యక్రమాలు",budgetPersonShort:"ఒక్కొక్కరి బడ్జెట్",travelPace:"ప్రయాణ వేగం",moveThings:"మార్చి చూడండి",dayByDay:"రోజువారీ ప్రణాళిక",dragHint:"↕ లాగి క్రమాన్ని మార్చండి",activityLibraryEyebrow:"మరిన్ని ఆలోచనలు",activityLibrary:"అందుబాటులో ఉన్న కార్యక్రమాలు",libraryFor:"వీటి కోసం ఆలోచనలు",libraryNote:". ప్రణాళిక నుంచి తొలగించినా ఇక్కడ అందుబాటులో ఉంటుంది.",daysUnit:"రోజులు",travellersUnit:"ప్రయాణికులు",from:"నుంచి",balancedStyle:"అన్ని రకాల అనుభవాలు",relaxedStyle:"నెమ్మదిగా, ప్రశాంతంగా",adventureStyle:"సాహసం",cultureStyle:"సంస్కృతి మరియు ఆహారం",familyStyle:"కుటుంబానికి అనుకూలం",budgetStyle:"తక్కువ బడ్జెట్",searchActivities:"కార్యక్రమాలు వెతకండి",searchPlaceholder:"ప్రదేశాలు, ఆహారం, ప్రకృతి వెతకండి…",addToWhichDay:"ఏ రోజుకు చేర్చాలి",filterCategory:"వర్గం",allCategories:"అన్ని వర్గాలు",attraction:"చూడదగిన ప్రదేశాలు",food:"ఆహారం",nature:"ప్రకృతి",culture:"సంస్కృతి",stay:"వసతి",transport:"రవాణా",freeTime:"ఖాళీ సమయం",maybeLater:"తర్వాత చూద్దాం",ideasToFit:"తర్వాత చేర్చే ఆలోచనలు",ideasNote:"ఇంకా నిర్ణయించని ప్రదేశాలను ఇక్కడ ఉంచండి.",keepItReal:"బడ్జెట్‌పై దృష్టి",budgetSnapshot:"బడ్జెట్ వివరాలు",currency:"కరెన్సీ",groupBudget:"అందరి మొత్తం బడ్జెట్",plannedSpend:"కార్యక్రమాల అంచనా ఖర్చు",plannedPerPerson:"ఒక్కొక్కరి అంచనా ఖర్చు",leftPerPerson:"ఒక్కొక్కరికి మిగిలినది",dailyAllowance:"రోజువారీ మిగులు",budgetNote:"కార్యక్రమ ఖర్చులు ఒక్కొక్కరికి అంచనా. ఖర్చు మార్చితే ఈ వివరాలు మారతాయి.",seeBigPicture:"మ్యాప్‌లో చూడండి",tripMap:"ప్రయాణ మ్యాప్",plannedStop:"ప్రణాళికలోని ప్రదేశం",savedIdea:"సేవ్ చేసిన ఆలోచన",needInspiration:"కొత్త ఆలోచన కావాలా?",inspirationNote:"విశ్రాంతి, స్థానిక ఆహారం, అనుకోని అనుభవాలకు సమయం ఉంచండి.",suggestTweak:"ఒక సూచన ఇవ్వు ↗",humanTouchEyebrow:"వ్యక్తిగత సహాయం",humanTouch:"వ్యక్తిగత సహాయం కావాలా?",humanTouchNote:"మీ డ్రాఫ్ట్‌ను ప్రత్యేకమైన ప్రయాణంగా మార్చడంలో Travlzi సహాయపడుతుంది.",makeItYours:"మీకు నచ్చినట్లు మార్చండి",activityName:"కార్యక్రమం లేదా ప్రదేశం పేరు",shortNote:"చిన్న గమనిక",day:"రోజు",time:"సమయం",category:"వర్గం",estimatedCost:"ఒక్కొక్కరి అంచనా ఖర్చు",locationOptional:"ప్రదేశం (మ్యాప్ కోసం ఐచ్ఛికం)",keepAsIdea:"ఆలోచనగా ఉంచు",addToItinerary:"ప్రణాళికలో చేర్చు",stop:"ప్రదేశం",stops:"ప్రదేశాలు",places:"ప్రదేశాలు",added:"చేర్చబడింది",addToDay:"రోజుకు చేర్చు",noActivities:"ఈ ఫిల్టర్‌లలో కార్యక్రమాలు లేవు.",activitySpend:"కార్యక్రమ ఖర్చు",foodSpend:"ఆహారం",transportSpend:"రవాణా",staySpend:"వసతి",experienceSpend:"అనుభవాలు",edit:"మార్చు",remove:"తొలగించు"},
    ml: {home:"ഹോം",essentials:"യാത്രാ അവശ്യവസ്തുക്കൾ",language:"ഭാഷ",talkToTravlzi:"Travlzi-യോട് സംസാരിക്കുക ↗",plannerEyebrow:"നിങ്ങളുടെ യാത്ര, നിങ്ങളുടെ രീതി",introTitle:"കുറച്ച് ഇടം വയ്ക്കൂ",introEm:"നല്ല അനുഭവങ്ങൾക്കായി.",introSub:"യാത്രാ പദ്ധതി തയ്യാറാക്കി പ്രവർത്തനങ്ങൾ മാറ്റി മാപ്പിൽ കാണൂ.",setupEyebrow:"ആദ്യം യാത്രാ വിവരങ്ങൾ",tripDetails:"യാത്രാ വിവരങ്ങൾ",destination:"എവിടേക്കാണ് പോകുന്നത്?",startingFrom:"പുറപ്പെടുന്ന സ്ഥലം",startDate:"ആരംഭ തീയതി",endDate:"അവസാന തീയതി",travellers:"യാത്രക്കാർ",travelStyle:"യാത്രാ ശൈലി",budgetPerson:"ഒരാൾക്കുള്ള ബജറ്റ്",buildItinerary:"എന്റെ യാത്രാ പദ്ധതി തയ്യാറാക്കുക",formNote:"നിങ്ങളുടെ പദ്ധതി ഈ ബ്രൗസറിൽ സൂക്ഷിക്കും. ഡൗൺലോഡ് ചെയ്ത് പങ്കിടാം.",itinerary:"നിങ്ങളുടെ യാത്രാ പദ്ധതി",addActivity:"＋ പ്രവർത്തനം ചേർക്കുക",exportTrip:"↓ യാത്ര എക്സ്പോർട്ട് ചെയ്യുക",print:"പ്രിന്റ്",tripDuration:"യാത്രാ ദൈർഘ്യം",plannedActivities:"ആസൂത്രണം ചെയ്ത പ്രവർത്തനങ്ങൾ",budgetPersonShort:"ഒരാൾക്കുള്ള ബജറ്റ്",travelPace:"യാത്രയുടെ വേഗം",moveThings:"മാറ്റി ക്രമീകരിക്കുക",dayByDay:"ദിവസം തിരിച്ചുള്ള പദ്ധതി",dragHint:"↕ വലിച്ച് ക്രമം മാറ്റുക",activityLibraryEyebrow:"കൂടുതൽ ആശയങ്ങൾ",activityLibrary:"ലഭ്യമായ പ്രവർത്തനങ്ങൾ",libraryFor:"ഇതിനായുള്ള ആശയങ്ങൾ",libraryNote:". പദ്ധതിയിൽ നിന്ന് നീക്കിയാലും ഇവിടെ ലഭ്യമായിരിക്കും.",daysUnit:"ദിവസങ്ങൾ",travellersUnit:"യാത്രക്കാർ",from:"ൽ നിന്ന്",balancedStyle:"എല്ലാം കുറച്ച്",relaxedStyle:"വിശ്രമത്തോടെ",adventureStyle:"സാഹസികം",cultureStyle:"സംസ്കാരവും ഭക്ഷണവും",familyStyle:"കുടുംബ സൗഹൃദം",budgetStyle:"കുറഞ്ഞ ചെലവ്",searchActivities:"പ്രവർത്തനങ്ങൾ തിരയുക",searchPlaceholder:"സ്ഥലങ്ങൾ, ഭക്ഷണം, പ്രകൃതി തിരയുക…",addToWhichDay:"ഏത് ദിവസത്തിൽ ചേർക്കണം",filterCategory:"വിഭാഗം",allCategories:"എല്ലാ വിഭാഗങ്ങളും",attraction:"കാണേണ്ട സ്ഥലങ്ങൾ",food:"ഭക്ഷണം",nature:"പ്രകൃതി",culture:"സംസ്കാരം",stay:"താമസം",transport:"ഗതാഗതം",freeTime:"ഒഴിവുസമയം",maybeLater:"പിന്നീട്",ideasToFit:"പിന്നീട് ചേർക്കാനുള്ള ആശയങ്ങൾ",ideasNote:"തീരുമാനിക്കാത്ത സ്ഥലങ്ങൾ ഇവിടെ സൂക്ഷിക്കുക.",keepItReal:"ബജറ്റ് ശ്രദ്ധിക്കുക",budgetSnapshot:"ബജറ്റ് സംഗ്രഹം",currency:"നാണയം",groupBudget:"എല്ലാവർക്കുമുള്ള ആകെ ബജറ്റ്",plannedSpend:"പ്രവർത്തനങ്ങളുടെ കണക്കാക്കിയ ചെലവ്",plannedPerPerson:"ഒരാൾക്കുള്ള കണക്കാക്കിയ ചെലവ്",leftPerPerson:"ഒരാൾക്ക് ശേഷിക്കുന്നത്",dailyAllowance:"ദിവസേന ശേഷിക്കുന്നത്",budgetNote:"പ്രവർത്തനച്ചെലവ് ഒരാൾക്കുള്ള കണക്കാണ്. ചെലവ് മാറ്റുമ്പോൾ സംഗ്രഹം പുതുക്കും.",seeBigPicture:"മാപ്പിൽ കാണുക",tripMap:"യാത്രാ മാപ്പ്",plannedStop:"പദ്ധതിയിലുള്ള സ്ഥലം",savedIdea:"സൂക്ഷിച്ച ആശയം",needInspiration:"പുതിയ ആശയം വേണോ?",inspirationNote:"വിശ്രമത്തിനും പ്രാദേശിക ഭക്ഷണത്തിനും അപ്രതീക്ഷിത അനുഭവങ്ങൾക്കും സമയം മാറ്റിവയ്ക്കുക.",suggestTweak:"ഒരു നിർദ്ദേശം ↗",humanTouchEyebrow:"വ്യക്തിപരമായ സഹായം",humanTouch:"വ്യക്തിപരമായ സഹായം വേണോ?",humanTouchNote:"നിങ്ങളുടെ കരട് യാത്രയെ മനോഹരമായ അനുഭവമാക്കാൻ Travlzi സഹായിക്കും.",makeItYours:"നിങ്ങളുടെ ഇഷ്ടത്തിന് മാറ്റുക",activityName:"പ്രവർത്തനത്തിന്റെ അല്ലെങ്കിൽ സ്ഥലത്തിന്റെ പേര്",shortNote:"ചെറിയ കുറിപ്പ്",day:"ദിവസം",time:"സമയം",category:"വിഭാഗം",estimatedCost:"ഒരാൾക്കുള്ള കണക്കാക്കിയ ചെലവ്",locationOptional:"സ്ഥലം (മാപ്പിനായി ഐച്ഛികം)",keepAsIdea:"ആശയമായി സൂക്ഷിക്കുക",addToItinerary:"പദ്ധതിയിൽ ചേർക്കുക",stop:"സ്ഥലം",stops:"സ്ഥലങ്ങൾ",places:"സ്ഥലങ്ങൾ",added:"ചേർത്തു",addToDay:"ദിവസത്തിൽ ചേർക്കുക",noActivities:"ഈ ഫിൽട്ടറിൽ പ്രവർത്തനങ്ങളില്ല.",activitySpend:"പ്രവർത്തന ചെലവ്",foodSpend:"ഭക്ഷണം",transportSpend:"ഗതാഗതം",staySpend:"താമസം",experienceSpend:"അനുഭവങ്ങൾ",edit:"തിരുത്തുക",remove:"നീക്കം ചെയ്യുക"},
    mr: {home:"मुख्यपृष्ठ",essentials:"प्रवासासाठी आवश्यक वस्तू",language:"भाषा",talkToTravlzi:"Travlzi शी बोला ↗",plannerEyebrow:"तुमचा प्रवास, तुमच्या पद्धतीने",introTitle:"थोडी जागा ठेवा",introEm:"सुंदर अनुभवांसाठी.",introSub:"प्रवासाचे नियोजन करा, उपक्रम बदला आणि नकाशावर पहा.",setupEyebrow:"सुरुवातीला प्रवासाची माहिती",tripDetails:"प्रवासाचा तपशील",destination:"कुठे जाणार आहात?",startingFrom:"सुरुवातीचे ठिकाण",startDate:"प्रारंभ तारीख",endDate:"शेवटची तारीख",travellers:"प्रवासी",travelStyle:"प्रवासाची शैली",budgetPerson:"प्रति व्यक्ती बजेट",buildItinerary:"माझा प्रवास आराखडा तयार करा",formNote:"तुमचा आराखडा या ब्राउझरमध्ये जतन होतो. डाउनलोड करून शेअर करा.",itinerary:"तुमचा प्रवास आराखडा",addActivity:"＋ उपक्रम जोडा",exportTrip:"↓ प्रवास निर्यात करा",print:"प्रिंट",tripDuration:"प्रवासाचा कालावधी",plannedActivities:"नियोजित उपक्रम",budgetPersonShort:"प्रति व्यक्ती बजेट",travelPace:"प्रवासाचा वेग",moveThings:"बदल करून पहा",dayByDay:"दिवसानुसार आराखडा",dragHint:"↕ ओढून क्रम बदला",activityLibraryEyebrow:"आणखी कल्पना",activityLibrary:"उपलब्ध उपक्रम",libraryFor:"यासाठी कल्पना पहा",libraryNote:". आराखड्यातून काढले तरी येथे उपलब्ध राहील.",daysUnit:"दिवस",travellersUnit:"प्रवासी",from:"पासून",balancedStyle:"सगळ्याचा थोडा अनुभव",relaxedStyle:"निवांत",adventureStyle:"साहसी",cultureStyle:"संस्कृती आणि खाद्य",familyStyle:"कुटुंबासाठी योग्य",budgetStyle:"कमी बजेट",searchActivities:"उपक्रम शोधा",searchPlaceholder:"ठिकाणे, खाद्यपदार्थ, निसर्ग शोधा…",addToWhichDay:"कोणत्या दिवशी जोडायचे",filterCategory:"प्रकार",allCategories:"सर्व प्रकार",attraction:"प्रेक्षणीय स्थळे",food:"अन्न",nature:"निसर्ग",culture:"संस्कृती",stay:"निवास",transport:"वाहतूक",freeTime:"मोकळा वेळ",maybeLater:"नंतरसाठी",ideasToFit:"नंतर समाविष्ट करण्याच्या कल्पना",ideasNote:"अजून ठरवलेली नसलेली ठिकाणे येथे ठेवा.",keepItReal:"बजेट लक्षात ठेवा",budgetSnapshot:"बजेटचा आढावा",currency:"चलन",groupBudget:"सर्वांसाठी एकूण बजेट",plannedSpend:"उपक्रमांचा अंदाजे खर्च",plannedPerPerson:"प्रति व्यक्ती नियोजित खर्च",leftPerPerson:"प्रति व्यक्ती शिल्लक",dailyAllowance:"दररोजची शिल्लक",budgetNote:"उपक्रमांचा खर्च प्रति व्यक्ती अंदाजे आहे. खर्च बदलल्यास हा आढावा आपोआप बदलेल.",seeBigPicture:"नकाशावर पहा",tripMap:"प्रवासाचा नकाशा",plannedStop:"नियोजित ठिकाण",savedIdea:"जतन केलेली कल्पना",needInspiration:"नवीन कल्पना हवी आहे?",inspirationNote:"विश्रांती, स्थानिक खाद्यपदार्थ आणि अनपेक्षित अनुभवांसाठी वेळ ठेवा.",suggestTweak:"एक सूचना द्या ↗",humanTouchEyebrow:"वैयक्तिक मदत",humanTouch:"वैयक्तिक मदत हवी आहे?",humanTouchNote:"तुमच्या आराखड्याला खास प्रवासात बदलण्यासाठी Travlzi मदत करू शकते.",makeItYours:"तुमच्या आवडीनुसार बदला",activityName:"उपक्रम किंवा ठिकाणाचे नाव",shortNote:"छोटी नोंद",day:"दिवस",time:"वेळ",category:"प्रकार",estimatedCost:"प्रति व्यक्ती अंदाजे खर्च",locationOptional:"ठिकाण (नकाशासाठी ऐच्छिक)",keepAsIdea:"कल्पना म्हणून ठेवा",addToItinerary:"आराखड्यात जोडा",stop:"ठिकाण",stops:"ठिकाणे",places:"ठिकाणे",added:"जोडले",addToDay:"दिवसात जोडा",noActivities:"या फिल्टरमध्ये उपक्रम नाहीत.",activitySpend:"उपक्रमांचा खर्च",foodSpend:"अन्न",transportSpend:"वाहतूक",staySpend:"निवास",experienceSpend:"अनुभव",edit:"बदला",remove:"काढा"},
    bn: {home:"হোম",essentials:"ভ্রমণের প্রয়োজনীয় জিনিস",language:"ভাষা",talkToTravlzi:"Travlzi-র সঙ্গে কথা বলুন ↗",plannerEyebrow:"আপনার ভ্রমণ, আপনার পছন্দে",introTitle:"একটু সময় রাখুন",introEm:"ভালো অভিজ্ঞতার জন্য।",introSub:"ভ্রমণের পরিকল্পনা তৈরি করুন, কাজের ক্রম বদলান এবং মানচিত্রে দেখুন।",setupEyebrow:"প্রথমে ভ্রমণের বিবরণ",tripDetails:"ভ্রমণের বিবরণ",destination:"কোথায় যাচ্ছেন?",startingFrom:"শুরুর স্থান",startDate:"শুরুর তারিখ",endDate:"শেষের তারিখ",travellers:"ভ্রমণকারী",travelStyle:"ভ্রমণের ধরন",budgetPerson:"প্রতি জনের বাজেট",buildItinerary:"আমার ভ্রমণ পরিকল্পনা তৈরি করুন",formNote:"আপনার পরিকল্পনা এই ব্রাউজারে সংরক্ষিত হবে। ডাউনলোড করে ভাগ করতে পারেন।",itinerary:"আপনার ভ্রমণ পরিকল্পনা",addActivity:"＋ কাজ যোগ করুন",exportTrip:"↓ ভ্রমণ এক্সপোর্ট করুন",print:"প্রিন্ট",tripDuration:"ভ্রমণের সময়কাল",plannedActivities:"পরিকল্পিত কাজ",budgetPersonShort:"প্রতি জনের বাজেট",travelPace:"ভ্রমণের গতি",moveThings:"বদলে দেখুন",dayByDay:"দিন অনুযায়ী পরিকল্পনা",dragHint:"↕ টেনে ক্রম বদলান",activityLibraryEyebrow:"আরও ভাবনা",activityLibrary:"উপলভ্য কাজ",libraryFor:"এর জন্য ভাবনা দেখুন",libraryNote:". পরিকল্পনা থেকে সরালেও এটি এখানে থাকবে।",daysUnit:"দিন",travellersUnit:"ভ্রমণকারী",from:"থেকে",balancedStyle:"সবকিছুর একটু",relaxedStyle:"ধীর ও শান্ত",adventureStyle:"অ্যাডভেঞ্চার",cultureStyle:"সংস্কৃতি ও খাবার",familyStyle:"পরিবারের জন্য",budgetStyle:"কম বাজেট",searchActivities:"কাজ খুঁজুন",searchPlaceholder:"স্থান, খাবার, প্রকৃতি খুঁজুন…",addToWhichDay:"কোন দিনে যোগ করবেন",filterCategory:"বিভাগ",allCategories:"সব বিভাগ",attraction:"দর্শনীয় স্থান",food:"খাবার",nature:"প্রকৃতি",culture:"সংস্কৃতি",stay:"থাকা",transport:"যাতায়াত",freeTime:"অবসর সময়",maybeLater:"পরে দেখুন",ideasToFit:"পরে যোগ করার ভাবনা",ideasNote:"যে জায়গাগুলি এখনও ঠিক করেননি সেগুলি এখানে রাখুন।",keepItReal:"বাজেটের হিসাব",budgetSnapshot:"বাজেটের সারাংশ",currency:"মুদ্রা",groupBudget:"সবার মোট বাজেট",plannedSpend:"পরিকল্পিত কাজের খরচ",plannedPerPerson:"প্রতি জনের পরিকল্পিত খরচ",leftPerPerson:"প্রতি জনের বাকি",dailyAllowance:"দৈনিক বাকি",budgetNote:"কাজের খরচ প্রতি জনের আনুমানিক হিসাব। খরচ বদলালে এই সারাংশও বদলাবে।",seeBigPicture:"মানচিত্রে দেখুন",tripMap:"ভ্রমণের মানচিত্র",plannedStop:"পরিকল্পিত স্থান",savedIdea:"সংরক্ষিত ভাবনা",needInspiration:"নতুন ভাবনা চান?",inspirationNote:"বিশ্রাম, স্থানীয় খাবার এবং হঠাৎ পাওয়া অভিজ্ঞতার জন্য সময় রাখুন।",suggestTweak:"একটি পরামর্শ দিন ↗",humanTouchEyebrow:"ব্যক্তিগত সহায়তা",humanTouch:"ব্যক্তিগত সাহায্য চান?",humanTouchNote:"আপনার খসড়াকে সুন্দর ভ্রমণে পরিণত করতে Travlzi সাহায্য করতে পারে।",makeItYours:"নিজের মতো করে নিন",activityName:"কাজ বা স্থানের নাম",shortNote:"ছোট নোট",day:"দিন",time:"সময়",category:"বিভাগ",estimatedCost:"প্রতি জনের আনুমানিক খরচ",locationOptional:"স্থান (মানচিত্রের জন্য ঐচ্ছিক)",keepAsIdea:"ভাবনা হিসেবে রাখুন",addToItinerary:"পরিকল্পনায় যোগ করুন",stop:"স্থান",stops:"স্থানগুলি",places:"স্থানগুলি",added:"যোগ হয়েছে",addToDay:"দিনে যোগ করুন",noActivities:"এই ফিল্টারে কোনো কাজ নেই।",activitySpend:"কাজের খরচ",foodSpend:"খাবার",transportSpend:"যাতায়াত",staySpend:"থাকা",experienceSpend:"অভিজ্ঞতা",edit:"সম্পাদনা",remove:"সরান"}
  };
  const foreignDictionaries = {
    es: {home:"Inicio",essentials:"Imprescindibles de viaje",language:"Idioma",talkToTravlzi:"Habla con Travlzi ↗",plannerEyebrow:"TU VIAJE, A TU MANERA",introTitle:"Haz espacio para",introEm:"los buenos momentos.",introSub:"Crea un itinerario flexible, cambia tus planes y sigue tu viaje en el mapa.",setupEyebrow:"PRIMERO, LO ESENCIAL",tripDetails:"Detalles del viaje",destination:"¿Adónde vas?",startingFrom:"Punto de partida",startDate:"Fecha de inicio",endDate:"Fecha de fin",travellers:"Viajeros",travelStyle:"Estilo de viaje",budgetPerson:"Presupuesto por persona",buildItinerary:"Crear mi itinerario",formNote:"Tu plan se guarda en este navegador. No necesitas una cuenta. Expórtalo para compartirlo.",itinerary:"TU ITINERARIO",addActivity:"＋ Añadir actividad",exportTrip:"↓ Exportar viaje",print:"Imprimir",tripDuration:"Duración del viaje",plannedActivities:"Actividades planificadas",budgetPersonShort:"Presupuesto por persona",travelPace:"Ritmo del viaje",moveThings:"CAMBIA EL ORDEN",dayByDay:"Tu plan día a día",dragHint:"↕ Arrastra las tarjetas para reordenar",activityLibraryEyebrow:"NO TE PIERDAS NINGUNA IDEA",activityLibrary:"Actividades disponibles",libraryFor:"Ideas para",libraryNote:". Quitar una actividad del plan no la elimina de esta lista.",daysUnit:"días",travellersUnit:"viajeros",from:"desde",balancedStyle:"Un poco de todo",relaxedStyle:"Tranquilo y relajado",adventureStyle:"Aventura",cultureStyle:"Cultura y gastronomía",familyStyle:"Ideal para familias",budgetStyle:"Económico",searchActivities:"Buscar actividades",searchPlaceholder:"Buscar lugares, comida, naturaleza…",addToWhichDay:"Añadir al día",filterCategory:"Categoría",allCategories:"Todas las categorías",attraction:"Atracciones",food:"Comida",nature:"Naturaleza",culture:"Cultura",stay:"Alojamiento",transport:"Transporte",freeTime:"Tiempo libre",maybeLater:"PARA MÁS TARDE",ideasToFit:"Ideas para incluir",ideasNote:"Guarda aquí los lugares interesantes hasta decidir dónde encajan.",keepItReal:"CONTROLA EL GASTO",budgetSnapshot:"Resumen del presupuesto",currency:"Moneda",groupBudget:"Presupuesto total del grupo",plannedSpend:"Gasto estimado en actividades",plannedPerPerson:"Estimado por persona",leftPerPerson:"Restante por persona",dailyAllowance:"Presupuesto diario",budgetNote:"Los costes de las actividades son estimaciones por persona. Actualízalos para recalcular el resumen.",seeBigPicture:"VISTA GENERAL",tripMap:"Mapa del viaje",plannedStop:"Parada planificada",savedIdea:"Idea guardada",needInspiration:"¿Buscas inspiración?",inspirationNote:"Reserva tiempo para descansar, probar comida local y descubrir algo inesperado.",suggestTweak:"Sugerir un cambio ↗",humanTouchEyebrow:"UN POCO DE AYUDA SIEMPRE VIENE BIEN",humanTouch:"¿Quieres ayuda personal?",humanTouchNote:"Travlzi puede convertir tu borrador en un viaje lleno de detalles.",makeItYours:"HAZLO A TU MEDIDA",activityName:"Nombre de la actividad o lugar",shortNote:"Nota breve",day:"Día",time:"Hora",category:"Categoría",estimatedCost:"Coste estimado por persona",locationOptional:"Ubicación (opcional, para el mapa)",keepAsIdea:"Guardar como idea",addToItinerary:"Añadir al itinerario",stop:"parada",stops:"paradas",places:"lugares",added:"Añadido",addToDay:"Añadir al día",noActivities:"No hay actividades que coincidan con estos filtros.",activitySpend:"Gasto en actividades",foodSpend:"Comida",transportSpend:"Transporte",staySpend:"Alojamiento",experienceSpend:"Experiencias",edit:"Editar",remove:"Quitar",actualExpensesEyebrow:"GASTOS REALES",actualExpensesTitle:"Registra tus gastos",actualExpensesNote:"Anota lo que paga realmente el grupo. Estos importes se separan de las estimaciones del itinerario.",expenseDescription:"¿En qué gastaste?",expenseDescriptionPlaceholder:"p. ej., Taxi al aeropuerto",expenseCategory:"Categoría",expenseAmount:"Importe total del grupo",expenseDate:"Fecha",addExpense:"＋ Añadir gasto",actualSpendGroup:"Gasto real (grupo)",actualSpendPerPerson:"Gasto real por persona",actualBudgetLeft:"Presupuesto restante (grupo)",noExpenses:"Todavía no hay gastos registrados.",removeExpense:"Eliminar gasto",expensesCurrencyNote:"Introduce el importe total pagado por el grupo en la moneda seleccionada."},
    fr: {home:"Accueil",essentials:"Essentiels de voyage",language:"Langue",talkToTravlzi:"Contacter Travlzi ↗",plannerEyebrow:"VOTRE VOYAGE, À VOTRE FAÇON",introTitle:"Gardez de la place pour",introEm:"les beaux moments.",introSub:"Créez un itinéraire flexible, modifiez vos activités et visualisez votre voyage sur la carte.",setupEyebrow:"COMMENÇONS PAR L'ESSENTIEL",tripDetails:"Détails du voyage",destination:"Où partez-vous ?",startingFrom:"Départ de",startDate:"Date de départ",endDate:"Date de retour",travellers:"Voyageurs",travelStyle:"Style de voyage",budgetPerson:"Budget par personne",buildItinerary:"Créer mon itinéraire",formNote:"Votre plan est enregistré dans ce navigateur. Aucun compte nécessaire. Exportez-le pour le partager.",itinerary:"VOTRE ITINÉRAIRE",addActivity:"＋ Ajouter une activité",exportTrip:"↓ Exporter le voyage",print:"Imprimer",tripDuration:"Durée du voyage",plannedActivities:"Activités prévues",budgetPersonShort:"Budget par personne",travelPace:"Rythme du voyage",moveThings:"MODIFIEZ LE PROGRAMME",dayByDay:"Votre programme jour par jour",dragHint:"↕ Faites glisser les cartes pour les réorganiser",activityLibraryEyebrow:"NE MANQUEZ AUCUNE IDÉE",activityLibrary:"Activités disponibles",libraryFor:"Idées pour",libraryNote:". Retirer une activité du programme ne la supprime pas de cette liste.",daysUnit:"jours",travellersUnit:"voyageurs",from:"de",balancedStyle:"Un peu de tout",relaxedStyle:"Détente",adventureStyle:"Aventure",cultureStyle:"Culture et gastronomie",familyStyle:"En famille",budgetStyle:"Petit budget",searchActivities:"Rechercher des activités",searchPlaceholder:"Lieux, cuisine, nature…",addToWhichDay:"Ajouter au jour",filterCategory:"Catégorie",allCategories:"Toutes les catégories",attraction:"Sites à visiter",food:"Cuisine",nature:"Nature",culture:"Culture",stay:"Hébergement",transport:"Transport",freeTime:"Temps libre",maybeLater:"POUR PLUS TARD",ideasToFit:"Idées à intégrer",ideasNote:"Gardez ici les lieux intéressants jusqu'à ce que vous décidiez où les placer.",keepItReal:"GARDEZ LE CONTRÔLE",budgetSnapshot:"Aperçu du budget",currency:"Devise",groupBudget:"Budget total du groupe",plannedSpend:"Dépenses estimées des activités",plannedPerPerson:"Prévu par personne",leftPerPerson:"Reste par personne",dailyAllowance:"Budget quotidien",budgetNote:"Les coûts des activités sont estimés par personne. Modifiez-les pour mettre à jour cet aperçu.",seeBigPicture:"VUE D'ENSEMBLE",tripMap:"Carte du voyage",plannedStop:"Étape prévue",savedIdea:"Idée enregistrée",needInspiration:"Besoin d'inspiration ?",inspirationNote:"Gardez du temps pour souffler, goûter la cuisine locale et les découvertes imprévues.",suggestTweak:"Suggérer un ajustement ↗",humanTouchEyebrow:"UN PEU D'AIDE FAIT LA DIFFÉRENCE",humanTouch:"Envie d'un accompagnement ?",humanTouchNote:"Travlzi peut transformer votre brouillon en voyage riche en détails.",makeItYours:"PERSONNALISEZ",activityName:"Nom de l'activité ou du lieu",shortNote:"Note courte",day:"Jour",time:"Heure",category:"Catégorie",estimatedCost:"Coût estimé par personne",locationOptional:"Lieu (facultatif, pour la carte)",keepAsIdea:"Garder comme idée",addToItinerary:"Ajouter à l'itinéraire",stop:"étape",stops:"étapes",places:"lieux",added:"Ajouté",addToDay:"Ajouter au jour",noActivities:"Aucune activité ne correspond à ces filtres.",activitySpend:"Dépenses d'activités",foodSpend:"Repas",transportSpend:"Transport",staySpend:"Hébergement",experienceSpend:"Expériences",edit:"Modifier",remove:"Retirer",actualExpensesEyebrow:"DÉPENSES RÉELLES",actualExpensesTitle:"Suivez vos dépenses",actualExpensesNote:"Notez ce que votre groupe paie réellement. Ces montants sont distincts des estimations de l'itinéraire.",expenseDescription:"Quel était cet achat ?",expenseDescriptionPlaceholder:"ex. Taxi de l'aéroport",expenseCategory:"Catégorie",expenseAmount:"Montant total du groupe",expenseDate:"Date",addExpense:"＋ Ajouter une dépense",actualSpendGroup:"Dépenses réelles (groupe)",actualSpendPerPerson:"Réel par personne",actualBudgetLeft:"Budget restant (groupe)",noExpenses:"Aucune dépense enregistrée pour le moment.",removeExpense:"Supprimer la dépense",expensesCurrencyNote:"Saisissez le montant total payé par le groupe dans la devise sélectionnée."},
    de: {home:"Startseite",essentials:"Reise-Essentials",language:"Sprache",talkToTravlzi:"Travlzi kontaktieren ↗",plannerEyebrow:"DEINE REISE, DEIN WEG",introTitle:"Schaffe Platz für",introEm:"die schönen Momente.",introSub:"Plane flexibel, verschiebe Aktivitäten und sieh deine Reise auf der Karte.",setupEyebrow:"ZUERST DER ÜBERBLICK",tripDetails:"Reisedetails",destination:"Wohin geht die Reise?",startingFrom:"Startort",startDate:"Startdatum",endDate:"Enddatum",travellers:"Reisende",travelStyle:"Reisestil",budgetPerson:"Budget pro Person",buildItinerary:"Reiseplan erstellen",formNote:"Dein Plan wird in diesem Browser gespeichert. Kein Konto nötig. Exportiere ihn zum Teilen.",itinerary:"DEIN REISEPLAN",addActivity:"＋ Aktivität hinzufügen",exportTrip:"↓ Reise exportieren",print:"Drucken",tripDuration:"Reisedauer",plannedActivities:"Geplante Aktivitäten",budgetPersonShort:"Budget pro Person",travelPace:"Reisetempo",moveThings:"ORDNE DEINEN PLAN",dayByDay:"Dein Tagesplan",dragHint:"↕ Karten ziehen, um sie neu anzuordnen",activityLibraryEyebrow:"KEINE IDEE VERPASSEN",activityLibrary:"Verfügbare Aktivitäten",libraryFor:"Ideen für",libraryNote:". Entfernte Aktivitäten bleiben in dieser Liste verfügbar.",daysUnit:"Tage",travellersUnit:"Reisende",from:"ab",balancedStyle:"Von allem etwas",relaxedStyle:"Ruhig und entspannt",adventureStyle:"Abenteuer",cultureStyle:"Kultur und Essen",familyStyle:"Familienfreundlich",budgetStyle:"Preisbewusst",searchActivities:"Aktivitäten suchen",searchPlaceholder:"Orte, Essen, Natur suchen…",addToWhichDay:"Zu welchem Tag?",filterCategory:"Kategorie",allCategories:"Alle Kategorien",attraction:"Sehenswürdigkeiten",food:"Essen",nature:"Natur",culture:"Kultur",stay:"Unterkunft",transport:"Transport",freeTime:"Freizeit",maybeLater:"FÜR SPÄTER",ideasToFit:"Ideen für den Reiseplan",ideasNote:"Speichere interessante Orte hier, bis du sie einem Tag zuordnest.",keepItReal:"BUDGET IM BLICK",budgetSnapshot:"Budgetübersicht",currency:"Währung",groupBudget:"Gesamtbudget der Gruppe",plannedSpend:"Geplante Aktivitätskosten",plannedPerPerson:"Geplant pro Person",leftPerPerson:"Übrig pro Person",dailyAllowance:"Tagesbudget",budgetNote:"Aktivitätskosten sind Schätzungen pro Person. Bearbeite sie, um diese Übersicht zu aktualisieren.",seeBigPicture:"DER GROSSE ÜBERBLICK",tripMap:"Reisekarte",plannedStop:"Geplanter Halt",savedIdea:"Gespeicherte Idee",needInspiration:"Noch etwas Inspiration?",inspirationNote:"Plane Pausen ein, probiere lokale Küche und lass Platz für spontane Entdeckungen.",suggestTweak:"Änderung vorschlagen ↗",humanTouchEyebrow:"EIN WENIG HILFE MACHT VIEL AUS",humanTouch:"Persönliche Hilfe gewünscht?",humanTouchNote:"Travlzi hilft dir, aus deinem Entwurf eine Reise mit besonderen Details zu machen.",makeItYours:"MACH ES ZU DEINER REISE",activityName:"Name der Aktivität oder des Ortes",shortNote:"Kurze Notiz",day:"Tag",time:"Uhrzeit",category:"Kategorie",estimatedCost:"Geschätzte Kosten pro Person",locationOptional:"Ort (optional, für die Karte)",keepAsIdea:"Als Idee speichern",addToItinerary:"Zum Reiseplan hinzufügen",stop:"Stopp",stops:"Stopps",places:"Orte",added:"Hinzugefügt",addToDay:"Zum Tag hinzufügen",noActivities:"Keine Aktivitäten für diese Filter gefunden.",activitySpend:"Aktivitätskosten",foodSpend:"Essen",transportSpend:"Transport",staySpend:"Unterkunft",experienceSpend:"Erlebnisse",edit:"Bearbeiten",remove:"Entfernen",actualExpensesEyebrow:"TATSÄCHLICHE AUSGABEN",actualExpensesTitle:"Echte Ausgaben erfassen",actualExpensesNote:"Erfasse, was die Gruppe tatsächlich bezahlt. Diese Beträge werden getrennt von den Reiseplan-Schätzungen geführt.",expenseDescription:"Wofür hast du bezahlt?",expenseDescriptionPlaceholder:"z. B. Flughafentaxi",expenseCategory:"Kategorie",expenseAmount:"Gesamtbetrag der Gruppe",expenseDate:"Datum",addExpense:"＋ Ausgabe hinzufügen",actualSpendGroup:"Tatsächliche Ausgaben (Gruppe)",actualSpendPerPerson:"Tatsächlich pro Person",actualBudgetLeft:"Verbleibendes Gruppenbudget",noExpenses:"Noch keine Ausgaben erfasst.",removeExpense:"Ausgabe entfernen",expensesCurrencyNote:"Gib den Gesamtbetrag für die Gruppe in der ausgewählten Währung ein."},
    it: {home:"Home",essentials:"Accessori da viaggio",language:"Lingua",talkToTravlzi:"Contatta Travlzi ↗",plannerEyebrow:"IL TUO VIAGGIO, A MODO TUO",introTitle:"Lascia spazio a",introEm:"bei momenti.",introSub:"Crea un itinerario flessibile, sposta le attività e guarda il viaggio sulla mappa.",setupEyebrow:"PRIMA, IL QUADRO GENERALE",tripDetails:"Dettagli del viaggio",destination:"Dove vuoi andare?",startingFrom:"Partenza da",startDate:"Data di inizio",endDate:"Data di fine",travellers:"Viaggiatori",travelStyle:"Stile di viaggio",budgetPerson:"Budget per persona",buildItinerary:"Crea il mio itinerario",formNote:"Il piano viene salvato in questo browser. Non serve un account. Esportalo per condividerlo.",itinerary:"IL TUO ITINERARIO",addActivity:"＋ Aggiungi attività",exportTrip:"↓ Esporta viaggio",print:"Stampa",tripDuration:"Durata del viaggio",plannedActivities:"Attività pianificate",budgetPersonShort:"Budget per persona",travelPace:"Ritmo del viaggio",moveThings:"SPOSTA LE ATTIVITÀ",dayByDay:"Il tuo programma giorno per giorno",dragHint:"↕ Trascina le schede per riordinarle",activityLibraryEyebrow:"NON PERDERE NESSUNA IDEA",activityLibrary:"Attività disponibili",libraryFor:"Idee per",libraryNote:". Rimuovere un'attività dal piano non la elimina da questo elenco.",daysUnit:"giorni",travellersUnit:"viaggiatori",from:"da",balancedStyle:"Un po' di tutto",relaxedStyle:"Lento e rilassato",adventureStyle:"Avventura",cultureStyle:"Cultura e cucina",familyStyle:"Adatto alle famiglie",budgetStyle:"Attento al budget",searchActivities:"Cerca attività",searchPlaceholder:"Cerca luoghi, cibo, natura…",addToWhichDay:"Aggiungi al giorno",filterCategory:"Categoria",allCategories:"Tutte le categorie",attraction:"Attrazioni",food:"Cibo",nature:"Natura",culture:"Cultura",stay:"Alloggio",transport:"Trasporti",freeTime:"Tempo libero",maybeLater:"PER DOPO",ideasToFit:"Idee da inserire",ideasNote:"Conserva qui i luoghi interessanti finché non decidi dove inserirli.",keepItReal:"TIENI D'OCCHIO LE SPESE",budgetSnapshot:"Riepilogo del budget",currency:"Valuta",groupBudget:"Budget totale del gruppo",plannedSpend:"Spesa stimata per le attività",plannedPerPerson:"Previsto a persona",leftPerPerson:"Rimanente a persona",dailyAllowance:"Budget giornaliero",budgetNote:"I costi delle attività sono stime per persona. Modificali per aggiornare il riepilogo.",seeBigPicture:"PANORAMICA",tripMap:"Mappa del viaggio",plannedStop:"Tappa pianificata",savedIdea:"Idea salvata",needInspiration:"Serve un po' d'ispirazione?",inspirationNote:"Lascia spazio al riposo, alla cucina locale e alle scoperte inattese.",suggestTweak:"Suggerisci una modifica ↗",humanTouchEyebrow:"UN PICCOLO AIUTO FA LA DIFFERENZA",humanTouch:"Vuoi un aiuto personalizzato?",humanTouchNote:"Travlzi può trasformare la tua bozza in un viaggio ricco di dettagli.",makeItYours:"PERSONALIZZA",activityName:"Nome dell'attività o del luogo",shortNote:"Nota breve",day:"Giorno",time:"Ora",category:"Categoria",estimatedCost:"Costo stimato per persona",locationOptional:"Posizione (facoltativa, per la mappa)",keepAsIdea:"Salva come idea",addToItinerary:"Aggiungi all'itinerario",stop:"tappa",stops:"tappe",places:"luoghi",added:"Aggiunto",addToDay:"Aggiungi al giorno",noActivities:"Nessuna attività corrisponde ai filtri.",activitySpend:"Spesa per attività",foodSpend:"Cibo",transportSpend:"Trasporti",staySpend:"Alloggio",experienceSpend:"Esperienze",edit:"Modifica",remove:"Rimuovi",actualExpensesEyebrow:"SPESE REALI",actualExpensesTitle:"Registra le spese effettive",actualExpensesNote:"Annota quanto paga davvero il gruppo. Questi importi restano separati dalle stime dell'itinerario.",expenseDescription:"Per cosa hai pagato?",expenseDescriptionPlaceholder:"es. Taxi per l'aeroporto",expenseCategory:"Categoria",expenseAmount:"Importo totale del gruppo",expenseDate:"Data",addExpense:"＋ Aggiungi spesa",actualSpendGroup:"Spesa effettiva (gruppo)",actualSpendPerPerson:"Effettiva per persona",actualBudgetLeft:"Budget residuo del gruppo",noExpenses:"Nessuna spesa registrata.",removeExpense:"Elimina spesa",expensesCurrencyNote:"Inserisci l'importo totale pagato dal gruppo nella valuta selezionata."},
    ja: {home:"ホーム",essentials:"旅行の必需品",language:"言語",talkToTravlzi:"Travlziに相談 ↗",plannerEyebrow:"自分らしい旅を",introTitle:"心に残る時間を",introEm:"たっぷり楽しもう。",introSub:"自由に旅程を作成し、予定を入れ替えながら地図で旅を確認できます。",setupEyebrow:"まずは旅の概要から",tripDetails:"旅行の詳細",destination:"旅行先は？",startingFrom:"出発地",startDate:"開始日",endDate:"終了日",travellers:"旅行人数",travelStyle:"旅行スタイル",budgetPerson:"1人あたりの予算",buildItinerary:"旅程を作成",formNote:"旅程はこのブラウザーに保存されます。アカウントは不要です。エクスポートして共有できます。",itinerary:"旅行プラン",addActivity:"＋ アクティビティを追加",exportTrip:"↓ 旅行プランをエクスポート",print:"印刷",tripDuration:"旅行期間",plannedActivities:"予定アクティビティ",budgetPersonShort:"1人あたりの予算",travelPace:"旅行ペース",moveThings:"予定を自由に変更",dayByDay:"日ごとのプラン",dragHint:"↕ カードをドラッグして並べ替え",activityLibraryEyebrow:"アイデアを見つけよう",activityLibrary:"追加できるアクティビティ",libraryFor:"おすすめ：",libraryNote:"。プランから削除しても、この一覧には残ります。",daysUnit:"日",travellersUnit:"人",from:"出発地",balancedStyle:"バランスよく",relaxedStyle:"ゆったり",adventureStyle:"冒険",cultureStyle:"文化と食",familyStyle:"家族向け",budgetStyle:"節約重視",searchActivities:"アクティビティを検索",searchPlaceholder:"場所、食事、自然を検索…",addToWhichDay:"追加する日",filterCategory:"カテゴリー",allCategories:"すべて",attraction:"観光スポット",food:"食事",nature:"自然",culture:"文化",stay:"宿泊",transport:"交通",freeTime:"自由時間",maybeLater:"あとで追加",ideasToFit:"追加候補",ideasNote:"行き先を決めるまで、気になる場所をここに保存できます。",keepItReal:"予算を確認",budgetSnapshot:"予算サマリー",currency:"通貨",groupBudget:"グループ全体の予算",plannedSpend:"予定アクティビティ費用",plannedPerPerson:"1人あたりの予定額",leftPerPerson:"1人あたりの残額",dailyAllowance:"1日あたりの予算",budgetNote:"アクティビティ費用は1人あたりの概算です。費用を編集するとサマリーも更新されます。",seeBigPicture:"全体を見る",tripMap:"旅行マップ",plannedStop:"予定スポット",savedIdea:"保存したアイデア",needInspiration:"アイデアが必要ですか？",inspirationNote:"休憩や地元の食事、思いがけない発見のための時間も確保しましょう。",suggestTweak:"調整案を提案 ↗",humanTouchEyebrow:"ちょっとしたサポート",humanTouch:"旅の相談をしませんか？",humanTouchNote:"Travlziが旅程をより充実した旅行に仕上げるお手伝いをします。",makeItYours:"自分好みに編集",activityName:"アクティビティ・場所の名前",shortNote:"メモ",day:"日",time:"時間",category:"カテゴリー",estimatedCost:"1人あたりの予算目安",locationOptional:"場所（地図用・任意）",keepAsIdea:"アイデアとして保存",addToItinerary:"旅程に追加",stop:"か所",stops:"か所",places:"件",added:"追加済み",addToDay:"日に追加",noActivities:"条件に一致するアクティビティはありません。",activitySpend:"アクティビティ費用",foodSpend:"食事",transportSpend:"交通",staySpend:"宿泊",experienceSpend:"体験",edit:"編集",remove:"削除",actualExpensesEyebrow:"実際の支出",actualExpensesTitle:"実際に使った金額を記録",actualExpensesNote:"グループが実際に支払った金額を記録します。旅程の見積もりとは別に管理されます。",expenseDescription:"何に支払いましたか？",expenseDescriptionPlaceholder:"例：空港タクシー",expenseCategory:"カテゴリー",expenseAmount:"グループ全体の支払額",expenseDate:"日付",addExpense:"＋ 支出を追加",actualSpendGroup:"実際の支出（グループ）",actualSpendPerPerson:"1人あたりの実支出",actualBudgetLeft:"グループ予算の残額",noExpenses:"支出はまだ登録されていません。",removeExpense:"支出を削除",expensesCurrencyNote:"選択中の通貨で、グループ全体の支払額を入力してください。"}
  };
  for (const [code, pack] of Object.entries(foreignDictionaries)) dictionaries[code] = {...dictionaries.en, ...pack};
  const expenseTranslations = {
    hi:{actualExpensesEyebrow:"वास्तविक खर्च",actualExpensesTitle:"वास्तविक खर्च दर्ज करें",actualExpensesNote:"समूह ने वास्तव में कितना भुगतान किया, उसे दर्ज करें। यह अनुमानित खर्च से अलग रहेगा।",expenseDescription:"किस चीज़ के लिए भुगतान किया?",expenseDescriptionPlaceholder:"जैसे एयरपोर्ट टैक्सी",expenseCategory:"श्रेणी",expenseAmount:"पूरे समूह का भुगतान",expenseDate:"तारीख",addExpense:"＋ खर्च जोड़ें",actualSpendGroup:"वास्तविक खर्च (समूह)",actualSpendPerPerson:"प्रति व्यक्ति वास्तविक खर्च",actualBudgetLeft:"समूह का शेष बजट",noExpenses:"अभी कोई खर्च दर्ज नहीं है।",removeExpense:"खर्च हटाएँ",expensesCurrencyNote:"चुनी हुई मुद्रा में समूह द्वारा चुकाई गई कुल राशि दर्ज करें।"},
    kn:{actualExpensesEyebrow:"ನಿಜವಾದ ಖರ್ಚು",actualExpensesTitle:"ನಿಜವಾದ ವೆಚ್ಚ ದಾಖಲಿಸಿ",actualExpensesNote:"ಗುಂಪು ನಿಜವಾಗಿ ಪಾವತಿಸಿದ ಮೊತ್ತವನ್ನು ದಾಖಲಿಸಿ. ಇದು ಅಂದಾಜು ವೆಚ್ಚದಿಂದ ಪ್ರತ್ಯೇಕವಾಗಿರುತ್ತದೆ.",expenseDescription:"ಯಾವುದಕ್ಕಾಗಿ ಪಾವತಿಸಿದ್ದೀರಿ?",expenseDescriptionPlaceholder:"ಉದಾ. ವಿಮಾನ ನಿಲ್ದಾಣದ ಟ್ಯಾಕ್ಸಿ",expenseCategory:"ವರ್ಗ",expenseAmount:"ಗುಂಪಿನ ಒಟ್ಟು ಪಾವತಿ",expenseDate:"ದಿನಾಂಕ",addExpense:"＋ ವೆಚ್ಚ ಸೇರಿಸಿ",actualSpendGroup:"ನಿಜವಾದ ವೆಚ್ಚ (ಗುಂಪು)",actualSpendPerPerson:"ಪ್ರತಿ ವ್ಯಕ್ತಿಯ ನಿಜವಾದ ವೆಚ್ಚ",actualBudgetLeft:"ಗುಂಪಿನ ಉಳಿದ ಬಜೆಟ್",noExpenses:"ಇನ್ನೂ ವೆಚ್ಚಗಳನ್ನು ದಾಖಲಿಸಿಲ್ಲ.",removeExpense:"ವೆಚ್ಚ ತೆಗೆದುಹಾಕಿ",expensesCurrencyNote:"ಆಯ್ಕೆ ಮಾಡಿದ ಕರೆನ್ಸಿಯಲ್ಲಿ ಗುಂಪು ಪಾವತಿಸಿದ ಒಟ್ಟು ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ."},
    ta:{actualExpensesEyebrow:"உண்மையான செலவுகள்",actualExpensesTitle:"உண்மையான செலவுகளைப் பதிவு செய்யுங்கள்",actualExpensesNote:"குழு உண்மையில் செலுத்திய தொகையைப் பதிவு செய்யுங்கள். இது திட்ட மதிப்பீட்டிலிருந்து தனியாக இருக்கும்.",expenseDescription:"எதற்காகச் செலுத்தினீர்கள்?",expenseDescriptionPlaceholder:"எ.கா. விமான நிலைய டாக்ஸி",expenseCategory:"வகை",expenseAmount:"குழுவின் மொத்தத் தொகை",expenseDate:"தேதி",addExpense:"＋ செலவைச் சேர்",actualSpendGroup:"உண்மையான செலவு (குழு)",actualSpendPerPerson:"ஒருவருக்கான உண்மையான செலவு",actualBudgetLeft:"குழுவின் மீதமுள்ள பட்ஜெட்",noExpenses:"இன்னும் செலவுகள் பதிவு செய்யப்படவில்லை.",removeExpense:"செலவை நீக்கு",expensesCurrencyNote:"தேர்ந்தெடுத்த நாணயத்தில் குழு செலுத்திய மொத்தத் தொகையை உள்ளிடுங்கள்."},
    te:{actualExpensesEyebrow:"నిజమైన ఖర్చులు",actualExpensesTitle:"నిజమైన ఖర్చులను నమోదు చేయండి",actualExpensesNote:"గ్రూప్ నిజంగా చెల్లించిన మొత్తాన్ని నమోదు చేయండి. ఇది అంచనా ఖర్చుల నుంచి వేరుగా ఉంటుంది.",expenseDescription:"దేనికి చెల్లించారు?",expenseDescriptionPlaceholder:"ఉదా. విమానాశ్రయ టాక్సీ",expenseCategory:"వర్గం",expenseAmount:"గ్రూప్ మొత్తం చెల్లింపు",expenseDate:"తేదీ",addExpense:"＋ ఖర్చు జోడించండి",actualSpendGroup:"నిజమైన ఖర్చు (గ్రూప్)",actualSpendPerPerson:"ఒక్కొక్కరి నిజమైన ఖర్చు",actualBudgetLeft:"గ్రూప్ మిగిలిన బడ్జెట్",noExpenses:"ఇంకా ఖర్చులు నమోదు కాలేదు.",removeExpense:"ఖర్చు తొలగించండి",expensesCurrencyNote:"ఎంచుకున్న కరెన్సీలో గ్రూప్ చెల్లించిన మొత్తం నమోదు చేయండి."},
    ml:{actualExpensesEyebrow:"യഥാർത്ഥ ചെലവുകൾ",actualExpensesTitle:"യഥാർത്ഥ ചെലവുകൾ രേഖപ്പെടുത്തുക",actualExpensesNote:"യാത്രാസംഘം യഥാർത്ഥത്തിൽ നൽകിയ തുക രേഖപ്പെടുത്തുക. ഇത് കണക്കാക്കിയ ചെലവിൽ നിന്ന് വേറെയാണ്.",expenseDescription:"എന്തിനാണ് പണം ചെലവാക്കിയത്?",expenseDescriptionPlaceholder:"ഉദാ. എയർപോർട്ട് ടാക്സി",expenseCategory:"വിഭാഗം",expenseAmount:"സംഘത്തിന്റെ ആകെ തുക",expenseDate:"തീയതി",addExpense:"＋ ചെലവ് ചേർക്കുക",actualSpendGroup:"യഥാർത്ഥ ചെലവ് (സംഘം)",actualSpendPerPerson:"ഒരാൾക്കുള്ള യഥാർത്ഥ ചെലവ്",actualBudgetLeft:"സംഘത്തിന്റെ ശേഷിക്കുന്ന ബജറ്റ്",noExpenses:"ചെലവുകൾ ഇതുവരെ രേഖപ്പെടുത്തിയിട്ടില്ല.",removeExpense:"ചെലവ് നീക്കുക",expensesCurrencyNote:"തിരഞ്ഞെടുത്ത കറൻസിയിൽ സംഘം നൽകിയ ആകെ തുക നൽകുക."},
    mr:{actualExpensesEyebrow:"प्रत्यक्ष खर्च",actualExpensesTitle:"प्रत्यक्ष खर्च नोंदवा",actualExpensesNote:"गटाने प्रत्यक्ष किती पैसे दिले ते नोंदवा. हा खर्च अंदाजित खर्चापेक्षा वेगळा असेल.",expenseDescription:"कशासाठी पैसे दिले?",expenseDescriptionPlaceholder:"उदा. विमानतळ टॅक्सी",expenseCategory:"प्रकार",expenseAmount:"संपूर्ण गटाने दिलेली रक्कम",expenseDate:"दिनांक",addExpense:"＋ खर्च जोडा",actualSpendGroup:"प्रत्यक्ष खर्च (गट)",actualSpendPerPerson:"प्रति व्यक्ती प्रत्यक्ष खर्च",actualBudgetLeft:"गटाचे उर्वरित बजेट",noExpenses:"अद्याप खर्च नोंदवलेला नाही.",removeExpense:"खर्च काढा",expensesCurrencyNote:"निवडलेल्या चलनात गटाने दिलेली एकूण रक्कम भरा."},
    bn:{actualExpensesEyebrow:"প্রকৃত খরচ",actualExpensesTitle:"প্রকৃত খরচ লিখে রাখুন",actualExpensesNote:"দল বাস্তবে কত খরচ করেছে তা লিখুন। এটি পরিকল্পনার আনুমানিক খরচ থেকে আলাদা থাকবে।",expenseDescription:"কীসের জন্য খরচ হয়েছে?",expenseDescriptionPlaceholder:"যেমন বিমানবন্দরের ট্যাক্সি",expenseCategory:"বিভাগ",expenseAmount:"পুরো দলের মোট খরচ",expenseDate:"তারিখ",addExpense:"＋ খরচ যোগ করুন",actualSpendGroup:"প্রকৃত খরচ (দল)",actualSpendPerPerson:"প্রতি ব্যক্তির প্রকৃত খরচ",actualBudgetLeft:"দলের অবশিষ্ট বাজেট",noExpenses:"এখনও কোনো খরচ লেখা হয়নি।",removeExpense:"খরচ মুছুন",expensesCurrencyNote:"নির্বাচিত মুদ্রায় দলের মোট দেওয়া অর্থ লিখুন।"}
  };
  for (const [code, pack] of Object.entries(expenseTranslations)) Object.assign(dictionaries[code], pack);

  const localeByLanguage = {en:"en-IN",hi:"hi-IN",kn:"kn-IN",ta:"ta-IN",te:"te-IN",ml:"ml-IN",mr:"mr-IN",bn:"bn-IN",es:"es-ES",fr:"fr-FR",de:"de-DE",it:"it-IT",ja:"ja-JP"};
  const t = key => (dictionaries[state.trip?.language||"en"]||dictionaries.en)[key] || dictionaries.en[key] || key;
  const money = value => {
    const requested=state.trip?.currency||"INR";
    const currency=state.currencyRates?.[requested]?requested:"INR";
    const rate=Number(state.currencyRates?.[currency]||1);
    return new Intl.NumberFormat(localeByLanguage[state.trip?.language||"en"]||"en-IN",{style:"currency",currency,maximumFractionDigits:0}).format((Number(value)||0)*rate);
  };
  const toINR = value => (Number(value)||0)/Number(state.currencyRates?.[state.trip?.currency||"INR"]||1);
  const fromINR = value => (Number(value)||0)*Number(state.currencyRates?.[state.trip?.currency||"INR"]||1);

  const uid = () => "a"+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
  const destinations = {
    goa:{name:"Goa",lat:15.4909,lon:73.8278,places:[
      ["Breakfast by the beach","Ease into the day with a relaxed breakfast near the water.","Food","08:30",650,15.2993,73.9122],
      ["Fort Aguada","Explore the historic fort and its sweeping sea views.","Culture","10:30",50,15.4923,73.7737],
      ["Lunch in Panjim","Try a local Goan thali and regional flavours.","Food","13:00",900,15.4989,73.8278],
      ["Fontainhas heritage walk","Wander through colourful lanes and old Portuguese-era homes.","Culture","16:00",0,15.4982,73.8310],
      ["Sunset at Vagator","Finish the day with a coastal sunset.","Nature","17:45",0,15.5975,73.7355],
      ["Spice plantation visit","Discover tropical spices and a traditional lunch.","Nature","10:00",1200,15.4167,74.0550],
      ["Kayaking or watersports","Choose a water activity that suits the season and conditions.","Attraction","15:00",1500,15.5330,73.7660]
    ]},
    kerala:{name:"Kerala",lat:9.9312,lon:76.2673,places:[
      ["Fort Kochi walk","Explore the waterfront, heritage lanes and cafés.","Culture","08:30",0,9.9658,76.2421],
      ["Chinese fishing nets","See the iconic fishing nets along the harbour.","Attraction","10:00",0,9.9667,76.2425],
      ["Kerala lunch","Try a traditional Kerala sadya or local seafood.","Food","13:00",650,9.9312,76.2673],
      ["Mattancherry Palace","Discover Kerala's layered history and murals.","Culture","15:00",20,9.9570,76.2590],
      ["Sunset ferry","Take a scenic ferry ride across the harbour.","Nature","17:30",100,9.9670,76.2500],
      ["Backwater day trip","Slow down with a backwater cruise and village views.","Nature","09:00",1800,9.4981,76.3388]
    ]},
    bali:{name:"Bali",lat:-8.4095,lon:115.1889,places:[
      ["Ubud morning market","Browse crafts, fruit and local treats.","Culture","08:30",100, -8.5069,115.2625],
      ["Tegallalang rice terraces","Walk through Bali's iconic green terraces.","Nature","10:30",150,-8.4312,115.2792],
      ["Local Balinese lunch","Take a break for nasi campur and fresh juice.","Food","13:00",180, -8.5069,115.2625],
      ["Tirta Empul temple","Visit the historic water temple respectfully.","Culture","15:00",100,-8.4150,115.3150],
      ["Campuhan ridge walk","Enjoy a gentle late-afternoon nature walk.","Nature","17:00",0,-8.5005,115.2550],
      ["Beach sunset","Leave the evening open for the coast.","Nature","17:45",0,-8.7200,115.1680]
    ]},
    kyoto:{name:"Kyoto",lat:35.0116,lon:135.7681,places:[
      ["Nishiki Market","Sample local snacks and browse food stalls.","Food","09:00",0,35.0050,135.7648],
      ["Fushimi Inari","Walk beneath the famous torii gates.","Culture","10:30",0,34.9671,135.7727],
      ["Traditional lunch","Enjoy a seasonal Japanese set meal.","Food","13:00",1800,35.0037,135.7681],
      ["Kiyomizu-dera","Explore the hillside temple and city views.","Culture","15:00",500,34.9949,135.7850],
      ["Gion evening stroll","Discover the historic streets at a respectful pace.","Culture","17:30",0,35.0036,135.7785]
    ]},
    interlaken:{name:"Interlaken",lat:46.6863,lon:7.8632,places:[
      ["Höhematte park","Start with open views of the Jungfrau peaks.","Nature","09:00",0,46.6867,7.8632],
      ["Harder Kulm viewpoint","Ride up for a panoramic view over Interlaken.","Attraction","10:30",4000,46.7010,7.8510],
      ["Swiss lunch","Try a local café and a hearty Swiss meal.","Food","13:00",2500,46.6863,7.8632],
      ["Lake Brienz lakeside","Enjoy the turquoise lake and mountain scenery.","Nature","15:00",0,46.7540,7.9580],
      ["Old town evening","Browse the town centre and enjoy a relaxed dinner.","Food","18:00",2200,46.6863,7.8632]
    ]},
    inverness:{name:"Inverness",lat:57.4778,lon:-4.2247,places:[
      ["River Ness walk","Follow the riverside paths into the city.","Nature","09:00",0,57.4770,-4.2240],
      ["Inverness Castle viewpoint","Take in the views over the River Ness.","Culture","10:30",0,57.4760,-4.2240],
      ["Highland café lunch","Pause for local produce and a warm drink.","Food","13:00",1600,57.4778,-4.2247],
      ["Leakey's Bookshop","Explore the atmospheric second-hand bookshop.","Culture","15:00",0,57.4784,-4.2253],
      ["Caledonian Canal","Enjoy an easy walk beside the canal.","Nature","17:00",0,57.4710,-4.2490]
    ]},
    pondicherry:{name:"Pondicherry",lat:11.9416,lon:79.8083,places:[
      ["Promenade Beach sunrise","Enjoy an early walk along the seafront promenade.","Nature","06:00",0,11.9354,79.8426],
      ["White Town / French Quarter","Explore the heritage streets and colourful colonial-era facades on foot.","Culture","08:00",0,11.9340,79.8356],
      ["Sri Aurobindo Ashram","Visit the ashram quietly and follow the visitor guidance on site.","Culture","10:00",0,11.9322,79.8350],
      ["Bharathi Park and French War Memorial","Take a relaxed walk through the green heart of the heritage quarter.","Attraction","11:30",0,11.9311,79.8330],
      ["Pondicherry lunch","Try local Tamil flavours and the town's café culture.","Food","13:00",650,11.9330,79.8350],
      ["Serenity Beach","Spend the late afternoon by the coast; check sea conditions before swimming.","Nature","16:00",0,11.9688,79.8437],
      ["Auroville Visitor Centre","Explore the visitor centre and learn about the Auroville community.","Culture","09:00",0,12.0055,79.8099],
      ["Matrimandir viewing area","Visit the designated viewing area; check current access and booking guidance first.","Attraction","10:30",0,12.0059,79.8084],
      ["Chunnambar Boat House","Check local boat availability and conditions for a trip towards Paradise Beach.","Attraction","14:00",300,11.8769,79.8140],
      ["Paradise Beach","Enjoy the beach if boat services and weather conditions permit.","Nature","15:00",0,11.8794,79.8172],
      ["Botanical Garden","Take a slower walk among the garden paths and greenery.","Nature","17:00",30,11.9285,79.8258]
    ]},
    agatti:{name:"Agatti Island",lat:10.8510,lon:72.1850,places:[
      ["Lagoon morning","Enjoy the clear lagoon and a gentle beach walk.","Nature","08:00",0,10.8510,72.1850],
      ["Snorkelling session","Explore the reef only with an authorised local operator and suitable conditions.","Attraction","10:00",1800,10.8500,72.1860],
      ["Island lunch","Try a simple local meal and fresh coconut.","Food","13:00",700,10.8510,72.1850],
      ["Coastal village walk","Explore the island respectfully with local guidance.","Culture","16:00",0,10.8550,72.1900],
      ["Lagoon sunset","Keep the evening open for the water and changing light.","Nature","17:30",0,10.8510,72.1850]
    ]}
  };
  const state = {trip:null,map:null,markers:[],route:null,dragId:null,toastTimer:null,customCenter:null,currencyRates:{INR:1},currencyRateDate:null,geoLookupFor:null,lastGeocodeAt:0};
  const RATE_CACHE_KEY="travlzi.currencyRates.v1";
  const supportedCurrencies=["INR","USD","EUR","GBP","AED","SGD","AUD","CAD","JPY","THB","LKR","MYR"];
  const currencyNames={INR:"Indian Rupee",USD:"US Dollar",EUR:"Euro",GBP:"British Pound",AED:"UAE Dirham",SGD:"Singapore Dollar",AUD:"Australian Dollar",CAD:"Canadian Dollar",JPY:"Japanese Yen",THB:"Thai Baht",LKR:"Sri Lankan Rupee",MYR:"Malaysian Ringgit"};
  function applyLanguage(){
    const lang=state.trip?.language||"en";
    document.documentElement.lang=localeByLanguage[lang]||lang;
    document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=t(el.dataset.i18n);});
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{el.placeholder=t(el.dataset.i18nPlaceholder);});
    $("language-select").value=lang;
    syncCurrencyLabels();
  }
  function syncCurrencyLabels(){
    const requested=state.trip?.currency||"INR";
    const code=state.currencyRates?.[requested]?requested:"INR";
    $("budget-input-label").textContent=t("budgetPerson")+" ("+code+")";
    $("activity-cost-label").textContent=t("estimatedCost")+" ("+code+")";
    if($("expense-amount-label"))$("expense-amount-label").textContent=t("expenseAmount")+" ("+code+")";
  }
  async function loadCurrencyRates(){
    $("currency-select").disabled=true;
    try{
      const cached=JSON.parse(localStorage.getItem(RATE_CACHE_KEY)||"null");
      if(cached&&cached.rates&&cached.rates.INR===undefined){
        state.currencyRates={INR:1,...cached.rates};
        state.currencyRateDate=cached.date||"";
      }
      const fresh=cached&&cached.savedAt&&(Date.now()-cached.savedAt)<20*60*60*1000;
      if(!fresh){
        const response=await fetch("https://open.er-api.com/v6/latest/INR");
        if(!response.ok)throw new Error("Currency service returned "+response.status);
        const data=await response.json();
        if(data.result!=="success"||!data.rates)throw new Error("Currency rates unavailable");
        state.currencyRates={INR:1,...data.rates};
        state.currencyRateDate=data.time_last_update_utc||data.time_last_update||"";
        localStorage.setItem(RATE_CACHE_KEY,JSON.stringify({rates:data.rates,date:state.currencyRateDate,savedAt:Date.now()}));
      }
      if(!state.currencyRates[state.trip.currency])state.trip.currency="INR";
      $("currency-select").value=state.trip.currency;
      $("currency-select").disabled=false;
      $("currency-rate-note").textContent=state.trip.currency==="INR"?"Amounts shown in INR.":("INR conversion rates · "+(state.currencyRateDate||"latest available"));
      syncCurrencyLabels();setFormFromTrip();render();
    }catch(error){
      console.warn("Currency conversion rates unavailable.",error);
      if(!state.currencyRates[state.trip.currency])state.trip.currency="INR";
      $("currency-select").value=state.trip.currency;$("currency-select").disabled=false;
      $("currency-rate-note").textContent=state.trip.currency==="INR"?"Currency rates unavailable. Showing INR.":"Showing the last cached conversion rate.";
      syncCurrencyLabels();setFormFromTrip();render();
    }
  }
  function changeCurrency(code){
    if(!supportedCurrencies.includes(code)||!state.currencyRates[code]){
      $("currency-select").value=state.trip.currency||"INR";
      toast("This currency rate is not available right now.");return;
    }
    const budgetInr=toINR($("budget").value);
    let activityCostInr=null,expenseAmountInr=null;
    if($("activity-dialog").open)activityCostInr=toINR($("activity-cost").value);
    if($("expense-amount")&&$("expense-amount").value!=="")expenseAmountInr=toINR($("expense-amount").value);
    state.trip.budget=budgetInr;state.trip.currency=code;
    $("budget").value=Math.round(fromINR(state.trip.budget));
    if(activityCostInr!==null)$("activity-cost").value=Math.round(fromINR(activityCostInr));
     if(expenseAmountInr!==null)$("expense-amount").value=fromINR(expenseAmountInr).toFixed(2);
    $("currency-select").value=code;
    $("currency-rate-note").textContent=code==="INR"?"Amounts shown in INR.":("INR conversion rates · "+(state.currencyRateDate||"latest available"));
    syncCurrencyLabels();applyLanguage();render();save(true);
  }
  function changeLanguage(code){
    if(!dictionaries[code])return;
    state.trip.language=code;applyLanguage();render();save(true);
  }
  function defaultTrip(){
    const start=addDays(iso(today),14),end=addDays(start,2);
    return {destination:"Goa",origin:"Bengaluru",startDate:start,endDate:end,travellers:2,travelStyle:"balanced",budget:25000,currency:"INR",language:"en",days:[],ideas:[],expenses:[],updatedAt:null};
  }
  function tripKey(destination){
    const key=String(destination||"").trim().toLowerCase();
    if(!key)return null;
    if(key.includes("pondicherry")||key.includes("puducherry"))return "pondicherry";
    return Object.keys(destinations).find(k=>key===k||key.includes(k)||destinations[k].name.toLowerCase()===key)||null;
  }
  function customPlaces(destination){
    const name=String(destination||"your destination").trim();
    return [
      ["Explore "+name+" town centre","Start with a gentle walk through the main streets and get your bearings.","Attraction","09:00",0],
      ["Visit a local landmark","Choose a well-known landmark or heritage site that interests you.","Culture","10:30",0],
      ["Regional food stop","Try a local breakfast or a popular regional dish.","Food","12:30",500],
      ["Discover a local market","Browse everyday markets, crafts and local produce.","Culture","15:00",0],
      ["A relaxed neighbourhood walk","Explore a nearby neighbourhood at an unhurried pace.","Nature","16:30",0],
      ["Local dinner","Finish the day with a local restaurant or café.","Food","19:00",700],
      ["Optional day trip","Add a nearby town, nature spot or experience after checking travel time.","Attraction","09:00",0],
      ["Free time","Leave a little room for rest and spontaneous discoveries.","Free time","16:00",0]
    ];
  }
  function makeActivity(place,dayIndex){
    return {id:uid(),name:place[0],note:place[1],category:place[2],time:place[3],cost:place[4],lat:place[5],lon:place[6],day:dayIndex};
  }
  function buildDays(trip){
    const count=Math.max(1,Math.min(14,Math.round((new Date(trip.endDate+"T12:00:00")-new Date(trip.startDate+"T12:00:00"))/86400000)+1));
    const key=tripKey(trip.destination),data=key?destinations[key]:null,places=data?data.places:customPlaces(trip.destination);
    return Array.from({length:count},(_,i)=>{
      const selected=places.filter((_,n)=>n%count===i || (count===1&&n<5)).slice(0,5);
      return {date:addDays(trip.startDate,i),activities:selected.map(p=>makeActivity(p,i))};
    });
  }
  function toast(message){
    const el=$("toast");el.textContent=message;el.classList.add("show");
    clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>el.classList.remove("show"),2600);
  }
  function save(silent=false){
    try{state.trip.updatedAt=new Date().toISOString();localStorage.setItem(STORE_KEY,JSON.stringify(state.trip));$("save-state").textContent="Saved in this browser";if(!silent)toast("Your trip is saved on this device.");}
    catch(error){$("save-state").textContent="Could not save";toast("Browser storage is unavailable. Export your trip to keep a copy.");}
  }
  function load(){
    try{
      const saved=JSON.parse(localStorage.getItem(STORE_KEY)||"null");
      if(saved&&saved.destination&&Array.isArray(saved.days)){
        const savedKey=tripKey(saved.destination);
        const oldStops=saved.days.flatMap(day=>day.activities||[]).map(a=>String(a.name||"")+" "+String(a.note||"")).join(" ").toLowerCase();
        const staleGoaPlan=savedKey!=="goa"&&/fort aguada|fontainhas|panjim|vagator|goan thali/.test(oldStops);
        if(staleGoaPlan){saved.days=buildDays(saved);saved.ideas=[];saved.expenses=[];}
        if(!supportedCurrencies.includes(saved.currency))saved.currency="INR";
        if(!dictionaries[saved.language])saved.language="en";
        if(!Array.isArray(saved.ideas))saved.ideas=[];
         if(!Array.isArray(saved.expenses))saved.expenses=[];
        return saved;
      }
    }catch(error){}
    const trip=defaultTrip();trip.days=buildDays(trip);return trip;
  }
  function setFormFromTrip(){
    const t=state.trip;
    $("destination").value=t.destination;$("origin").value=t.origin;$("start-date").value=t.startDate;$("end-date").value=t.endDate;
    $("travellers").value=String(t.travellers);$("travel-style").value=t.travelStyle;
    $("budget").value=Math.round(fromINR(t.budget));
    if($("currency-select"))$("currency-select").value=t.currency||"INR";
    if($("language-select"))$("language-select").value=t.language||"en";
    syncCurrencyLabels();
  }
  function updateTripFromForm(){
    const start=$("start-date").value,end=$("end-date").value;
    if(!start||!end||end<start){toast("Please choose a valid trip date range.");return false;}
    const next={destination:$("destination").value.trim(),origin:$("origin").value.trim(),startDate:start,endDate:end,travellers:Number($("travellers").value),travelStyle:$("travel-style").value,budget:toINR(Number($("budget").value)||0),currency:state.trip.currency||"INR",language:state.trip.language||"en",days:state.trip.days,ideas:state.trip.ideas||[],expenses:state.trip.expenses||[],updatedAt:null};
    if(!next.destination){toast("Add a destination to build your trip.");return false;}
    const oldCount=state.trip.days.length,newCount=Math.min(14,Math.round((new Date(end+"T12:00:00")-new Date(start+"T12:00:00"))/86400000)+1);
    const destinationChanged=next.destination.toLowerCase()!==String(state.trip.destination||"").toLowerCase();
    if(destinationChanged||oldCount!==newCount||state.trip.startDate!==start||state.trip.endDate!==end){
      next.days=buildDays(next);
      next.ideas=destinationChanged?[]:(state.trip.ideas||[]);
      if(destinationChanged)next.expenses=[];
    }
    state.trip=next;return true;
  }
  function fmtDate(date){return new Intl.DateTimeFormat(localeByLanguage[state.trip?.language||"en"]||"en-IN",{weekday:"short",day:"numeric",month:"short"}).format(new Date(date+"T12:00:00"));}
  function styleLabel(value){return t(({balanced:"balancedStyle",relaxed:"relaxedStyle",adventure:"adventureStyle",culture:"cultureStyle",family:"familyStyle",budget:"budgetStyle"})[value]||"balancedStyle");}
  function allActivities(){return state.trip.days.flatMap((day,index)=>day.activities.map(a=>({...a,day:index}))).concat((state.trip.ideas||[]).map(a=>({...a,day:-1})));}
  function renderActivity(activity,idea=false){
    const card=document.createElement("article");card.className=idea?"idea-card":"activity-card";card.draggable=true;card.dataset.id=activity.id;card.dataset.idea=String(idea);
    card.addEventListener("dragstart",event=>{state.dragId=activity.id;card.classList.add("dragging");event.dataTransfer.effectAllowed="move";event.dataTransfer.setData("text/plain",activity.id);});
    card.addEventListener("dragend",()=>{state.dragId=null;card.classList.remove("dragging");document.querySelectorAll(".drag-over").forEach(el=>el.classList.remove("drag-over"));});
    const handle=document.createElement("span");handle.className="drag-handle";handle.textContent="⠿";handle.setAttribute("aria-hidden","true");
    const time=document.createElement("span");time.className="activity-time";time.textContent=activity.time||"Anytime";
    const info=document.createElement("div");info.className="activity-info";
    const title=document.createElement("strong");title.textContent=activity.name;
    const note=document.createElement("p");note.textContent=activity.note||activity.category||"Added to your trip";
    info.append(title,note);
    const meta=document.createElement("div");meta.className="activity-meta";
    const category=document.createElement("span");category.className="category-pill";category.textContent=t((activity.category||"Activity").toLowerCase())||activity.category||"Activity";
    const cost=document.createElement("span");cost.className="activity-cost";cost.textContent=Number(activity.cost)>0?money(activity.cost):"Free";
    meta.append(category,cost);
    if(idea){
      const add=document.createElement("button");add.type="button";add.className="idea-add";add.textContent=t("addToDay");add.addEventListener("click",()=>moveActivity(activity.id,0));meta.append(add);
      card.append(handle,time,info,meta);return card;
    }
    const edit=document.createElement("button");edit.type="button";edit.className="activity-edit";edit.textContent=t("edit");edit.addEventListener("click",()=>openEditDialog(activity));
    const remove=document.createElement("button");remove.type="button";remove.className="activity-remove";remove.textContent="×";remove.setAttribute("aria-label",t("remove")+" "+activity.name);remove.addEventListener("click",()=>removeActivity(activity.id));
    meta.append(edit,remove);card.append(handle,time,info,meta);return card;
  }
  function attachDropZone(zone,dayIndex,ideas=false){
    zone.addEventListener("dragover",event=>{event.preventDefault();zone.classList.add("drag-over");});
    zone.addEventListener("dragleave",event=>{if(!zone.contains(event.relatedTarget))zone.classList.remove("drag-over");});
    zone.addEventListener("drop",event=>{event.preventDefault();zone.classList.remove("drag-over");const id=event.dataTransfer.getData("text/plain")||state.dragId;if(id)moveActivity(id,dayIndex,ideas);});
  }
  function updateDayOptions(select,selected=0){
    select.replaceChildren();
    state.trip.days.forEach((day,i)=>{const o=document.createElement("option");o.value=String(i);o.textContent=t("day")+" "+(i+1)+" · "+fmtDate(day.date);select.append(o);});
    select.value=String(Math.max(0,Math.min(state.trip.days.length-1,selected)));
  }
  function renderDays(){
    const container=$("days-container");container.replaceChildren();
    state.trip.days.forEach((day,index)=>{
      const section=document.createElement("section");section.className="day-card";section.dataset.day=index;
      const head=document.createElement("div");head.className="day-heading";
      const left=document.createElement("div"),title=document.createElement("strong"),date=document.createElement("small");
      title.textContent=t("day")+" "+(index+1);date.textContent=fmtDate(day.date);left.append(title,date);
      const count=document.createElement("span");count.className="day-count";count.textContent=day.activities.length+" "+(day.activities.length===1?t("stop"):t("stops"));head.append(left,count);
      const list=document.createElement("div");list.className="activity-list";list.dataset.day=index;
      day.activities.forEach(activity=>list.append(renderActivity(activity)));
      if(!day.activities.length){const empty=document.createElement("p");empty.className="day-drop-hint";empty.textContent=t("noActivities");list.append(empty);}
      attachDropZone(list,index,false);section.append(head,list);container.append(section);
    });
    updateDayOptions($("library-day-select"),Number($("library-day-select").value)||0);
  }
  function renderIdeas(){
    const list=$("unscheduled-list");list.replaceChildren();
    (state.trip.ideas||[]).forEach(a=>list.append(renderActivity(a,true)));
    if(!(state.trip.ideas||[]).length){const p=document.createElement("p");p.className="empty-state";p.textContent=t("ideasNote");list.append(p);}
    attachDropZone(list,-1,true);$("idea-count").textContent=(state.trip.ideas||[]).length+" "+t("places");
  }
  function libraryPlaces(){
    const key=tripKey(state.trip.destination);
    return key?destinations[key].places:customPlaces(state.trip.destination);
  }
  function isInItinerary(name){
    return state.trip.days.some(day=>day.activities.some(a=>a.name.toLowerCase()===String(name).toLowerCase()));
  }
  function addLibraryActivity(index){
    const place=libraryPlaces()[index];if(!place)return;
    if(isInItinerary(place[0])){toast(t("added"));return;}
    const dayIndex=Number($("library-day-select").value)||0;
    state.trip.days[dayIndex].activities.push(makeActivity(place,dayIndex));
    render();save(true);toast(t("added")+": "+place[0]);
  }
  function renderLibrary(){
    const host=$("activity-library-list");host.replaceChildren();
    const places=libraryPlaces(),query=$("library-search").value.trim().toLowerCase(),categoryFilter=$("library-category").value;
    $("library-destination").textContent=state.trip.destination;
    $("library-count").textContent=places.length+" "+t("places");
    const matches=places.map((place,index)=>({place,index})).filter(({place})=>
      (categoryFilter==="all"||place[2]===categoryFilter)&&
      (!query||(place[0]+" "+place[1]+" "+place[2]).toLowerCase().includes(query)));
    if(!matches.length){const empty=document.createElement("p");empty.className="empty-state";empty.textContent=t("noActivities");host.append(empty);return;}
    matches.forEach(({place,index})=>{
      const item=document.createElement("article");item.className="library-item";
      const info=document.createElement("div");info.className="library-item-info";
      const title=document.createElement("strong");title.textContent=place[0];
      const note=document.createElement("p");note.textContent=place[1];
      const meta=document.createElement("span");meta.className="library-item-meta";
      meta.textContent=(t(String(place[2]||"").toLowerCase())||place[2])+" · "+(Number(place[4])>0?money(place[4]):"Free");
      info.append(title,note,meta);
      const add=document.createElement("button");add.type="button";add.className="library-add-button";
      const planned=isInItinerary(place[0]);add.textContent=planned?t("added"):t("addToDay");add.disabled=planned;
      add.addEventListener("click",()=>addLibraryActivity(index));
      item.append(info,add);host.append(item);
    });
  }
  function renderStats(){
    const tTrip=state.trip,stops=tTrip.days.reduce((sum,d)=>sum+d.activities.length,0),days=tTrip.days.length;
    const budgetPerPerson=Number(tTrip.budget)||0,groupBudget=budgetPerPerson*(Number(tTrip.travellers)||1);
    const scheduledActivities=tTrip.days.flatMap(day=>day.activities);
    const plannedPerPerson=scheduledActivities.reduce((sum,a)=>sum+(Number(a.cost)||0),0);
    const groupSpend=plannedPerPerson*(Number(tTrip.travellers)||1),remaining=budgetPerPerson-plannedPerPerson;
    $("trip-title").textContent=tTrip.destination+" getaway";
    $("trip-subtitle").textContent=days+" "+(days===1?t("day"):t("daysUnit"))+" · "+tTrip.travellers+" "+t("travellersUnit")+" · "+t("from")+" "+(tTrip.origin||"your city");
    $("stat-days").textContent=days+" "+(days===1?t("day"):t("daysUnit"));$("stat-stops").textContent=stops+" "+t("stops");$("stat-budget").textContent=money(budgetPerPerson);$("stat-pace").textContent=styleLabel(tTrip.travelStyle);
    $("budget-total").textContent=money(groupBudget);
    $("budget-progress-text").textContent=money(groupSpend)+" / "+money(groupBudget);
    $("budget-planned").textContent=money(plannedPerPerson);
    $("budget-remaining").textContent=money(remaining);
    $("budget-remaining").classList.toggle("over-budget",remaining<0);
    $("budget-daily").textContent=money(days?Math.max(0,remaining)/days:Math.max(0,remaining));
    const pct=groupBudget?Math.min(100,Math.max(0,groupSpend/groupBudget*100)):0;
    $("budget-bar-fill").style.width=pct+"%";
    const totals={food:0,transport:0,stay:0,experiences:0};
    scheduledActivities.forEach(a=>{
      const cost=Number(a.cost)||0,kind=String(a.category||"").toLowerCase();
      if(kind==="food")totals.food+=cost;
      else if(kind==="transport")totals.transport+=cost;
      else if(kind==="stay")totals.stay+=cost;
      else totals.experiences+=cost;
    });
    const breakdown=$("budget-category-list");breakdown.replaceChildren();
    [["foodSpend",totals.food],["transportSpend",totals.transport],["staySpend",totals.stay],["experienceSpend",totals.experiences]].filter(([,value])=>value>0).forEach(([key,value])=>{
      const row=document.createElement("div");row.className="budget-category-row";
      const label=document.createElement("span");label.textContent=t(key);
      const amount=document.createElement("strong");amount.textContent=money(value);
      row.append(label,amount);breakdown.append(row);
    });
    if(!breakdown.children.length){const empty=document.createElement("span");empty.className="empty-state";empty.textContent=t("noActivities");breakdown.append(empty);}
  }

  function renderExpenses(){
    const expenses=Array.isArray(state.trip.expenses)?state.trip.expenses:[];
    const travellers=Math.max(1,Number(state.trip.travellers)||1);
    const total=expenses.reduce((sum,item)=>sum+(Number(item.amount)||0),0);
    const groupBudget=(Number(state.trip.budget)||0)*travellers;
    $("actual-total").textContent=money(total);
    $("actual-per-person").textContent=money(total/travellers);
    $("actual-remaining").textContent=money(groupBudget-total);
    $("actual-remaining").classList.toggle("over-budget",groupBudget-total<0);
    const host=$("actual-expense-list");host.replaceChildren();
    if(!expenses.length){const empty=document.createElement("p");empty.className="empty-state";empty.textContent=t("noExpenses");host.append(empty);return;}
    [...expenses].sort((a,b)=>String(b.date||"").localeCompare(String(a.date||""))).forEach(item=>{
      const row=document.createElement("article");row.className="expense-item";
      const info=document.createElement("div");info.className="expense-item-info";
      const title=document.createElement("strong");title.textContent=item.description||"Expense";
      const meta=document.createElement("span");const categoryLabel=item.category==="Experience"?t("experienceSpend"):t(String(item.category||"").toLowerCase());
      meta.textContent=fmtDate(item.date||iso(today))+" · "+categoryLabel;
      info.append(title,meta);
      const amount=document.createElement("strong");amount.className="expense-item-amount";amount.textContent=money(item.amount);
      const remove=document.createElement("button");remove.type="button";remove.className="expense-remove";remove.textContent="×";remove.setAttribute("aria-label",t("removeExpense")+" "+(item.description||""));
      remove.addEventListener("click",()=>removeExpense(item.id));
      row.append(info,amount,remove);host.append(row);
    });
  }
  function removeExpense(id){
    state.trip.expenses=(state.trip.expenses||[]).filter(item=>item.id!==id);
    render();save(true);toast(t("removeExpense"));
  }
  function addExpense(event){
    event.preventDefault();
    const description=$("expense-description").value.trim();
    const amount=toINR(Number($("expense-amount").value)||0);
    if(!description||!(amount>0)){toast("Add a description and an amount greater than zero.");return;}
    state.trip.expenses=state.trip.expenses||[];
    state.trip.expenses.push({id:uid(),description,category:$("expense-category").value,date:$("expense-date").value||iso(today),amount});
    $("expense-form").reset();$("expense-date").value=iso(today);
    render();save(true);toast(t("addExpense"));
  }

  function mapCenter(){
    const key=tripKey(state.trip.destination),d=key?destinations[key]:null;
    return d?[d.lat,d.lon]:(state.customCenter||[20.5937,78.9629]);
  }
  function mapZoom(){
    return tripKey(state.trip.destination)||state.customCenter?11:4;
  }
  async function resolveDestinationMapCenter(){
    const destination=String(state.trip.destination||"").trim();
    const signature=destination.toLowerCase();
    if(state.geoLookupFor===signature)return;
    state.geoLookupFor=signature;
    if(tripKey(destination)){state.customCenter=null;return;}
    try{
      const query=encodeURIComponent(destination);
      const response=await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+query,{headers:{Accept:"application/json"}});
      if(!response.ok)return;
      const results=await response.json();
      if(results[0]){
        state.customCenter=[Number(results[0].lat),Number(results[0].lon)];
        if(state.map)state.map.setView(state.customCenter,11);
      }
    }catch(error){console.info("Could not centre the map for this custom destination.");}
  }
  function initMap(){
    if(!window.L){$("trip-map").innerHTML='<p class="empty-state" style="padding:20px">Map library could not load. Your itinerary still works without the map.</p>';return;}
    state.map=L.map("trip-map",{scrollWheelZoom:false}).setView(mapCenter(),mapZoom());
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"&copy; OpenStreetMap"}).addTo(state.map);
    renderMap();
  }
  function renderMap(){
    if(!state.map)return;
    state.markers.forEach(m=>m.remove());state.markers=[];
    if(state.route){state.route.remove();state.route=null;}
    const items=allActivities().filter(a=>Number.isFinite(Number(a.lat))&&Number.isFinite(Number(a.lon)));
    const points=[];
    items.forEach((a,i)=>{
      const isIdea=a.day===-1;
      const marker=L.circleMarker([Number(a.lat),Number(a.lon)],{radius:8,color:isIdea?"#b97835":"#087f8c",fillColor:isIdea?"#efb56f":"#43b7a5",fillOpacity:.95,weight:2}).addTo(state.map);
      marker.bindPopup("<strong>"+escapeHtml(a.name)+"</strong><span>"+(isIdea?"Saved idea":"Day "+(a.day+1)+" · "+escapeHtml(a.time||""))+"</span>");
      state.markers.push(marker);if(!isIdea)points.push([Number(a.lat),Number(a.lon)]);
    });
    if(points.length>1)state.route=L.polyline(points,{color:"#087f8c",weight:3,opacity:.65,dashArray:"5 7"}).addTo(state.map);
    if(items.length)state.map.fitBounds(items.map(a=>[Number(a.lat),Number(a.lon)]),{padding:[25,25],maxZoom:13});
    else state.map.setView(mapCenter(),mapZoom());
    setTimeout(()=>state.map.invalidateSize(),80);
  }
  function escapeHtml(text){return String(text).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function render(){
    renderDays();renderIdeas();renderLibrary();renderStats();renderExpenses();renderMap();
  }
  function moveActivity(id,targetDay,asIdea=false){
    let activity=null;
    state.trip.days.forEach(day=>{const i=day.activities.findIndex(a=>a.id===id);if(i>=0)activity=day.activities.splice(i,1)[0];});
    const ideaIndex=(state.trip.ideas||[]).findIndex(a=>a.id===id);if(ideaIndex>=0)activity=state.trip.ideas.splice(ideaIndex,1)[0];
    if(!activity)return;
    if(asIdea||targetDay<0){state.trip.ideas.push(activity);}
    else{const day=Math.max(0,Math.min(state.trip.days.length-1,targetDay));activity.day=day;state.trip.days[day].activities.push(activity);}
    render();save(true);
  }
  function removeActivity(id){
    state.trip.days.forEach(day=>day.activities=day.activities.filter(a=>a.id!==id));
    state.trip.ideas=(state.trip.ideas||[]).filter(a=>a.id!==id);render();save(true);toast("Activity removed.");
  }
  function openDialog(){
    updateDayOptions($("activity-day"),0);
    const form=$("activity-form");form.dataset.mode="add";delete form.dataset.activityId;
    $("activity-name").value="";$("activity-note").value="";$("activity-time").value="10:00";$("activity-cost").value="0";$("activity-location").value="";
    $("dialog-title").textContent=t("addActivity");$("activity-submit-button").textContent=t("addToItinerary");$("save-as-idea").hidden=false;
    $("activity-dialog").showModal();
  }
  function openEditDialog(activity){
    updateDayOptions($("activity-day"),Number.isInteger(activity.day)?activity.day:0);
    const form=$("activity-form");form.dataset.mode="edit";form.dataset.activityId=activity.id;
    $("activity-name").value=activity.name||"";$("activity-note").value=activity.note||"";$("activity-time").value=activity.time==="Anytime"?"":(activity.time||"");
    $("activity-cost").value=Math.round(fromINR(Number(activity.cost)||0));$("activity-location").value=activity.location||"";
    $("activity-category").value=activity.category||"Attraction";
    $("dialog-title").textContent=t("edit")+" activity";$("activity-submit-button").textContent=t("edit");$("save-as-idea").hidden=true;
    $("activity-dialog").showModal();
  }
  function activityFromForm(){
    const name=$("activity-name").value.trim();if(!name){toast("Give your activity a name first.");return null;}
    const activity={name,note:$("activity-note").value.trim(),time:$("activity-time").value||"Anytime",category:$("activity-category").value,cost:toINR(Number($("activity-cost").value)||0),location:$("activity-location").value.trim()};
    return activity;
  }
  async function geocode(activity){
    if(!activity.location)return;
    try{
      const query=encodeURIComponent(activity.location+", "+state.trip.destination);
      const cacheKey="travlzi.geo."+query;
      const cached=JSON.parse(localStorage.getItem(cacheKey)||"null");
      if(cached&&Number.isFinite(cached.lat)&&Number.isFinite(cached.lon)){activity.lat=cached.lat;activity.lon=cached.lon;return;}
      const wait=Math.max(0,1100-(Date.now()-state.lastGeocodeAt));
      if(wait)await new Promise(resolve=>setTimeout(resolve,wait));
      state.lastGeocodeAt=Date.now();
      const response=await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+query,{headers:{Accept:"application/json"}});
      if(!response.ok)return;const results=await response.json();
      if(results[0]){
        activity.lat=Number(results[0].lat);activity.lon=Number(results[0].lon);
        localStorage.setItem(cacheKey,JSON.stringify({lat:activity.lat,lon:activity.lon}));
      }
    }catch(error){console.info("Could not look up this activity location.");}
  }
  async function submitActivity(asIdea=false){
    const a=activityFromForm();if(!a)return;
    const form=$("activity-form"),mode=form.dataset.mode||"add",existingId=form.dataset.activityId;
    const dayIndex=Number($("activity-day").value)||0;
    if(mode==="edit"&&existingId){
      let existing=null;
      state.trip.days.forEach(day=>{const found=day.activities.find(item=>item.id===existingId);if(found)existing=found;});
      if(!existing){toast("That activity is no longer in the itinerary.");$("activity-dialog").close();return;}
      const locationChanged=a.location&&a.location!==existing.location;
      const updated={...existing,...a,id:existing.id,lat:existing.lat,lon:existing.lon,day:dayIndex};
      if(locationChanged)await geocode(updated);
      state.trip.days.forEach(day=>day.activities=day.activities.filter(item=>item.id!==existingId));
      state.trip.days[dayIndex].activities.push(updated);
      toast("Activity updated.");
    }else{
      const activity={...a,id:uid(),day:dayIndex};
      await geocode(activity);
      if(asIdea)state.trip.ideas.push(activity);else state.trip.days[dayIndex].activities.push(activity);
      toast(asIdea?t("keepAsIdea"):t("added"));
    }
    $("activity-dialog").close();render();save(true);
  }
  function exportTrip(){
    const blob=new Blob([JSON.stringify({product:"Travlzi",exportedAt:new Date().toISOString(),trip:state.trip},null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="travlzi-"+state.trip.destination.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-trip.json";a.click();URL.revokeObjectURL(url);toast("Trip exported as JSON.");
  }
  async function smartBuild(){
    if(!updateTripFromForm())return;
    const endpoint=window.TRAVLZI_CONFIG&&window.TRAVLZI_CONFIG.aiEndpoint;
    if(endpoint){
      try{
        const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({destination:state.trip.destination,origin:state.trip.origin,startDate:state.trip.startDate,endDate:state.trip.endDate,travellers:state.trip.travellers,style:state.trip.travelStyle,budgetPerPerson:state.trip.budget})});
        if(!response.ok)throw new Error("Planner service returned "+response.status);
        const data=await response.json();
        if(Array.isArray(data.days)&&data.days.length){state.trip.days=data.days;render();save(true);toast("Your personalised itinerary is ready.");return;}
      }catch(error){console.warn("AI itinerary endpoint unavailable; using local starter plan.",error);}
    }
    state.trip.days=buildDays(state.trip);state.trip.ideas=[];state.customCenter=null;
    render();save(true);await resolveDestinationMapCenter();
    toast("A starter itinerary is ready. Drag, edit and make it yours.");
  }
  function suggestTweak(){
    const ideas=[
      "Try leaving one afternoon free for an unplanned discovery.",
      "Add a local breakfast or food market to experience the destination like a local.",
      "Group nearby attractions on the same day to reduce travel time.",
      "Keep your first day light so there is room for the journey and check-in.",
      "Add a nature stop or viewpoint around sunset for a slower finish."
    ];
    const suggestion=ideas[Math.floor(Math.random()*ideas.length)];toast(suggestion);
  }
  $("trip-form").addEventListener("submit",event=>{event.preventDefault();smartBuild();});
  $("expense-form").addEventListener("submit",addExpense);
  $("add-activity-button").addEventListener("click",openDialog);
  $("activity-form").addEventListener("submit",event=>{event.preventDefault();submitActivity(false);});
  $("save-as-idea").addEventListener("click",()=>submitActivity(true));
  $("dialog-close").addEventListener("click",()=>$("activity-dialog").close());
  $("activity-dialog").addEventListener("click",event=>{if(event.target===$("activity-dialog"))$("activity-dialog").close();});
  $("export-button").addEventListener("click",exportTrip);
  $("print-button").addEventListener("click",()=>window.print());
  $("suggest-button").addEventListener("click",suggestTweak);
  $("map-reset").addEventListener("click",()=>{if(state.map)state.map.setView(mapCenter(),mapZoom());});
  $("trip-form").addEventListener("change",()=>{if(updateTripFromForm()){render();save(true);resolveDestinationMapCenter();}});
  $("language-select").addEventListener("change",event=>changeLanguage(event.target.value));
  $("currency-select").addEventListener("change",event=>changeCurrency(event.target.value));
  $("library-search").addEventListener("input",renderLibrary);
  $("library-category").addEventListener("change",renderLibrary);
  $("library-day-select").addEventListener("change",()=>{});
  $("whatsapp-planner").addEventListener("click",event=>{
    const number="918147728538";const text="Hi Travlzi! I'd like help planning a "+state.trip.days.length+"-day trip to "+state.trip.destination+" from "+state.trip.origin+".";
    event.currentTarget.href="https://wa.me/"+number+"?text="+encodeURIComponent(text);
  });
  state.trip=load();setFormFromTrip();$("expense-date").value=iso(today);applyLanguage();renderStats();initMap();render();save(true);resolveDestinationMapCenter();loadCurrencyRates();
})();