/**
 * curriculum.js — MATATAG Curriculum Database
 * ILAW Lesson Plan Generator — DepEd Philippines
 * DO No. 016, s. 2026
 *
 * This file contains the locally-stored curriculum competency database.
 * Extend the CURRICULUM object to add more grade levels, subjects,
 * quarters, and weeks as needed.
 */

const CURRICULUM = {
  Grade3: {
    label: "Grade 3",
    keyStage: 1,
    subjects: {
      Science: {
        label: "Science",
        quarters: {
          Quarter3: {
            label: "Quarter 3",
            weeks: {
              Week5: {
                label: "Week 5 — Pinagmulan at Katangian ng Liwanag",
                CompetencyCode: "S3FE-IIIi-j-5.1",
                CompetencyText: "The learners describe sources of light and their use in everyday situations and participate in guided science activities to explore and describe sources of light, how it behaves or can be changed, and its uses in everyday situations.",
                TopicTitle: "Pinagmulan at Katangian ng Liwanag (Sources and Properties of Light)",
                Intentions: {
                  Objectives: {
                    Cognitive: "Classify common sources of light found in the school and home into natural (likas) and artificial (artipisyal) categories.",
                    Psychomotor: "Demonstrate through guided peer experiments how light travels in a straight line and explain how light reflection allows the eyes to see objects.",
                    Affective: "Value the practical role of light in daily survival by identifying key safety uses, such as traffic lights and disaster emergency flashlights."
                  },
                  Materials: ["Flashlight / Plashlayt", "3 index cards with centered holes", "Manila paper", "Colored markers", "Printed image cards (sun, candle, firefly, bulb, stars)", "Safety scissors"],
                  References: ["MATATAG Science Grade 3 Curriculum Guide (2025)", "DepEd Learner's Material Science Grade 3, pp. 45–58", "DO No. 016, s. 2026 ILAW Framework Teacher's Guide"]
                },
                LearningExperience: {
                  PreLesson: "Begin with an interactive sensory 'open-close eyes' challenge to demonstrate that human eyes cannot see or identify colors in complete darkness without a light source. Ask: 'Ano ang mangyayari kapag wala kang ilaw sa gabi?'",
                  TheFlowSteps: [
                    {
                      Step: 1,
                      Title: "Likas na Liwanag at Artipisyal na Liwanag (Natural vs. Artificial)",
                      Duration: "15 minutes",
                      Description: "The teacher introduces natural sources (e.g., Sun/Araw, stars/bituin, fireflies/alitaptap) and artificial sources (e.g., flashlights/plashlayt, light bulbs/bumbilya, candles/kandila) through image-sorting activities on the board.",
                      TeacherAction: "Display image cards. Ask students to come forward and sort them into two groups: 'Likas' and 'Artipisyal' on the manila paper.",
                      LearnerAction: "Students physically sort cards, discuss with partners, and justify their groupings in Tagalog or their home language.",
                      DesignPrinciples: ["Clear goals", "Scaffolding", "Multilingual support"]
                    },
                    {
                      Step: 2,
                      Title: "The Cardboard Hole Alignment Experiment",
                      Duration: "20 minutes",
                      Description: "Students align three vertical index cards with centered holes. A flashlight is shone through. Card 2 is then slightly shifted to demonstrate that light cannot travel around obstacles — it moves only in straight lines.",
                      TeacherAction: "Demonstrate setup. Guide students through the experiment in groups of 4. Ask probing questions: 'Bakit nang ilipat ang card, wala nang liwanag?'",
                      LearnerAction: "Students conduct the experiment, record observations in their science notebook, and share findings with the class.",
                      DesignPrinciples: ["Active retrieval", "Social learning", "Inclusion", "Inquiry-based"]
                    },
                    {
                      Step: 3,
                      Title: "Paano Nakakakita ang Ating Mga Mata? (How Do Our Eyes See?)",
                      Duration: "10 minutes",
                      Description: "Brief interactive discussion on how reflected light enters our eyes to allow vision. Use a mirror to demonstrate reflection concept.",
                      TeacherAction: "Use a simple diagram on the board. Show reflection with a small mirror and flashlight.",
                      LearnerAction: "Students respond to Socratic questions and connect reflection to everyday experiences (mirrors, still water).",
                      DesignPrinciples: ["Prior knowledge activation", "Metacognition"]
                    }
                  ],
                  Closure: "Class vote: Which source of light is most important for your family at home at night? Students explain their choice in one sentence."
                },
                AssessingLearning: {
                  FormativeCheck: {
                    Title: "Likas o Artipisyal — 5-Item Bilingual Identification Check",
                    Items: [
                      "1. Sikat ng Araw (Sunlight)",
                      "2. Kandilang may sindi (Lit candle)",
                      "3. Alitaptap sa gabi (Firefly at night)",
                      "4. Plashlayt (Flashlight)",
                      "5. Bumbilya sa kisame (Ceiling light bulb)"
                    ],
                    Instructions: "Write L (Likas/Natural) or A (Artipisyal/Artificial) beside each item."
                  },
                  Rubric: {
                    Title: "KS1 Qualitative Performance Rubric (PACE Form Schema)",
                    Domains: [
                      { name: "Scientific Inquiry", indicators: ["Accurately classifies light sources", "Correctly conducts the alignment experiment", "Records observations clearly"] },
                      { name: "Group Collaboration", indicators: ["Participates actively in group work", "Listens to and respects peers", "Takes on a role in the experiment"] },
                      { name: "Safety Integration", indicators: ["Handles flashlight safely", "Follows classroom safety procedures", "Connects light to safety in real life"] }
                    ],
                    Levels: ["Natatangi (Outstanding)", "Mahusay (Proficient)", "Nagpapaunlad (Developing)", "Nangangailangan ng Tulong (Needs Support)"]
                  }
                },
                WaysForward: {
                  Remediation: "Match card blocks with 3D tactile objects during the ARAL remediation hour (starting Week 5 after first summative). Teacher pairs struggling learners with peer tutors.",
                  Enrichment: "Conduct a Shadow Puppet (Manika ng Anino) challenge behind a light source. Students create animal silhouettes and tell a short bilingual story.",
                  HomeOpportunity: "Find 5 sources of light inside the household at night and write their classification in the homework notebook. Draw a simple illustration beside each one.",
                  ParentEngagement: "Send home a bilingual parent guide sheet about light sources. Encourage families to identify light sources together during brownouts.",
                  NextLesson: "Week 6 — Pag-asal ng Liwanag: Pagsalamin, Pagbaluktot, at Pagsabog (Behavior of Light: Reflection, Refraction, Scattering)"
                }
              },
              Week6: {
                label: "Week 6 — Pag-asal ng Liwanag",
                CompetencyCode: "S3FE-IIIi-j-5.2",
                CompetencyText: "The learners investigate how light behaves when it hits different surfaces, including reflection and refraction, through simple guided experiments.",
                TopicTitle: "Pag-asal ng Liwanag: Pagsalamin at Pagbaluktot (Behavior of Light: Reflection and Refraction)",
                Intentions: {
                  Objectives: {
                    Cognitive: "Distinguish between reflection (pagsalamin) and refraction (pagbaluktot) of light using observable examples.",
                    Psychomotor: "Conduct a simple glass-of-water pencil experiment to observe refraction and demonstrate reflection using a mirror.",
                    Affective: "Appreciate how understanding light behavior helps in designing practical tools like eyeglasses, cameras, and traffic signals."
                  },
                  Materials: ["Small mirror", "Clear glass of water", "Pencil", "Flashlight", "White paper for tracing", "Ruler"],
                  References: ["MATATAG Science Grade 3 Curriculum Guide (2025)", "DepEd Learner's Material Science Grade 3, pp. 59–72"]
                },
                LearningExperience: {
                  PreLesson: "Quick recall: Ask students to name the two types of light sources from the previous week. Connect to today's lesson: 'Ngayon, titingnan natin kung ano ang nangyayari sa liwanag kapag tumama ito sa isang bagay.'",
                  TheFlowSteps: [
                    {
                      Step: 1,
                      Title: "Pagsalamin ng Liwanag (Reflection)",
                      Duration: "15 minutes",
                      Description: "Students use small mirrors and a flashlight to observe how light bounces off reflective surfaces. Trace light path on white paper.",
                      TeacherAction: "Model the experiment. Ask: 'Saan napunta ang liwanag matapos tumama sa salamin?'",
                      LearnerAction: "Students trace the light path before and after reflection, compare angles.",
                      DesignPrinciples: ["Inquiry-based", "Active learning"]
                    },
                    {
                      Step: 2,
                      Title: "Pagbaluktot ng Liwanag (Refraction)",
                      Duration: "15 minutes",
                      Description: "Students place a pencil in a clear glass of water and observe the apparent bending. Discuss why this happens — light changes speed when moving between different materials.",
                      TeacherAction: "Guide observations. Ask: 'Bakit parang nabali ang lapis sa loob ng tubig?'",
                      LearnerAction: "Students sketch observations and write one sentence explaining what they saw.",
                      DesignPrinciples: ["Conceptual understanding", "Language support"]
                    }
                  ],
                  Closure: "Class discussion: Name one tool or invention that uses reflection or refraction. How does it help people?"
                },
                AssessingLearning: {
                  FormativeCheck: {
                    Title: "Reflection or Refraction — 4-Item Identification",
                    Items: [
                      "1. Salamin sa banyo (Bathroom mirror)",
                      "2. Salamin-baso ng sasakyan (Car side mirror)",
                      "3. Salamin sa loob ng tubig (Lens in water)",
                      "4. Salamin ng camera (Camera lens)"
                    ],
                    Instructions: "Write P (Pagsalamin/Reflection) or PB (Pagbaluktot/Refraction) beside each."
                  },
                  Rubric: {
                    Title: "KS1 Qualitative Performance Rubric",
                    Domains: [
                      { name: "Scientific Inquiry", indicators: ["Correctly identifies reflection and refraction", "Conducts experiment accurately", "Records observations with detail"] },
                      { name: "Communication", indicators: ["Explains findings clearly in Filipino or English", "Uses science vocabulary appropriately"] },
                      { name: "Safety", indicators: ["Handles materials carefully", "Follows classroom procedures"] }
                    ],
                    Levels: ["Natatangi (Outstanding)", "Mahusay (Proficient)", "Nagpapapaunlad (Developing)", "Nangangailangan ng Tulong (Needs Support)"]
                  }
                },
                WaysForward: {
                  Remediation: "Use illustrated flip cards showing reflection vs. refraction with real-life images. One-on-one teacher guidance during ARAL hour.",
                  Enrichment: "Design a simple periscope using mirrors. Explain how it uses reflection to see around corners.",
                  HomeOpportunity: "Observe 3 examples of reflection and 2 examples of refraction in your home or community. Record in science notebook.",
                  ParentEngagement: "Encourage parents to discuss eyeglasses or magnifying glasses as examples of refraction at home.",
                  NextLesson: "Week 7 — Kulay ng Liwanag at ang Bahaghari (Colors of Light and the Rainbow)"
                }
              }
            }
          },
          Quarter4: {
            label: "Quarter 4",
            weeks: {
              Week1: {
                label: "Week 1 — Mga Hayop at Kanilang Tirahan",
                CompetencyCode: "S3LT-IVa-b-1.1",
                CompetencyText: "The learners identify and describe different animals and their habitats, explaining how habitat characteristics meet the needs of animals.",
                TopicTitle: "Mga Hayop at Kanilang Tirahan (Animals and Their Habitats)",
                Intentions: {
                  Objectives: {
                    Cognitive: "Identify at least 5 animals and correctly match each to its natural habitat (land, water, or air).",
                    Psychomotor: "Create a simple habitat diorama or drawing showing an animal in its natural environment.",
                    Affective: "Show appreciation for animal habitats by understanding why destroying habitats harms animals."
                  },
                  Materials: ["Animal picture cards", "Habitat scene cards (forest, ocean, sky)", "Drawing materials", "Shoebox for diorama (optional)"],
                  References: ["MATATAG Science Grade 3 Curriculum Guide (2025)", "DepEd Learner's Material Science Grade 3 Quarter 4, pp. 1–14"]
                },
                LearningExperience: {
                  PreLesson: "Show three large images: a forest, an ocean, and the sky. Ask: 'Sino ang naninirahan dito?' Allow free responses to activate prior knowledge.",
                  TheFlowSteps: [
                    {
                      Step: 1,
                      Title: "Mga Uri ng Tirahan (Types of Habitats)",
                      Duration: "15 minutes",
                      Description: "Introduction to three main habitats: lupa (land), tubig (water), and hangin/kalangitan (air). Use visual sorting activity with animal picture cards.",
                      TeacherAction: "Present each habitat type with rich imagery. Model the first sorting example.",
                      LearnerAction: "Students sort animal cards into the correct habitat group in pairs.",
                      DesignPrinciples: ["Visual learning", "Cooperative learning", "Scaffolding"]
                    },
                    {
                      Step: 2,
                      Title: "Bakit Nakatira ang Hayop Doon? (Why Do Animals Live There?)",
                      Duration: "20 minutes",
                      Description: "Discussion on how habitat features provide food, shelter, water, and safety for animals. Focus on 3 local Philippine animals: kalapati (pigeon), bangus (milkfish), kambing (goat).",
                      TeacherAction: "Use a simple anchor chart: Animal | Habitat | What it needs | What habitat provides.",
                      LearnerAction: "Students fill in the anchor chart for two animals of their choice.",
                      DesignPrinciples: ["Real-world connection", "Philippines context", "Graphic organizer"]
                    }
                  ],
                  Closure: "Exit ticket: Name one animal, its habitat, and one thing that habitat gives the animal."
                },
                AssessingLearning: {
                  FormativeCheck: {
                    Title: "Animal-Habitat Match — 5-Item Assessment",
                    Items: [
                      "1. Agila (Philippine Eagle)",
                      "2. Palaka (Frog)",
                      "3. Daga (Rat)",
                      "4. Pagong-dagat (Sea turtle)",
                      "5. Pugo (Quail)"
                    ],
                    Instructions: "Match each animal to its habitat: Lupa (Land), Tubig (Water), or Hangin (Air)."
                  },
                  Rubric: {
                    Title: "KS1 Qualitative Performance Rubric",
                    Domains: [
                      { name: "Scientific Knowledge", indicators: ["Correctly identifies animal habitats", "Explains why animals need their specific habitat"] },
                      { name: "Creative Expression", indicators: ["Creates a detailed habitat drawing or diorama", "Accurately represents the animal in its habitat"] },
                      { name: "Environmental Awareness", indicators: ["Articulates why habitat preservation matters", "Connects lesson to local Philippine wildlife"] }
                    ],
                    Levels: ["Natatangi (Outstanding)", "Mahusay (Proficient)", "Nagpapaunlad (Developing)", "Nangangailangan ng Tulong (Needs Support)"]
                  }
                },
                WaysForward: {
                  Remediation: "Use tactile animal-habitat matching cards with pictures and simple words. Small group instruction during ARAL hour.",
                  Enrichment: "Research one endangered Philippine animal and its habitat. Prepare a 1-minute oral report with a drawing.",
                  HomeOpportunity: "List 3 animals seen near your home. Write their names and where they were found (under tree, in water, flying, etc.).",
                  ParentEngagement: "Encourage families to observe animals in their neighborhood and discuss where they live and why.",
                  NextLesson: "Week 2 — Pagbabago ng Tirahan at Epekto sa Hayop (Habitat Change and Effects on Animals)"
                }
              }
            }
          }
        }
      },
      Mathematics: {
        label: "Mathematics",
        quarters: {
          Quarter3: {
            label: "Quarter 3",
            weeks: {
              Week1: {
                label: "Week 1 — Mga Fraction (Fractions)",
                CompetencyCode: "M3NS-IIIa-64.1",
                CompetencyText: "The learners identify unit fractions with denominators up to 10 and represent them using models, pictures, and symbols.",
                TopicTitle: "Panimula sa mga Fraction (Introduction to Fractions)",
                Intentions: {
                  Objectives: {
                    Cognitive: "Identify and name unit fractions (1/2, 1/3, 1/4, 1/5) and match them to correct models and symbols.",
                    Psychomotor: "Fold paper strips to create physical fraction models and shade fraction diagrams accurately.",
                    Affective: "Recognize fractions in everyday life (e.g., sharing food, dividing materials) to develop a sense of fairness and mathematical thinking."
                  },
                  Materials: ["Paper strips (at least 5 per student)", "Colored crayons or markers", "Fraction circles cutouts", "Math workbooks"],
                  References: ["MATATAG Mathematics Grade 3 Curriculum Guide (2025)", "DepEd Learner's Material Mathematics Grade 3, pp. 78–91"]
                },
                LearningExperience: {
                  PreLesson: "Present a pan de sal (bread roll) and ask: 'Kung hatiin natin ito sa dalawa, magkano ang mapupunta sa bawat isa?' Elicit the concept of equal parts.",
                  TheFlowSteps: [
                    {
                      Step: 1,
                      Title: "Ano ang Fraction? (What is a Fraction?)",
                      Duration: "15 minutes",
                      Description: "Introduce the concept that a fraction represents equal parts of a whole. Use paper folding to demonstrate 1/2, 1/4. Connect to sharing food or objects equally.",
                      TeacherAction: "Fold a paper strip in half. Label numerator (bilang ng hinahatiang bahagi) and denominator (kabuuang bahagi).",
                      LearnerAction: "Students fold their own paper strips, shade one part, and write the fraction symbol.",
                      DesignPrinciples: ["Concrete-Pictorial-Abstract", "Manipulatives", "Real-world context"]
                    },
                    {
                      Step: 2,
                      Title: "Mga Uri ng Unit Fraction",
                      Duration: "20 minutes",
                      Description: "Explore fractions 1/2 through 1/10 using fraction circles. Students compare sizes: which is bigger, 1/2 or 1/4?",
                      TeacherAction: "Use fraction circles on the board. Guide comparison discussions.",
                      LearnerAction: "Students arrange fraction pieces from largest to smallest and explain their reasoning.",
                      DesignPrinciples: ["Reasoning and proof", "Visual representation", "Math talk"]
                    }
                  ],
                  Closure: "Human fraction: Teacher calls out a fraction (e.g., 1/3) and groups of students must stand — only 1 out of every 3 students in a group stands."
                },
                AssessingLearning: {
                  FormativeCheck: {
                    Title: "Fraction Identification — 5-Item Written Check",
                    Items: [
                      "1. Anong fraction ang kinakatawan ng isang hiwa ng tinapay na pinutol sa apat na pantay na bahagi?",
                      "2. Isulat ang fraction: 1 sa 3 pantay na bahagi",
                      "3. Itawid ang fraction na mas malaki: 1/2 o 1/4?",
                      "4. Kulayan ang 1/5 ng isang bilog na nahahati sa 5 pantay na bahagi.",
                      "5. Sumulat ng salitang Pilipino para sa fraction na 1/2."
                    ],
                    Instructions: "Answer each item based on the lesson discussed."
                  },
                  Rubric: {
                    Title: "KS1 Qualitative Performance Rubric",
                    Domains: [
                      { name: "Mathematical Understanding", indicators: ["Correctly identifies and names unit fractions", "Accurately represents fractions using models"] },
                      { name: "Problem Solving", indicators: ["Applies fraction concepts to simple problems", "Explains fraction comparisons with reasoning"] },
                      { name: "Communication", indicators: ["Uses math vocabulary correctly in Filipino and English", "Explains thinking clearly to peers"] }
                    ],
                    Levels: ["Natatangi (Outstanding)", "Mahusay (Proficient)", "Nagpapaunlad (Developing)", "Nangangailangan ng Tulong (Needs Support)"]
                  }
                },
                WaysForward: {
                  Remediation: "Use physical fraction tiles and one-on-one guidance. Focus on 1/2 and 1/4 before progressing to smaller unit fractions.",
                  Enrichment: "Create a 'Fraction Menu' — design a meal plan where each food item is represented as a fraction of the total plate.",
                  HomeOpportunity: "Find 3 examples of fractions at home (e.g., half a glass of water, a quarter of a bar of soap). Draw and label each.",
                  ParentEngagement: "Guide sheet for parents: How to use cooking and food-sharing to reinforce fraction concepts at home.",
                  NextLesson: "Week 2 — Paghahambing ng mga Fraction (Comparing Fractions Using Models)"
                }
              }
            }
          }
        }
      },
      Filipino: {
        label: "Filipino",
        quarters: {
          Quarter3: {
            label: "Quarter 3",
            weeks: {
              Week1: {
                label: "Week 1 — Pagbabasa at Pag-unawa (Reading Comprehension)",
                CompetencyCode: "F3PT-IIIa-2.1",
                CompetencyText: "Naipapaliwanag ng mag-aaral ang mga pangunahing ideya at detalye ng isang simpleng teksto sa pamamagitan ng pagsagot sa mga tanong.",
                TopicTitle: "Pagbabasa at Pag-unawa sa Simpleng Teksto",
                Intentions: {
                  Objectives: {
                    Cognitive: "Matukoy ang pangunahing ideya at tatlong sumusuportang detalye ng isang simpleng naratibong teksto.",
                    Psychomotor: "Makagawa ng isang simpleng graphic organizer (story map) batay sa nabasa.",
                    Affective: "Maipakita ang pagmamahal sa pagbabasa sa pamamagitan ng aktibong pakikinig at pagsali sa talakayan."
                  },
                  Materials: ["Kopya ng maikling kuwento", "Story map template", "Lapis at kulay", "Manila paper para sa klase"],
                  References: ["MATATAG Filipino Grade 3 Curriculum Guide (2025)", "Mga Kwentong Bayan: Antolohiya para sa Grade 3", "DepEd Filipino Learner's Material Grade 3 Q3, pp. 1–18"]
                },
                LearningExperience: {
                  PreLesson: "Magpakita ng larawan na may kaugnayan sa kwento. Itanong: 'Ano ang iyong naiisip kapag nakita mo ito?' Tukuyin ang mga salitang mahirap at ipaliwanag ang kahulugan bago basahin.",
                  TheFlowSteps: [
                    {
                      Step: 1,
                      Title: "Pagbabasa ng Kwento — Teacher Read-Aloud",
                      Duration: "15 minuto",
                      Description: "Ang guro ay magbabasa ng maikling kwento nang malakas habang ipinapakita ang mga larawan. Hihinto sa mahalagang bahagi para magtanong ng mga prediksyon.",
                      TeacherAction: "Basahin ang teksto nang may ekspresyon. Tukuyin ang simula, gitna, at katapusan ng kwento.",
                      LearnerAction: "Makinig nang mabuti. Isulat ang 3 mahalagang pangyayari sa kanilang kuwaderno.",
                      DesignPrinciples: ["Scaffolding", "Aktibong pakikinig", "Prediksyon"]
                    },
                    {
                      Step: 2,
                      Title: "Pag-unawa at Talakayan",
                      Duration: "20 minuto",
                      Description: "Pangkatang talakayan tungkol sa pangunahing ideya at mga detalye ng kwento. Gagamitin ang story map template.",
                      TeacherAction: "Gabayan ang mga tanong: Sino? Ano? Saan? Kailan? Bakit? Paano?",
                      LearnerAction: "Kumpleto ang story map sa pangkat. Ibahagi sa klase.",
                      DesignPrinciples: ["Kooperatibong pagkatuto", "Kritikal na pag-iisip", "Graphic organizer"]
                    }
                  ],
                  Closure: "Bawat pangkat ay magbabahagi ng isang pangunahing ideya na kanilang natuklasan. Pagtalunan ng klase kung tama ang bawat ideya."
                },
                AssessingLearning: {
                  FormativeCheck: {
                    Title: "Pag-unawa sa Teksto — 5 Tanong",
                    Items: [
                      "1. Sino ang pangunahing tauhan ng kwento?",
                      "2. Saan naganap ang kwento?",
                      "3. Ano ang nangyari sa simula ng kwento?",
                      "4. Ano ang problema ng pangunahing tauhan?",
                      "5. Paano nalutas ang problema sa katapusan?"
                    ],
                    Instructions: "Sagutin ang bawat tanong batay sa kwentong nabasa."
                  },
                  Rubric: {
                    Title: "KS1 Qualitative Performance Rubric",
                    Domains: [
                      { name: "Pag-unawa sa Teksto", indicators: ["Natutukoy ang pangunahing ideya", "Naibibigay ang tatlong detalye", "Naiugnay ang kwento sa sariling karanasan"] },
                      { name: "Pakikinig at Pakikilahok", indicators: ["Aktibong nakikinig sa pagbabasa", "Sumasali sa talakayan nang may respeto"] },
                      { name: "Kritikal na Pag-iisip", indicators: ["Nakapagbibigay ng sariling opinyon tungkol sa kwento", "Nakapagkumpara ng detalye"] }
                    ],
                    Levels: ["Natatangi (Outstanding)", "Mahusay (Proficient)", "Nagpapaunlad (Developing)", "Nangangailangan ng Tulong (Needs Support)"]
                  }
                },
                WaysForward: {
                  Remediation: "Gumamit ng mas maikling teksto na may maraming larawan. Gabayan ang pagpili ng pangunahing ideya gamit ang sentence starters.",
                  Enrichment: "Sumulat ng sariling katapusan ng kwento. Ibahagi sa klase o gumawa ng simpleng ilustrasyon.",
                  HomeOpportunity: "Basahin ng isang kwento kasama ang magulang o mas nakakatandang kapatid. Ibigay ang pangunahing ideya bukas.",
                  ParentEngagement: "Himukin ang mga magulang na magbasa ng maikling kwento sa anak bawat gabi. Magtanong ng simpleng tanong tungkol sa kwento.",
                  NextLesson: "Week 2 — Pagkilala sa mga Salita sa Konteksto (Vocabulary in Context)"
                }
              }
            }
          }
        }
      }
    }
  }
};

/**
 * Grading weight configuration per DepEd DO 016, s. 2026
 * Used for Key Stages 2–4 (Grades 4–12)
 */
const GRADING_CONFIG = {
  keyStage1: {
    label: "Key Stage 1 (Kindergarten to Grade 3)",
    type: "qualitative",
    description: "Uses PACE (Performance and Competency Evaluation) Form with qualitative descriptors rather than numerical grades.",
    descriptors: [
      { label: "Natatangi (Outstanding)", abbrev: "O", range: "90–100" },
      { label: "Mahusay (Very Satisfactory)", abbrev: "VS", range: "85–89" },
      { label: "Kasiya-siya (Satisfactory)", abbrev: "S", range: "80–84" },
      { label: "Nagpapaunlad (Fairly Satisfactory)", abbrev: "FS", range: "75–79" },
      { label: "Nangangailangan ng Tulong (Did Not Meet Expectations)", abbrev: "DNE", range: "Below 75" }
    ]
  },
  keyStage2to4: {
    label: "Key Stages 2–4 (Grades 4–12)",
    type: "numerical",
    weights: {
      writtenWorks: { label: "Written Works (W_W)", percentage: 20 },
      performanceTasks: { label: "Performance Tasks (P_T)", percentage: 50 },
      summativeTests: { label: "Summative Tests & Term Exams (S_T)", percentage: 30 }
    },
    transmutation: {
      formula: "Transmuted Grade = [(Raw Score / Total Score) × 100 × 0.5] + 50",
      note: "Raw Score Percentage ≥ 70.00% → Transmuted Grade ≥ 75 (Passing mark)",
      passingGrade: 75,
      passingRawScorePercentage: 70
    }
  }
};

/**
 * Emergency tier content strings injected by the rule-based engine.
 */
const EMERGENCY_CONTENT = {
  normal: {
    banner: null,
    appendix: null
  },
  hinay: {
    banner: {
      type: "hinay",
      emoji: "🟡",
      title: "HINAY MODE — Ease-in Continuity Protocol",
      message: "This lesson plan includes hybrid delivery provisions in accordance with the School Continuity Plan. Printed Self-Learning Packets (SLPs) shall supplement face-to-face delivery for learners with intermittent school attendance."
    },
    appendix: `
<h2>📋 HINAY — Hybrid Delivery Appendix</h2>
<h3>Self-Learning Packet (SLP) Distribution Protocol</h3>
<ul>
<li>Prepare printed module copies for learners absent due to community disruptions.</li>
<li>Coordinate with the Barangay Learning Facilitator (BLF) for door-to-door packet distribution.</li>
<li>Set a 3-day grace period for SLP submission upon learner's return.</li>
<li>Parents/guardians must sign the SLP completion form (Annex A).</li>
</ul>
<h3>Teacher Tasks</h3>
<ul>
<li>Record attendance separately for face-to-face and asynchronous SLP learners.</li>
<li>Provide an audio or video recording of key lesson segments if bandwidth permits.</li>
<li>Schedule a weekly catch-up session (30 min) every Friday for SLP learners.</li>
</ul>`
  },
  hinga: {
    banner: {
      type: "hinga",
      emoji: "🟠",
      title: "HINGA MODE — Home-Based Learning Protocol",
      message: "Academic delivery has shifted to fully home-based modular instruction. The Flow has been replaced with at-home activity guides. A school call-tree check-in is mandatory within 12 hours of protocol activation."
    },
    appendix: `
<h2>🏠 HINGA — Home-Based Learning Plan</h2>
<h3>Modified Learning Objectives (Home-Based)</h3>
<p>All objectives have been simplified for independent home learning. Parents/guardians serve as Home Learning Facilitators (HLFs).</p>
<h3>Home-Based Activity Sequence</h3>
<ol>
<li><strong>Activity 1 (30 min):</strong> Learner reads the printed module independently or with parent guidance.</li>
<li><strong>Activity 2 (20 min):</strong> Complete the module's guided activity using household materials.</li>
<li><strong>Activity 3 (10 min):</strong> Answer the module's formative check and show to parent/guardian.</li>
</ol>
<h3>Mental Health Check (MHC)</h3>
<p>Before academic activities, ask your child: <em>"Kumusta ka ngayon? Ano ang nararamdaman mo?"</em> Validate feelings. Do not force academic work if the child is distressed. Contact the school guidance counselor if needed.</p>
<h3>12-Hour School Call-Tree Checklist</h3>
<ul>
<li>☐ Teacher contacts Class President/Section Leader within 2 hours of activation</li>
<li>☐ Section Leader activates parent group chat within 4 hours</li>
<li>☐ All families confirmed reached within 12 hours</li>
<li>☐ Learners with no contact traced through Barangay Office</li>
</ul>`
  },
  hinto: {
    banner: {
      type: "hinto",
      emoji: "🔴",
      title: "HINTO MODE — Academic Suspension & PFA Protocol",
      message: "Academic lessons are SUSPENDED. This document has been converted to a Psychological First Aid (PFA) and Community Check-in protocol in accordance with DepEd trauma-informed care guidelines."
    },
    appendix: `
<h2>🆘 HINTO — Psychological First Aid (PFA) Protocol</h2>
<p><strong>IMPORTANT: No academic content shall be delivered during HINTO status.</strong></p>
<h3>Teacher Actions — First 24 Hours</h3>
<ol>
<li>Ensure your own safety and well-being before assisting others.</li>
<li>Activate the School Disaster Risk Reduction Management Coordinator (SDRRMC).</li>
<li>Account for all learners and staff using the Emergency Masterlist.</li>
<li>Set up a safe, quiet space within the school or evacuation center if accessible.</li>
</ol>
<h3>Psychological First Aid — Core Actions (WHO Framework)</h3>
<ul>
<li><strong>Look:</strong> Check on learners' physical safety and immediate needs. Watch for signs of shock or acute stress.</li>
<li><strong>Listen:</strong> Be present. Allow children to express feelings without forcing disclosure. Do not say "I understand" — say "I am here with you."</li>
<li><strong>Link:</strong> Connect families to water, food, shelter, and medical care. Refer severe cases to school guidance counselors or mental health professionals.</li>
</ul>
<h3>Trauma-Informed Community Check-In Guide</h3>
<ul>
<li>Visit or call each family within 48 hours. Use the Community Check-In Form (Annex HINTO-1).</li>
<li>Identify learners showing prolonged distress: sleep disruption, regression, withdrawal, anger, or numbness.</li>
<li>Provide the PFA Learner Wellness Packet — a non-academic, art-and-storytelling based packet for emotional processing.</li>
</ul>
<h3>Return-to-Learning Protocol</h3>
<p>Academic instruction resumes ONLY after:</p>
<ul>
<li>☐ School declared safe by Local Disaster Risk Reduction Management Office (LDRRMO)</li>
<li>☐ At least 70% of learners are present or accounted for</li>
<li>☐ Guidance counselor clears cohort for academic re-engagement</li>
<li>☐ Principal issues Return-to-Learning Memorandum</li>
</ul>`
  }
};

/**
 * Diverse learners accommodation strings — appended when toggle is ON.
 */
const DIVERSE_LEARNERS_CONTENT = `
<h2>♿ Diverse Learners — Accommodation Provisions</h2>
<p>In accordance with DepEd Inclusive Education Policy, the following accommodations are embedded in this lesson plan for learners with diverse needs:</p>
<h3>Language Scaffolding</h3>
<ul>
<li>All key vocabulary is presented bilingually (Filipino/English) with visual supports.</li>
<li>Sentence frames are provided for oral and written responses (e.g., "Ang aking sagot ay ___ dahil ___ .").</li>
<li>Learners may respond in their home language (Mother Tongue) when Filipino or English is a barrier.</li>
</ul>
<h3>Physical Workspace Adaptations</h3>
<ul>
<li>Learners with motor limitations are seated near the front with a clear sightline to instructional materials.</li>
<li>Wide-grip pencils, adaptive scissors, and non-slip mats are available at the adaptive workstation.</li>
<li>Group experiment materials are arranged at table height accessible to wheelchair users.</li>
</ul>
<h3>Tactile and Alternative Resources</h3>
<ul>
<li>3D tactile models or textured cards are available as alternatives to print-only materials.</li>
<li>Learners with visual impairments have access to large-print versions or partner-read-aloud arrangements.</li>
<li>Extended time (up to 2x) is granted for all written assessments for learners with IEPs or accommodation plans.</li>
</ul>
<h3>Universal Design for Learning (UDL) Strategies</h3>
<ul>
<li><em>Multiple Means of Representation:</em> Concepts are presented visually, aurally, and through hands-on activity.</li>
<li><em>Multiple Means of Action and Expression:</em> Learners may demonstrate understanding through drawing, oral response, or written work.</li>
<li><em>Multiple Means of Engagement:</em> Choice boards allow learners to select activities aligned with their interests and strengths.</li>
</ul>`;

/**
 * Low-resource classroom alternative procedures — replaces standard experiments when toggle is ON.
 */
const LOW_RESOURCE_CONTENT = {
  header: `
<h2>♻️ Low-Resource Classroom — Alternative Procedures</h2>
<p>The following procedures substitute standard laboratory materials with locally available, recycled, or household items in accordance with the Low-Resource Classroom Protocol.</p>`,
  Science: {
    Week5: `
<h3>Alternative: Cardboard Hole Experiment (Low-Resource Version)</h3>
<ul>
<li><strong>Instead of index cards:</strong> Use old cereal boxes or folders cut into equal rectangles. Punch holes in the center using a sharpened pencil.</li>
<li><strong>Instead of a flashlight:</strong> Use a mobile phone torch function, or hold the setup up toward a window during daytime.</li>
<li><strong>Instead of a meter stick for alignment:</strong> Use a length of string or bamboo rod to keep cards in a straight line.</li>
</ul>
<h3>Alternative: Image Sorting (Low-Resource Version)</h3>
<ul>
<li><strong>Instead of printed cards:</strong> Draw simple stick-figure images of the sun, candle, firefly, and bulb on small pieces of recycled paper. Laminate with plastic cover if available.</li>
<li><strong>Instead of manila paper:</strong> Use the back of a used calendar page for the sorting chart.</li>
</ul>`,
    Week6: `
<h3>Alternative: Reflection & Refraction (Low-Resource Version)</h3>
<ul>
<li><strong>Instead of a mirror:</strong> Use the shiny back of a CD or DVD, a spoon, or a still basin of water to demonstrate reflection.</li>
<li><strong>Instead of a glass beaker:</strong> Use any clear plastic water bottle or glass filled with water for the refraction experiment.</li>
</ul>`
  },
  default: `
<h3>General Low-Resource Substitution Guide</h3>
<ul>
<li><strong>Paper:</strong> Use backs of old worksheets, newspaper margins, or recycled bond paper.</li>
<li><strong>Coloring materials:</strong> Natural dyes (kamote, atsuete) can substitute for paint in art activities.</li>
<li><strong>Manipulatives:</strong> Stones, seeds, bottle caps, and rubber bands serve as math counters.</li>
<li><strong>Science equipment:</strong> Improvise with kitchen items — measuring cups, spoons, bottles, and strings.</li>
</ul>`
};
