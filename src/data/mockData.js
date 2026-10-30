// Content sourced from live audits of nsfbrain.org, accelnet-brainhealth.org,
// and mdrn.ucsf.edu (Aug 2026), plus public NSF Award Search and NIH RePORTER
// data for Dr. Contreras-Vidal. A handful of fields (thrust <-> publication
// tagging, per-thrust pub counts) are best-effort estimates since the source
// sites don't expose that breakdown publicly.

export const thrusts = [
  { id: "big-data", name: "Big Data", tag: "Data", color: "rose", summary: "Large-scale, multi-institution neural and behavioral datasets for reproducible research.", pubs: 0 },
  { id: "clinical-trial", name: "Clinical Trial", tag: "Clinical", color: "orange", summary: "Trial design and evidence standards for implantable and wearable brain-computer interfaces.", pubs: 2 },
  { id: "device-development", name: "Device Development", tag: "Devices", color: "green", summary: "Low-cost, mobile hardware platforms for EEG, EMG, and multimodal neural sensing.", pubs: 1 },
  { id: "device-interoperability", name: "Device Interoperability", tag: "Interop", color: "maroon", summary: "Standards and IoT frameworks that let BCI hardware and software work across systems.", pubs: 4 },
  { id: "neuromodulation", name: "Neuromodulation", tag: "Neuromod", color: "peach", summary: "Deep brain stimulation and transcranial stimulation for movement and pain disorders.", pubs: 2 },
  { id: "neural-activity-measurement", name: "Neural Activity Measurement", tag: "Measurement", color: "rose", summary: "EEG, fNIRS, and electrophysiology methods for decoding brain and body states.", pubs: 13 },
  { id: "neurorehab-assistive", name: "Neurorehabilitation and Assistive Devices", tag: "Rehab", color: "orange", summary: "Exoskeletons, prosthetics, and rehabilitation robotics for stroke, Parkinson's, and mobility loss.", pubs: 15 },
  { id: "regulatory-science", name: "Regulatory Science", tag: "Regulatory", color: "green", summary: "Standards and FDA-facing pathways for translating neurotechnology into approved devices.", pubs: 1 },
  { id: "neurotech-sports", name: "Neurotechnologies for Sports", tag: "Sports", color: "maroon", summary: "Neural and biomechanical monitoring for athletic performance and injury prevention.", pubs: 0 },
  { id: "neurotech-smart-factories", name: "Neurotechnologies for Smart Factories", tag: "Industry 4.0", color: "peach", summary: "Wearable neurotechnology for worker safety, ergonomics, and human-machine collaboration.", pubs: 0 },
  { id: "neurotech-art", name: "Neurotechnologies for Art", tag: "Art & Music", color: "rose", summary: "Mobile brain-body imaging of dancers, actors, and musicians during live performance.", pubs: 4 },
  { id: "ethical-ai", name: "Ethical & Trustworthy Artificial Intelligence", tag: "Ethics", color: "orange", summary: "Responsible-AI frameworks for neural data, model transparency, and patient consent.", pubs: 0 },
];

// The 9 BRAIN Center core sites, real site directors per nsfbrain.org/organization/leadership
export const institutions = {
  brainCore: [
    { name: "University of Houston", role: "Lead Institution · Center Director: Jose Luis Contreras-Vidal", location: "Houston, TX, USA", logo: "/images/logos/uh.png", url: "https://www.uh.edu/" },
    { name: "Arizona State University", role: "Site Director: Marco Santello (Center Co-Director & ASU Founder)", location: "Tempe, AZ, USA", logo: "/images/logos/asu.png", url: "https://www.asu.edu/" },
    { name: "Georgia Institute of Technology", role: "Site Director: Michelle LaPlaca", location: "Atlanta, GA, USA", logo: "/images/logos/git.png", url: "https://www.gatech.edu/" },
    { name: "West Virginia University", role: "Site Director: Peter Konrad", location: "Morgantown, WV, USA", logo: "/images/logos/wvu.png", url: "https://www.wvu.edu/" },
    { name: "University of Maryland, Baltimore County", role: "Site Director: Ramana Vinjamuri", location: "Baltimore, MD, USA", logo: "/images/logos/umbc.png", url: "https://umbc.edu/" },
    { name: "University of Alabama at Birmingham", role: "Site Director: Nicole Bentley", location: "Birmingham, AL, USA", logo: "/images/logos/uab.svg", url: "https://www.uab.edu/" },
    { name: "Northeastern University", role: "Site Director: Eugene Tunik", location: "Boston, MA, USA", logo: "/images/logos/neu.png", url: "https://www.northeastern.edu/" },
    { name: "Tecnológico de Monterrey", role: "Site Director: Jorge de Jesus Lozoya Santos", location: "Monterrey, Mexico", logo: "/images/logos/tec.png", url: "https://tec.mx/en" },
    { name: "Universidad Miguel Hernández de Elche", role: "Site Director: Jose M. Azorín", location: "Elche, Spain", logo: "/images/logos/umh.png", url: "https://www.umh.es/" },
  ],
  accelnet: [
    { name: "NSF BRAIN Center", role: "Network Partner", location: "Houston, TX, USA", url: "https://www.nsfbrain.org/" },
    { name: "IUCRC CARTA", role: "Network Partner · sites at ASU, Rutgers, UMBC, U. Miami", location: "USA", url: "https://www.nsfbrain.org/" },
    { name: "Rutgers University", role: "CARTA site", location: "New Brunswick, NJ, USA", url: "https://www.rutgers.edu/" },
    { name: "University of Miami", role: "CARTA site", location: "Coral Gables, FL, USA", url: "https://welcome.miami.edu/" },
    { name: "Swiss Center for Affective Sciences", role: "Network Partner", location: "Geneva, Switzerland", logo: "/images/logos/unige.svg", url: "https://www.unige.ch/cisa/" },
    { name: "NEUROLIVE, University College London", role: "Network Partner", location: "London, UK", logo: "/images/logos/ucl.svg", url: "https://www.ucl.ac.uk/" },
    { name: "EBRAINS", role: "Pan-European Infrastructure", location: "European Union", logo: "/images/logos/ebrains.svg", url: "https://ebrains.eu/" },
  ],
  // Music & Dementia Research Network (mdrn.ucsf.edu) — NIH/NIA-funded
  // (U24AG084436), led by UCSF. Dr. Contreras-Vidal is a named team member
  // and serves as Site PI for the University of Houston.
  mdrn: [
    { name: "UCSF", role: "Network Lead · PI: Julene K. Johnson, Ph.D.", location: "San Francisco, CA, USA", logo: "/images/logos/ucsf.svg", url: "https://www.ucsf.edu/" },
    { name: "University of Houston", role: "Site PI: Jose Luis Contreras-Vidal, Ph.D.", location: "Houston, TX, USA", logo: "/images/logos/uh.png", url: "https://www.uh.edu/" },
    { name: "Arizona State University", role: "Site PI: Melita Belgrave, Ph.D.", location: "Tempe, AZ, USA", logo: "/images/logos/asu.png", url: "https://www.asu.edu/" },
    { name: "University of Southern California", role: "Network Partner", location: "Los Angeles, CA, USA", logo: "/images/logos/usc.svg", url: "https://www.usc.edu/" },
    { name: "Northwestern University", role: "Network Partner", location: "Chicago, IL, USA", logo: "/images/logos/northwestern.svg", url: "https://www.northwestern.edu/" },
    { name: "Boston University", role: "Network Partner", location: "Boston, MA, USA", logo: "/images/logos/bu.svg", url: "https://www.bu.edu/" },
  ],
};

export const publications = [
  { id: 1, title: 'Walking Into a New Era of Soft Exoskeletons for Children With Cerebral Palsy', authors: 'Aguilar-Herrera, Aime J., Sarkar, Shantanu, Altaweel, Lara, Willson, Paige A., Feng, Jeff, Chen, Zheng, Francisco, Gerard E., Contreras-Vidal, Jose L., et al.', year: 2025, thrust: 'neurorehab-assistive', venue: 'IEEE Electron Devices Magazine, v.3', inst: 'UH' },
  { id: 2, title: 'Continuous and Discrete Decoding of Overt Speech with Scalp Electroencephalography (EEG)', authors: 'Craik, Alexander, Dial, Heather, Contreras-Vidal, Jose L.', year: 2025, thrust: 'neural-activity-measurement', venue: 'Journal of Neural Engineering, v.22', inst: 'UH' },
  { id: 3, title: 'The State of Clinical Trials of Implantable Brain-Computer Interfaces', authors: 'Patrick-Krueger, K. Michelle, Burkhart, Ian, Contreras-Vidal, Jose L.', year: 2025, thrust: 'clinical-trial', venue: 'Nature Reviews Bioengineering, v.3', inst: 'UH' },
  { id: 4, title: 'The State of Science Convergence in Implantable Brain-Computer Interface Clinical Trials', authors: 'Patrick-Krueger, K. Michelle, Pavlidis, Ioannis, Contreras-Vidal, J. L.', year: 2025, thrust: 'clinical-trial', venue: 'Journal of Neural Engineering, v.22', inst: 'UH' },
  { id: 5, title: 'At-Home Stroke Neurorehabilitation: Early Findings with the NeuroExo BCI System', authors: 'González-España, Juan José, Sánchez-Rodríguez, Lianne, Pacheco-Ramírez, Maxine Annel, Feng, Jeff, Nedley, Kathryn, Chang, Shuo-Hsiu, Francisco, Gerard E., Contreras-Vidal, Jose L.', year: 2025, thrust: 'neurorehab-assistive', venue: 'Sensors, v.25', inst: 'UH' },
  { id: 6, title: 'Mobile Brain-Body Imaging and Visual Data of Theatrical Actors During Rehearsal and Performance', authors: 'Hendry, Manuel Flurin, Cruz-Garza, Jesus G., Delgado-Jiménez, Esther A., Lima-Carmona, Yoshua E., Aguilar-Herrera, Aime J., Ramírez-Moreno, Mauricio A., Ravindran, Akshay Sujatha, Paek, Andrew Y., Contreras-Vidal, Jose L., et al.', year: 2025, thrust: 'neural-activity-measurement', venue: 'Scientific Data, v.12', inst: 'UH' },
  { id: 7, title: 'Deep Fusion of Neurophysiological and Facial Features for Enhanced Emotion Detection', authors: 'Safavi, Farshad, Venkannagari, Vikas Reddy, Parikh, Dev, Vinjamuri, Ramana Kumar', year: 2025, thrust: 'neural-activity-measurement', venue: 'IEEE Access, v.13', inst: 'UMBC' },
  { id: 8, title: 'Facial Expression Recognition with an Efficient Mix Transformer for Affective Human-Robot Interaction', authors: 'Safavi, Farshad, Patel, Kulin, Vinjamuri, Ramana', year: 2025, thrust: 'device-interoperability', venue: 'IEEE Transactions on Affective Computing', inst: 'UMBC' },
  { id: 9, title: 'A Framework for Empirical Fourier Decomposition-Based Gesture Classification for Stroke Rehabilitation', authors: 'Chen, Ke, Wang, Honggang, Catlin, Andrew, Satyanarayana, Ashwin, Vinjamuri, Ramana, Kadiyala, Sai Praveen', year: 2025, thrust: 'neurorehab-assistive', venue: 'IEEE Internet of Things Journal, v.12', inst: 'UMBC' },
  { id: 10, title: "Editorial: NeuroDesign in Human-Robot Interaction: The Making of Engaging HRI Technology Your Brain Can't Resist", authors: 'Wang, Ker-Jiun, Vinjamuri, Ramana, Alimardani, Maryam, Kumar Reddy, Tharun, Mao, Zhi-Hong', year: 2025, thrust: 'device-interoperability', venue: 'Frontiers in Robotics and AI, v.12', inst: 'UMBC' },
  { id: 11, title: 'Reconstructing Hand Gestures with Synergies Extracted from Dance Movements', authors: 'Olikkal, Parthan, Dollo, Chris, Ajendla, Akshara, Clemmensen, Ann Sofie, Vinjamuri, Ramana', year: 2025, thrust: 'neural-activity-measurement', venue: 'Scientific Reports, v.15', inst: 'UMBC' },
  { id: 12, title: 'Decoding and Generating Synergy-Based Hand Movements Using Electroencephalography During Motor Execution and Motor Imagery', authors: 'Pei, Dingyi, Vinjamuri, Ramana', year: 2025, thrust: 'neural-activity-measurement', venue: 'Biomedical Engineering Advances', inst: 'UMBC' },
  { id: 13, title: 'Functional Evaluation of a Real-Time EMG Controlled Prosthetic Hand', authors: 'Kalita, Amlan Jyoti, Chanu, Maibam Pooya, Kakoty, Nayan M., Vinjamuri, Ramana Kumar, Borah, Satyajit', year: 2025, thrust: 'neurorehab-assistive', venue: 'Wearable Technologies, v.6', inst: 'UMBC' },
  { id: 14, title: 'Decoding Motor Execution and Motor Imagery from EEG with Deep Learning and Source Localization', authors: 'Kaviri, Sina Makhdoomi, Vinjamuri, Ramana', year: 2025, thrust: 'neural-activity-measurement', venue: 'Biomedical Engineering Advances', inst: 'UMBC' },
  { id: 15, title: 'Mobile Brain Imaging in Butoh Dancers: From Rehearsals to Public Performance', authors: 'Theofanopoulou, Constantina, Paez, Sadye, Huber, Derek, Todd, Eric, Ramírez-Moreno, Mauricio A., Khaleghian, Badie, Barceló, Leah, Gand, Vangeline, Contreras-Vidal, José L.', year: 2024, thrust: 'neurotech-art', venue: 'BMC Neuroscience, v.25', inst: 'UH' },
  { id: 16, title: 'Brain-Machine Interface Based on Deep Learning to Control Asynchronously a Lower-Limb Robotic Exoskeleton', authors: 'Ferrero, Laura, Soriano-Segura, Paula, Navarro, Jacobo, Jones, Oscar, Ortiz, Mario, Iáñez, Eduardo, Azorín, José M., Contreras-Vidal, José L.', year: 2024, thrust: 'neurorehab-assistive', venue: 'Journal of NeuroEngineering and Rehabilitation, v.21', inst: 'UH' },
  { id: 17, title: 'Cross-Task Differences in Frontocentral Cortical Activations for Dynamic Balance in Neurotypical Adults', authors: 'Magruder, Robert D., Kukkar, Komal K., Contreras-Vidal, Jose L., Parikh, Pranav J.', year: 2024, thrust: 'neural-activity-measurement', venue: 'Sensors, v.24', inst: 'UH' },
  { id: 18, title: 'Neural Dynamics of Creative Movements During the Rehearsal and Performance of LiveWire', authors: 'Pacheco-Ramírez, Maxine Annel, Ramírez-Moreno, Mauricio A., Kukkar, Komal, Rao, Nishant, Huber, Derek, Brandt, Anthony K., Noble, Andy, Noble, Dionne, Contreras-Vidal, Jose L., et al.', year: 2024, thrust: 'neurotech-art', venue: 'Scientific Data, v.11', inst: 'UH' },
  { id: 19, title: 'The Social and Neural Bases of Creative Movement: Workshop Overview', authors: 'Shamma, Shihab, Contreras-Vidal, Jose, Fritz, Jonathan, Lim, Soo-Siang, Tuller, Betty, Edwards, Emmeline, Iyengar, Sunil', year: 2024, thrust: 'neurotech-art', venue: 'BMC Neuroscience, v.25', inst: 'UH' },
  { id: 20, title: 'Subthalamic Nucleus DBS Sub-harmonic Oscillatory Activity Reflect Presence or Absence of DBS Responsiveness', authors: 'Greger, Bradley, Olson, Markey, Felsen, Sydney, Zavala, Baltazar, Sudeesh, Sankardas, Shill, Holly, Ponce, Francisco, Aslam, Sana', year: 2024, thrust: 'neuromodulation', venue: 'Neurology, v.102', inst: 'ASU' },
  { id: 21, title: 'Correlation Enhanced Distribution Adaptation for Prediction of Fall Risk', authors: 'Guo, Ziqi, Wu, Teresa, Lockhart, Thurmon E., Soangra, Rahul, Yoon, Hyunsoo', year: 2024, thrust: 'neurorehab-assistive', venue: 'Scientific Reports, v.14', inst: 'ASU' },
  { id: 22, title: 'Deep Multimodal Emotion Recognition: Fusion of Facial Features and Neurophysiological Signals', authors: 'Safavi, Farshad, Venkannagari, Vikas Reddy, Vinjamuri, Ramana Kumar', year: 2024, thrust: 'neural-activity-measurement', venue: 'IEEE Body Sensor Networks (BSN)', inst: 'UMBC' },
  { id: 23, title: 'Accurate Body Pose Matching for Individuals with Stroke using Siamese Networks', authors: 'Gokhman, Ruslan, Sawdayi, Talya, Khan, Rana, Satyanarayana, Ashwin, Vinjamuri, Ramana, Kadiyala, Sai Praveen', year: 2024, thrust: 'neurorehab-assistive', venue: 'IEEE CHASE', inst: 'UMBC' },
  { id: 24, title: 'Generative AI-Based Difficulty Level Design of Serious Games for Stroke Rehabilitation', authors: 'Chen, Ke, Vinjamuri, Ramana, Wang, Honggang, Kadiyala, Sai Praveen', year: 2024, thrust: 'neurorehab-assistive', venue: 'IEEE Internet of Things Journal, v.11', inst: 'UMBC' },
  { id: 25, title: 'Integrating EEG Source Localization and ResNet CNN for Advanced Stroke Rehabilitation', authors: 'Kaviri, Sina Makhdoomi, Vinjamuri, Ramana Kumar', year: 2024, thrust: 'neurorehab-assistive', venue: 'IEEE HI-POCT', inst: 'UMBC' },
  { id: 26, title: 'Identifying Neurophysiological Correlates of Stress', authors: 'Pei, Dingyi, Tirumala, Shravika, Tun, Kyaw T., Ajendla, Akshara, Vinjamuri, Ramana', year: 2024, thrust: 'neural-activity-measurement', venue: 'Frontiers in Medical Engineering, v.2', inst: 'UMBC' },
  { id: 27, title: 'Decoding EEG for Spinal Cord Injury Rehabilitation: Integrating Source Localization with Residual CNN', authors: 'Kaviri, Sina Makhdoomi, Vinjamuri, Ramana Kumar', year: 2024, thrust: 'neurorehab-assistive', venue: 'IEEE HI-POCT', inst: 'UMBC' },
  { id: 28, title: 'A Hybrid EEG-EMG Framework for Humanoid Control using Deep Learning Transformers', authors: 'Olikkal, Parthan, Pillai, Branesh M., Suthakorn, Jackrit, Ali, Habib, Vinjamuri, Ramana', year: 2024, thrust: 'device-interoperability', venue: 'IEEE ROBIO', inst: 'UMBC' },
  { id: 29, title: 'Integrating Electroencephalography Source Localization and Residual Convolutional Neural Network for Advanced Stroke Rehabilitation', authors: 'Kaviri, Sina Makhdoomi, Vinjamuri, Ramana', year: 2024, thrust: 'neurorehab-assistive', venue: 'Bioengineering, v.11', inst: 'UMBC' },
  { id: 30, title: 'Transformer-Based Emotion Recognition with EEG', authors: 'Patel, Kulin, Safavi, Farshad, Chandramouli, Rajarathnam, Vinjamuri, Ramana', year: 2024, thrust: 'neural-activity-measurement', venue: 'IEEE EMBC', inst: 'UMBC' },
  { id: 31, title: 'Enhancing Prosthetic Hand Control: A Synergistic Multi-Channel Electroencephalogram Approach', authors: 'Maibam, Pooya Chanu, Pei, Dingyi, Olikkal, Parthan, Vinjamuri, Ramana Kumar, Kakoty, Nayan M.', year: 2024, thrust: 'neurorehab-assistive', venue: 'Wearable Technologies, v.5', inst: 'UMBC' },
  { id: 32, title: 'Brain-to-brain communication during musical improvisation: a performance case study', authors: 'Ramírez-Moreno, Mauricio A., Cruz-Garza, Jesús G., Acharya, Akanksha, Chatufale, Girija, Witt, Woody, Gelok, Dan, Reza, Guillermo, Contreras-Vidal, José L.', year: 2023, thrust: 'neurotech-art', venue: 'F1000Research, v.11', inst: 'UH' },
  { id: 33, title: 'Brain-eNet: Towards an Enabling Technology for BCI-IoT Systems', authors: 'González-España, Juan, Sánchez-Rodríguez, Lianne, Craik, Alexander, Wong, Sarah, Feng, Jeff, Contreras-Vidal, Jose', year: 2023, thrust: 'device-interoperability', venue: 'IEEE International Conference on Systems, Man, and Cybernetics (SMC)', inst: 'UH' },
  { id: 34, title: 'Design and Validation of a Low-Cost Mobile EEG-Based Brain-Computer Interface', authors: 'Craik, Alexander, González-España, Juan José, Alamir, Ayman, Edquilang, David, Wong, Sarah, Sánchez Rodríguez, Lianne, Feng, Jeff, Francisco, Gerard E., Contreras-Vidal, Jose L.', year: 2023, thrust: 'device-development', venue: 'Sensors, v.23', inst: 'UH' },
  { id: 35, title: 'Optimization of Electrode Configuration for the Removal of Eye Artifacts with Adaptive Noise Cancellation', authors: 'Gonzalez-Espana, Jose J., Craik, Alexander, Ramirez, Carolina, Alamir, Ayman, Contreras-Vidal, Jose', year: 2023, thrust: 'neural-activity-measurement', venue: 'IEEE International Conference on Systems, Man, and Cybernetics (SMC)', inst: 'UH' },
  { id: 36, title: 'Transfer Learning with CNN Models for Brain-Machine Interfaces to Command Lower-Limb Exoskeletons: A Solution for Limited Data', authors: 'Ferrero, Laura, Quiles, V., Soriano-Segura, P., Ortiz, Mario, Iáñez, Eduardo, Contreras-Vidal, Jose L., Azorin, Jose M.', year: 2023, thrust: 'neurorehab-assistive', venue: 'IEEE Engineering in Medicine & Biology Conference', inst: 'UH' },
  { id: 37, title: 'Functional Near Infrared Spectroscopy Detects Cortical Activation Changes Concurrent with Memory Loss in Postmenopausal Women with Type II Diabetes', authors: 'Gorniak, Stacey L., Wagner, Victoria E., Vaughn, Kelly, Perry, Jonathan, Cox, Lauren Gulley, Hibino, Hidetaka, Montero-Hernandez, Samuel A., Hernandez, Arturo E., Pollonini, Luca', year: 2023, thrust: 'neural-activity-measurement', venue: 'Experimental Brain Research, v.241', inst: 'UH' },
  { id: 38, title: 'Self-Administered Transcranial Direct Current Stimulation Treatment of Knee Osteoarthritis Alters Pain-Related fNIRS Connectivity Networks', authors: 'Montero-Hernandez, Samuel, Pollonini, Luca, Park, Lindsey, Martorella, Geraldine, Miao, Hongyu, Mathis, Kenneth B., Ahn, Hyochol', year: 2023, thrust: 'neuromodulation', venue: 'Neurophotonics, v.10', inst: 'UH' },
  { id: 39, title: "Effects of Protective Step Training on Proactive and Reactive Motor Adaptations in Parkinson's Disease Patients", authors: 'Lockhart, Thurmon, Frames, Chris, Olson, Markey, Moon, Seong H., Peterson, Dan, Lieberman, Abraham', year: 2023, thrust: 'neurorehab-assistive', venue: 'Frontiers in Neurology, v.14', inst: 'ASU' },
  { id: 40, title: 'Assessment of Gait and Posture Characteristics Using a Smartphone Wearable System for Persons with Osteoporosis with and without Falls', authors: 'Doshi, Krupa B., Moon, Seong Hyun, Whitaker, Michael D., Lockhart, Thurmon E.', year: 2023, thrust: 'neurorehab-assistive', venue: 'Scientific Reports, v.13', inst: 'ASU' },
  { id: 41, title: 'Microscale Electrophysiological Functional Connectivity in Human Cortico-Basal Ganglia Network', authors: "Guest, Ashley C., O'Neill, Kevin J., Graham, Dakota, Mirzadeh, Zaman, Ponce, Francisco A., Greger, Bradley", year: 2022, thrust: 'neural-activity-measurement', venue: 'Clinical Neurophysiology, v.142', inst: 'ASU' },
  { id: 42, title: 'A Roadmap towards Standards for Neurally Controlled End Effectors', authors: 'Paek, Andrew Y., Brantley, Justin A., Ravindran, Akshay S., Nathan, Kevin, He, Yongtian, Eguren, David, Cruz-Garza, Jesus G., Nakagome, Sho, Wickramasuriya, Dilranjan S., et al.', year: 2021, thrust: 'regulatory-science', venue: 'IEEE Open Journal of Engineering in Medicine and Biology, v.2', inst: 'UH' },
];

// Real headlines from nsfbrain.org/news — rehosted natively instead of
// linking out to uh.edu, which is one of the fixes this redesign makes.
// Each still credits its original source via `url`.
export const news = [
  { id: 1, title: "University of Houston BRAIN Center Finds Exposure to Nature Associated with Reductions in Negative Emotions", date: "2026-03-24", tag: "Research", image: "/images/news/nature-brain-bridge.jpg", url: "https://www.uh.edu/news-events/stories/2026/march/03242026-contreras-vidal-nature-brain.php" },
  { id: 2, title: "Contreras-Vidal Elected to National Academy of Inventors", date: "2026-02-26", tag: "Awards", image: "/images/news/nai-senior-member.jpg", featured: true, url: "https://www.uh.edu/news-events/stories/2026/february/02262026-nai-senior-members.php" },
  { id: 3, title: "MyoStep Named 2025 Houston Innovation Awards Finalist", date: "2025-10-07", tag: "Awards", image: "/images/news/myostep-finalist.jpg", url: "https://houston.innovationmap.com/2025-houston-innovation-awards-finalists-2674149025.html" },
  { id: 4, title: "BRAIN Center Hosts 2025 Annual Industry–University Meeting", date: "2025-09-15", tag: "Membership", url: "https://nsfbrain.org/iab-2025/" },
  { id: 5, title: "First NSF UH-FDA REU Site on Regulatory Science of Biomedical Devices", date: "2024-10-10", tag: "Workforce", image: "/images/news/reu-fda-site.jpg", url: "https://www.uh.edu/news-events/stories/2024/october/10102024-reu-site-brain-center-fda.php" },
  { id: 6, title: "NSF Funds Two More Universities to Join IUCRC BRAIN Center", date: "2023-10-09", tag: "Partnership", image: "/images/news/two-more-universities.jpg", url: "https://www.uh.edu/news-events/stories/2023/august-2023/08232023-brain-center-expands-two-universities.php" },
];

// Real events pulled from their own official sources (EBRAINS, IEEE Brain,
// the Philosophical Society of Texas, nsfbrain.org/events), unified into one
// calendar the way the central hub is meant to work. Each `url` points to
// that source directly.
export const events = [
  { id: 1, title: "AccelNet EBRAINS Summer School", date: "2026-06-15", type: "Workshop", location: "Learning Center Morgagni, University of Florence, Italy", image: "/images/events/florence.jpg", url: "https://ebrains.eu/news-and-events/events/2026/accelnet-summer-school-on-human-data-management-and-modellingai" },
  { id: 2, title: "AccelNet EBRAINS Summit", date: "2026-06-27", type: "Summit", location: "Cherubini Conservatory, Florence, Italy", image: "/images/events/herobg2.jpg", url: "https://ebrains.eu/news-and-events/events/2026/accelnet-summer-school-on-human-data-management-and-modellingai" },
  { id: 3, title: "Window into the Creative Mind", date: "2026-02-06", type: "Exhibition", location: "Philosophical Society of Texas Annual Meeting, Houston, TX", image: "/images/events/brain-event.jpg", url: "https://www.pstx.org/site_page.cfm?pk_association_webpage_menu=10873&pk_association_webpage=26603" },
  { id: 4, title: "Your Brain on Beethoven", date: "2025-12-09", type: "Performance", location: "The EGG Brussel, Brussels, Belgium", image: "/images/events/mariachi.jpg", url: "https://ebrains.eu/news-and-events/2025/your-brain-on-beethoven-art-meets-science-at-the-ebrains-summit-2025" },
  { id: 5, title: "La Catrina Monarca Art-Science Performance", date: "2025-11-10", type: "Performance", location: "Sandler Auditorium, UCSF, San Francisco, CA", image: "/images/events/acting.jpg", url: "https://www.nsfbrain.org/events" },
  { id: 6, title: "IEEE Brain Discovery & Neurotechnology Workshop", date: "2026-11-11", type: "Workshop", location: "National Housing Center, Washington, DC", image: "/images/events/ieee-brain-2026.jpg", url: "https://brain.ieee.org/2026-ieee-brain-discovery-neurotechnology-workshop/" },
];

// Real site directors + co-investigators from nsfbrain.org/organization/leadership
export const people = [
  { name: "Jose Luis Contreras-Vidal", title: "Center Director & Site Director", institution: "University of Houston", photo: "/images/people/contreras-vidal.jpg" },
  { name: "Marco Santello", title: "Center Co-Director & ASU Founder", institution: "Arizona State University", photo: "/images/people/marco-santello.jpg" },
  { name: "Michelle LaPlaca", title: "Site Director", institution: "Georgia Institute of Technology", photo: "/images/people/michelle-laplaca.jpg" },
  { name: "Peter Konrad", title: "Site Director", institution: "West Virginia University", photo: "/images/people/peter-konrad.jpg" },
  { name: "Ramana Vinjamuri", title: "Site Director", institution: "University of Maryland, Baltimore County", photo: "/images/people/ramana-vinjamuri.jpg" },
  { name: "Nicole Bentley", title: "Site Director", institution: "University of Alabama at Birmingham", photo: "/images/people/nicole-bentley.jpg" },
  { name: "Eugene Tunik", title: "Site Director", institution: "Northeastern University", photo: "/images/people/eugene-tunik.jpg" },
  { name: "Jorge de Jesus Lozoya Santos", title: "Site Director", institution: "Tecnológico de Monterrey", photo: "/images/people/jorge-lozoya-santos.jpg" },
  { name: "Jose M. Azorín", title: "Site Director", institution: "Universidad Miguel Hernández de Elche", photo: "/images/people/jose-azorin.jpg" },
  { name: "David Mayerich", title: "Co-Investigator, Associate Professor", institution: "University of Houston", photo: "/images/people/david-mayerich.jpg" },
  { name: "Luca Pollonini", title: "Co-Investigator, Associate Professor", institution: "University of Houston", photo: "/images/people/luca-pollonini.jpg" },
  { name: "Jeffrey Kleim", title: "Co-Investigator, Associate Professor", institution: "Arizona State University", photo: "/images/people/jeffrey-kleim.jpg" },
  { name: "Sergio Uribe", title: "Co-Investigator, Associate Professor", institution: "Tecnológico de Monterrey", photo: "/images/people/sergio-uribe.jpg" },
  { name: "Vicente Micol", title: "Co-Investigator, Associate Professor", institution: "Universidad Miguel Hernández de Elche", photo: "/images/people/vicente-micol.jpg" },
  { name: "Radhey Sharma", title: "Co-Investigator, Professor", institution: "West Virginia University", photo: "/images/people/radhey-sharma.jpg" },
  { name: "Julene K. Johnson", title: "MDRN Network Lead, Principal Investigator", institution: "UCSF" },
];

export const roles = [
  { id: "public", label: "Public", sees: "Published papers, events, and people", can: "Browse and search only" },
  { id: "student", label: "Student", sees: "Everything above, plus shared datasets", can: "Download data; join the student network" },
  { id: "faculty", label: "Faculty / Partner", sees: "All datasets from all institutions", can: "Upload and edit their own records" },
  { id: "industry", label: "Industry / IAB", sees: "Pre-publication results and project reports", can: "Comment on and vote on projects" },
  { id: "admin", label: "Admin", sees: "Everything", can: "Approve uploads and manage roles" },
];

// Home page stat strip. Funding figure is *active* NSF + NIH funding to
// Contreras-Vidal at UH (TX), per NSF Award Search and NIH RePORTER, Aug 2026 —
// not the $1.3M AccelNet-only figure the original report cited.
export const stats = [
  { label: "Institutions: BRAIN + AccelNet + MDRN", value: "9 + 5 + 5+" },
  { label: "Active NSF + NIH funding", value: "$3.3M+" },
  { label: "Research thrusts", value: "12" },
  { label: "Shared PI across all three networks", value: "1" },
];

// Real NSF Award Search + NIH RePORTER records for Jose Contreras-Vidal, UH (TX).
export const awards = [
  { id: "2412731", title: "AccelNet Implementation Phase 1: Movement, Music and BrainHealth", agency: "NSF", program: "AccelNet", amount: 1312948, period: "2024–2028", status: "active" },
  { id: "2137255", title: "IUCRC Phase II: Building Reliable Advances and Innovations in Neurotechnology (BRAIN)", agency: "NSF", program: "IUCRC", amount: 1422080, period: "2022–2027", status: "active" },
  { id: "2349657", title: "REU Site: Regulatory Science for Engineering Intuitive, Engaging, Safe and Effective Human-Device Interaction", agency: "NSF", program: "REU Site", amount: 403256, period: "2024–2027", status: "active" },
  { id: "R25HD106896", title: "Neuromotor Skill Advancement for Post-Baccalaureates (NSAP)", agency: "NIH / NICHD", program: "R25 Workforce Development", amount: 153627, period: "2022–2027", status: "active" },
  { id: "2150415", title: "REU Site: Neurotechnologies to Help the Body Move, Heal, and Feel Again", agency: "NSF", program: "REU Site", amount: 402511, period: "2022–2025", status: "completed" },
  { id: "1827769", title: "PFI-RP: Brain-controlled Upper-Limb Robot-Assisted Rehabilitation Device for Stroke Survivors", agency: "NSF", program: "PFI", amount: 954567, period: "2018–2024", status: "completed" },
  { id: "1650536", title: "I/UCRC for Building Reliable Advances and Innovation in Neurotechnology (BRAIN)", agency: "NSF", program: "IUCRC", amount: 826500, period: "2017–2022", status: "completed" },
  { id: "1757949", title: "REU Site: Neurotechnologies to Help the Body Move, Heal, and Feel Again", agency: "NSF", program: "REU Site", amount: 427371, period: "2018–2022", status: "completed" },
];

export const fundingSummary = {
  nsfActive: 3138284,
  nsfLifetime: 7256922,
  nihLifetime: 6974384,
  nihActiveAnnual: 153627,
  combinedActive: 3291911,
  combinedLifetime: 14231306,
};

// Real staff from nsfbrain.org/organization/staff
export const staff = [
  { name: "Eduardo Ianez", title: "Researcher", institution: "Universidad Miguel Hernández de Elche" },
  { name: "Lianne Sanchez Rodriguez", title: "Industry Liaison", institution: "University of Houston" },
  { name: "Mauricio Ramirez", title: "TEC Program Manager", institution: "Tecnológico de Monterrey" },
  { name: "Michael Garrido", title: "Business Program Manager", institution: "University of Houston" },
  { name: "Vanina Nguemmsop", title: "Office Assistant", institution: "University of Houston" },
];

// Real students from nsfbrain.org/organization/students (118 total, Aug 2026 snapshot)
export const students = [
  { id: 1, name: 'Abrar Ilyasbhai Paliwala', details: 'BME (ASU) Mentor: Dr. Christopher Buneo', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 2, name: 'Adriana Lopez Cajigas', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 3, name: 'Aime Judith Aguilar Herrera', details: 'BME (TEC) Mentor: Mauricio Ramírez Moreno', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 4, name: 'Akshay Ravindran, PhD (F\'21)', details: 'Now @ Altos Neuroscience (CA), ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: true },
  { id: 5, name: 'Alex Craik', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 6, name: 'Alexander Sedlack', details: 'REU Student', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 7, name: 'Alexander Steele', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 8, name: 'Andrew Paek, PhD', details: 'ECE (UH)', institution: 'University of Houston', instCode: 'UH', alum: true },
  { id: 9, name: 'Anirudht Arunkumar, F\'18', details: 'Now @ Hyperfine, BME (UH)', institution: 'University of Houston', instCode: 'UH', alum: true },
  { id: 10, name: 'Ankita Shukla', details: 'ML AI (ASU) Mentor: Dr. Pavan Turaga', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 11, name: 'Archana Shashidhar Mysore', details: 'BME (ASU) Mentor: Dr. Marco Santello', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 12, name: 'Arturo Haces-Garcia', details: 'BME (UH) Mentor: Prof. Weihang Zhu', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 13, name: 'Aurora Tijerina Berzosa', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 14, name: 'Avinash Puppala', details: 'REU Student', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 15, name: 'Ayman Alamir', details: 'BME (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 16, name: 'Bernardo Garcia Zermeno', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 17, name: 'Bikram Koirala', details: 'ME (UH) Mentor: Prof. Weihang Zhu', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 18, name: 'Bradford Day', details: 'UH', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 19, name: 'Cameron White', details: 'UH', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 20, name: 'Camille Artur', details: 'UH', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 21, name: 'Carlos Garcia', details: 'Sport Sci (UMH) Mentor: Francisco J Moreno Hernández', institution: 'Universidad Miguel Hernández de Elche', instCode: 'UMH', alum: false },
  { id: 22, name: 'Carmen Ruano', details: 'Sports Sci (UMH) Mentor: Francisco J Moreno Hernández', institution: 'Universidad Miguel Hernández de Elche', instCode: 'UMH', alum: false },
  { id: 23, name: 'Catherine Nunez', details: 'REU Student', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 24, name: 'Chris Malaya (S\'22)', details: 'HHP (UH) Mentor: Dr. Charles Layne', institution: 'University of Houston', instCode: 'UH', alum: true },
  { id: 25, name: 'Dalia Khaled', details: 'REU Student', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 26, name: 'Daniel Mesa', details: 'UH', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 27, name: 'David Eguren (F\'22)', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: true },
  { id: 28, name: 'Derek Huber', details: 'Biology (UH) Mentor: Dr. Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 29, name: 'Dhaivat Solanki', details: 'MSE (UH) Mentor: Dr. Francisco Robles', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 30, name: 'Diego E. Arias', details: 'BME (ASU) Mentor: Dr. Christopher Buneo', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 31, name: 'Diego Mauricio Botin Sanabria', details: '(TEC) Mentor: Dr. Jorge de Jesús Lozoya Santos', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 32, name: 'Eric Todd', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 33, name: 'Esther Aimee Delgado Jimenez', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 34, name: 'Ethan Marschall', details: 'BME (ASU) Mentor: Dr. Jit Muthuswamy', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 35, name: 'Faheem Ershad', details: '(UH) Mentor: Prof. Cunjiang Yu', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 36, name: 'Gabriela Jazmin Alvarez Espinosa', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 37, name: 'Genevieve Johnson', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 38, name: 'Gladys Guadalupe Diaz Armas', details: 'BME (TEC)', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 39, name: 'Gustavo Olivas Martinez', details: 'ME (TEC) Mentor: Jorge de Jesús Lozoya Santos', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 40, name: 'Haoran Zhao', details: 'ECE (UH) Mentor: Dr. Aaron Becker', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 41, name: 'Ian Akamine', details: 'BME (ASU) Mentor: Dr. Jennifer Blain Christen', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 42, name: 'Iqui Balam Heredia Marin', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 43, name: 'Isaac John', details: 'UH', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 44, name: 'Javier Garcia', details: 'ECE (UH) Mentor: Dr. Aaron Becker', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 45, name: 'Javier Lizarraga Iturralde', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 46, name: 'Jesus Garza, PhD (F\'19)', details: 'ECE (UH)', institution: 'University of Houston', instCode: 'UH', alum: true },
  { id: 47, name: 'Jiaming Gou', details: 'UH', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 48, name: 'Jisoo Lee', details: 'CS (ASU) Mentor: Dr. Pavan Turaga', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 49, name: 'Jose Alfonso Cisneros Morales', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 50, name: 'Jose Gonzalez-Espana', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 51, name: 'Joshua Lemis (VRS)', details: 'Biochemistry (UH) Mentor: Dr. Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 52, name: 'Juan Angel Gonzalez Aguirre', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 53, name: 'Juan Manuel Garcia Briones', details: 'CS (TEC) Mentor: Dr. Mauricio Ramirez', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 54, name: 'Juan Pablo Robayo', details: 'ASU', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 55, name: 'Julien Leclerc', details: 'ECE (UH) Mentor: Dr. Aaron Becker', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 56, name: 'Karen Lizette Rodriquez Hernandez', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 57, name: 'Kevin Nathan, PhD (S\'21)', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: true },
  { id: 58, name: 'Kris Phataraphruk', details: 'BME (ASU) Mentor: Dr. Christopher Buneo', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 59, name: 'Krishna Sarvani Desabhotla (S\'22)', details: 'BME (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: true },
  { id: 60, name: 'Kyoseung Sim', details: 'UH', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 61, name: 'Leila Saadatifard. PhD (S\'19)', details: 'Now @ GE Aviation, ECE (UH)', institution: 'University of Houston', instCode: 'UH', alum: true },
  { id: 62, name: 'Livia De Mesquita Teixeira', details: 'BME (ASU) Mentor: Dr. Jit Muthuswamy', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 63, name: 'Lovein Thomas', details: 'ASU', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 64, name: 'Luciano Branco', details: 'BME (UH)', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 65, name: 'Luis Fernando Acosta Soto', details: 'BME (TEC) Mentor: Mauricio Ramirez', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 66, name: 'Lujayana Taha', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 67, name: 'Mahya Fani', details: 'Architecture (ASU) Mentor: Dr. Nina Sharp', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 68, name: 'Mansoor M. Mughal', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 69, name: 'Manuel Cestari', details: 'UH', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 70, name: 'Mauricio Ramirez', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 71, name: 'Miad Yarali', details: 'MSE (UH) Mentor: Dr. Francisco Robles', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 72, name: 'Michelle Patrick- Krueger', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 73, name: 'Milton Osiel Candela Leal', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 74, name: 'Mohammad Sultan', details: 'ECE (UH) Mentor: Dr. Aaron Becker', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 75, name: 'Mohammadjavad Mohebinia', details: 'ME (UH) Mentor: Dr. Jiming Bao', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 76, name: 'Mohammed Alrahyani', details: 'Architecture (ASU) Mentor: Prof. Dongwoo Jason Yeom', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 77, name: 'Muhammad Hussain', details: 'ME (UH) Mentor: Prof. Weihang Zhu', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 78, name: 'Nabeeha Hasan', details: 'HBS (UH) Mentor: Dr. Xinli Liu', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 79, name: 'Nathaly Andrea Castaneda Quintero', details: 'ME (UH) Mentor: Dr. Francisco Robles', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 80, name: 'Niccolo Meniconi', details: 'ElecEng (ASU) Mentor: Dr. Pavan Turaga', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 81, name: 'Nicole Haikalis', details: 'BME (ASU) Mentor: Dr. Sydney Schaefer', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 82, name: 'Nishant Rao, PhD (S\'22)', details: 'HHP (UH) Mentor: Dr. Pranav Parikh', institution: 'University of Houston', instCode: 'UH', alum: true },
  { id: 83, name: 'Oscar Jones (VRS)', details: 'Engineering (UH) Mentor: Dr. Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 84, name: 'Patricio Carrillo Tijerina, UG', details: 'BME (TEC)', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 85, name: 'Pavel Govyadinov', details: 'ECE (UH) Mentor: Dr. David Mayerich', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 86, name: 'Rafael Abrego Ramos', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 87, name: 'Ricardo Osorio Oliveros', details: 'ME (TEC) Mentor: Dr. Jorge de Jesús Lozoya Santos', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 88, name: 'Rubiano Alejandro', details: 'BME (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 89, name: 'Ruijiao Sun', details: 'ECE (UH) Mentor: Dr. David Mayerich', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 90, name: 'Rupali Mankar', details: 'ECE (UH) Mentor: Dr. David Mayerich', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 91, name: 'Ryan Thackston', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 92, name: 'Samuel Montero', details: 'ET (UH) Mentor: Dr. Luca Pollonini', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 93, name: 'Sara Wong', details: 'Industrial Design (UH) Mentor: Dr. Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 94, name: 'Seong Hyun Moon', details: 'BME (ASU) Mentor: Dr. Thurmon Lockhart', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 95, name: 'Seonghyujk Son', details: 'Architecture (ASU) Mentor: Prof. Dongwoo Jason Yeom', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 96, name: 'Shahin Alipour', details: 'BME (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 97, name: 'Shantanu Sarkar', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 98, name: 'Sho Nakagome', details: 'UH', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 99, name: 'Sofia Sampogna Montemayor', details: 'BME (TEC)', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 100, name: 'Soubhagya Nayak', details: 'Mech Eng (ASU) Mentor: Dr. Hyunglae Lee', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 101, name: 'Subhalakshmi Chandrasekaran', details: 'HHP (UH) Mentor: Dr. Charles Layne', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 102, name: 'Sujay Shaunak', details: 'ECE (UH) Mentor: Dr. Luca Pollonini', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 103, name: 'Sulagna Sahu', details: 'BME (ASU) Mentor: Dr. Rosalind Sadleir', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 104, name: 'Talukdar Raian Ferdous', details: 'BME (UH) Mentor: Dr. Luca Pollonini', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 105, name: 'Tian Tong', details: 'ECE (UH) Mentor: Dr. Jiming Bao', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 106, name: 'Tres Bodet', details: 'PSY (UH)', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 107, name: 'Trieu Phat Luu', details: 'UH', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 108, name: 'Vanessa Elizabeth Ortiz Padilla', details: 'TEC', institution: 'Tecnológico de Monterrey', instCode: 'TEC', alum: false },
  { id: 109, name: 'Victoria Amadi', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 110, name: 'Vishal Keshav Sridhar', details: 'ECE (UH) Mentor: Dr. Luca Pollonini', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 111, name: 'Vishal Talari', details: 'ME (UH) Mentor: Dr. Dong Liu', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 112, name: 'Vivian Rose', details: 'HHP (UH) Mentor: Dr. Pranav Parikh', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 113, name: 'Vlad Voziyanov', details: 'BME (ASU) Mentor: Dr. Jit Muthuswamy', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 114, name: 'William Noll', details: 'BME (ASU) Mentor: Dr. Marco Santello', institution: 'Arizona State University', instCode: 'ASU', alum: false },
  { id: 115, name: 'Xingjian Gu', details: 'BME (UH) Mentor: Dr. Mario Romero-Ortega', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 116, name: 'Yang Hu', details: 'ECE (UH) Mentor: Dr. Jose Contreras-Vidal', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 117, name: 'Yitong Lu', details: 'ECE (UH) Mentor: Dr. Aaron Becker', institution: 'University of Houston', instCode: 'UH', alum: false },
  { id: 118, name: 'Zain Jamjoom', details: 'UH', institution: 'University of Houston', instCode: 'UH', alum: false },
];

// Real BRAIN Center event photos, sourced from UH Cullen College of Engineering's
// official photo gallery (egr.uh.edu/news/photo-gallery -> Flickr albums).
export const gallery = [
  { src: "/images/gallery/awards-1.jpg", caption: "Student presenting BRAIN research at the annual awards event", album: "BRAIN Center Awards" },
  { src: "/images/gallery/awards-2.jpg", caption: "BRAIN Center Awards", album: "BRAIN Center Awards" },
  { src: "/images/gallery/awards-3.jpg", caption: "BRAIN Center Awards", album: "BRAIN Center Awards" },
  { src: "/images/gallery/awards-4.jpg", caption: "BRAIN Center Awards", album: "BRAIN Center Awards" },
  { src: "/images/gallery/awards-5.jpg", caption: "BRAIN Center Awards", album: "BRAIN Center Awards" },
  { src: "/images/gallery/museum-1.jpg", caption: "Kids with their Brainiverse certificates at the Children's Museum outreach event", album: "Brain Center at Children's Museum" },
  { src: "/images/gallery/museum-2.jpg", caption: "Children's Museum outreach", album: "Brain Center at Children's Museum" },
  { src: "/images/gallery/museum-3.jpg", caption: "Children's Museum outreach", album: "Brain Center at Children's Museum" },
  { src: "/images/gallery/museum-4.jpg", caption: "Children's Museum outreach", album: "Brain Center at Children's Museum" },
  { src: "/images/gallery/museum-5.jpg", caption: "Children's Museum outreach", album: "Brain Center at Children's Museum" },
  { src: "/images/gallery/spring-event-1.jpg", caption: "Attendees at the Spring BRAIN Center event", album: "Spring BRAIN Center Event" },
  { src: "/images/gallery/spring-event-2.jpg", caption: "Spring BRAIN Center Event", album: "Spring BRAIN Center Event" },
  { src: "/images/gallery/spring-event-3.jpg", caption: "Spring BRAIN Center Event", album: "Spring BRAIN Center Event" },
  { src: "/images/gallery/spring-event-4.jpg", caption: "Spring BRAIN Center Event", album: "Spring BRAIN Center Event" },
  { src: "/images/people/contreras-vidal-faculty.jpg", caption: "Dr. Jose Luis Contreras-Vidal, Hugh Roy & Lillie Cranz Cullen Distinguished Professor, UH Electrical & Computer Engineering", album: "Faculty & Research" },
  { src: "/images/people/contreras-vidal-athome-2023.jpg", caption: "Dr. Contreras-Vidal testing a portable, at-home EEG brain-computer interface for stroke rehabilitation, 2023", album: "Faculty & Research" },
  { src: "/images/people/contreras-vidal-exoskeleton.jpg", caption: "Dr. Contreras-Vidal demonstrating a brain-controlled REX lower-body exoskeleton", album: "Faculty & Research" },
  { src: "/images/news/nai-senior-member.jpg", caption: "Dr. Contreras-Vidal elected to the National Academy of Inventors", album: "Faculty & Research" },
];

// Tags are hairline-outlined with a coloured label (the "Ink" shades, >=4.5:1 on
// paper); the bright signal hues live on `dot`, where they're fills, not text. `activeText` is the label color for a selected pill drawn on the
// bright `dot` fill — white only clears 4.5:1 on rose/maroon; on green,
// orange and peach it's 1.7-2.3:1, so those use dark ink (8-11:1).
export const colorMap = {
  rose: { bg: "bg-transparent hover:bg-white", text: "text-accent-roseInk", ring: "ring-ink-100", dot: "bg-accent-rose", activeText: "text-ink-900" },
  orange: { bg: "bg-transparent hover:bg-white", text: "text-accent-orangeInk", ring: "ring-ink-100", dot: "bg-accent-orange", activeText: "text-ink-900" },
  green: { bg: "bg-transparent hover:bg-white", text: "text-accent-greenInk", ring: "ring-ink-100", dot: "bg-accent-green", activeText: "text-ink-900" },
  maroon: { bg: "bg-transparent hover:bg-white", text: "text-accent-maroon", ring: "ring-ink-100", dot: "bg-accent-maroon", activeText: "text-white" },
  peach: { bg: "bg-transparent hover:bg-white", text: "text-accent-maroon", ring: "ring-ink-100", dot: "bg-accent-peach", activeText: "text-ink-900" },
};

// Real [lon, lat] per institution's campus — rendered on an actual
// Mercator-projected world map (react-simple-maps), not hand-placed percentages.
export const networkPins = [
  { name: "University of Houston", sub: "Lead Institution", group: "brain", lon: -95.34, lat: 29.72 },
  { name: "Arizona State University", sub: "Site Director: Marco Santello · also an MDRN site (PI: Melita Belgrave)", group: "brain", lon: -111.93, lat: 33.42 },
  { name: "Georgia Institute of Technology", sub: "Site Director: Michelle LaPlaca", group: "brain", lon: -84.4, lat: 33.78 },
  { name: "West Virginia University", sub: "Site Director: Peter Konrad", group: "brain", lon: -79.96, lat: 39.63 },
  { name: "University of Maryland, Baltimore County", sub: "Site Director: Ramana Vinjamuri", group: "brain", lon: -76.71, lat: 39.25 },
  { name: "University of Alabama at Birmingham", sub: "Site Director: Nicole Bentley", group: "brain", lon: -86.8, lat: 33.52 },
  { name: "Northeastern University", sub: "Site Director: Eugene Tunik", group: "brain", lon: -71.09, lat: 42.36 },
  { name: "Tecnológico de Monterrey", sub: "Site Director: Jorge de Jesus Lozoya Santos", group: "brain", lon: -100.31, lat: 25.67 },
  { name: "Universidad Miguel Hernández de Elche", sub: "Site Director: Jose M. Azorín", group: "brain", lon: -0.7, lat: 38.27 },
  { name: "Swiss Center for Affective Sciences", sub: "AccelNet network partner", group: "accelnet", lon: 6.14, lat: 46.2 },
  { name: "NEUROLIVE, UCL", sub: "AccelNet network partner", group: "accelnet", lon: -0.13, lat: 51.51 },
  { name: "EBRAINS", sub: "AccelNet pan-European infrastructure", group: "accelnet", lon: 8.71, lat: 49.41 },
  { name: "UCSF", sub: "MDRN network lead · PI: Julene K. Johnson", group: "mdrn", lon: -122.46, lat: 37.76 },
  { name: "University of Southern California", sub: "MDRN network partner", group: "mdrn", lon: -118.29, lat: 34.02 },
  { name: "Northwestern University", sub: "MDRN network partner", group: "mdrn", lon: -87.68, lat: 42.05 },
  { name: "Boston University", sub: "MDRN network partner", group: "mdrn", lon: -71.1, lat: 42.35 },
  { name: "Rutgers University", sub: "IUCRC CARTA site", group: "accelnet", lon: -74.45, lat: 40.5 },
  { name: "University of Miami", sub: "IUCRC CARTA site", group: "accelnet", lon: -80.28, lat: 25.72 },
];
