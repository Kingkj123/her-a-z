/* Her A–Z: extra guides, topic areas and sources. Loaded after the main script. */
(function(){
"use strict";
Object.assign(AREAS,{
  skin:"Skin & hair",
  gut:"Gut & digestion",
  head:"Head & nerves",
  energy:"Energy & sleep",
  everyday:"Everyday & hard to talk about"
});
Object.assign(SOURCES,{
  hfea:{n:"Human Fertilisation and Embryology Authority (HFEA)",u:"https://www.hfea.gov.uk"},
  mt:{n:"The Migraine Trust",u:"https://migrainetrust.org"},
  bhf:{n:"British Heart Foundation",u:"https://www.bhf.org.uk"},
  refuge:{n:"Refuge (National Domestic Abuse Helpline)",u:"https://www.refuge.org.uk"},
  wa:{n:"Women's Aid",u:"https://www.womensaid.org.uk"},
  bad:{n:"British Association of Dermatologists",u:"https://www.bad.org.uk"},
  ibsn:{n:"The IBS Network",u:"https://www.theibsnetwork.org"},
  sam:{n:"Samaritans",u:"https://www.samaritans.org"}
});
const ALL=["teen","repro","preg","meno","later"];
const added=[];
function A(id,name,aka,short,stages,areas,tags,summary,symptoms,causes,diagnosis,manage,ask,urgent,src){
  if(ENTRIES.some(e=>e.id===id))return;
  const e={id,name,aka,short,stages,areas,tags,summary,symptoms,causes,diagnosis,manage,ask,urgent,src,more:true};
  ENTRIES.push(e);added.push(e);
}

/* ---------- Periods, cycles and hormones ---------- */
A("first-periods","Your first periods","Starting menstruation",
"Most girls get their first period between about 8 and 16. The first few cycles are often irregular.",
["teen"],["repro"],["Irregular periods","Painful periods"],
"Periods usually start around two years after breast development begins. Early cycles can be unpredictable, light or heavy, and gaps of several weeks or even months are common at first.",
["Light spotting or brown discharge before a first full period","Cramps in the lower tummy","Mood changes, tender breasts and feeling tired","Cycles that vary a lot for the first couple of years"],
["Hormones that control the cycle take time to settle into a pattern","Body weight, stress and very intense exercise can affect timing"],
["A GP or school nurse can check growth and development if periods haven't started by 16","Blood tests or a scan are only needed if something looks unusual"],
["Keep pads or period pants in your bag and track dates so you can spot a pattern","Heat and simple painkillers can ease cramps (follow the packet advice)","Change products regularly. Tampons should be changed every 4 to 8 hours","Talk to someone you trust. Needing help with periods is normal"],
["Is my bleeding normal for my age?","What can I do about period pain?","What should I do if I start to miss periods?"],
["Pain that stops you doing normal things","Very heavy bleeding that soaks through protection every hour","Sudden high fever with a rash, vomiting or feeling faint while using a tampon (toxic shock syndrome). Call 999."],
["nhs","rcog"]);

A("irregular-periods","Irregular periods","Unpredictable cycles",
"Cycles that are often shorter than 21 days or longer than 35, or that change a lot from month to month.",
["teen","repro","meno"],["repro","horm"],["Irregular periods","Bleeding between periods"],
"A typical cycle is about 21 to 35 days, but everyone is different. Irregular periods are common and often settle, but they can also point to something that needs treatment, such as PCOS or a thyroid problem.",
["Cycles shorter than 21 or longer than 35 days","Gaps between periods that change by more than a week or so","Skipped periods","Periods that are suddenly much heavier or lighter"],
["The first years after periods start, and perimenopause","PCOS, thyroid conditions and raised prolactin","Stress, big weight changes and very intense exercise","Contraception, breastfeeding and some medicines"],
["Your GP will ask about your cycle and may do a pregnancy test","Blood tests (including thyroid and hormones) and sometimes an ultrasound scan"],
["Keep a record of period dates and flow for a few months","Treating the cause, for example thyroid medicine or support for PCOS","Hormonal contraception can regulate bleeding if you don't want to get pregnant","Healthy eating, regular sleep and managing stress help some people"],
["Could my irregular periods be linked to a hormone problem?","Which tests do I need?","Do I need treatment if I only get a few periods a year?"],
["Heavy bleeding that soaks through protection every hour for several hours","Sudden severe one-sided tummy pain, especially if there's a chance you could be pregnant"],
["nhs","rcog","nice"]);

A("bleeding-between-periods","Bleeding between periods","Intermenstrual bleeding or spotting",
"Spotting or bleeding at times when you wouldn't expect a period, or after sex.",
["repro","meno"],["repro","cancer"],["Bleeding between periods","Irregular periods"],
"Light spotting around ovulation or when starting contraception is common. Bleeding that keeps happening, or bleeding after sex, should be checked, because causes range from simple (hormones, polyps) to ones that need treatment.",
["Spots or streaks of blood between periods","Bleeding after sex","Unusual discharge","Pelvic pain or pain during sex"],
["Contraception, especially in the first months of a new method or if a pill is missed","Cervical or womb polyps, infections and ovulation spotting","Cervical changes and, less commonly, cancer","Pregnancy or early pregnancy loss"],
["Your doctor may offer a pregnancy test, swabs for infection and a pelvic examination","An ultrasound scan, or hysteroscopy (a thin camera into the womb) can be used if needed"],
["Treatment depends on the cause, such as treating an infection or changing contraception","Polyps can usually be removed in a short procedure","Keep a note of when bleeding happens and how heavy it is"],
["What could be causing my bleeding?","Do I need a scan or a cervical check?","Is it connected to my contraception?"],
["Bleeding that soaks through protection every hour","Bleeding with severe pain, dizziness or fainting","Any bleeding after menopause. See postmenopausal bleeding."],
["nhs","jos","rcog"]);

A("postmenopausal-bleeding","Bleeding after menopause","Postmenopausal bleeding",
"Any vaginal bleeding after 12 months without a period should be checked promptly, even if it is light.",
["meno","later"],["repro","cancer"],["Bleeding between periods"],
"Bleeding after menopause is common, and most of the time the cause is not cancer. Still, it can sometimes be an early sign of womb cancer, so a quick check matters. Early checking means problems are found when treatment works best.",
["Spotting or bleeding of any amount after your periods have stopped for a year","Pink, brown or watery discharge","Pain in the pelvis or during sex"],
["Thinning and dryness of the vaginal lining (atrophy)","Polyps in the womb or cervix","Thickening of the womb lining, or womb cancer","HRT, especially in the first months or if the regimen is changed"],
["Your GP will usually refer you quickly for checks","A pelvic ultrasound to measure the womb lining and sometimes a hysteroscopy or biopsy"],
["Treatment depends on what is found, such as vaginal oestrogen for dryness or removing a polyp","Don't wait to see if it stops. Book an appointment as soon as you notice it"],
["How soon will I be seen?","Which tests will I have?","Could my HRT be causing this?"],
["Heavy bleeding or bleeding with dizziness or severe pain"],
["nhs","eve","cruk"]);

A("endometrial-hyperplasia","Endometrial hyperplasia","Thickened womb lining",
"The lining of the womb becomes too thick. It is not cancer, but some types can raise the risk of it later.",
["repro","meno"],["repro","cancer"],["Heavy periods","Bleeding between periods"],
"Hyperplasia happens when oestrogen is not balanced by progesterone, so the womb lining keeps growing. Many cases are treated successfully with hormones and regular check-ups.",
["Heavy periods or bleeding between periods","Bleeding after menopause","Irregular or missed periods"],
["Long gaps without ovulation, such as with PCOS or perimenopause","Higher body weight, which raises oestrogen levels","Oestrogen-only HRT in someone who still has a womb","Some medicines such as tamoxifen"],
["A transvaginal ultrasound to measure the lining","A biopsy of the womb lining to see the type of cells (with or without atypia)"],
["Progestogen treatment, often the hormonal coil (intrauterine system) or tablets","Regular follow-up biopsies to check the lining","Surgery to remove the womb is sometimes advised for atypical hyperplasia, particularly if childbearing is complete","Weight loss, if relevant, can lower oestrogen levels"],
["Which type of hyperplasia do I have?","What treatment suits me if I want to have children?","How often will I need follow-up checks?"],
["Heavy bleeding or any bleeding after menopause that hasn't been checked"],
["nhs","rcog","eve"]);

A("womb-and-cervical-polyps","Polyps in the womb or cervix","Endometrial and cervical polyps",
"Small, usually harmless growths that can cause spotting or bleeding after sex.",
["repro","meno"],["repro"],["Bleeding between periods","Heavy periods"],
"Polyps are soft, finger-like growths. Most are not cancer. Many cause no symptoms, but they can cause irregular bleeding and can sometimes make it harder to get pregnant.",
["Spotting between periods or after sex","Heavier periods","Bleeding after menopause","Discharge","Often no symptoms at all"],
["Linked to changes in how the body responds to oestrogen","More common in the 40s and 50s"],
["Cervical polyps can often be seen at an examination","Womb polyps are found on an ultrasound or during hysteroscopy"],
["Cervical polyps can usually be removed quickly in clinic","Womb polyps are removed through hysteroscopy, often as a day case","Removed polyps are checked in a lab"],
["Do I need this polyp removed?","Will it affect my fertility?","Could it come back?"],
["Heavy bleeding or bleeding after menopause that hasn't been checked"],
["nhs","rcog"]);

A("vaginal-dryness-gsm","Vaginal dryness and menopause changes","Genitourinary syndrome of menopause",
"Dryness, soreness and urinary symptoms that often start around menopause and tend to get worse without treatment.",
["meno","later"],["repro","urinary","sexual"],["Painful sex","Frequent urination"],
"Falling oestrogen thins and dries the vaginal and bladder tissues. It is very common but many women don't mention it. Treatment is safe and effective for most people.",
["Dryness, itching or burning","Pain or tearing during sex","Needing to pee more often or more urgently","Repeated urine infections"],
["Falling oestrogen levels at perimenopause and after","Breastfeeding and some cancer treatments can have a similar effect"],
["Usually diagnosed from your symptoms and an examination","Tests are used to rule out infection or other skin conditions"],
["Regular vaginal moisturisers and lubricants during sex","Vaginal oestrogen (creams, pessaries or a ring) works locally and is suitable for most people. Ask your GP, including if you have had breast cancer","Pelvic floor exercises and gentle regular intimacy can help keep tissues healthy"],
["Is vaginal oestrogen suitable for me?","Which moisturiser or lubricant should I use?","Could this be causing my urine infections?"],
["Bleeding after menopause"],
["nhs","mp","nice"]);

A("pelvic-organ-prolapse","Pelvic organ prolapse","Prolapse, cystocele, rectocele",
"When the bladder, womb or bowel bulges into the vagina because the pelvic floor is weakened.",
["repro","preg","meno","later"],["urinary","repro"],["Urine leaks","Pelvic pain"],
"Prolapse is common, particularly after childbirth and after menopause. Many women have mild prolapse without symptoms, and there are effective non-surgical options.",
["A feeling of heaviness or dragging in the vagina","A lump you can feel or see at the vaginal opening","Urine leaks or difficulty emptying your bladder","Trouble opening your bowels","Discomfort during sex"],
["Childbirth, especially long or assisted deliveries","Menopause, long-term straining, persistent cough and heavy lifting","Genetics and connective tissue differences"],
["A pelvic examination, sometimes while you cough or strain","Referral to a gynaecologist or specialist physio for tests if needed"],
["Pelvic floor muscle training, ideally taught by a specialist physiotherapist","A pessary (a support device placed in the vagina)","Vaginal oestrogen after menopause","Surgery for symptoms that don't improve","Avoiding constipation and heavy lifting"],
["Which type of prolapse do I have?","Would a pessary help?","Can I keep exercising?"],
["Being unable to pass urine at all, or severe pain. Seek urgent help."],
["nhs","rcog","bladder"]);

A("painful-sex","Painful sex","Dyspareunia",
"Pain during or after sex. It is common, can have many causes, and shouldn't be put up with.",
["repro","preg","meno","later"],["sexual","repro"],["Painful sex","Pelvic pain"],
"Pain can be at the entrance (superficial) or deeper inside. It may come from dryness, skin conditions, muscle tension, infections or conditions such as endometriosis. Emotional factors often play a part too.",
["Burning or stinging at entry","Deep pain with thrusting","Pain that lingers after sex","Muscles tightening so that sex or tampons are hard"],
["Vaginal dryness (menopause, breastfeeding, some contraceptives)","Infections, thrush, skin conditions such as lichen sclerosus","Endometriosis, fibroids, ovarian cysts or pelvic floor muscle spasm","Anxiety, past trauma or relationship difficulties"],
["Your doctor will ask where and when it hurts and may examine you gently","Swabs, an ultrasound or referral to a specialist clinic if needed"],
["Lubricants, moisturisers and taking more time","Treating infections or skin conditions","Pelvic floor physiotherapy and graded dilator therapy","Talking therapy or psychosexual counselling","Tell your partner so you can find what feels comfortable"],
["What could be causing this?","Do I need an examination or scan?","Can I see a specialist physio or sex therapist?"],
["Pain with fever, unusual bleeding or discharge"],
["nhs","vps","rcog"]);

A("low-sex-drive","Low sex drive","Low libido",
"A lasting drop in interest in sex. It is common and can have physical, hormonal and emotional causes.",
["repro","preg","meno","later"],["sexual","mind"],["Mood changes","Fatigue"],
"Sexual desire naturally goes up and down through life. It only becomes a problem if it bothers you. Tiredness, stress, relationships, medicines and hormone changes are common reasons.",
["Less interest in sex than before","Rarely starting or enjoying sex","Distress about the change"],
["Stress, tiredness, depression and anxiety","Relationship difficulties","Medicines such as some antidepressants and hormonal contraception","Pregnancy, postnatal changes and menopause","Pain during sex"],
["Your GP will ask about your health, medicines and relationships","Blood tests may be done to rule out thyroid problems or anaemia"],
["Treat underlying causes such as tiredness, pain or low mood","Review medicines with your doctor","Sex therapy or relationship counselling can help","For some menopausal women, testosterone may be considered by a specialist if HRT alone hasn't helped"],
["Could my medicine be affecting my desire?","Is this linked to my hormones?","Can you refer me to a sex therapist?"],
["Thoughts of harming yourself. Contact NHS 111 or call 999."],
["nhs","mp","sh"]);

A("ovulation-pain","Ovulation pain","Mittelschmerz",
"A one-sided twinge or ache mid-cycle, when an egg is released.",
["teen","repro"],["repro"],["Pelvic pain"],
"Some people feel a short ache on one side of the lower tummy around ovulation. It usually lasts a few hours to a day or two and is harmless.",
["One-sided lower tummy pain around the middle of the cycle","Sharp twinge or dull ache","Sometimes light spotting"],
["The follicle stretching and releasing an egg","Small amount of fluid or blood irritating the lining of the pelvis"],
["Based on the timing of your pain across cycles","Scans or tests are only needed if pain is severe or persistent"],
["Heat and over-the-counter painkillers","Keep a symptom diary to confirm the pattern","Hormonal contraception that stops ovulation can prevent it"],
["Is this pain normal for me?","What would suggest a different cause, like endometriosis or cysts?"],
["Severe sudden pain, fever, vomiting or fainting","Pain with a chance you could be pregnant"],
["nhs","rcog"]);

A("high-prolactin","High prolactin","Hyperprolactinaemia, prolactinoma",
"Too much of the hormone that stimulates milk production. It can stop periods and affect fertility.",
["repro","meno"],["horm"],["Irregular periods","Breast changes"],
"Prolactin can be raised by pituitary growths (usually benign), some medicines, an underactive thyroid or stress. It is treatable, often with tablets.",
["Irregular or absent periods","Breast milk when not pregnant or breastfeeding","Difficulty getting pregnant","Headaches or changes in vision with larger pituitary growths","Low sex drive or vaginal dryness"],
["A prolactin-producing pituitary growth (prolactinoma)","Medicines such as some antipsychotics and anti-sickness drugs","Underactive thyroid"],
["A blood test, often repeated","An MRI scan of the pituitary gland if the level stays high"],
["Tablets such as cabergoline usually lower prolactin and shrink growths","Reviewing medicines that may be the cause","Regular monitoring by an endocrinologist"],
["Do I need a pituitary scan?","How will treatment affect fertility?","Do I need to stop my current medicine?"],
["Sudden severe headache or sudden loss of vision. Call 999."],
["nhs","nice","btf"]);

A("excess-hair-hirsutism","Excess facial and body hair","Hirsutism",
"Thick, dark hair in areas where men typically grow it, such as the chin, upper lip, chest and tummy.",
["teen","repro","meno","later"],["horm","skin"],["Irregular periods"],
"Hirsutism is common and often linked to raised androgens. PCOS is the most common cause, but it can also be a normal variation that runs in families.",
["Coarse dark hair on the face, chest, tummy or back","Acne or oily skin","Irregular periods","Thinning scalp hair"],
["PCOS","Family background and ethnicity","Rarely, adrenal or ovarian problems, or some medicines"],
["Your GP will ask about periods and may check blood hormone levels","Ultrasound if PCOS or another cause is suspected"],
["Shaving, waxing, threading or laser hair removal","Eflornithine cream can slow hair growth on the face","The combined contraceptive pill and specialist anti-androgen medicines","Support with weight and insulin resistance where relevant"],
["Could I have PCOS?","Which treatment is best if I want a pregnancy later?","Is hair removal available on the NHS?"],
["Very rapid hair growth, deepening voice or major changes over a few months"],
["nhs","rcog","bad"]);

A("contraception-choices","Contraception choices","Birth control options",
"There are many methods, from long-acting coils and implants to the pill and condoms. The best one depends on your body and your plans.",
["teen","repro","meno"],["repro","sexual"],[],
"Contraception is free through the NHS, including at GP surgeries and sexual health clinics. Long-acting methods such as the implant, coil or injection do not rely on remembering anything. Condoms are the only method that also protects against most STIs.",
["Not a condition, but it helps to know the options","Some methods change your bleeding pattern","Some methods are not suitable if you have migraine with aura, a history of clots or high blood pressure"],
["Choosing depends on health, preferences, how reversible you want it to be and how effective it needs to be"],
["A short chat with a GP, nurse or sexual health clinic","They may check blood pressure and your medical history"],
["Long-acting reversible: implant, hormonal or copper coil, injection","Pills, patch and vaginal ring","Condoms (male and female)","Sterilisation for permanent contraception","Emergency contraception: an IUD up to 5 days after sex, or pills (levonorgestrel within 3 days, ulipristal within 5 days). Available free from many clinics and pharmacies","You need contraception until 2 years after your last period if under 50, or 1 year if over 50"],
["Which method suits my health and lifestyle?","What changes should I expect to my periods?","What should I do if I miss a pill or have unprotected sex?"],
["Severe pain with a coil in place, or missed period with one-sided pain (possible ectopic pregnancy)","Calf pain, chest pain or breathlessness on hormonal contraception. Call 999."],
["nhs","sh","rcog"]);

/* ---------- Bladder, bowel and pelvic floor ---------- */
A("recurrent-uti","Recurrent urine infections","Repeat UTIs, cystitis",
"Two or more urine infections in six months, or three or more in a year.",
["teen","repro","preg","meno","later"],["urinary"],["Burning when peeing","Frequent urination"],
"Repeat infections are common, especially in women. They can be very draining, but there are ways to reduce them and it's worth getting each one confirmed with a urine test.",
["Burning or stinging when peeing","Needing to go often and urgently","Cloudy or strong-smelling urine","Pain low in the tummy"],
["Bacteria from the bowel reaching the bladder","Sex, menopause-related thinning of tissue, diabetes or not emptying the bladder fully"],
["Urine dipstick and a culture to confirm the infection","Further tests such as a scan if infections keep coming back"],
["Drink enough fluids and pee soon after sex","Vaginal oestrogen can help after menopause","Your doctor may offer a short antibiotic course or a low-dose preventive plan","Evidence for D-mannose and cranberry products is mixed. See the Supplements tab"],
["Do I need tests between infections?","Would preventive antibiotics or vaginal oestrogen suit me?","Could another condition be causing this?"],
["Fever, shivering, back or side pain, or vomiting (possible kidney infection). Get same-day help.","Blood in your urine that doesn't clear"],
["nhs","nice","bladder"]);

A("interstitial-cystitis","Bladder pain syndrome","Interstitial cystitis",
"Long-term bladder pain and urgency without a urine infection.",
["repro","meno","later"],["urinary"],["Frequent urination","Pelvic pain"],
"Bladder pain syndrome can feel like cystitis, but tests show no infection. Pain often eases after peeing and can flare with certain foods. It is treatable, and many people find a mix of approaches helps.",
["Pain or pressure in the bladder or pelvis","Needing to pee often, day and night","Pain during sex","Flare-ups linked to stress, periods or certain foods"],
["The cause isn't fully understood","It may involve the bladder lining, nerves, inflammation or pelvic floor tension"],
["Urine tests to rule out infection","Cystoscopy (a thin camera into the bladder) in some people","Diagnosis is often by exclusion"],
["Avoiding personal trigger foods and drinks, such as caffeine or citrus","Bladder training and pelvic floor physiotherapy","Medicines for pain and nerve sensitivity, and bladder treatments from a specialist","Stress management and support groups"],
["Could this be bladder pain syndrome?","Which treatments suit me?","Can I see a specialist?"],
["Fever, blood in the urine or severe back pain"],
["bladder","nhs","nice"]);

A("overactive-bladder","Overactive bladder","Urgency and urge incontinence",
"A sudden, hard-to-ignore need to pee, sometimes with leaks.",
["repro","preg","meno","later"],["urinary"],["Frequent urination","Urine leaks"],
"Overactive bladder is common, affects many women, and is not an inevitable part of ageing. Bladder training, simple changes and medicines usually help.",
["A sudden urge to pee that is hard to delay","Needing to go more than 8 times a day or waking at night","Leaking before you reach the toilet"],
["Bladder muscle squeezing at the wrong times","Caffeine, fizzy drinks, constipation or urine infection","Menopause, nerve conditions, diabetes"],
["A urine test and a bladder diary for a few days","Further tests or a referral if treatment doesn't help"],
["Bladder training, gradually extending the time between toilet visits","Cutting down on caffeine and alcohol and treating constipation","Pelvic floor exercises","Medicines such as anticholinergics or mirabegron, and treatments from a specialist"],
["Which treatment should I try first?","Could my medicines be contributing?","Do I need any tests?"],
["Blood in your urine, pain, or sudden loss of control of bladder and bowel"],
["nhs","nice","bladder"]);

A("bowel-leakage","Bowel leakage","Accidental bowel leakage, faecal incontinence",
"Leaking stool or gas without meaning to. It is more common than people realise, and help is available.",
["repro","preg","meno","later"],["urinary","gut"],["Urine leaks"],
"Bowel leakage can follow childbirth, bowel conditions or pelvic floor problems. Many women feel embarrassed, but treatments can make a big difference.",
["Leaking gas, liquid or solid stool","Sudden urgent need to go","Soreness around the anus"],
["Damage to the anal sphincter or nerves from childbirth","Diarrhoea, constipation with overflow, or irritable bowel","Prolapse, nerve conditions and some surgery"],
["Your GP will ask about your symptoms and may examine you","Tests include a scan of the sphincter or bowel tests"],
["Fibre, diet and medicines to firm or soften stool","Pelvic floor exercises and biofeedback with a physiotherapist","Specialist treatments, including surgery, when needed"],
["Is this related to childbirth?","Which tests do I need?","Can I see a pelvic health physio?"],
["Blood in the stool, new change in bowel habits or unexplained weight loss"],
["nhs","bladder","nice"]);

/* ---------- Screening, breast and cancer worries ---------- */
A("abnormal-smear-results","Abnormal cervical screening result","HPV positive, cell changes, colposcopy",
"An abnormal result is very common and rarely means cancer. Most cases are managed with monitoring or a simple treatment.",
["repro","meno","later"],["cancer","sexual"],["Bleeding between periods"],
"Screening in England first tests for HPV. If it is found, the sample is checked for cell changes. Many HPV infections clear by themselves, and cell changes can be treated before they become cancer.",
["Usually no symptoms","Bleeding after sex or between periods should be checked at any time, even with a recent normal result"],
["Persistent high-risk HPV infection","Smoking and a weakened immune system raise the risk"],
["A repeat test, usually in 12 months, if HPV is found but there are no cell changes","Colposcopy (a closer look at the cervix) if cell changes are seen"],
["Many people need only monitoring","Abnormal cells are removed in a short outpatient procedure","The HPV vaccine protects against the HPV types that cause most cervical cancers","Attend your screening when invited"],
["What does my result mean?","Do I need colposcopy?","Will treatment affect future pregnancies?"],
["Bleeding after sex, between periods or after menopause"],
["nhs","jos","cruk"]);

A("breast-pain","Breast pain","Mastalgia",
"Aching, tenderness or heaviness in one or both breasts. It is common and usually not caused by cancer.",
["teen","repro","preg","meno"],["breast"],["Breast changes","Mood changes"],
"Breast pain often follows your cycle (cyclical) and eases after your period. It can also be non-cyclical, caused by muscle strain, a poorly fitting bra or medicines. Pain on its own is rarely a sign of breast cancer.",
["Tender, heavy or aching breasts, often before a period","Pain that is worse in one area or in one breast","Burning or stabbing pain"],
["Hormone changes across the cycle, pregnancy or menopause","Ill-fitting bras, large breasts, and some medicines","Pain from chest wall or muscle can feel like breast pain"],
["Your GP will examine your breasts","A breast clinic referral and imaging if you have a lump or other changes"],
["A well-fitting supportive bra, including for sleeping or exercise","Paracetamol or anti-inflammatory gel","Review hormonal medicines with your doctor","Keep a symptom diary to see patterns"],
["Is this linked to my cycle or my medicines?","Do I need a scan?","What changes should I look out for?"],
["A new lump, skin dimpling, nipple changes or discharge, or a rash. See your GP promptly."],
["nhs","bcn","nice"]);

A("mastitis","Mastitis","Breast inflammation when breastfeeding",
"A red, hot, painful breast, often with flu-like symptoms, usually in the first weeks of breastfeeding.",
["preg"],["breast","preg"],["Breast changes"],
"Mastitis happens when milk isn't removed well from the breast or when bacteria enter through a cracked nipple. It can feel awful, but it usually improves quickly with the right care.",
["A hot, swollen, red area on the breast","Pain or a burning feeling while feeding","Fever, shivering and feeling unwell"],
["Blocked milk ducts or milk not draining fully","A poor latch, cracked nipples or sudden changes in feeds"],
["Diagnosed from symptoms and examination","A swab of the milk or a scan if an abscess is suspected"],
["Keep feeding or expressing regularly","Gentle breast massage and cold packs between feeds","Paracetamol or ibuprofen for pain","See a GP if you're no better within 12 to 24 hours, as antibiotics may be needed","Ask a feeding support service for help with latch"],
["Is it safe to carry on feeding?","Do I need antibiotics?","Could I have an abscess?"],
["High fever, feeling very unwell, or a hard painful lump that isn't improving. Get same-day help."],
["nhs","tommys"]);

A("chronic-pelvic-pain","Long-term pelvic pain","Chronic pelvic pain",
"Pelvic pain lasting six months or more that affects daily life.",
["repro","meno","later"],["repro","urinary","gut"],["Pelvic pain","Painful sex","Fatigue"],
"Long-term pelvic pain can come from the womb and ovaries, the bladder, the bowel, muscles or nerves, and often more than one. Even when no single cause is found, treatment can help.",
["Dull ache or sharp pain in the lower tummy or pelvis","Pain with periods, sex or going to the toilet","Back or leg pain","Tiredness and low mood"],
["Endometriosis or adenomyosis","Bladder pain syndrome, irritable bowel, adhesions","Pelvic floor muscle tension and nerve pain","Past surgery or childbirth injuries"],
["A pain history, examination and tests such as ultrasound","Laparoscopy (keyhole surgery) in some cases"],
["Painkillers and nerve pain medicines as advised by a doctor","Pelvic floor physiotherapy","Hormonal treatments if linked to periods","Pain management clinics and talking therapy","Pacing activity and tracking flare-ups"],
["Which conditions could be causing this?","Do I need a laparoscopy?","Can I see a pain clinic?"],
["Sudden severe pain, fever or fainting","Thoughts of harming yourself. Contact NHS 111 or call 999."],
["nhs","rcog","eu"]);

/* ---------- Menopause and midlife ---------- */
A("hrt-explained","HRT explained","Hormone replacement therapy",
"Hormone therapy that replaces the oestrogen your body makes less of. It can ease symptoms and protect bones.",
["meno","later"],["horm","bone"],["Hot flushes","Mood changes"],
"HRT replaces oestrogen, plus progestogen if you still have a womb. It treats hot flushes, night sweats, mood and sleep changes, and vaginal symptoms, and helps protect bones. Like all treatments it has benefits and risks.",
["Not a condition. It is a treatment for menopause symptoms","Types: tablets, patches, gels, sprays, and vaginal oestrogen"],
["Falling oestrogen levels during perimenopause and after"],
["Your GP can start HRT based on your symptoms. A blood test is usually not needed over 45","A review after about 3 months, then yearly"],
["Combined HRT includes progestogen to protect the womb lining","Patches and gels carry less clot risk than tablets","Combined HRT slightly raises breast cancer risk, which depends on type and duration. Ask your doctor to explain your own risk","It is not right for everyone, for example some people with a history of hormone-sensitive cancers or blood clots","Non-hormonal options exist if HRT isn't suitable"],
["Is HRT suitable for me?","Which type and dose should I start with?","How long should I stay on it?"],
["Unexpected bleeding after starting HRT that continues beyond a few months","Calf pain or swelling, chest pain or breathlessness. Call 999."],
["nhs","nice","mp"]);

A("hot-flushes-night-sweats","Hot flushes and night sweats","Vasomotor symptoms",
"Sudden waves of heat and sweating, often around menopause. They can disrupt sleep and daily life.",
["meno","later"],["horm"],["Hot flushes","Fatigue"],
"Hot flushes are the most common menopause symptom. For many women they last several years, and effective treatments are available.",
["Sudden heat spreading through the face, neck and chest","Sweating and a racing heart","Night sweats that wake you","Tiredness the next day"],
["Changing oestrogen levels affecting the body's temperature control"],
["Usually diagnosed from your age and symptoms","Tests may rule out thyroid problems if symptoms are unusual"],
["HRT is the most effective treatment for many","Non-hormonal prescription medicines can help","CBT can reduce how much flushes bother you","Layered clothing, cool bedrooms, and cutting back on triggers such as alcohol and spicy food"],
["Is HRT right for me?","What non-hormonal options are there?","Could my sweats be something else?"],
["Night sweats with fever, weight loss or swollen glands"],
["nhs","mp","nice"]);

A("joint-aches-hormones","Joint aches and stiffness","Aching joints around menopause",
"Aches and stiffness in joints and muscles are common around menopause.",
["meno","later"],["bone","horm"],["Fatigue"],
"Many women notice sore hands, knees, neck and shoulders around menopause. Oestrogen has effects on joints and inflammation, but other causes such as arthritis, thyroid problems and low vitamin D should also be considered.",
["Stiffness in the morning","Sore hands, knees, hips or shoulders","Muscle aches","Feeling less flexible"],
["Falling oestrogen","Osteoarthritis, inflammatory arthritis, thyroid problems, low vitamin D"],
["Your GP may examine your joints and request blood tests","X-rays or specialist referral if inflammation is suspected"],
["Regular movement, strength training and stretching","Weight management if relevant","HRT helps some women with joint pain","Simple pain relief as advised by a pharmacist"],
["Could this be arthritis?","Do I need blood tests?","Would HRT help my joints?"],
["A hot, swollen joint with fever","Several swollen joints lasting more than a few days"],
["nhs","mp","ros"]);

A("weight-changes-hormones","Weight changes and hormones","Hormonal weight gain",
"Weight can shift with hormones, sleep, stress and medicines. It is not a personal failing.",
["teen","repro","preg","meno","later"],["horm","everyday"],["Fatigue","Mood changes"],
"Hormone changes in PCOS, thyroid conditions, pregnancy and menopause can affect weight and where it sits on the body. Sleep, stress and some medicines also play a part. Gentle, sustainable changes work better than extreme diets.",
["Weight gain around the middle","Difficulty losing weight despite effort","Fatigue, low mood or changes to periods"],
["PCOS, underactive thyroid and menopause","Poor sleep, stress and some medicines such as steroids and certain antidepressants"],
["Your GP can check thyroid function, blood sugar and medicines","A conversation about eating, sleep and activity"],
["Regular strength and cardio exercise","A balanced, enjoyable eating pattern, ideally with advice from a dietitian","Prioritising sleep and managing stress","Treating any underlying condition","If food or weight worries are taking over your life, tell your GP. Support is available (Beat helpline)"],
["Could a hormone problem be affecting my weight?","Which tests do I need?","Can I be referred to a dietitian?"],
["Rapid unexplained weight gain or loss","Swelling in the legs or face with breathlessness"],
["nhs","nice","mind"]);

/* ---------- Skin and hair ---------- */
A("hair-loss","Hair loss and thinning","Female pattern hair loss, telogen effluvium",
"Hair thinning is common in women and has several causes, many of which are treatable.",
["teen","repro","preg","meno","later"],["skin","horm"],["Fatigue"],
"Women can lose hair gradually (often thinning at the parting) or suddenly shed more after illness, childbirth or stress. Finding the cause matters, because some are easily treated.",
["Widening parting or thinner ponytail","More hair in the brush or shower","Patches of loss","Itchy or sore scalp"],
["Genetics and hormones (female pattern hair loss), PCOS and menopause","Iron deficiency, thyroid problems and low vitamin D","Childbirth, major illness, crash dieting and stress","Tight hairstyles, harsh treatments, or alopecia areata"],
["Your GP may check iron levels (ferritin), thyroid and other bloods","A dermatologist can look at the scalp more closely"],
["Treat any underlying cause","Minoxidil is licensed for women with female pattern hair loss and needs months of regular use","Gentle hair care and avoiding tight styles","Hair pieces and support groups can help emotionally"],
["Which blood tests do I need?","Which treatment suits my type of hair loss?","Can I be referred to a dermatologist?"],
["Sudden bald patches, scalp pain, scarring or hair loss with other symptoms such as weight change"],
["nhs","bad"]);

A("hormonal-acne","Hormonal acne","Adult acne, premenstrual breakouts",
"Spots along the jawline and chin, often flaring around periods, which can continue into adult life.",
["teen","repro","meno"],["skin","horm"],["Irregular periods"],
"Acne is driven by hormones, oil production and bacteria. Adult women often get deeper, tender spots around the jaw and chin. Effective treatments exist, and scarring is easier to prevent when treatment starts early.",
["Tender spots on the chin and jawline","Flares before periods","Blackheads or oily skin","Scarring or dark marks"],
["Hormone changes and sensitivity to androgens","PCOS in some people","Some cosmetics, medicines and stress can worsen it"],
["Usually diagnosed from skin appearance","Hormone tests if there are other PCOS signs"],
["Gentle cleansing and non-comedogenic products","Benzoyl peroxide, retinoid creams or antibiotics from your GP","The combined pill or anti-androgen medicines for some women","Isotretinoin from a dermatologist for severe acne. It must not be taken in pregnancy","Avoid picking to reduce scars"],
["Which treatment should I start with?","Is a hormone problem involved?","Is it safe if I'm planning a pregnancy?"],
["Painful cysts or scarring that is developing quickly","Low mood or distress because of your skin"],
["nhs","bad","nice"]);

/* ---------- Gut and digestion ---------- */
A("bloating","Bloating","Abdominal bloating and swelling",
"A tight, full or swollen tummy. It often varies with your cycle, but persistent bloating should be checked.",
["teen","repro","preg","meno","later"],["gut","repro"],["Bloating","Fatigue"],
"Bloating is very common and often linked to periods, gas, constipation or foods. However, bloating that happens most days and doesn't come and go may need medical attention.",
["A tight, uncomfortable or swollen tummy","Wind and rumbling","Worse towards the end of the day or before periods","Changes in bowel habits"],
["Hormone shifts across the cycle","Irritable bowel syndrome, constipation and food intolerances","Coeliac disease","Less commonly, ovarian conditions or fluid in the tummy"],
["Your GP will ask about patterns and examine your tummy","Blood tests, including for coeliac disease, and sometimes a CA125 blood test and scan"],
["Keep a food and symptom diary","Regular meals, gentle movement and enough fibre and fluids","Peppermint oil may help some people","Avoid cutting out whole food groups without advice"],
["Could my bloating be linked to my periods or my bowel?","Which tests do I need?","Do I need a referral to a dietitian?"],
["Bloating that is persistent and new, especially over 50, with feeling full quickly, tummy or pelvic pain, or needing to pee more","Blood in the stool, weight loss or vomiting"],
["nhs","nice","ovca"]);

A("ibs","Irritable bowel syndrome","IBS",
"A long-term gut condition causing cramps, bloating and changes in bowel habits. Symptoms often flare around periods.",
["teen","repro","preg","meno","later"],["gut"],["Bloating","Fatigue"],
"IBS is common, more so in women, and can be triggered by stress, food and hormones. It isn't dangerous, but it can affect quality of life. Most people find a mix of diet, lifestyle and medicines helpful.",
["Tummy cramps relieved by going to the toilet","Bloating and gas","Diarrhoea, constipation or both","Symptoms that are worse around your period"],
["The gut and brain communicate differently","Infection, stress, food and hormonal changes can trigger flares"],
["Diagnosed from symptoms, after other conditions such as coeliac disease are ruled out","Blood and stool tests"],
["Regular meals, enough fluid and gentle exercise","Fibre adjustments and low FODMAP diet with a dietitian","Peppermint oil, antispasmodics and laxatives or anti-diarrhoeals where needed","Gut-directed talking therapies and stress management"],
["Could this be IBS or something else?","Which tests should I have?","Can I see a dietitian?"],
["Blood in the stool, unexplained weight loss, a lump, night-time symptoms or new symptoms over 50"],
["nhs","nice","ibsn"]);

A("constipation","Constipation","Hard or infrequent stools",
"Fewer than three poos a week, or stools that are hard and difficult to pass.",
["teen","repro","preg","meno","later"],["gut"],["Bloating"],
"Constipation is very common, especially during pregnancy and in the days before a period. Most cases improve with simple changes.",
["Hard, lumpy stools","Straining","Bloating and tummy ache","Feeling you haven't emptied properly"],
["Low fibre or fluid intake and not enough movement","Hormones in pregnancy, before periods and in perimenopause","Medicines such as iron tablets and some painkillers","Ignoring the urge to go"],
["Usually based on your history","Blood tests or other checks if symptoms are new, severe or long-lasting"],
["Gradually increase fibre with fruit, veg, oats and wholegrains","Drink plenty of fluids and stay active","Allow time on the toilet, with feet raised on a small stool","Laxatives can help short term. A pharmacist can advise, including in pregnancy"],
["Could a medicine be causing this?","Do I need tests?","Which laxative is safe for me?"],
["Blood in the stool, severe pain, vomiting or a sudden change in bowel habit lasting weeks"],
["nhs","nice"]);

/* ---------- Head, nerves, mood and sleep ---------- */
A("migraine-hormones","Migraine and hormones","Menstrual migraine",
"Throbbing headaches, often with nausea and light sensitivity, which many women notice around their periods.",
["teen","repro","preg","meno"],["head","horm"],["Mood changes","Fatigue"],
"Falling oestrogen before a period is a common migraine trigger. Migraine often improves in pregnancy and can change around menopause. If you get migraine with aura, some hormonal contraception is not suitable, so tell your doctor.",
["Throbbing headache, often on one side","Nausea, vomiting and sensitivity to light or sound","Visual disturbances (aura) in some people","Attacks linked to your period"],
["Hormone changes, especially falling oestrogen","Stress, lack of sleep, skipped meals, and certain foods or drinks"],
["Diagnosed from your headache pattern and a headache diary","A neurological examination, and scans only if features are unusual"],
["Acute treatment such as painkillers and triptans, as advised by a doctor","Preventive medicines if attacks are frequent","Avoid combined hormonal contraception if you have aura","Regular sleep, meals and hydration, and stress management"],
["Is my contraception safe with my migraines?","Which treatment should I start?","Would a preventive medicine help?"],
["Sudden severe 'worst ever' headache, weakness, face drooping, trouble speaking or vision loss. Call 999.","Headache with fever and stiff neck"],
["nhs","mt","nice"]);

A("anxiety-hormones","Anxiety and hormones","Anxiety, PMS and perimenopause anxiety",
"Persistent worry or panic that can flare around periods, pregnancy, after birth and perimenopause.",
["teen","repro","preg","meno","later"],["mind","horm"],["Mood changes","Dizziness","Fatigue"],
"Anxiety is very common. Hormone changes can make it worse at certain times, and perimenopause can bring anxiety even if you have never had it before. Talking therapies and self-help work well, and medicines can help too.",
["Constant worrying or feeling on edge","Racing heart, tight chest or shaky feeling","Trouble sleeping or concentrating","Panic attacks","Avoiding things that make you anxious"],
["A mix of life stress, genetics and health factors","Hormone changes in PMS, postnatal period and perimenopause","Caffeine, alcohol, thyroid problems and some medicines"],
["Your GP will ask about symptoms and may do blood tests to rule out thyroid or anaemia","Short questionnaires help assess how severe it is"],
["NHS Talking Therapies (you can often self-refer in England)","CBT, guided self-help and relaxation techniques","Regular exercise, sleep, and cutting back on caffeine and alcohol","Medicines such as SSRIs can be effective","If hormones play a part, discuss HRT or cycle-related treatment"],
["Could hormones be contributing?","How do I access talking therapy?","Which medicine, if any, might help?"],
["Thoughts of harming yourself. Contact NHS 111, call 999 or call Samaritans on 116 123."],
["nhs","mind","nice","sam"]);

A("depression-low-mood","Depression and low mood","Low mood, clinical depression",
"Feeling persistently sad, empty or flat, losing interest in things for weeks.",
["teen","repro","preg","meno","later"],["mind"],["Low mood","Mood changes","Fatigue"],
"Depression is common and treatable. It can follow life events, hormonal changes, birth, illness or happen with no clear trigger. It is not weakness, and you don't have to cope alone.",
["Low mood most of the day for two weeks or more","Losing interest in things you used to enjoy","Tiredness, sleep or appetite changes","Feeling worthless or guilty","Trouble concentrating"],
["A combination of genetics, life events and health","Hormone changes, thyroid problems, long-term illness"],
["A GP appointment and questionnaire","Blood tests to rule out physical causes such as anaemia or an underactive thyroid"],
["Talking therapies such as CBT. In England you can self-refer to NHS Talking Therapies","Antidepressants where suitable","Exercise, routine, social connection and sleep","Support from friends, family and charities such as Mind"],
["Which treatment would suit me best?","How long will treatment take to work?","Is it safe to take if I'm pregnant or breastfeeding?"],
["Thoughts of harming yourself or ending your life. Contact NHS 111, call 999 or call Samaritans on 116 123."],
["nhs","mind","nice","sam"]);

A("insomnia-sleep","Sleep problems and insomnia","Insomnia, trouble sleeping",
"Difficulty falling or staying asleep, or waking too early. Sleep often changes with periods, pregnancy and menopause.",
["teen","repro","preg","meno","later"],["energy","horm"],["Fatigue","Mood changes","Hot flushes"],
"Many women have poor sleep at some point. Hormones, night sweats, a new baby, worry and pain all play a part. Poor sleep affects mood, memory and health, but CBT for insomnia works well without medicine.",
["Trouble getting to sleep or waking in the night","Waking too early","Daytime tiredness and irritability","Poor concentration"],
["Stress, anxiety and depression","Night sweats and hormone changes","Caffeine, alcohol, screens, irregular routines","Restless legs, sleep apnoea or pain"],
["A GP appointment and a sleep diary","Tests for other causes such as thyroid or sleep apnoea if suggested"],
["A regular sleep schedule and calming wind-down routine","Cooler, darker, quieter bedroom","CBT for insomnia, available through some NHS services and apps","Short courses of sleeping tablets are only used briefly","Treat night sweats or other causes"],
["Could menopause or another condition be affecting my sleep?","How can I access CBT for insomnia?","Is a sleeping tablet appropriate for me?"],
["Loud snoring with pauses in breathing and heavy daytime sleepiness","Thoughts of harming yourself. Contact NHS 111 or call 999."],
["nhs","nice","mp"]);

A("restless-legs","Restless legs","Restless legs syndrome",
"An uncomfortable urge to move your legs, usually in the evening or at night.",
["preg","meno","later"],["energy","head"],["Fatigue"],
"Restless legs are more common in women and in pregnancy. Low iron is a frequent and treatable cause, so ask for a ferritin blood test.",
["An urge to move the legs, with crawling, tingling or aching","Worse when resting, especially at night","Relief when you walk or stretch","Poor sleep and tiredness"],
["Low iron stores, pregnancy and kidney problems","Some medicines, including some antidepressants and antihistamines","Family history, caffeine and alcohol"],
["Diagnosis is based on your description","Blood tests including ferritin, kidney function, vitamin B12"],
["Treat low iron, reduce caffeine and alcohol and keep a regular sleep routine","Stretching, leg massage and warm baths","Review medicines with your doctor","Specialist medicines for severe cases, used carefully"],
["Should I have my iron checked?","Could my medicines be a trigger?","What treatment is safe in pregnancy?"],
["Leg swelling with pain, or symptoms of weakness or numbness"],
["nhs","nice"]);

A("brain-fog","Brain fog","Poor concentration and memory lapses",
"Trouble concentrating, finding words or remembering things. Common around menopause, after birth and during long illness.",
["repro","preg","meno","later"],["head","energy","horm"],["Fatigue","Mood changes"],
"Brain fog isn't a medical diagnosis, but it is real. Poor sleep, hormone shifts, stress, anaemia and thyroid problems can all contribute. It usually improves once the cause is addressed.",
["Forgetting words or why you walked into a room","Trouble focusing","Feeling mentally slow","Losing track of tasks"],
["Perimenopause and postnatal changes","Poor sleep, stress and low mood","Iron deficiency anaemia, low B12 and thyroid problems","Long-term illnesses and some medicines"],
["Your GP may check blood tests including iron, B12, thyroid and blood sugar","They will also ask about sleep, mood and medicines"],
["Prioritise sleep and regular activity","Treat any underlying cause, such as anaemia or low mood","Lists, reminders and routines can reduce the load","HRT helps some women at menopause"],
["Could this be linked to menopause or my thyroid?","Which blood tests do I need?","When would memory problems need further checking?"],
["Sudden confusion, severe headache, weakness or trouble speaking. Call 999."],
["nhs","mp","nice"]);

A("fatigue-tiredness","Constant tiredness","Fatigue, always exhausted",
"Being tired all the time, even after rest. There are many treatable causes in women.",
["teen","repro","preg","meno","later"],["energy"],["Fatigue","Low mood","Dizziness"],
"Tiredness is one of the most common reasons women see their GP. Heavy periods, low iron, thyroid conditions, poor sleep, low mood and busy lives often contribute. Finding the cause is the key.",
["Feeling drained most days","Trouble concentrating or low motivation","Headaches or dizziness","Needing to nap often"],
["Iron deficiency from heavy periods or diet","Underactive thyroid, diabetes, vitamin D or B12 deficiency","Poor sleep, stress, depression and long-term illness","Pregnancy, postnatal changes and menopause"],
["Your GP may request blood tests, including a full blood count, iron, thyroid, B12, vitamin D and blood sugar","Questions about sleep, mood and workload"],
["Treat the cause, for example iron or thyroid treatment","A regular sleep routine, gentle exercise and a balanced diet","Pace yourself, plan rests and check your medicines","Counselling for stress or low mood"],
["Which tests do I need?","Could heavy periods be involved?","Could this be depression or burnout?"],
["Tiredness with chest pain, breathlessness, weight loss or fever"],
["nhs","nice"]);

A("vitamin-d-deficiency","Low vitamin D","Vitamin D deficiency",
"Low vitamin D can affect bones and muscles. It is common in the UK, especially in autumn and winter.",
["teen","repro","preg","meno","later"],["bone","energy"],["Fatigue"],
"We make vitamin D from sunlight on our skin, but in the UK the sun is too weak between October and March. Many people are advised to take a daily supplement during those months. See the Supplements tab.",
["Tiredness, bone pain or muscle weakness","Frequent infections","Often no clear symptoms"],
["Limited sunlight, darker skin, covering up and indoor lifestyles","Low intake from food and some medical conditions"],
["A blood test if you have symptoms or risk factors","Most people don't need a test"],
["A daily supplement of vitamin D (the NHS suggests 10 micrograms in autumn and winter, and all year for some groups)","Eat oily fish, eggs and fortified foods","Higher-dose treatment if deficient, from your GP"],
["Should I get my vitamin D checked?","How much should I take?","Is it safe in pregnancy?"],
["Bone pain with fractures or severe muscle weakness"],
["nhs","ros","nice"]);

A("hyperthyroidism","Overactive thyroid","Hyperthyroidism, Graves disease",
"The thyroid makes too much hormone, speeding the body up. It is more common in women.",
["teen","repro","preg","meno","later"],["horm"],["Fatigue","Irregular periods","Dizziness"],
"An overactive thyroid can cause weight loss, a fast heartbeat, anxiety and heat intolerance. It is treatable, but if it's missed it can affect the heart and bones.",
["Weight loss with a good appetite","Racing or irregular heartbeat","Anxiety, shakiness and trouble sleeping","Feeling hot and sweaty","Lighter or irregular periods","Swollen neck or bulging eyes in Graves disease"],
["Graves disease (an autoimmune condition)","Thyroid nodules or inflammation","Too much thyroid medicine"],
["A blood test of thyroid hormones","Scans or antibody tests to find the cause"],
["Anti-thyroid tablets","Radioactive iodine or surgery in some cases","Beta blockers can ease symptoms quickly","Tell your doctor if you are planning pregnancy, as treatment needs to be adjusted"],
["Which type do I have?","What are my options if I want to get pregnant?","How long will treatment take?"],
["Very fast heartbeat, high fever, confusion or chest pain. Call 999 (thyroid storm is rare but serious)."],
["nhs","btf","nice"]);

/* ---------- Heart and blood pressure ---------- */
A("high-blood-pressure","High blood pressure","Hypertension",
"Often has no symptoms but raises the risk of heart attack and stroke. It matters in pregnancy and after menopause.",
["repro","preg","meno","later"],["heart"],["Fatigue","Dizziness"],
"Blood pressure tends to rise after menopause, and some contraceptives can raise it. Many women only find out at a routine check, so regular measurement is worthwhile.",
["Usually no symptoms","Sometimes headaches, nosebleeds or blurred vision at very high levels"],
["Age, family history and weight","Too much salt or alcohol, low activity, stress","Some medicines, kidney conditions and hormonal contraception","Pregnancy-related conditions"],
["Blood pressure readings in clinic and at home","Blood and urine tests to check the effects"],
["Reduce salt, eat more fruit and veg, move more and limit alcohol","Medicines such as ACE inhibitors, calcium channel blockers or diuretics","Review contraception or HRT if needed","Home monitoring and regular reviews"],
["What should my target be?","Could my pill or HRT be affecting it?","Which medicine is safe if I am planning pregnancy?"],
["Chest pain, severe headache, confusion, vision problems, or a reading of 180/120 or higher with symptoms. Call 999."],
["nhs","bhf","nice"]);

A("heart-disease-women","Heart health in women","Heart disease and heart attack in women",
"Women's heart attack symptoms can look different, and risk rises after menopause.",
["repro","meno","later"],["heart"],["Fatigue","Dizziness"],
"Heart disease is a leading cause of death in women, but many think of it as a men's issue. Women are less likely to have the classic crushing chest pain and more likely to feel breathless, sick or exhausted.",
["Chest pain, pressure or tightness","Pain in the arm, neck, jaw, back or tummy","Breathlessness, sweating, nausea","Unusual tiredness"],
["High blood pressure, high cholesterol, diabetes and smoking","Pregnancy complications such as pre-eclampsia and gestational diabetes","PCOS, early menopause and autoimmune conditions"],
["ECG and blood tests","Scans and further heart tests via a specialist"],
["Stop smoking, move more, eat a balanced diet and limit alcohol","Medicines for blood pressure or cholesterol where needed","Tell your doctor about pregnancy complications and early menopause","Know the warning signs"],
["Am I at higher risk because of my pregnancy history?","Do I need a cholesterol check?","What symptoms should I act on?"],
["Chest pain or pressure, pain spreading to the arm, neck or jaw, with sweating or breathlessness. Call 999."],
["nhs","bhf"]);

/* ---------- Pregnancy and after birth ---------- */
A("baby-blues","Baby blues","Early postnatal low mood",
"Tearfulness, mood swings and feeling overwhelmed in the first days after birth.",
["preg"],["preg","mind"],["Mood changes","Low mood","Fatigue"],
"Up to 8 in 10 new mothers have the baby blues around days 3 to 10 after birth. It usually settles within about two weeks. If it lasts longer or feels worse, it could be postnatal depression.",
["Crying for no clear reason","Feeling anxious or irritable","Feeling overwhelmed","Mood swings","Sleep trouble beyond baby's needs"],
["Hormone changes after birth","Tiredness and the shock of becoming a parent"],
["Your midwife or health visitor will check how you feel","No tests are needed unless symptoms continue"],
["Rest when you can and accept help","Talk about how you feel to your partner, family or friends","Eat well and get outside for fresh air","Tell your midwife, health visitor or GP if it lasts over two weeks"],
["Is this normal or could it be postnatal depression?","Who can I talk to?"],
["Seeing or hearing things that aren't there, confusion, or thoughts of harming yourself or the baby. Call 999 or go to A&E."],
["nhs","pandas","tommys"]);

A("perinatal-anxiety","Anxiety in pregnancy and after birth","Perinatal anxiety",
"Intense worry or panic during pregnancy or in the first year after birth.",
["preg"],["preg","mind"],["Mood changes","Dizziness","Fatigue"],
"Perinatal anxiety is common but often goes unnoticed. It can include constant worry about the baby, racing thoughts or panic. It is treatable and getting help early makes a difference.",
["Constant worry that something will go wrong","Racing thoughts, restlessness and trouble sleeping","Panic attacks or a pounding heart","Intrusive thoughts about harm coming to your baby","Avoiding things or checking repeatedly"],
["Hormone changes and sleep loss","Past anxiety, a difficult birth or pregnancy loss","Isolation, stress or lack of support"],
["Your midwife, health visitor or GP can ask about your mood","Questionnaires and an assessment"],
["Talking therapies such as CBT, guided self-help and peer support","Medicines that are safe in pregnancy or breastfeeding can be discussed","Rest, simple routines and asking for practical help","Specialist perinatal mental health services if needed"],
["Which treatment is safe while breastfeeding?","Can I be referred to a perinatal mental health team?","Are these thoughts normal?"],
["Thoughts of harming yourself or your baby. Contact NHS 111, call 999 or call Samaritans on 116 123."],
["nhs","pandas","tommys","mind"]);

A("pelvic-girdle-pain","Pelvic girdle pain in pregnancy","PGP, symphysis pubis dysfunction",
"Pain at the front or back of the pelvis during pregnancy, often when walking, turning or climbing stairs.",
["preg"],["preg","bone"],["Pelvic pain"],
"Pelvic girdle pain is common in pregnancy and is not harmful to your baby. Hormones loosen the joints and the changing posture adds strain. Physiotherapy and simple adjustments help.",
["Pain over the pubic bone, hips or lower back","Pain when walking, turning in bed or climbing stairs","A clicking or grinding in the pelvis"],
["Pregnancy hormones loosening ligaments","The weight and position of the baby, and previous pelvic injuries"],
["Your midwife or physio will examine your movement and joints","No scans are usually needed"],
["Ask your midwife for a referral to a physiotherapist","A support belt, a pillow between your knees when sleeping","Pace activities and avoid asymmetrical movements such as crossing legs","Most women improve after birth"],
["Can I see a women's health physio?","What exercises are safe?","How might this affect labour?"],
["Severe pain with fever, bleeding or unusual discharge","Pain with weakness or numbness in legs"],
["nhs","tommys","rcog"]);

A("gestational-hypertension","High blood pressure in pregnancy","Gestational hypertension",
"New high blood pressure after 20 weeks of pregnancy without protein in the urine. It needs monitoring because it can lead to pre-eclampsia.",
["preg"],["preg","heart"],["Dizziness"],
"Most women with gestational hypertension have healthy babies, but regular checks are needed. It often settles after birth. It can progress to pre-eclampsia, so know the warning signs.",
["Usually no symptoms","Headaches, blurred vision or swelling if it progresses"],
["Cause isn't fully understood","More likely in first pregnancies, multiple pregnancies, older mums and with higher body weight"],
["Blood pressure and urine checks at antenatal appointments","Blood tests and scans to check your baby"],
["More frequent monitoring and sometimes medicines such as labetalol","Planning the timing of the birth with your team","Blood pressure checks after birth"],
["How often will I need to be monitored?","When should I come in?","Does this increase the risk next time?"],
["Severe headache, vision changes, pain just under the ribs on the right, vomiting or sudden swelling. Call your maternity unit or 999 immediately."],
["nhs","act","nice"]);

A("recurrent-miscarriage","Recurrent miscarriage","Three or more pregnancy losses",
"Losing three or more pregnancies in a row. It is heartbreaking, and most people go on to have a successful pregnancy.",
["repro","preg"],["preg"],["Fatigue","Low mood"],
"Most early miscarriages are caused by chromosome changes and are not caused by anything you did. After repeated losses, tests can look for treatable causes. Many people go on to have a baby.",
["Repeated early pregnancy loss","Bleeding and cramping","Grief and anxiety"],
["Chromosome changes in the embryo","Antiphospholipid syndrome, thyroid conditions and womb shape","Often no cause is found"],
["Referral to a specialist recurrent miscarriage clinic after three losses (sometimes earlier)","Blood tests, genetic tests and an ultrasound scan"],
["Treat any cause found, such as medicines for antiphospholipid syndrome","Early scans and supportive care in a new pregnancy","Emotional support and counselling"],
["Do I need tests now?","Should I take any medicine in the next pregnancy?","Where can I find emotional support?"],
["Heavy bleeding, severe pain, dizziness or fainting","One-sided pain in early pregnancy (possible ectopic pregnancy)"],
["nhs","tommys","rcog"]);

A("ivf-fertility-treatment","IVF and fertility treatment","In vitro fertilisation",
"A treatment where eggs are collected, fertilised in a lab and an embryo is placed in the womb.",
["repro"],["repro"],["Mood changes","Fatigue"],
"IVF can help if you have blocked tubes, severe endometriosis, male factor infertility or unexplained infertility. NHS access varies by area, and many people pay privately. The process can be physically and emotionally demanding.",
["Not a condition, but a treatment","Stages include hormone injections, egg collection, fertilisation and embryo transfer","Side effects include bloating, mood swings and tiredness"],
["Used when other options haven't worked or aren't suitable"],
["A fertility assessment for you and your partner","Blood tests, a scan and a semen analysis"],
["Check clinic success rates and licence on the HFEA website","Ovarian hyperstimulation syndrome is a rare risk, so know the warning signs","Look after your mental health with counselling and peer support","Ask about NHS funding in your area"],
["Am I eligible for NHS-funded IVF?","What success rate can I expect?","What does the process involve week by week?"],
["Severe bloating, sudden weight gain, severe abdominal pain, vomiting or trouble breathing during treatment"],
["hfea","fnuk","nhs"]);

/* ---------- Everyday and hard to talk about ---------- */
A("vulval-itching","Vulval itching and soreness","Vulval itch, irritation",
"Itching or soreness around the vulva has many causes and is rarely embarrassing for a doctor.",
["teen","repro","preg","meno","later"],["sexual","skin","everyday"],["Itching","Unusual discharge"],
"Common causes include thrush, skin irritation from soaps or products, eczema and dryness. Persistent itching can also be a sign of skin conditions such as lichen sclerosus, so it is worth getting it checked.",
["Itching, burning or soreness","Redness or swelling","Skin that looks white or thin","Discharge or pain during sex"],
["Thrush or other infections","Irritants such as scented products, wipes and tight clothing","Menopause-related dryness and skin conditions"],
["Your doctor may look at the skin and take a swab","A skin biopsy or specialist referral if symptoms continue"],
["Avoid soaps, bubble baths, scented products and wipes","Wear loose cotton underwear and wash with water or an emollient","Treat infections or skin conditions as advised","Vaginal oestrogen after menopause if dryness is the cause"],
["Could this be thrush or a skin condition?","Do I need a swab or biopsy?","Which products are safe to use?"],
["Sores, lumps or white patches that don't heal","Itching that persists despite treatment"],
["nhs","vps","sh"]);

A("stress-burnout","Stress and burnout","Chronic stress, exhaustion",
"Long-term stress that leaves you drained, detached or unable to cope.",
["teen","repro","preg","meno","later"],["mind","energy"],["Fatigue","Mood changes","Low mood"],
"Stress is a normal response, but when it goes on for months it can affect your sleep, cycle, digestion and mood. Women often carry a heavy load of work, caring and household responsibilities.",
["Constant exhaustion","Feeling detached, cynical or overwhelmed","Poor sleep and headaches","Changes in your periods","Trouble concentrating"],
["Heavy workload, caring responsibilities and lack of support","Financial worries, life events and perfectionism","Underlying anxiety or depression"],
["A GP appointment to look for physical causes such as anaemia or thyroid problems","Questionnaires for anxiety and depression"],
["Talk to someone, whether your GP, a friend or a counsellor","Break tasks down, set boundaries and ask for support","Regular exercise, sleep and time away from screens","Discuss workplace adjustments or time off if needed"],
["Could this be burnout or depression?","Do I need time off work?","What support is available locally?"],
["Thoughts of harming yourself. Contact NHS 111, call 999 or call Samaritans on 116 123."],
["nhs","mind","sam"]);

A("domestic-abuse-and-health","Domestic abuse and your health","Abuse in relationships",
"Abuse can be physical, emotional, sexual or financial. It affects health, and help is available, whoever you are.",
["teen","repro","preg","meno","later"],["mind","everyday"],["Low mood","Fatigue","Pelvic pain"],
"Domestic abuse can start or get worse in pregnancy and can cause injuries, long-term pain, anxiety, depression and sleep problems. If you recognise this, it is not your fault. Health professionals can listen and help you stay safe.",
["Fear of a partner or family member","Being controlled, isolated or monitored","Unexplained injuries or ongoing pain","Anxiety, low mood and sleep problems","Missed appointments or reluctance to be alone with a doctor"],
["Power and control by another person. It is never caused by the person experiencing it"],
["Your GP or nurse can talk to you privately","They can document injuries and refer you to specialist support"],
["Call the free 24-hour National Domestic Abuse Helpline run by Refuge on 0808 2000 247","Tell a trusted friend, GP, midwife or health visitor","Use a safe device and clear your search history if someone monitors you","Make a safety plan with a specialist worker"],
["Can I speak to someone in confidence?","What support is available for me and my children?","How can I get a safe place?"],
["If you are in immediate danger, call 999. If you can't speak, cough or tap the phone, and press 55 when prompted on a mobile."],
["refuge","wa","nhs"]);

/* ---------- Coming-soon list ---------- */
const have=new Set(ENTRIES.map(e=>e.name.toLowerCase()));
const next=["Fibromyalgia","ME/CFS (chronic fatigue)","ADHD and autism in women","Sleep apnoea in women","Breastfeeding problems","Eating disorders","Gallstones","Carpal tunnel syndrome"];
COMING.length=0;next.forEach(n=>COMING.push(n));

window.HZ_ADDED=added.length;
})();
